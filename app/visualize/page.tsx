"use client";
import { useState } from "react";
import Image from "next/image";
import { products } from "../../lib/products";

export default function Visualize() {
  const [roomURL, setRoomURL] = useState(null);
  const [imgW, setImgW] = useState(0);
  const [imgH, setImgH] = useState(0);

  const [activeSlug, setActiveSlug] = useState(null);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [scale, setScale] = useState(1);
  const [deg, setDeg] = useState(0);
  const [why, setWhy] = useState("");

  const basePx = 300;

  async function onUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => { setImgW(img.naturalWidth); setImgH(img.naturalHeight); };
    img.src = url;
    setRoomURL(url);

    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch("/api/analyze", { method: "POST", body: fd });
    const ans = await res.json();

    // Choose product
    setWhy(ans.reason || "");
    setActiveSlug(ans.productSlug || products[0].slug);
    const prod = products.find(p => p.slug === (ans.productSlug || "")) || products[0];

    // Placement (bbox_norm: [x,y,w,h] in 0..1)
    const nx = ans?.anchor?.bbox_norm?.[0] ?? 0.45;
    const ny = ans?.anchor?.bbox_norm?.[1] ?? 0.6;
    const nw = ans?.anchor?.bbox_norm?.[2] ?? 0.3;
    const nh = ans?.anchor?.bbox_norm?.[3] ?? 0.2;
    const placeX = nx * img.naturalWidth + (nw * img.naturalWidth) / 2;
    const placeY = ny * img.naturalHeight + (nh * img.naturalHeight) * 0.1;

    // Scale
    let pxPerCm = ans?.pxPerCm;
    if (!pxPerCm && nw > 0) {
      const approxCm = 120; // assume detected surface is ~120cm wide
      pxPerCm = (nw * img.naturalWidth) / approxCm;
    }
    let nextScale = 1;
    if (pxPerCm && prod.display_width_cm) {
      const targetPx = prod.display_width_cm * pxPerCm;
      nextScale = targetPx / basePx;
    }

    setScale(nextScale);
    setDx(placeX - (basePx * nextScale) / 2);
    setDy(placeY - (basePx * nextScale) * 0.45);
    setDeg(0);
  }

  const active = products.find(p => p.slug === activeSlug) || products[0];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">See it in your room</h1>
      <p className="text-gray-600">Upload a photo — we’ll auto-pick, place, and size the best match.</p>

      <input type="file" accept="image/*" onChange={onUpload} className="border p-2 rounded" />

      <div className="grid md:grid-cols-[2fr,1fr] gap-6">
        <div className="border rounded p-4">
          {!roomURL ? (
            <div className="text-gray-500">Upload a room photo to start.</div>
          ) : (
            <div className="overflow-auto">
              <div className="relative" style={{ width: imgW, height: imgH }}>
                <img src={roomURL} alt="Room" width={imgW} height={imgH} className="block select-none" />
                <div
                  className="absolute top-0 left-0 pointer-events-none"
                  style={{ transform:`translate(${dx}px,${dy}px) rotate(${deg}deg) scale(${scale})`, transition:"transform 40ms linear" }}
                >
                  <Image src={active.images[0]} alt={active.title} width={basePx} height={basePx}
                    className="pointer-events-auto rounded-xl shadow bg-white/60" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="border rounded p-4">
            <h2 className="font-medium mb-2">Chosen product</h2>
            <div className="text-sm text-gray-700">{active.title}</div>
            {why && <div className="mt-2 text-xs text-gray-500">Reason: {why}</div>}
          </div>
          <div className="border rounded p-4 space-y-3">
            <h2 className="font-medium">Fine-tune</h2>
            <label className="block text-sm">Scale: {scale.toFixed(2)}
              <input type="range" min="0.2" max="2" step="0.02" value={scale}
                onChange={e=>setScale(parseFloat(e.target.value))} className="w-full" />
            </label>
            <label className="block text-sm">Rotate: {deg}°
              <input type="range" min="-30" max="30" step="1" value={deg}
                onChange={e=>setDeg(parseInt(e.target.value))} className="w-full" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
