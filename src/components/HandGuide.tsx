import React from 'react';
import { Finger } from '../types';
import { FINGER_NAMES } from '../data/keyboards';

interface HandGuideProps {
  activeFinger?: Finger;
}

export const HandGuide: React.FC<HandGuideProps> = ({ activeFinger }) => {
  return (
    <div className="flex items-center justify-center gap-12 my-2 py-2 select-none">
      {/* Left Hand Diagram */}
      <div className="flex flex-col items-center">
        <div className="flex items-end gap-1.5 h-16">
          {/* Finger 1: Left Pinky */}
          <div
            className={`w-3.5 rounded-t-full transition-all duration-150 ${
              activeFinger === 1 ? 'h-11 ring-2 ring-rose-400 -translate-y-1' : 'h-9 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_NAMES[1].color }}
            title="Left Pinky"
          ></div>
          {/* Finger 2: Left Ring */}
          <div
            className={`w-3.5 rounded-t-full transition-all duration-150 ${
              activeFinger === 2 ? 'h-14 ring-2 ring-orange-400 -translate-y-1' : 'h-12 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_NAMES[2].color }}
            title="Left Ring"
          ></div>
          {/* Finger 3: Left Middle */}
          <div
            className={`w-3.5 rounded-t-full transition-all duration-150 ${
              activeFinger === 3 ? 'h-16 ring-2 ring-yellow-400 -translate-y-1' : 'h-14 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_NAMES[3].color }}
            title="Left Middle"
          ></div>
          {/* Finger 4: Left Index */}
          <div
            className={`w-3.5 rounded-t-full transition-all duration-150 ${
              activeFinger === 4 ? 'h-13 ring-2 ring-green-400 -translate-y-1' : 'h-11 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_NAMES[4].color }}
            title="Left Index"
          ></div>
          {/* Left Thumb */}
          <div
            className={`w-4 h-7 rounded-t-full origin-bottom-left rotate-12 transition-all duration-150 ${
              activeFinger === 9 ? 'ring-2 ring-indigo-400 -translate-y-1' : 'opacity-40'
            }`}
            style={{ backgroundColor: FINGER_NAMES[9].color }}
            title="Thumb (Space)"
          ></div>
        </div>
        <div className="w-24 h-6 bg-slate-800 rounded-b-xl border-t border-slate-700 mt-1 flex items-center justify-center text-[10px] text-slate-400 font-medium">
          Left Hand
        </div>
      </div>

      {/* Right Hand Diagram */}
      <div className="flex flex-col items-center">
        <div className="flex items-end gap-1.5 h-16">
          {/* Right Thumb */}
          <div
            className={`w-4 h-7 rounded-t-full origin-bottom-right -rotate-12 transition-all duration-150 ${
              activeFinger === 9 ? 'ring-2 ring-indigo-400 -translate-y-1' : 'opacity-40'
            }`}
            style={{ backgroundColor: FINGER_NAMES[9].color }}
            title="Thumb (Space)"
          ></div>
          {/* Finger 5: Right Index */}
          <div
            className={`w-3.5 rounded-t-full transition-all duration-150 ${
              activeFinger === 5 ? 'h-13 ring-2 ring-cyan-400 -translate-y-1' : 'h-11 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_NAMES[5].color }}
            title="Right Index"
          ></div>
          {/* Finger 6: Right Middle */}
          <div
            className={`w-3.5 rounded-t-full transition-all duration-150 ${
              activeFinger === 6 ? 'h-16 ring-2 ring-blue-400 -translate-y-1' : 'h-14 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_NAMES[6].color }}
            title="Right Middle"
          ></div>
          {/* Finger 7: Right Ring */}
          <div
            className={`w-3.5 rounded-t-full transition-all duration-150 ${
              activeFinger === 7 ? 'h-14 ring-2 ring-purple-400 -translate-y-1' : 'h-12 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_NAMES[7].color }}
            title="Right Ring"
          ></div>
          {/* Finger 8: Right Pinky */}
          <div
            className={`w-3.5 rounded-t-full transition-all duration-150 ${
              activeFinger === 8 ? 'h-11 ring-2 ring-pink-400 -translate-y-1' : 'h-9 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_NAMES[8].color }}
            title="Right Pinky"
          ></div>
        </div>
        <div className="w-24 h-6 bg-slate-800 rounded-b-xl border-t border-slate-700 mt-1 flex items-center justify-center text-[10px] text-slate-400 font-medium">
          Right Hand
        </div>
      </div>
    </div>
  );
};
