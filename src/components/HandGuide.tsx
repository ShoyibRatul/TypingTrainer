import React from 'react';
import { Finger } from '../types';
import { FINGER_NAMES } from '../data/keyboards';

interface HandGuideProps {
  activeFinger?: Finger;
}

export const HandGuide: React.FC<HandGuideProps> = ({ activeFinger }) => {
  return (
    <div className="flex items-center justify-center gap-12 my-2 py-1 select-none">
      {/* Left Hand Diagram */}
      <div className="flex flex-col items-center">
        <div className="flex items-end gap-1.5 h-14">
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              activeFinger === 1 ? 'h-10 ring-2 ring-rose-400 -translate-y-0.5' : 'h-8 opacity-30'
            }`}
            style={{ backgroundColor: FINGER_NAMES[1].color }}
            title="Left Pinky"
          ></div>
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              activeFinger === 2 ? 'h-13 ring-2 ring-orange-400 -translate-y-0.5' : 'h-11 opacity-30'
            }`}
            style={{ backgroundColor: FINGER_NAMES[2].color }}
            title="Left Ring"
          ></div>
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              activeFinger === 3 ? 'h-14 ring-2 ring-yellow-400 -translate-y-0.5' : 'h-12 opacity-30'
            }`}
            style={{ backgroundColor: FINGER_NAMES[3].color }}
            title="Left Middle"
          ></div>
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              activeFinger === 4 ? 'h-12 ring-2 ring-emerald-400 -translate-y-0.5' : 'h-10 opacity-30'
            }`}
            style={{ backgroundColor: FINGER_NAMES[4].color }}
            title="Left Index"
          ></div>
          <div
            className={`w-3.5 h-6 rounded-t-full origin-bottom-left rotate-12 transition-all duration-150 ${
              activeFinger === 9 ? 'ring-2 ring-accent -translate-y-0.5' : 'opacity-30'
            }`}
            style={{ backgroundColor: 'var(--accent)' }}
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
              activeFinger === 9 ? 'ring-2 ring-accent -translate-y-0.5' : 'opacity-30'
            }`}
            style={{ backgroundColor: 'var(--accent)' }}
            title="Thumb (Space)"
          ></div>
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              activeFinger === 5 ? 'h-12 ring-2 ring-teal-400 -translate-y-0.5' : 'h-10 opacity-30'
            }`}
            style={{ backgroundColor: FINGER_NAMES[5].color }}
            title="Right Index"
          ></div>
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              activeFinger === 6 ? 'h-14 ring-2 ring-blue-400 -translate-y-0.5' : 'h-12 opacity-30'
            }`}
            style={{ backgroundColor: FINGER_NAMES[6].color }}
            title="Right Middle"
          ></div>
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              activeFinger === 7 ? 'h-13 ring-2 ring-purple-400 -translate-y-0.5' : 'h-11 opacity-30'
            }`}
            style={{ backgroundColor: FINGER_NAMES[7].color }}
            title="Right Ring"
          ></div>
          <div
            className={`w-3 rounded-t-full transition-all duration-150 ${
              activeFinger === 8 ? 'h-10 ring-2 ring-pink-400 -translate-y-0.5' : 'h-8 opacity-30'
            }`}
            style={{ backgroundColor: FINGER_NAMES[8].color }}
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
