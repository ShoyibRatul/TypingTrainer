import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertTriangle, ShieldCheck, Package } from 'lucide-react';
import { Button } from './ui/Button';
import { extractAndValidatePack } from '../engine/packs/extractor';
import { packRegistry } from '../engine/packs/registry';
import { PackValidationResult } from '../engine/packs/types';

interface PackImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPackInstalled?: (packId: string) => void;
}

export const PackImportModal: React.FC<PackImportModalProps> = ({ isOpen, onClose, onPackInstalled }) => {
  const [fileBytes, setFileBytes] = useState<Uint8Array | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [validation, setValidation] = useState<PackValidationResult | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isInstalling, setIsInstalling] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleProcessFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const bytes = new Uint8Array(reader.result);
        setFileBytes(bytes);
        const { result } = extractAndValidatePack(bytes);
        setValidation(result);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleInstall = async () => {
    if (!fileBytes || !validation?.valid) return;
    setIsInstalling(true);
    try {
      const res = await packRegistry.importPack(fileBytes);
      if (res.valid && res.manifest) {
        onPackInstalled?.(res.manifest.id);
        onClose();
      }
    } finally {
      setIsInstalling(false);
    }
  };

  const resetState = () => {
    setFileBytes(null);
    setFileName('');
    setValidation(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface border border-border rounded-card w-full max-w-lg shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-sm text-txt">Import Lesson Pack</h3>
          </div>
          <button
            onClick={() => {
              resetState();
              onClose();
            }}
            className="text-txt-muted hover:text-txt p-1 rounded-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {!validation ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-card p-8 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-3 ${
                isDragging
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-txt-muted bg-surface-2/40'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-accent-soft flex items-center justify-center text-accent">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-txt">
                  Drop a <span className="font-mono text-accent">.ttpack</span> or <span className="font-mono text-accent">.zip</span> here
                </p>
                <p className="text-[11px] text-txt-muted mt-1">or click to browse from your computer</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".ttpack,.zip"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {validation.valid && validation.preview ? (
                <div className="space-y-3">
                  <div className="p-4 bg-surface-2 rounded-card border border-border space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-txt">{validation.preview.name}</h4>
                        <p className="text-[11px] font-mono text-txt-muted">{validation.preview.id} &bull; v{validation.preview.version}</p>
                        {fileName && <p className="text-[10px] text-txt-muted">Source archive: {fileName}</p>}
                      </div>
                      <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-accent-soft text-accent font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" /> Clean Sandbox
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-border/60">
                      <div>
                        <span className="text-[11px] text-txt-muted block">Author</span>
                        <span className="text-txt font-medium">{validation.preview.author}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-txt-muted block">License</span>
                        <span className="text-txt font-medium">{validation.preview.license}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-txt-muted block">Curriculum Contents</span>
                        <span className="text-txt font-medium">
                          {validation.preview.courseCount} course(s), {validation.preview.lessonCount} lessons
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] text-txt-muted block">Layouts</span>
                        <span className="text-txt font-medium">{validation.preview.layoutCount} layout(s)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-txt-muted">
                    This pack will be installed into your local library and available across all user profiles.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-danger/10 border border-danger/30 rounded-card space-y-2">
                  <div className="flex items-center gap-2 text-danger">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span className="font-bold text-xs">Pack Validation Failed</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-txt space-y-1">
                    {validation.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" onClick={resetState}>
                      Choose Another File
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex justify-end gap-2 bg-surface-2/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              resetState();
              onClose();
            }}
          >
            Cancel
          </Button>
          {validation?.valid && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleInstall}
              disabled={isInstalling}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{isInstalling ? 'Installing...' : 'Install & Activate'}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
