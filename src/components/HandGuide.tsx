import React from 'react';
import { Finger } from '../types';
import { FingerAssignment } from '../engine/packs/types';

interface HandGuideProps {
  activeFinger?: Finger | FingerAssignment | string;
}

export const HandGuide: React.FC<HandGuideProps> = ({ activeFinger }) => {
  // Normalize to string
  const raw = typeof activeFinger === 'number'
    ? {
        1: 'left-pinky',
        2: 'left-ring',
        3: 'left-middle',
        4: 'left-index',
        5: 'right-index',
        6: 'right-middle',
        7: 'right-ring',
        8: 'right-pinky',
        9: 'thumb',
      }[activeFinger] || ''
    : activeFinger || '';

  const norm = {
    'L-pinky': 'left-pinky',
    'L-ring': 'left-ring',
    'L-middle': 'left-middle',
    'L-index': 'left-index',
    'L-thumb': 'thumb',
    'R-thumb': 'thumb',
    'R-index': 'right-index',
    'R-middle': 'right-middle',
    'R-ring': 'right-ring',
    'R-pinky': 'right-pinky',
  }[raw] || raw;

  return (
    <div className="flex items-center justify-center gap-12 my-2 py-1 select-none">
      {/* Left Hand Diagram */}
      <div className="flex flex-col items-center">
        <div className="flex items-end gap-1.5 h-14">
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              norm === 'left-pinky' ? 'h-10 ring-2 ring-accent -translate-y-0.5 bg-accent opacity-100' : 'h-8 bg-txt-muted/30 opacity-40'
            }`}
            title="Left Pinky"
          ></div>
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              norm === 'left-ring' ? 'h-13 ring-2 ring-accent -translate-y-0.5 bg-accent opacity-100' : 'h-11 bg-txt-muted/30 opacity-40'
            }`}
            title="Left Ring"
          ></div>
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              norm === 'left-middle' ? 'h-14 ring-2 ring-accent -translate-y-0.5 bg-accent opacity-100' : 'h-12 bg-txt-muted/30 opacity-40'
            }`}
            title="Left Middle"
          ></div>
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              norm === 'left-index' ? 'h-12 ring-2 ring-accent -translate-y-0.5 bg-accent opacity-100' : 'h-10 bg-txt-muted/30 opacity-40'
            }`}
            title="Left Index"
          ></div>
          <div
            className={`w-3.5 h-6 rounded-t-full origin-bottom-left rotate-12 transition-all duration-150 ${
              norm === 'thumb' ? 'ring-2 ring-accent -translate-y-0.5 bg-accent opacity-100' : 'bg-txt-muted/30 opacity-40'
            }`}
            title="Thumb (Space)"
          ></div>
        </div>
        <div className="w-20 h-5 bg-surface-2 rounded-b-md border-t border-border mt-1 flex items-center justify-center text-[9px] text-txt-muted font-medium">
          Left Hand
        </div>
      </div>

      {/* Right Hand Diagram */}
      <div className="flex flex-col items-center">
        <div className="flex items-end gap-1.5 h-14">
          <div
            className={`w-3.5 h-6 rounded-t-full origin-bottom-right -rotate-12 transition-all duration-150 ${
              norm === 'thumb' ? 'ring-2 ring-accent -translate-y-0.5 bg-accent opacity-100' : 'bg-txt-muted/30 opacity-40'
            }`}
            title="Thumb (Space)"
          ></div>
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              norm === 'right-index' ? 'h-12 ring-2 ring-accent -translate-y-0.5 bg-accent opacity-100' : 'h-10 bg-txt-muted/30 opacity-40'
            }`}
            title="Right Index"
          ></div>
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              norm === 'right-middle' ? 'h-14 ring-2 ring-accent -translate-y-0.5 bg-accent opacity-100' : 'h-12 bg-txt-muted/30 opacity-40'
            }`}
            title="Right Middle"
          ></div>
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              norm === 'right-ring' ? 'h-13 ring-2 ring-accent -translate-y-0.5 bg-accent opacity-100' : 'h-11 bg-txt-muted/30 opacity-40'
            }`}
            title="Right Ring"
          ></div>
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              norm === 'right-pinky' ? 'h-10 ring-2 ring-accent -translate-y-0.5 bg-accent opacity-100' : 'h-8 bg-txt-muted/30 opacity-40'
            }`}
            title="Right Pinky"
          ></div>
        </div>
        <div className="w-20 h-5 bg-surface-2 rounded-b-md border-t border-border mt-1 flex items-center justify-center text-[9px] text-txt-muted font-medium">
          Right Hand
        </div>
      </div>
    </div>
  );
};
