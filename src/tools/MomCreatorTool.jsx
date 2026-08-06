import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, FileText, Download, CheckCircle2, List, ShieldCheck, RefreshCw, Layers, Upload, Mic } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';
import WhisperWorker from '../workers/whisper.worker.js?worker';

export default function MomCreatorTool() {
  const [transcript, setTranscript] = useState('');
  const [template, setTemplate] = useState('standard');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Whisper specific states
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcribeStatus, setTranscribeStatus] = useState('');
  const [summarizeStatus, setSummarizeStatus] = useState('');
  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new WhisperWorker();
      worker.current.addEventListener('message', (e) => {
        const data = e.data;
        if (data.type === 'transcribe') {
          if (data.status === 'loading') {
            setTranscribeStatus('Initializing Whisper AI model (Offline)...');
          } else if (data.status === 'processing') {
            setTranscribeStatus('Transcribing audio... (This happens 100% locally)');
          } else if (data.status === 'complete') {
            setTranscript(prev => (prev ? prev + '\n\n' + data.text : data.text).trim());
            setIsTranscribing(false);
            setTranscribeStatus('');
          } else if (data.status === 'error') {
            console.error(data.error);
            setIsTranscribing(false);
            setTranscribeStatus(`Error: ${data.error}`);
          } else if (data.status === 'progress') {
             setTranscribeStatus(`Downloading AI model: ${Math.round(data.progress)}%`);
          } else if (data.status === 'initiate' || data.status === 'download' || data.status === 'done') {
             setTranscribeStatus(`Fetching model weights...`);
          }
        } else if (data.type === 'summarize') {
          if (data.status === 'loading') {
            setSummarizeStatus('Initializing DistilBART Summarization AI...');
          } else if (data.status === 'processing') {
            setSummarizeStatus('Generating Minutes (Offline NLP)...');
          } else if (data.status === 'complete') {
            let formattedText = '';
            if (template === 'standard') {
              formattedText = `MINUTES OF MEETING\n\nAI GENERATED SUMMARY:\n${data.text}\n\n`;
            } else if (template === 'action') {
              formattedText = `ACTION ITEMS & COMMITMENTS\n\n${data.text.split('. ').map(s => `- [ ] ${s}`).join('\n')}`;
            } else if (template === 'executive') {
              formattedText = `EXECUTIVE SUMMARY\n\n${data.text}`;
            }
            setResult(formattedText);
            setLoading(false);
            setSummarizeStatus('');
          } else if (data.status === 'error') {
            console.error(data.error);
            setResult(`Error generating summary: ${data.error}`);
            setLoading(false);
            setSummarizeStatus('');
          } else if (data.status === 'progress') {
             setSummarizeStatus(`Downloading Summarization model: ${Math.round(data.progress)}%`);
          } else if (data.status === 'initiate' || data.status === 'download' || data.status === 'done') {
             setSummarizeStatus(`Fetching summarization weights...`);
          }
        }
      });
    }
  }, []);

  const templates = [
    { id: 'standard', name: 'Standard Format', desc: 'Overview, Discussion Points, and Action Items' },
    { id: 'action', name: 'Action Items Focused', desc: 'Aggressively filters for commitments and deadlines' },
    { id: 'executive', name: 'Executive Summary', desc: 'Top decisions and critical takeaways' }
  ];

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsTranscribing(true);
    setTranscribeStatus('Decoding audio locally...');

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      let audioData;
      if (audioBuffer.numberOfChannels === 2) {
        const SCALING_FACTOR = Math.sqrt(2);
        const left = audioBuffer.getChannelData(0);
        const right = audioBuffer.getChannelData(1);
        audioData = new Float32Array(left.length);
        for (let i = 0; i < left.length; ++i) {
          audioData[i] = SCALING_FACTOR * (left[i] + right[i]) / 2;
        }
      } else {
        audioData = audioBuffer.getChannelData(0);
      }

      worker.current.postMessage({
        type: 'transcribe',
        audioData: audioData
      });

    } catch (error) {
      console.error(error);
      setTranscribeStatus('Failed to decode audio file. Make sure it is a valid audio/video format.');
      setIsTranscribing(false);
    }
  };

  const generateMom = () => {
    if (!transcript.trim()) return;
    setLoading(true);
    setSummarizeStatus('Starting Summarization AI...');
    
    // Use the Web Worker for true offline AI summarization
    worker.current.postMessage({
      type: 'summarize',
      text: transcript,
      template: template
    });
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-minutes-${template}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 border border-blue-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Free AI Meeting Minutes Generator</h1>
            <p className="text-sm text-[#676879]">Generate professional AI meeting minutes automatically from any recording.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-blue-500 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Whisper AI transcribes offline in your browser. Audio never leaves your device.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Input Settings */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white border border-[#e6e9ef] rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-[#1f2532] flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" /> Output Template
            </h3>
            
            <div className="space-y-3">
              {templates.map(t => (
                <label 
                  key={t.id} 
                  className={`block p-3 rounded-xl border-2 cursor-pointer transition-all ${template === t.id ? 'border-blue-500 bg-blue-50' : 'border-[#e6e9ef] hover:border-[#d0d4e4] bg-white'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <input 
                      type="radio" 
                      name="template" 
                      value={t.id} 
                      checked={template === t.id} 
                      onChange={() => setTemplate(t.id)}
                      className="hidden" 
                    />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${template === t.id ? 'border-blue-500' : 'border-gray-300'}`}>
                      {template === t.id && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                    <span className={`font-bold text-sm ${template === t.id ? 'text-blue-700' : 'text-[#1f2532]'}`}>{t.name}</span>
                  </div>
                  <p className="text-xs text-[#676879] pl-6">{t.desc}</p>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Editor & Result */}
        <div className="md:col-span-2 space-y-6">
          
          {/* File Upload Zone */}
          <div className="bg-[#f6f8fa] border-2 border-dashed border-[#d0d4e4] rounded-2xl p-8 text-center relative hover:border-blue-500/50 transition-colors">
             <input 
               type="file" 
               accept="audio/*,video/*" 
               onChange={handleFileUpload} 
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
               disabled={isTranscribing}
             />
             
             {isTranscribing ? (
               <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                 <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
                 <p className="text-sm font-bold text-[#1f2532]">{transcribeStatus}</p>
                 <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 animate-pulse w-full"></div>
                 </div>
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                 <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center text-blue-500">
                   <Upload className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-sm font-bold text-[#1f2532]">Drag and drop your audio/video file here</p>
                   <p className="text-xs text-[#676879] mt-1">Or click to browse (MP3, WAV, MP4)</p>
                 </div>
                 <button className="px-5 py-2 rounded-full bg-blue-500 text-white font-bold text-sm pointer-events-auto shadow-md">
                   Upload File
                 </button>
               </div>
             )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#e6e9ef]"></div>
            <span className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider">OR PASTE TEXT</span>
            <div className="flex-1 h-px bg-[#e6e9ef]"></div>
          </div>

          <div className="bg-white border border-[#e6e9ef] rounded-2xl p-1 overflow-hidden focus-within:border-blue-500 transition-colors shadow-sm">
            <div className="bg-[#f8f9fa] border-b border-[#e6e9ef] p-3 flex items-center gap-2 text-xs font-bold text-[#676879]">
              <FileText className="w-4 h-4" /> Transcript
            </div>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Your transcribed text will appear here. You can also paste an existing transcript..."
              className="w-full h-48 p-4 text-sm text-[#1f2532] bg-white resize-none focus:outline-none"
            />
          </div>

          <button
            onClick={generateMom}
            disabled={!transcript.trim() || loading || isTranscribing}
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {loading ? summarizeStatus : 'Generate Minutes'}
          </button>

          {result && (
            <div className="bg-white border border-[#e6e9ef] rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-[#f8f9fa] border-b border-[#e6e9ef] p-4 flex items-center justify-between">
                <h3 className="font-bold text-[#1f2532] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Generated Minutes
                </h3>
              </div>
              <div className="p-6">
                <pre className="text-sm text-[#1f2532] whitespace-pre-wrap font-sans leading-relaxed">
                  {result}
                </pre>
              </div>
              <div className="bg-[#f8f9fa] border-t border-[#e6e9ef] p-4">
                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadTxt}
                    className="flex-1 py-3 px-4 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all flex justify-center items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download .TXT
                  </button>
                  <NativeShareButton text={result} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
