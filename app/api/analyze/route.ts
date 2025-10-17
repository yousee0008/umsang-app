// app/api/analyze/route.ts
import OpenAI from "openai";

export const runtime = "nodejs"; // use Node runtime (Buffer available)

type Placement = {
  productSlug: string;
  reason: string;
  anchor: { surface: string; bbox_norm: [number, number, number, number]; score: number };
  pxPerCm?: number;
};

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("image") as File | null;
    if (!file) {
      return new Response(JSON.stringify({ error: "no image" }), {
        status: 400, headers: { "content-type": "application/json" }
      });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const dataUrl = `data:${file.type || "image/jpeg"};base64,${base64}`;

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

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
            "bbox_norm values are relative (0..1). Prefer tables, consoles, shelves, side tables."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                "Products you can choose from (use slug verbatim):\n" +
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
    let parsed: Placement;
    try {
      parsed = JSON.parse(content) as Placement;
    } catch {
      return new Response(JSON.stringify({ error: "bad JSON from model", raw: content }), {
        status: 502, headers: { "content-type": "application/json" }
      });
    }

    return new Response(JSON.stringify(parsed), {
      headers: { "content-type": "application/json" }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: String(err?.message || err || "failed") }), {
      status: 500, headers: { "content-type": "application/json" }
    });
  }
}
