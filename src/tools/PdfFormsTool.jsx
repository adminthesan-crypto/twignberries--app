import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { CheckSquare, Upload, FileText, Download, ShieldCheck, AlertCircle, RefreshCw, Plus, Trash2 } from 'lucide-react';

export default function PdfFormsTool() {
  const [file, setFile] = useState(null);
  const [fields, setFields] = useState([
    { name: 'FullName', type: 'text', page: 1, x: 100, y: 700, width: 200, height: 24 },
    { name: 'AgreeTerms', type: 'checkbox', page: 1, x: 100, y: 650, width: 20, height: 20 },
  ]);
  const [formPdf, setFormPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    setFormPdf(null);
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.type !== 'application/pdf') {
      setErrorMsg('Please upload a valid PDF document.');
      return;
    }
    setFile(selected);
  };

  const handleAddField = (type) => {
    setFields([
      ...fields,
      {
        name: `${type === 'text' ? 'TextBox' : 'CheckBox'}_${fields.length + 1}`,
        type,
        page: 1,
        x: 100,
        y: 600,
        width: type === 'text' ? 180 : 20,
        height: type === 'text' ? 24 : 20,
      },
    ]);
    setFormPdf(null);
  };

  const handleRemoveField = (idx) => {
    setFields(fields.filter((_, i) => i !== idx));
    setFormPdf(null);
  };

  const handleFieldChange = (idx, key, val) => {
    const next = [...fields];
    next[idx][key] = key === 'name' || key === 'type' ? val : Number(val);
    setFields(next);
    setFormPdf(null);
  };

  const handleGenerateForm = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const form = pdfDoc.getForm();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();

      fields.forEach((field) => {
        const pIdx = Math.max(0, Math.min(pages.length - 1, Number(field.page) - 1));
        const page = pages[pIdx];

        if (field.type === 'text') {
          const textField = form.createTextField(field.name || `field_${Math.random()}`);
          textField.addToPage(page, {
            x: Number(field.x),
            y: Number(field.y),
            width: Number(field.width),
            height: Number(field.height),
            font,
            borderColor: rgb(0.3, 0.4, 0.7),
            borderWidth: 1,
          });
        } else if (field.type === 'checkbox') {
          const checkBox = form.createCheckBox(field.name || `check_${Math.random()}`);
          checkBox.addToPage(page, {
            x: Number(field.x),
            y: Number(field.y),
            width: Number(field.width),
            height: Number(field.height),
            borderColor: rgb(0.3, 0.4, 0.7),
            borderWidth: 1,
          });
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setFormPdf(blob);
    } catch (err) {
      setErrorMsg('Could not add fillable form fields. A field with duplicate name may exist.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!formPdf || !file) return;
    const url = URL.createObjectURL(formPdf);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fillable-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 via-sky-500/10 to-blue-500/10 border border-blue-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">PDF Forms (Create Fillable PDF Forms)</h1>
            <p className="text-sm text-[#676879]">Add interactive fillable textboxes, checkboxes, and date fields to any PDF document.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Form fields are created offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!file ? (
        <label className="border-2 border-dashed border-[#d0d4e4] hover:border-blue-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-[#f6f8fa] hover:bg-white">
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-blue-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-3">Drop PDF file here or click to select</p>
          <p className="text-xs text-[#9ca3af]">Converts static PDF into interactive fillable PDF offline</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-10">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{file.name}</p>
                <p className="text-xs text-[#9ca3af]">Configure interactive fields below</p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setFormPdf(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef] hover:border-[#d0d4e4] transition-all"
            >
              Replace PDF
            </button>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-[#1f2532]">Fillable Form Fields:</label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAddField('text')}
                  className="py-1.5 px-3 rounded-lg bg-gray-100 hover:bg-white/20 text-[#1f2532] text-xs font-semibold transition-all"
                >
                  + Add Text Box
                </button>
                <button
                  onClick={() => handleAddField('checkbox')}
                  className="py-1.5 px-3 rounded-lg bg-gray-100 hover:bg-white/20 text-[#1f2532] text-xs font-semibold transition-all"
                >
                  + Add Checkbox
                </button>
              </div>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {fields.map((field, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-[#e6e9ef] flex flex-wrap items-center gap-3 text-xs">
                  <span className="font-bold text-blue-400 uppercase">{field.type}</span>
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) => handleFieldChange(idx, 'name', e.target.value)}
                    placeholder="Field Name"
                    className="w-28 bg-black/60 border border-[#e6e9ef] rounded px-2 py-1 text-[#1f2532]"
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-[#9ca3af]">X:</span>
                    <input
                      type="number"
                      value={field.x}
                      onChange={(e) => handleFieldChange(idx, 'x', e.target.value)}
                      className="w-16 bg-black/60 border border-[#e6e9ef] rounded px-2 py-1 text-[#1f2532]"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#9ca3af]">Y:</span>
                    <input
                      type="number"
                      value={field.y}
                      onChange={(e) => handleFieldChange(idx, 'y', e.target.value)}
                      className="w-16 bg-black/60 border border-[#e6e9ef] rounded px-2 py-1 text-[#1f2532]"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#9ca3af]">W:</span>
                    <input
                      type="number"
                      value={field.width}
                      onChange={(e) => handleFieldChange(idx, 'width', e.target.value)}
                      className="w-16 bg-black/60 border border-[#e6e9ef] rounded px-2 py-1 text-[#1f2532]"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveField(idx)}
                    className="text-red-400 hover:text-red-300 ml-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleGenerateForm}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Adding Form Fields...</span>
                </>
              ) : (
                <>
                  <CheckSquare className="w-5 h-5" />
                  <span>Create Fillable Form</span>
                </>
              )}
            </button>

            {formPdf && (
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-5 h-5" />
                <span>Download Fillable PDF</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
