import React, { useState, useEffect } from 'react';
import { Package, Plus, Check, ShieldCheck, Trash2, Globe, Layers, BookOpen } from 'lucide-react';
import { Button } from './ui/Button';
import { PackImportModal } from './PackImportModal';
import { packRegistry } from '../engine/packs/registry';
import { LoadedPack } from '../engine/packs/types';

export const PacksView: React.FC = () => {
  const [packs, setPacks] = useState<LoadedPack[]>([]);
  const [activePackId, setActivePackId] = useState<string>('');
  const [isImportOpen, setIsImportOpen] = useState<boolean>(false);

  const refreshPacks = () => {
    setPacks(packRegistry.getInstalledPacks());
    setActivePackId(packRegistry.getActivePackId());
  };

  useEffect(() => {
    refreshPacks();
    return packRegistry.subscribe(refreshPacks);
  }, []);

  const handleActivate = (id: string) => {
    packRegistry.setActivePack(id);
    setActivePackId(id);
  };

  const handleUninstall = (id: string) => {
    if (confirm('Are you sure you want to uninstall this pack?')) {
      packRegistry.uninstallPack(id);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-surface border border-border rounded-card p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-txt flex items-center gap-2">
            <Package className="w-5 h-5 text-accent" /> Lesson Packs & Curriculums
          </h2>
          <p className="text-xs text-txt-muted mt-1">
            Universal package ecosystem for courses, keyboard layouts, and typing drills.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsImportOpen(true)}>
          <Plus className="w-4 h-4" /> Import .ttpack
        </Button>
      </div>

      {/* Installed Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packs.map((pack) => {
          const isActive = pack.manifest.id === activePackId;
          const name = pack.manifest.name['en'] || Object.values(pack.manifest.name)[0] || pack.manifest.id;
          const desc = pack.manifest.description['en'] || Object.values(pack.manifest.description)[0] || '';
          const author = pack.manifest.authors[0]?.name || 'Unknown Author';

          return (
            <div
              key={pack.manifest.id}
              className={`p-5 rounded-card border transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-surface border-accent shadow-sm ring-1 ring-accent/30'
                  : 'bg-surface border-border hover:border-txt-muted'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-txt flex items-center gap-1.5">
                      {name}
                      {pack.isBuiltin && (
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-surface-2 text-txt-muted border border-border">
                          Core
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] font-mono text-txt-muted">
                      {pack.manifest.id} &bull; v{pack.manifest.version}
                    </p>
                  </div>
                  {isActive ? (
                    <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-accent-soft text-accent font-semibold">
                      <Check className="w-3.5 h-3.5" /> Active
                    </span>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => handleActivate(pack.manifest.id)}>
                      Activate
                    </Button>
                  )}
                </div>

                <p className="text-xs text-txt-muted line-clamp-2">{desc}</p>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50 text-[11px]">
                  <div className="flex items-center gap-1 text-txt-muted">
                    <Globe className="w-3.5 h-3.5 text-accent" />
                    <span>{pack.manifest.language.toUpperCase()} ({pack.manifest.direction.toUpperCase()})</span>
                  </div>
                  <div className="flex items-center gap-1 text-txt-muted">
                    <Layers className="w-3.5 h-3.5 text-accent" />
                    <span>{pack.layouts.size} Layout{pack.layouts.size === 1 ? '' : 's'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-txt-muted">
                    <BookOpen className="w-3.5 h-3.5 text-accent" />
                    <span>{pack.courses.size} Course{pack.courses.size === 1 ? '' : 's'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-border flex items-center justify-between text-xs text-txt-muted">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  <span>{pack.manifest.license}</span>
                  <span className="text-[10px] text-txt-muted/70">&bull; {author}</span>
                </div>
                {!pack.isBuiltin && (
                  <button
                    onClick={() => handleUninstall(pack.manifest.id)}
                    className="text-danger hover:text-danger/80 p-1 rounded-btn transition-colors"
                    title="Uninstall pack"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Import Modal */}
      <PackImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onPackInstalled={refreshPacks}
      />
    </div>
  );
};
