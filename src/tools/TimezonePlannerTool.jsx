import React, { useState } from 'react';
import { Globe, Plus, Trash2, ShieldCheck, Clock, Users, Sun, Moon } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function TimezonePlannerTool() {
  const [members, setMembers] = useState([
    { name: 'San Francisco (HQ)', offset: -7 },
    { name: 'London (UK Team)', offset: 1 },
    { name: 'Bangalore (India Dev)', offset: 5.5 }
  ]);
  const [utcHour, setUtcHour] = useState(15); // 15:00 UTC = 8 AM SF, 4 PM UK, 8:30 PM India

  const addMember = () => {
    setMembers([...members, { name: `Team Location #${members.length + 1}`, offset: 0 }]);
  };

  const removeMember = (idx) => {
    if (members.length <= 1) return;
    setMembers(members.filter((_, i) => i !== idx));
  };

  const updateMember = (idx, field, val) => {
    const next = [...members];
    next[idx][field] = field === 'name' ? val : Number(val);
    setMembers(next);
  };

  const getLocalHour = (offset, uHr) => {
    let local = (uHr + offset) % 24;
    if (local < 0) local += 24;
    return local;
  };

  const formatTime = (hourNum) => {
    const h = Math.floor(hourNum);
    const m = (hourNum % 1) * 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${m === 30 ? '30' : '00'} ${ampm}`;
  };

  const isWorkingHour = (localHr) => {
    return localHr >= 8 && localHr < 18; // 8:00 AM to 6:00 PM
  };

  // Check if current UTC hour is Golden Overlap
  const allWorking = members.every((m) => isWorkingHour(getLocalHour(m.offset, utcHour)));

  return (
    <div className="space-y-10">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side Remote Team Timezone & Overlap Planner
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Coordinate meetings across distributed remote teams. Easily see who is working, who is sleeping, and discover golden sync overlap hours."
          </p>
        </div>
      </div>

      {/* UTC Hour Slider */}
      <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="text-[#6161ff]" size={20} />
            <span className="font-bold text-sm text-[#1f2532]">Select Meeting Reference Time (UTC)</span>
          </div>
          <span className="font-mono text-xl font-bold text-[#6161ff]">
            {formatTime(utcHour)} <span className="text-xs text-[#868894]">(UTC {utcHour}:00)</span>
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="23"
          step="1"
          value={utcHour}
          onChange={(e) => setUtcHour(Number(e.target.value))}
          className="w-full accent-[#6161ff] h-2 bg-gray-200 rounded-lg cursor-pointer"
        />

        {allWorking ? (
          <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold flex items-center gap-2">
            <Sun size={16} /> Golden Working Hour! All team members are in normal daytime working hours (8 AM – 6 PM).
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2">
            <Moon size={16} /> Outside overlap hours for some team members. Adjust UTC time slider to find a daytime slot.
          </div>
        )}
      </div>

      {/* Team Members List */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <span style={SL}>Distributed Team Locations</span>
          <button
            onClick={addMember}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#6161ff] text-white text-xs font-bold hover:bg-[#4e4ee0]"
          >
            <Plus size={14} /> Add Location
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.map((m, idx) => {
            const localHr = getLocalHour(m.offset, utcHour);
            const working = isWorkingHour(localHr);

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border-2 transition ${
                  working ? 'border-green-400 bg-white shadow-sm' : 'border-[#e6e9ef] bg-[#fbfbfc] opacity-90'
                } space-y-8`}
              >
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={m.name}
                    onChange={(e) => updateMember(idx, 'name', e.target.value)}
                    className="w-2/3 h-9 px-2 rounded-lg border border-transparent hover:border-[#d0d4e4] text-sm font-bold text-[#1f2532] focus:outline-none"
                  />
                  {members.length > 1 && (
                    <button
                      onClick={() => removeMember(idx)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div className="flex items-baseline justify-between border-b border-[#f0f2f5] pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#868894]">Local Time</span>
                    <div className="text-2xl font-mono font-bold text-[#1f2532] mt-0.5">
                      {formatTime(localHr)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-[#868894]">UTC Offset</span>
                    <select
                      value={m.offset}
                      onChange={(e) => updateMember(idx, 'offset', e.target.value)}
                      className="text-xs font-bold text-[#6161ff] bg-transparent focus:outline-none block mt-1"
                    >
                      <option value="-8">UTC -8 (PST)</option>
                      <option value="-7">UTC -7 (PDT / MST)</option>
                      <option value="-5">UTC -5 (EST)</option>
                      <option value="0">UTC +0 (GMT / UK)</option>
                      <option value="1">UTC +1 (CET / Europe)</option>
                      <option value="5.5">UTC +5:30 (India IST)</option>
                      <option value="8">UTC +8 (Singapore / Beijing)</option>
                      <option value="9">UTC +9 (Tokyo / JST)</option>
                      <option value="10">UTC +10 (Sydney AEST)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Status:</span>
                  {working ? (
                    <span className="badge badge-success flex items-center gap-1">
                      <Sun size={12} /> Working Day
                    </span>
                  ) : (
                    <span className="badge badge-danger flex items-center gap-1">
                      <Moon size={12} /> Off / Night
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
