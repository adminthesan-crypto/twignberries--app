import React, { useState } from 'react';
import { Truck, Package, ShieldCheck, AlertCircle, Info } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function ShippingRateTool() {
  const [length, setLength] = useState(12);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(8);
  const [actualWeight, setActualWeight] = useState(4.5); // lbs
  const [dimDivisor, setDimDivisor] = useState(139); // 139 for FedEx/UPS domestic, 166 for USPS
  const [baseRate, setBaseRate] = useState(8.50);
  const [ratePerLb, setRatePerLb] = useState(1.75);

  const dimWeight = ((length * width * height) / dimDivisor).toFixed(2);
  const billableWeight = Math.max(Number(actualWeight) || 0, Number(dimWeight));
  const estCost = (Number(baseRate) + billableWeight * Number(ratePerLb)).toFixed(2);
  const isDimCharged = Number(dimWeight) > Number(actualWeight);

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-6">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side Dimensional Weight & Shipping Cost Solver
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Calculate FedEx, UPS, and USPS dimensional weight (L×W×H / DIM Divisor) and billable shipping weight offline without third-party rate API leaks."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-6">
          <div style={SL}>Package Dimensions (Inches)</div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <span className="text-xs font-semibold text-[#676879]">Length (in)</span>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Math.max(1, e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] font-mono text-sm font-bold text-[#1f2532] mt-1"
              />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#676879]">Width (in)</span>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Math.max(1, e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] font-mono text-sm font-bold text-[#1f2532] mt-1"
              />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#676879]">Height (in)</span>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Math.max(1, e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] font-mono text-sm font-bold text-[#1f2532] mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-2">
            <div>
              <div style={SL}>Actual Scale Weight (lbs)</div>
              <input
                type="number"
                value={actualWeight}
                onChange={(e) => setActualWeight(Math.max(0.1, e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] font-mono text-sm font-bold text-[#1f2532]"
              />
            </div>

            <div>
              <div style={SL}>Carrier DIM Divisor</div>
              <select
                value={dimDivisor}
                onChange={(e) => setDimDivisor(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#1f2532] bg-white"
              >
                <option value="139">139 — UPS / FedEx Daily Rates</option>
                <option value="166">166 — USPS Priority / Retail</option>
                <option value="115">115 — International Express</option>
              </select>
            </div>
          </div>
        </div>

        {/* Billable & Rate Output */}
        <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#f0f2f5] pb-4">
            <div>
              <span className="text-xs uppercase font-bold text-[#676879]">Billable Weight</span>
              <div className="text-3xl font-bold font-mono text-[#1f2532] mt-1">
                {billableWeight.toFixed(2)} lbs
              </div>
            </div>
            {isDimCharged ? (
              <span className="badge badge-danger">Charged by Dimensional Size</span>
            ) : (
              <span className="badge badge-success">Charged by Scale Weight</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#f5f6f8]">
              <span className="text-[10px] uppercase font-bold text-[#676879]">Dim Weight</span>
              <div className="text-lg font-mono font-bold text-[#1f2532] mt-0.5">{dimWeight} lbs</div>
              <span className="text-[11px] text-[#868894]">({length}×{width}×{height}) / {dimDivisor}</span>
            </div>
            <div className="p-6 rounded-xl bg-[#f5f6f8]">
              <span className="text-[10px] uppercase font-bold text-[#676879]">Actual Weight</span>
              <div className="text-lg font-mono font-bold text-[#1f2532] mt-0.5">{actualWeight} lbs</div>
              <span className="text-[11px] text-[#868894]">Scale measurement</span>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#f5f6ff] border border-[#d5d9fc] flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-[#6161ff]">Est. Base Carrier Cost</div>
              <div className="text-2xl font-mono font-bold text-[#1f2532] mt-0.5">${estCost}</div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="text-xs text-[#676879] text-right">
                ${baseRate.toFixed(2)} base + ${ratePerLb.toFixed(2)}/lb
              </div>
              <NativeShareButton text={`Shipping Rate Calc:\nDimensions: ${length}x${width}x${height} in\nWeight: ${actualWeight} lbs\nBillable Weight: ${billableWeight.toFixed(2)} lbs\nCost: $${estCost}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
