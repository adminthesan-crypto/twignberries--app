import React, { useState } from 'react';
import { FileText, Plus, Trash2, Printer, Building2, User, Receipt, Calendar } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

export default function InvoiceGenerator() {
  const [senderName, setSenderName] = useState('Twignberries Creative LLC');
  const [senderEmail, setSenderEmail] = useState('hello@twignberries.com');
  const [clientName, setClientName] = useState('Acme Corporation');
  const [clientEmail, setClientEmail] = useState('billing@acmecorp.com');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-001');
  const [invoiceDate, setInvoiceDate] = useState('2026-08-03');
  const [dueDate, setDueDate] = useState('2026-08-17');
  const [currency, setCurrency] = useState('$');
  const [taxRate, setTaxRate] = useState(10);
  const [discountRate, setDiscountRate] = useState(0);
  const [notes, setNotes] = useState('Thank you for your business! Payment is due within 14 days.');

  const [items, setItems] = useState([
    { id: 1, desc: 'Web App UI/UX Design (Twignberries 2026)', qty: 1, rate: 1200 },
    { id: 2, desc: 'Custom Frontend Development & SEO Setup', qty: 25, rate: 80 }
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), desc: 'New Service Line Item', qty: 1, rate: 100 }
    ]);
  };

  const removeItem = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (id, field, val) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: val } : i));
  };

  const subtotal = items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.rate)), 0);
  const discountAmount = subtotal * (Number(discountRate) / 100);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * (Number(taxRate) / 100);
  const total = taxableAmount + taxAmount;

  const handlePrint = () => {
    window.print();
  };

  const sectionLabelStyle = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: 'var(--text-4)',
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '1px solid var(--border)'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }} className="no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            A proper invoice, in the time it takes to make tea.
          </h1>
          <span className="badge badge-brand">NO SIGNUP REQUIRED</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          No login, no "upgrade to export." Fill it in, download it, send it.
        </p>
      </div>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, alignItems: 'start' }}>
        {/* Left Column (Inputs / Editor) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Form Card 1: Invoice & Parties */}
          <div className="form-card">
            <div style={sectionLabelStyle}>
              <Building2 size={14} color="var(--brand)" />
              1. Invoice Details &amp; Parties
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div>
                <label className="block text-xs font-medium text-[#9ca3af] mb-1">
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="glass-input font-mono text-xs w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#9ca3af] mb-1">
                  Invoice Date
                </label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="glass-input text-xs w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#9ca3af] mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="glass-input text-xs w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div>
                <span className="text-xs font-bold text-[#6b7280] uppercase tracking-wider block mb-2">
                  FROM (YOUR BUSINESS)
                </span>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your Company Name"
                    className="glass-input text-sm font-semibold w-full"
                  />
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="glass-input text-xs text-[#9ca3af] w-full"
                  />
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-[#6b7280] uppercase tracking-wider block mb-2">
                  BILL TO (CLIENT)
                </span>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Client Name or Company"
                    className="glass-input text-sm font-semibold w-full"
                  />
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="billing@client.com"
                    className="glass-input text-xs text-[#9ca3af] w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Card 2: Line Items & Notes */}
          <div className="form-card">
            <div style={sectionLabelStyle}>
              <Receipt size={14} color="var(--brand)" />
              2. Line Items &amp; Services
            </div>

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-mono text-[#6b7280]">
                    <th className="py-2.5 px-2">DESCRIPTION</th>
                    <th className="py-2.5 px-2 text-right w-20">QTY / HRS</th>
                    <th className="py-2.5 px-2 text-right w-28">RATE</th>
                    <th className="py-2.5 px-2 text-right w-28">AMOUNT</th>
                    <th className="py-2.5 px-1 w-8 no-print"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-sm">
                  {items.map((item) => (
                    <tr key={item.id} className="group">
                      <td className="py-2.5 px-2">
                        <input
                          type="text"
                          value={item.desc}
                          onChange={(e) => updateItem(item.id, 'desc', e.target.value)}
                          className="w-full bg-transparent text-white font-sans focus:outline-none border-b border-transparent focus:border-[#ff6b00]"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-right">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                          className="w-16 bg-transparent text-right text-white focus:outline-none border-b border-transparent focus:border-[#ff6b00]"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-right">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                          className="w-24 bg-transparent text-right text-white focus:outline-none border-b border-transparent focus:border-[#ff6b00]"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-right font-semibold text-white">
                        {currency}{(Number(item.qty) * Number(item.rate)).toFixed(2)}
                      </td>
                      <td className="py-2.5 px-1 text-right no-print">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="p-1 rounded text-[#6b7280] hover:text-red-400 transition-colors opacity-80 hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pb-5 border-b border-white/10 no-print">
              <button
                type="button"
                onClick={addItem}
                className="btn-secondary text-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Line Item
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#9ca3af]">Currency:</span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="glass-input !w-20 font-mono text-xs"
                >
                  <option value="$">$ (USD)</option>
                  <option value="€">€ (EUR)</option>
                  <option value="£">£ (GBP)</option>
                  <option value="₹">₹ (INR)</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider block mb-1.5">
                PAYMENT TERMS &amp; NOTES
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full glass-input text-xs text-[#9ca3af] resize-none"
                placeholder="Include bank details, wire instructions, or payment terms..."
              />
            </div>
          </div>
        </div>

        {/* Right Column (Results / Live Preview - Sticky) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 20 }}>
          {/* Primary Hero Banner */}
          <div className="form-card" style={{ background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.12), rgba(18, 22, 36, 0.9))', borderColor: 'rgba(255, 107, 0, 0.3)' }}>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff8c3a] block mb-1">
              TOTAL INVOICE AMOUNT
            </span>
            <div className="text-4xl font-mono font-bold text-white mb-2">
              {currency}{total.toFixed(2)}
            </div>
            <div className="flex items-center justify-between text-xs text-[#9ca3af] font-mono">
              <span>Client: {clientName || 'N/A'}</span>
              <span>Due: {dueDate}</span>
            </div>
          </div>

          {/* Breakdown / Action Card */}
          <div className="form-card">
            <div style={sectionLabelStyle}>
              <FileText size={14} color="var(--brand)" />
              Summary &amp; Export
            </div>

            <div className="space-y-3 font-mono text-sm mb-5">
              <div className="flex justify-between text-[#9ca3af]">
                <span>Subtotal:</span>
                <span className="text-white font-semibold">{currency}{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-[#9ca3af] no-print">
                <span>Discount (%):</span>
                <input
                  type="number"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(e.target.value)}
                  className="glass-input !w-16 !py-0.5 !px-1.5 text-right text-xs"
                />
              </div>
              {discountRate > 0 && (
                <div className="flex justify-between text-xs text-emerald-400">
                  <span>Discount ({discountRate}%):</span>
                  <span>-{currency}{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-[#9ca3af] no-print">
                <span>Tax / GST Rate (%):</span>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="glass-input !w-16 !py-0.5 !px-1.5 text-right text-xs"
                />
              </div>
              {taxRate > 0 && (
                <div className="flex justify-between text-xs text-[#9ca3af]">
                  <span>Tax ({taxRate}%):</span>
                  <span>+{currency}{taxAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="h-px bg-white/10 my-2" />

              <div className="flex justify-between items-center text-lg font-bold text-white">
                <span>TOTAL DUE:</span>
                <span className="text-[#ff6b00]">{currency}{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 no-print">
              <button
                type="button"
                onClick={handlePrint}
                className="btn-primary w-full justify-center text-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice / Save PDF</span>
              </button>

              <CopySummaryButton
                title={`Invoice Summary — ${invoiceNumber}`}
                lines={[
                  { label: 'Invoice Number', value: invoiceNumber },
                  { label: 'From', value: senderName },
                  { label: 'Bill To', value: clientName },
                  { label: 'Invoice Date', value: invoiceDate },
                  { label: 'Due Date', value: dueDate },
                  { label: 'Subtotal', value: `${currency}${subtotal.toFixed(2)}` },
                  { label: `Discount (${discountRate}%)`, value: `-${currency}${discountAmount.toFixed(2)}` },
                  { label: `Tax (${taxRate}%)`, value: `+${currency}${taxAmount.toFixed(2)}` },
                  { label: 'Total Payable', value: `${currency}${total.toFixed(2)}` }
                ]}
              />
            </div>
          </div>

          {/* Insight Block */}
          <div className="insight-block">
            💡 Pro tip: Always specify clear payment terms and due dates on every invoice. Including bank transfer details in the notes section gets you paid up to 40% faster.
          </div>

          <p style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 12, fontStyle: 'italic' }}>Nothing saved, nothing tracked. It's just math.</p>
        </div>
      </div>
    </div>
  );
}
