import React, { useState } from 'react';
import { FileText, Plus, Trash2, Printer, Download, Sparkles, Building2, User } from 'lucide-react';

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }} className="no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            Freelance Invoice Generator &amp; PDF
          </h1>
          <span className="badge badge-brand">NO SIGNUP REQUIRED</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Create professional, tax-ready invoices in 30 seconds. Print or save directly to PDF.
        </p>
      </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="btn-primary"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Invoice Document Canvas */}
      <div className="glass-card bg-[#0d101a] border-white/15 p-6 sm:p-10 space-y-8">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-heading font-bold text-white">INVOICE</span>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="glass-input !w-36 font-mono text-xs font-semibold text-[#ff6b00]"
              />
            </div>
            <div className="space-y-1 mt-3">
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Your Company Name"
                className="block bg-transparent text-sm font-semibold text-white focus:outline-none border-b border-transparent focus:border-[#ff6b00]"
              />
              <input
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="you@domain.com"
                className="block bg-transparent text-xs text-[#9ca3af] focus:outline-none border-b border-transparent focus:border-[#ff6b00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-[#6b7280] block">INVOICE DATE</span>
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="bg-transparent text-white focus:outline-none font-medium mt-0.5"
              />
            </div>
            <div>
              <span className="text-[#6b7280] block">DUE DATE</span>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-transparent text-white focus:outline-none font-medium mt-0.5"
              />
            </div>
          </div>
        </div>

        {/* Bill To Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-bold text-[#6b7280] uppercase tracking-wider block mb-1">
              BILL TO:
            </span>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client or Company Name"
              className="block w-full bg-transparent text-base font-semibold text-white focus:outline-none border-b border-transparent focus:border-[#ff6b00]"
            />
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="client@company.com"
              className="block w-full bg-transparent text-xs text-[#9ca3af] focus:outline-none border-b border-transparent focus:border-[#ff6b00] mt-1"
            />
          </div>

          <div className="flex items-end sm:justify-end no-print">
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
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs font-mono text-[#6b7280]">
                <th className="py-3 px-2 w-1/2">DESCRIPTION</th>
                <th className="py-3 px-2 text-right">QTY / HRS</th>
                <th className="py-3 px-2 text-right">RATE</th>
                <th className="py-3 px-2 text-right">AMOUNT</th>
                <th className="py-3 px-2 w-8 no-print"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-sm">
              {items.map((item) => (
                <tr key={item.id} className="group">
                  <td className="py-3 px-2">
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => updateItem(item.id, 'desc', e.target.value)}
                      className="w-full bg-transparent text-white font-sans focus:outline-none border-b border-transparent focus:border-[#ff6b00]"
                    />
                  </td>
                  <td className="py-3 px-2 text-right">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                      className="w-16 bg-transparent text-right text-white focus:outline-none border-b border-transparent focus:border-[#ff6b00]"
                    />
                  </td>
                  <td className="py-3 px-2 text-right">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                      className="w-24 bg-transparent text-right text-white focus:outline-none border-b border-transparent focus:border-[#ff6b00]"
                    />
                  </td>
                  <td className="py-3 px-2 text-right font-semibold text-white">
                    {currency}{(Number(item.qty) * Number(item.rate)).toFixed(2)}
                  </td>
                  <td className="py-3 px-2 text-right no-print">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-1 rounded text-[#6b7280] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pt-4 no-print">
            <button
              type="button"
              onClick={addItem}
              className="btn-secondary text-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Add Line Item
            </button>
          </div>
        </div>

        {/* Total Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-6 border-t border-white/10">
          <div className="sm:col-span-7">
            <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider block mb-1">
              PAYMENT TERMS & NOTES
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-transparent text-xs text-[#9ca3af] focus:outline-none border border-white/10 rounded-lg p-2 resize-none"
            />
          </div>

          <div className="sm:col-span-5 space-y-2 font-mono text-sm">
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
        </div>
      </div>
    </div>
  );
}
