
'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { products } from '../../lib/products';
type RGB = { r:number,g:number,b:number };
function rgbDistance(a:RGB,b:RGB){ return Math.sqrt((a.r-b.r)**2+(a.g-b.g)**2+(a.b-b.b)**2); }
function hexToRgb(hex:string):RGB{ const s = hex.replace('#',''); const num = parseInt(s.length===3? s.split('').map(c=>c+c).join(''): s,16); return { r:(num>>16)&255, g:(num>>8)&255, b:num&255 }; }
export default function Visualize() {
  const [roomURL, setRoomURL] = useState<string | null>(null);
  const [avgColor, setAvgColor] = useState<RGB | null>(null);
  const [selected, setSelected] = useState(0);
  const [scale, setScale] = useState(1);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const url = URL.createObjectURL(file); setRoomURL(url);
    const img = new Image(); img.onload = () => {
      const c = canvasRef.current; if (!c) return; const ctx = c.getContext('2d'); if (!ctx) return;
      c.width = img.width; c.height = img.height; ctx.drawImage(img,0,0);
      const data = ctx.getImageData(0,0,c.width,c.height).data; let r=0,g=0,b=0,count=0;
      for (let i=0; i<data.length; i+=40){ r+=data[i]; g+=data[i+1]; b+=data[i+2]; count++; }
      setAvgColor({r:Math.round(r/count), g:Math.round(g/count), b:Math.round(b/count)});
    }; img.src = url;
  };
  const productColors: RGB[] = [ hexToRgb('#1d3557'), hexToRgb('#111111') ];
  const ranked = products.map((p,i)=>({p,score: avgColor? rgbDistance(avgColor, productColors[i] ?? hexToRgb('#777777')) : 0,i})).sort((a,b)=>a.score-b.score);
  const active = ranked[selected]?.p ?? products[0];
  return (
    <div className="space-y-6">
      <h1 className="h1">See it in your room</h1>
      <p className="text-gray-600">Upload a photo of your space. We’ll suggest a product by color match. Then drag/scale the overlay to preview.</p>
      <input type="file" accept="image/*" onChange={handleUpload} className="btn" />
      <div className="grid md:grid-cols-[2fr,1fr] gap-6">
        <div className="card p-4">
          {!roomURL ? (
            <div className="text-gray-500">Upload a room photo to start.</div>
          ) : (
            <div className="relative overflow-auto">
              <canvas ref={canvasRef} className="max-w-full h-auto" />
              <div className="absolute top-0 left-0 pointer-events-none" style={{transform:`translate(${dx}px,${dy}px) scale(${scale})`, transition:'transform 40ms linear'}}>
                <Image src={active.images[0]} alt={active.title} width={300} height={300} className="pointer-events-auto border rounded-xl bg-white/70" />
              </div>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="card p-4">
            <h2 className="h3 mb-2">Suggested picks</h2>
            <ul className="space-y-2">
              {ranked.map((r, idx)=>(
                <li key={r.p.sku}>
                  <button className={`btn w-full text-left ${idx===selected?'bg-gray-100':''}`} onClick={()=>setSelected(idx)}>{r.p.title}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-4 space-y-3">
            <h2 className="h3">Adjust overlay</h2>
            <label className="block text-sm">Scale: {scale.toFixed(2)}<input type="range" min="0.2" max="2.0" step="0.02" value={scale} onChange={e=>setScale(parseFloat(e.target.value))} className="w-full" /></label>
            <label className="block text-sm">Move X: {dx}px<input type="range" min="-500" max="500" step="1" value={dx} onChange={e=>setDx(parseInt(e.target.value))} className="w-full" /></label>
            <label className="block text-sm">Move Y: {dy}px<input type="range" min="-500" max="500" step="1" value={dy} onChange={e=>setDy(parseInt(e.target.value))} className="w-full" /></label>
          </div>
        </div>
      </div>
    </div>
  );
}
