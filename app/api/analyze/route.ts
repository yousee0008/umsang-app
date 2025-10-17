import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("image");
    if (!file) {
      return new Response(JSON.stringify({ error: "no image" }), {
        status: 400, headers: { "content-type": "application/json" }
      });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const dataUrl = `data:${file.type || "image/jpeg"};base64,${base64}`;

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a vision assistant for a home decor store. " +
            "Given a room photo, choose the best product and placement. " +
            "Return ONLY JSON with keys: productSlug, reason, anchor{surface,score,bbox_norm[x,y,w,h]}, pxPerCm(optional). " +
            "bbox_norm are 0..1 fractions. Prefer tables, consoles, shelves, side tables."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                "Products (use slug verbatim):\n" +
                "- indigo-glaze-planter-5in (width_cm=13)\n" +
                "- floral-crown-bust-matte-black-11in (width_cm=13)\n" +
                "Return JSON only."
            },
            { type: "image_url", image_url: { url: dataUrl } }
          ]
        }
      ]
    });

    const content = completion.choices?.[0]?.message?.content?.trim() || "{}";
    let parsed;
    try { parsed = JSON.parse(content); }
    catch { return new Response(JSON.stringify({ error: "bad JSON from model", raw: content }), { status: 502 }); }

    return new Response(JSON.stringify(parsed), {
      headers: { "content-type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err?.message || err) }), {
      status: 500, headers: { "content-type": "application/json" }
    });
  }
}
