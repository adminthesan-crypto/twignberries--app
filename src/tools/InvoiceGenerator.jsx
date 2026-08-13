import React, { useState } from 'react';
import { FileText, Plus, Trash2, Printer, Building2, User, Receipt, Calendar, CreditCard } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';
import NativeShareButton from '../components/NativeShareButton';

export default function InvoiceGenerator() {
  // Sender (Your Business) State
  const [senderName, setSenderName] = useState('Twignberries Creative LLC');
  const [senderEmail, setSenderEmail] = useState('hello@twignberries.com');
  const [senderAddress, setSenderAddress] = useState('100 Innovation Way, Suite 400\nAustin, TX 78701 USA');
  const [senderTaxId, setSenderTaxId] = useState('Tax ID: US-88291044');

  // Client (Bill To) State
  const [clientName, setClientName] = useState('Acme Corporation');
  const [clientEmail, setClientEmail] = useState('billing@acmecorp.com');
  const [clientAddress, setClientAddress] = useState('500 Market Street, 2nd Floor\nSan Francisco, CA 94105 USA');
  const [clientTaxId, setClientTaxId] = useState('Tax ID: CA-44019200');

  // Invoice Meta State
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-001');
  const [invoiceDate, setInvoiceDate] = useState('2026-08-03');
  const [dueDate, setDueDate] = useState('2026-08-17');
  const [currency, setCurrency] = useState('$');
  const [taxRate, setTaxRate] = useState(10);
  const [discountRate, setDiscountRate] = useState(0);
  const [notes, setNotes] = useState('Thank you for your business! Please remit payment within 14 days via ACH or bank wire to Account #9928-1042.');

  // Line Items State
  const [items, setItems] = useState([
    { id: 1, desc: 'Web App UI/UX Design & Prototyping (Twignberries 2026)', qty: 1, rate: 1200 },
    { id: 2, desc: 'Custom Frontend React Development & Architecture', qty: 25, rate: 80 }
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
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: 'var(--text-3)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '1px solid var(--border)'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 940, margin: '0 auto' }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }} className="no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            Freelance Invoice Generator
          </h1>
          <span className="badge badge-brand">NO SIGNUP REQUIRED</span>
        </div>
        <p style={{ fontSize: 13.5, color: 'var(--text-3)' }}>
          Generate, preview, and download a clean PDF invoice instantly for free. No watermark, no signup, 100% private.
        </p>
      </div>

      {/* Main Invoice Editor Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Card 1: Invoice Header & Parties (From & Bill To) */}
        <div className="form-card" style={{ padding: 28 }}>
          <div style={sectionLabelStyle}>
            <Building2 size={16} color="#6161ff" />
            1. Business &amp; Client Details (Including Physical Address &amp; Tax IDs)
          </div>

          {/* Top Invoice Metadata Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 24,
            marginBottom: 24,
            padding: 24,
            background: '#f8f9fc',
            borderRadius: 12,
            border: '1px solid #eaebf2'
          }}>
            <div>
              <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#676879', textTransform: 'uppercase', marginBottom: 6 }}>
                Invoice Number
              </label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="glass-input"
                style={{ fontFamily: 'monospace', fontSize: 13, width: '100%', fontWeight: 600 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#676879', textTransform: 'uppercase', marginBottom: 6 }}>
                Invoice Date
              </label>
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="glass-input"
                style={{ fontSize: 13, width: '100%', fontWeight: 500 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#676879', textTransform: 'uppercase', marginBottom: 6 }}>
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="glass-input"
                style={{ fontSize: 13, width: '100%', fontWeight: 500 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#676879', textTransform: 'uppercase', marginBottom: 6 }}>
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="glass-input"
                style={{ fontSize: 13, width: '100%', fontWeight: 600 }}
              >
                <option value="$">$ USD</option>
                <option value="€">€ EUR</option>
                <option value="£">£ GBP</option>
                <option value="₹">₹ INR</option>
                <option value="C$">C$ CAD</option>
                <option value="A$">A$ AUD</option>
              </select>
            </div>
          </div>

          {/* 2-Column Parties Section: From (You) and Bill To (Client) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {/* FROM COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid #e6e9ef' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#1f2532', letterSpacing: '0.04em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6161ff', display: 'inline-block' }} />
                From (Your Business)
              </div>
              
              <div>
                <label style={{ fontSize: 11, color: '#676879', fontWeight: 600, display: 'block', marginBottom: 4 }}>Company / Sender Name</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your Business Name LLC"
                  className="glass-input"
                  style={{ fontSize: 13.5, fontWeight: 600, width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, color: '#676879', fontWeight: 600, display: 'block', marginBottom: 4 }}>Email Address</label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="hello@yourbusiness.com"
                  className="glass-input"
                  style={{ fontSize: 13, width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, color: '#676879', fontWeight: 600, display: 'block', marginBottom: 4 }}>Physical Address (Street, City, ZIP)</label>
                <textarea
                  rows={2}
                  value={senderAddress}
                  onChange={(e) => setSenderAddress(e.target.value)}
                  placeholder="Street address, Suite #, City, State, ZIP, Country"
                  className="glass-input"
                  style={{ fontSize: 12.5, width: '100%', resize: 'none', lineHeight: 1.4 }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, color: '#676879', fontWeight: 600, display: 'block', marginBottom: 4 }}>Tax ID / VAT Number (Optional)</label>
                <input
                  type="text"
                  value={senderTaxId}
                  onChange={(e) => setSenderTaxId(e.target.value)}
                  placeholder="e.g. EIN 12-3456789 or EU VAT Number"
                  className="glass-input"
                  style={{ fontSize: 12.5, width: '100%', fontFamily: 'monospace' }}
                />
              </div>
            </div>

            {/* BILL TO COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid #e6e9ef' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#1f2532', letterSpacing: '0.04em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c875', display: 'inline-block' }} />
                Bill To (Client)
              </div>
              
              <div>
                <label style={{ fontSize: 11, color: '#676879', fontWeight: 600, display: 'block', marginBottom: 4 }}>Client Name / Company</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Client Corporation Name"
                  className="glass-input"
                  style={{ fontSize: 13.5, fontWeight: 600, width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, color: '#676879', fontWeight: 600, display: 'block', marginBottom: 4 }}>Client Email Address</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="billing@clientcompany.com"
                  className="glass-input"
                  style={{ fontSize: 13, width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, color: '#676879', fontWeight: 600, display: 'block', marginBottom: 4 }}>Client Physical Address</label>
                <textarea
                  rows={2}
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  placeholder="Client Street Address, City, State, ZIP, Country"
                  className="glass-input"
                  style={{ fontSize: 12.5, width: '100%', resize: 'none', lineHeight: 1.4 }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, color: '#676879', fontWeight: 600, display: 'block', marginBottom: 4 }}>Client Tax ID / VAT (Optional)</label>
                <input
                  type="text"
                  value={clientTaxId}
                  onChange={(e) => setClientTaxId(e.target.value)}
                  placeholder="Client Tax Registration Number"
                  className="glass-input"
                  style={{ fontSize: 12.5, width: '100%', fontFamily: 'monospace' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Line Items & Services Table */}
        <div className="form-card" style={{ padding: 28 }}>
          <div style={sectionLabelStyle}>
            <Receipt size={16} color="#6161ff" />
            2. Line Items &amp; Services
          </div>

          <div style={{ overflowX: 'auto', marginBottom: 24 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e6e9ef', textAlign: 'left', fontSize: 11.5, fontWeight: 700, color: '#676879', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '10px 8px' }}>DESCRIPTION</th>
                  <th style={{ padding: '10px 8px', textAlign: 'right', width: 110 }}>QTY / HRS</th>
                  <th style={{ padding: '10px 8px', textAlign: 'right', width: 140 }}>RATE ({currency})</th>
                  <th style={{ padding: '10px 8px', textAlign: 'right', width: 140 }}>AMOUNT</th>
                  <th style={{ padding: '10px 4px', width: 40 }} className="no-print"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f0f2f5' }}>
                    <td style={{ padding: '12px 8px' }}>
                      <input
                        type="text"
                        value={item.desc}
                        onChange={(e) => updateItem(item.id, 'desc', e.target.value)}
                        className="glass-input"
                        style={{ width: '100%', fontSize: 13.5, fontWeight: 500 }}
                        placeholder="Service description..."
                      />
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                        className="glass-input"
                        style={{ width: 80, textAlign: 'right', fontSize: 13.5, fontWeight: 600, fontFamily: 'monospace' }}
                      />
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                        className="glass-input"
                        style={{ width: 110, textAlign: 'right', fontSize: 13.5, fontWeight: 600, fontFamily: 'monospace' }}
                      />
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', fontSize: 14, fontWeight: 700, color: '#1f2532', fontFamily: 'monospace' }}>
                      {currency}{(Number(item.qty) * Number(item.rate)).toFixed(2)}
                    </td>
                    <td style={{ padding: '12px 4px', textAlign: 'center' }} className="no-print">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        title="Remove Item"
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#c3c6d4', padding: 4 }}
                        onMouseEnter={e => e.currentTarget.style.color = '#ff3d8b'}
                        onMouseLeave={e => e.currentTarget.style.color = '#c3c6d4'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }} className="no-print">
            <button
              type="button"
              onClick={addItem}
              className="btn-secondary"
              style={{ fontSize: 13, padding: '8px 16px' }}
            >
              <Plus size={15} /> Add Service / Line Item
            </button>
          </div>
        </div>

        {/* Card 3: Notes & Summary / Total Export */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {/* Left: Notes & Bank Instructions */}
          <div className="form-card" style={{ padding: 28 }}>
            <div style={sectionLabelStyle}>
              <CreditCard size={16} color="#6161ff" />
              3. Payment Terms &amp; Bank Instructions
            </div>
            <label style={{ fontSize: 11.5, fontWeight: 700, color: '#676879', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              Bank Wire / Payment Details &amp; Notes
            </label>
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="glass-input"
              style={{ width: '100%', fontSize: 13, resize: 'none', lineHeight: 1.5 }}
              placeholder="Include bank ACH/wire details, IBAN, PayPal link, or payment terms..."
            />
            
            <div className="insight-block" style={{ marginTop: 16 }}>
              💡 Pro tip: Invoices that include full physical business addresses, tax IDs, and clear bank instructions get paid up to 40% faster.
            </div>
          </div>

          {/* Right: Summary Card & Print PDF */}
          <div className="form-card" style={{ padding: 28, background: 'linear-gradient(135deg, #1f2532 0%, #151924 100%)', color: '#ffffff', border: 'none' }}>
            <div style={{ ...sectionLabelStyle, color: '#a0a8be', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <FileText size={16} color="#6161ff" />
              4. Total Due &amp; Export
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 20, fontFamily: 'monospace', fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a0a8be' }}>
                <span>Subtotal:</span>
                <span style={{ color: '#ffffff', fontWeight: 700 }}>{currency}{subtotal.toFixed(2)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#a0a8be' }} className="no-print">
                <span>Discount (%):</span>
                <input
                  type="number"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(e.target.value)}
                  className="glass-input"
                  style={{ width: 70, textAlign: 'right', fontSize: 13, padding: '3px 8px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                />
              </div>
              {discountRate > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#00c875' }}>
                  <span>Discount ({discountRate}%):</span>
                  <span>-{currency}{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#a0a8be' }} className="no-print">
                <span>Tax / GST Rate (%):</span>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="glass-input"
                  style={{ width: 70, textAlign: 'right', fontSize: 13, padding: '3px 8px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                />
              </div>
              {taxRate > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#a0a8be' }}>
                  <span>Tax ({taxRate}%):</span>
                  <span>+{currency}{taxAmount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', margin: '4px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, fontWeight: 800 }}>
                <span>TOTAL DUE:</span>
                <span style={{ color: '#00c875' }}>{currency}{total.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }} className="no-print">
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn-primary"
                  style={{
                    flex: 1, justifyContent: 'center', fontSize: 14, padding: '12px',
                    background: '#6161ff', fontWeight: 700
                  }}
                >
                  <Printer size={17} />
                  <span>Print Invoice / Save as PDF</span>
                </button>
                <NativeShareButton text={`Invoice Summary — ${invoiceNumber}\nFrom: ${senderName}\nTo: ${clientName}\nTotal Due: ${currency}${total.toFixed(2)}\nDue Date: ${dueDate}`} />
              </div>

              <CopySummaryButton
                title={`Invoice Summary — ${invoiceNumber}`}
                lines={[
                  { label: 'Invoice Number', value: invoiceNumber },
                  { label: 'From (Company)', value: senderName },
                  { label: 'From Address', value: senderAddress.replace(/\n/g, ', ') },
                  { label: 'Bill To (Client)', value: clientName },
                  { label: 'Client Address', value: clientAddress.replace(/\n/g, ', ') },
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
        </div>
      </div>
    </div>
  );
}
