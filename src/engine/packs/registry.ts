/**
 * Universal Lesson Pack Registry
 * Manages installed packs, active pack switching, layout resolution, and persistence.
 */

import { LoadedPack, KeyboardLayout, CourseDefinition, LessonDefinition, PackValidationResult } from './types';
import { extractAndValidatePack } from './extractor';
import { getBuiltinEnglishPack } from './builtinEnglish';

const STORAGE_KEY_ACTIVE_PACK = 'typing_trainer_active_pack_id_v1';

type RegistryListener = () => void;

class PackRegistryService {
  private packs: Map<string, LoadedPack> = new Map();
  private activePackId: string;
  private listeners: Set<RegistryListener> = new Set();

  constructor() {
    // 1. Initialize with Builtin English Pack
    const builtin = getBuiltinEnglishPack();
    this.packs.set(builtin.manifest.id, builtin);
    this.activePackId = builtin.manifest.id;

    // 2. Load saved active pack ID
    try {
      const savedActiveId = localStorage.getItem(STORAGE_KEY_ACTIVE_PACK);
      if (savedActiveId && this.packs.has(savedActiveId)) {
        this.activePackId = savedActiveId;
      }
    } catch {
      // Storage unavailable or SSR
    }
  }

  public getActivePack(): LoadedPack {
    const pack = this.packs.get(this.activePackId);
    if (!pack) {
      // Fallback to builtin
      return this.packs.get('org.typingtrainer.en-us') || getBuiltinEnglishPack();
    }
    return pack;
  }

  public getActivePackId(): string {
    return this.activePackId;
  }

  public setActivePack(packId: string): boolean {
    if (!this.packs.has(packId)) {
      return false;
    }
    this.activePackId = packId;
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_PACK, packId);
    } catch {}
    this.notify();
    return true;
  }

  public getInstalledPacks(): LoadedPack[] {
    return Array.from(this.packs.values());
  }

  public getPack(packId: string): LoadedPack | undefined {
    return this.packs.get(packId);
  }

  /**
   * Resolves a layout by ID, first from the active pack, then across all packs.
   */
  public getLayout(layoutId?: string): KeyboardLayout {
    const active = this.getActivePack();
    const targetId = layoutId || active.manifest.defaults.layout;

    if (active.layouts.has(targetId)) {
      return active.layouts.get(targetId)!;
    }

    // Search other packs
    for (const pack of this.packs.values()) {
      if (pack.layouts.has(targetId)) {
        return pack.layouts.get(targetId)!;
      }
    }

    // Default to first layout in active pack
    return Array.from(active.layouts.values())[0];
  }

  /**
   * Resolves a course by ID from the active pack.
   */
  public getCourse(courseId?: string): CourseDefinition | undefined {
    const active = this.getActivePack();
    const targetId = courseId || active.manifest.defaults.course;
    return active.courses.get(targetId);
  }

  /**
   * Resolves a lesson by ID from the active pack.
   */
  public getLesson(lessonId: string): LessonDefinition | undefined {
    const active = this.getActivePack();
    return active.lessons.get(lessonId);
  }

  /**
   * Validates and imports a .ttpack buffer into the registry.
   */
  public async importPack(buffer: Uint8Array): Promise<PackValidationResult> {
    const { pack, result } = extractAndValidatePack(buffer);

    if (!result.valid || !pack) {
      return result;
    }

    // Register pack
    this.packs.set(pack.manifest.id, pack);

    // If active pack was not set or user wants to activate
    this.setActivePack(pack.manifest.id);
    this.notify();

    return result;
  }

  /**
   * Uninstalls a pack by ID (Built-in pack cannot be uninstalled).
   */
  public uninstallPack(packId: string): boolean {
    const pack = this.packs.get(packId);
    if (!pack || pack.isBuiltin) {
      return false;
    }

    this.packs.delete(packId);

    // If deleted pack was active, reset to builtin
    if (this.activePackId === packId) {
      this.setActivePack('org.typingtrainer.en-us');
    } else {
      this.notify();
    }

    return true;
  }

  public subscribe(listener: RegistryListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    for (const listener of this.listeners) {
      try {
        listener();
      } catch (err) {
        console.error('PackRegistry listener error:', err);
      }
    }
  }
}

export const packRegistry = new PackRegistryService();
