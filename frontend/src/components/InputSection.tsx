import React, { useState, useRef } from 'react';
import { Upload, FileText, Link2, Image as ImageIcon, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface InputSectionProps {
  currentLang: 'en' | 'ta';
  onAnalyzeText: (text: string) => void;
  onAnalyzeImage: (file: File) => void;
  onAnalyzeUrl: (url: string) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({
  currentLang,
  onAnalyzeText,
  onAnalyzeImage,
  onAnalyzeUrl,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<'image' | 'text' | 'url'>('image');
  const [textInput, setTextInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPEG, WebP).');
      return;
    }
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'image' && selectedFile) {
      onAnalyzeImage(selectedFile);
    } else if (activeTab === 'text' && textInput.trim()) {
      onAnalyzeText(textInput);
    } else if (activeTab === 'url' && urlInput.trim()) {
      onAnalyzeUrl(urlInput);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-100 pb-4 mb-6 space-x-2 sm:space-x-4">
        <button
          onClick={() => setActiveTab('image')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'image'
              ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>{currentLang === 'ta' ? 'திரைக்காட்சி பதிவேற்றவும்' : 'Upload Screenshot'}</span>
        </button>

        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'text'
              ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{currentLang === 'ta' ? 'உரையை ஒட்டவும்' : 'Paste Text'}</span>
        </button>

        <button
          onClick={() => setActiveTab('url')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'url'
              ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Link2 className="w-4 h-4" />
          <span>{currentLang === 'ta' ? 'இணைப்பை சரிபார்க்கவும்' : 'Check a URL'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Tab 1: Image Upload */}
        {activeTab === 'image' && (
          <div>
            {!selectedFile ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-sky-500 bg-sky-50/50'
                    : 'border-slate-300 hover:border-sky-400 hover:bg-slate-50/50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  className="hidden"
                />
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
                  <ImageIcon className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-slate-800 mb-1">
                  {currentLang === 'ta'
                    ? 'திரைக்காட்சியை இங்கே இழுத்து விடவும் அல்லது கிளிக் செய்யவும்'
                    : 'Click or drop a financial screenshot here'}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {currentLang === 'ta'
                    ? 'WhatsApp செய்திகள், Instagram பதிவுகள், Telegram டிப்ஸ், YouTube விளம்பரங்கள்'
                    : 'WhatsApp messages, Instagram posts, Telegram calls, YouTube claims, or investment ads'}
                </p>
                <div className="mt-4 inline-flex items-center text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100">
                  PNG, JPG, WebP supported
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-xl border border-slate-200"
                    />
                  )}
                  <div>
                    <p className="text-sm font-bold text-slate-800 truncate max-w-xs sm:max-w-md">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearFile}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all"
                  title="Remove image"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Text Input */}
        {activeTab === 'text' && (
          <div>
            <textarea
              rows={4}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={
                currentLang === 'ta'
                  ? 'உதாரணம்: "மாதம் 30% உத்தரவாத வருமானம். இன்றே ₹5,000 செலுத்தவும்..."'
                  : 'Paste financial claim, WhatsApp forward, or investment offer here (e.g., "Guaranteed 30% monthly returns. Pay ₹5,000 today...")'
              }
              className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm text-slate-800 placeholder-slate-400"
            />
            <div className="text-right text-xs text-slate-400 mt-1">
              {textInput.length} characters
            </div>
          </div>
        )}

        {/* Tab 3: URL Input */}
        {activeTab === 'url' && (
          <div>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/investment-opportunity"
              className="w-full p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm text-slate-800 placeholder-slate-400"
            />
            <p className="text-xs text-slate-500 mt-2">
              {currentLang === 'ta'
                ? 'நிதி சார்ந்த வலைப்பக்கத்தின் இணைப்பை உள்ளிடவும்.'
                : 'Enter a public webpage URL containing financial claims or schemes.'}
            </p>
          </div>
        )}

        {/* Action Button & Privacy Footer */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {currentLang === 'ta'
                ? 'உங்கள் உள்ளடக்கம் பாதுகாப்பாக தற்காலிகமாக மட்டுமே பகுப்பாய்வு செய்யப்படுகிறது.'
                : 'Your content is processed securely and never stored permanently.'}
            </span>
          </div>

          <button
            type="submit"
            disabled={
              isLoading ||
              (activeTab === 'image' && !selectedFile) ||
              (activeTab === 'text' && !textInput.trim()) ||
              (activeTab === 'url' && !urlInput.trim())
            }
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{currentLang === 'ta' ? 'ஆராய்ந்து பார்க்கவும்' : 'Analyze Content'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
