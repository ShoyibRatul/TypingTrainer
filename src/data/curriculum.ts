import { Module } from '../types';

export const CURRICULUM_MODULES: Module[] = [
  {
    id: 'module-01-home-row',
    title: 'The Home Row Anchor',
    description: 'Establish the foundation of touch typing. Master resting fingers on ASDF and JKL; keys.',
    level: 'Beginner',
    iconName: 'Anchor',
    lessons: [
      {
        id: 'lesson-01-fj',
        moduleId: 'module-01-home-row',
        title: 'Primary Guide Keys: F & J',
        description: 'Locate the tactile bumps on F and J using your index fingers without looking down.',
        targetKeys: ['f', 'j', ' '],
        exercises: [
          {
            id: 'ex-01-fj-intro',
            title: 'Tactile Anchors (F & J)',
            type: 'introduction',
            instructions: 'Rest your left index finger on F and right index finger on J. Feel the small raised bump on each key.',
            targetKeys: ['f', 'j', ' '],
            targetFingers: [4, 5, 9],
            content: 'f j f j ff jj fj jf ff jj fj jf'
          },
          {
            id: 'ex-01-fj-drill',
            title: 'Index Rhythm Drill',
            type: 'finger-drill',
            instructions: 'Press the spacebar with your right or left thumb. Maintain a steady, relaxed tempo.',
            targetKeys: ['f', 'j', ' '],
            targetFingers: [4, 5, 9],
            content: 'f f j j fj jf fff jjj fjf jfj ff jj f j f j'
          },
          {
            id: 'ex-01-fj-flow',
            title: 'Home Anchor Cadence',
            type: 'word-flow',
            instructions: 'Alternate between hands smoothly. Keep wrists relaxed and hovering lightly.',
            targetKeys: ['f', 'j', ' '],
            targetFingers: [4, 5, 9],
            content: 'fjf jfj f j f j ff jj ffff jjjj fff jjj fj jf f j'
          }
        ]
      },
      {
        id: 'lesson-02-dk',
        moduleId: 'module-01-home-row',
        title: 'Middle Fingers: D & K',
        description: 'Engage your middle fingers on D (left) and K (right) while keeping index fingers on F and J.',
        targetKeys: ['d', 'k', 'f', 'j', ' '],
        exercises: [
          {
            id: 'ex-02-dk-intro',
            title: 'Middle Finger Placement',
            type: 'introduction',
            instructions: 'Place your left middle finger on D and right middle finger on K.',
            targetKeys: ['d', 'k'],
            targetFingers: [3, 6],
            content: 'd k dd kk dkd kdk dk kd d k d k'
          },
          {
            id: 'ex-02-dk-drill',
            title: 'Four Key Coordination',
            type: 'finger-drill',
            instructions: 'Combine your middle and index fingers: D, F, J, K.',
            targetKeys: ['d', 'k', 'f', 'j'],
            targetFingers: [3, 4, 5, 6, 9],
            content: 'df jk fd kj dfjk kjfd fjdk kdfj dd ff jj kk'
          },
          {
            id: 'ex-02-dk-flow',
            title: 'Middle-Index Flow',
            type: 'word-flow',
            instructions: 'Develop muscle memory across all four center home-row keys.',
            targetKeys: ['d', 'k', 'f', 'j'],
            targetFingers: [3, 4, 5, 6, 9],
            content: 'dj fk kd jf djk fkd dkfj fjdk kfjd dfjk kfjd'
          }
        ]
      },
      {
        id: 'lesson-03-sl',
        moduleId: 'module-01-home-row',
        title: 'Ring Fingers: S & L',
        description: 'Extend muscle control to your ring fingers: S on the left hand, L on the right hand.',
        targetKeys: ['s', 'l', 'd', 'k', 'f', 'j', ' '],
        exercises: [
          {
            id: 'ex-03-sl-intro',
            title: 'Ring Finger Awakening',
            type: 'introduction',
            instructions: 'Ring fingers naturally share tendons with middle fingers. Focus on isolated, gentle presses.',
            targetKeys: ['s', 'l'],
            targetFingers: [2, 7],
            content: 's l ss ll sl ls sll ssl sls lsl s l'
          },
          {
            id: 'ex-03-sl-drill',
            title: 'Six Key Home Drill',
            type: 'finger-drill',
            instructions: 'Coordinate S, D, F with J, K, L.',
            targetKeys: ['s', 'l', 'd', 'k', 'f', 'j'],
            targetFingers: [2, 3, 4, 5, 6, 7, 9],
            content: 'sdf jkl lkj fds sdk lsf jks dfl slk fds jkl'
          },
          {
            id: 'ex-03-sl-words',
            title: 'Early Word Formation',
            type: 'word-flow',
            instructions: 'Type these early English home-row patterns and real words.',
            targetKeys: ['s', 'l', 'd', 'k', 'f', 'j'],
            targetFingers: [2, 3, 4, 5, 6, 7, 9],
            content: 'fad ask lad falls flask salad dads lads ask'
          }
        ]
      },
      {
        id: 'lesson-04-a-semi',
        moduleId: 'module-01-home-row',
        title: 'Pinky Keys: A & Semicolon (;)',
        description: 'Complete the home row. Train your outer pinky fingers on A and Semicolon (;).',
        targetKeys: ['a', ';', 's', 'l', 'd', 'k', 'f', 'j', ' '],
        exercises: [
          {
            id: 'ex-04-a-intro',
            title: 'Pinky Precision',
            type: 'introduction',
            instructions: 'Left pinky rests on A; right pinky rests on semicolon (;). Keep wrists stable.',
            targetKeys: ['a', ';'],
            targetFingers: [1, 8],
            content: 'a ; aa ;; a; ;a as ;l ad ;k af ;j'
          },
          {
            id: 'ex-04-a-full-home',
            title: 'Complete Home Row Symphony',
            type: 'finger-drill',
            instructions: 'Run all eight home-row keys in succession.',
            targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
            targetFingers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            content: 'asdf jkl; ;lkj fdsa a;sldkfj asdf jkl; asdf'
          },
          {
            id: 'ex-04-a-words',
            title: 'Home Row Real Words & Phrases',
            type: 'sentence',
            instructions: 'Type complete words and short clauses using only the home row.',
            targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
            targetFingers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            content: 'ask a lad; a fall flask; glad dad; salad ask all; fall lass;'
          }
        ]
      },
      {
        id: 'lesson-05-gh',
        moduleId: 'module-01-home-row',
        title: 'Center Stretch Keys: G & H',
        description: 'Learn index finger horizontal reaches for G (left index) and H (right index).',
        targetKeys: ['g', 'h', 'a', 's', 'd', 'f', 'j', 'k', 'l', ';', ' '],
        exercises: [
          {
            id: 'ex-05-gh-intro',
            title: 'Reach and Return: G and H',
            type: 'introduction',
            instructions: 'Reach rightward with left index for G, then immediately snap back to F. Reach leftward with right index for H, then return to J.',
            targetKeys: ['g', 'h'],
            targetFingers: [4, 5],
            content: 'fgf jhj gf hj gg hh fgh jhg fgf jhj'
          },
          {
            id: 'ex-05-gh-drill',
            title: 'Center Navigation',
            type: 'finger-drill',
            instructions: 'Combine the center reaches with your established home-row keys.',
            targetKeys: ['g', 'h', 'f', 'j', 'd', 'k', 's', 'l'],
            targetFingers: [2, 3, 4, 5, 6, 7, 9],
            content: 'flag glad half dash flash glass hash slag shaft'
          },
          {
            id: 'ex-05-gh-sprint',
            title: 'Home Row Mastery Sprint',
            type: 'speed-sprint',
            instructions: 'Push your pace while staying 100% accurate across all home row keys.',
            targetKeys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
            targetFingers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            content: 'glad dad had a flash flag; shall all lads ask glad half;'
          }
        ]
      }
    ]
  },
  {
    id: 'module-02-index-vowels',
    title: 'The Essential Core: E & I',
    description: 'Unlock two of the most frequent vowels in human language: E (left middle) and I (right middle).',
    level: 'Beginner',
    iconName: 'Sparkles',
    lessons: [
      {
        id: 'lesson-06-ei',
        moduleId: 'module-02-index-vowels',
        title: 'Upper Middle Reaches: E & I',
        description: 'Reach up from D to E with your left middle finger; reach up from K to I with your right middle finger.',
        targetKeys: ['e', 'i'],
        exercises: [
          {
            id: 'ex-06-ei-intro',
            title: 'Reach Up for E and I',
            type: 'introduction',
            instructions: 'Left middle finger reaches up to E. Right middle finger reaches up to I. Always return to D and K.',
            targetKeys: ['e', 'i', 'd', 'k'],
            targetFingers: [3, 6],
            content: 'ded kik ed ik ee ii ded kik eiei ieie'
          },
          {
            id: 'ex-06-ei-words',
            title: 'Essential Vocabulary With E & I',
            type: 'word-flow',
            instructions: 'Combine your home row with E and I to unlock dozens of real English words.',
            targetKeys: ['e', 'i', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            targetFingers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            content: 'life like file silk safe desk fish side lead hide idea said'
          },
          {
            id: 'ex-06-ei-sentences',
            title: 'Fluent Home + Vowel Sentences',
            type: 'sentence',
            instructions: 'Focus on fluid phrasing and rhythm without stopping between words.',
            targetKeys: ['e', 'i', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            targetFingers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            content: 'she likes fresh fish; he led a safe life; dial the desk file;'
          }
        ]
      },
      {
        id: 'lesson-07-ru',
        moduleId: 'module-02-index-vowels',
        title: 'Upper Index Reaches: R & U',
        description: 'Reach up from F to R with your left index finger; reach up from J to U with your right index finger.',
        targetKeys: ['r', 'u'],
        exercises: [
          {
            id: 'ex-07-ru-intro',
            title: 'Index Upward Movement: R & U',
            type: 'introduction',
            instructions: 'Reach up from F to R; reach up from J to U. Feel the natural upward diagonal sweep.',
            targetKeys: ['r', 'u', 'f', 'j'],
            targetFingers: [4, 5],
            content: 'frf juj rf uj rr uu fru urf frf juj'
          },
          {
            id: 'ex-07-ru-words',
            title: 'Dynamic Vocabulary (R & U)',
            type: 'word-flow',
            instructions: 'Form rich words featuring R, U, E, I and the home keys.',
            targetKeys: ['r', 'u', 'e', 'i', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            targetFingers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            content: 'rule rush fire surf sure pure user dusk dark true cure'
          },
          {
            id: 'ex-07-ru-sentences',
            title: 'Sentence Mastery with R & U',
            type: 'sentence',
            instructions: 'Type natural sentences with confidence and consistent key cadence.',
            targetKeys: ['r', 'u', 'e', 'i', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            targetFingers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            content: 'the dark fire is sure; true users rush; a fair rule is pure;'
          }
        ]
      }
    ]
  },
  {
    id: 'module-03-upper-outer',
    title: 'Upper Deck Wings: T, Y, O, P, Q, W',
    description: 'Complete the entire top row by training your reach to the edges and center upper keys.',
    level: 'Intermediate',
    iconName: 'Compass',
    lessons: [
      {
        id: 'lesson-08-ty',
        moduleId: 'module-03-upper-outer',
        title: 'Top Center: T & Y',
        description: 'Reach diagonally up and inward: F to T (left index), J to Y (right index).',
        targetKeys: ['t', 'y'],
        exercises: [
          {
            id: 'ex-08-ty-intro',
            title: 'Diagonal Leaps: T and Y',
            type: 'introduction',
            instructions: 'Left index extends to T; right index extends to Y.',
            targetKeys: ['t', 'y'],
            targetFingers: [4, 5],
            content: 'ftf jyj tf yj tt yy fty jyt ftf jyj'
          },
          {
            id: 'ex-08-ty-words',
            title: 'High-Frequency English (T & Y)',
            type: 'word-flow',
            instructions: 'T is the second most common consonant in English. Build speed on "the", "that", "they".',
            targetKeys: ['t', 'y', 'h', 'e', 'a', 'r'],
            targetFingers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            content: 'the they that year yet stay duty city tray treat'
          }
        ]
      },
      {
        id: 'lesson-09-op-qw',
        moduleId: 'module-03-upper-outer',
        title: 'Top Outer Keys: O, P, Q, W',
        description: 'Engage outer fingers: W (left ring), Q (left pinky), O (right ring), P (right pinky).',
        targetKeys: ['o', 'p', 'q', 'w'],
        exercises: [
          {
            id: 'ex-09-op-qw-intro',
            title: 'Outer Periphery Drill',
            type: 'introduction',
            instructions: 'Reach up with ring and pinky fingers without letting your palm lift too high.',
            targetKeys: ['o', 'p', 'q', 'w'],
            targetFingers: [1, 2, 7, 8],
            content: 'sws aqa lol ;p; wow pop quit power quick'
          },
          {
            id: 'ex-09-op-qw-sentences',
            title: 'Complete Top Row Fluency',
            type: 'sentence',
            instructions: 'Glide across the entire top row with relaxed fingers.',
            targetKeys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            targetFingers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            content: 'power requires quiet focus; write quick poetry on paper;'
          }
        ]
      }
    ]
  },
  {
    id: 'module-04-lower-deck',
    title: 'The Lower Deck: Z, X, C, V, B, N, M',
    description: 'Master downward finger tucks into the bottom row without losing your home position.',
    level: 'Intermediate',
    iconName: 'Layers',
    lessons: [
      {
        id: 'lesson-10-cvbnm',
        moduleId: 'module-04-lower-deck',
        title: 'Center Bottom: C, V, B, N, M',
        description: 'Tuck your middle and index fingers downward: D->C, F->V, F->B, J->N, J->M.',
        targetKeys: ['c', 'v', 'b', 'n', 'm'],
        exercises: [
          {
            id: 'ex-10-cv-intro',
            title: 'Downward Movement (C, V, B, N, M)',
            type: 'introduction',
            instructions: 'Gently tuck fingers down. Avoid resting heavy wrists on the desk surface.',
            targetKeys: ['c', 'v', 'b', 'n', 'm'],
            targetFingers: [3, 4, 5, 6, 7],
            content: 'dcd fvf fbf jnj jmj cvb nmc voice cabin bench'
          },
          {
            id: 'ex-10-cv-words',
            title: 'Rich Bottom-Row Phrases',
            type: 'word-flow',
            instructions: 'Type words combining all rows seamlessly.',
            targetKeys: ['c', 'v', 'b', 'n', 'm', 'e', 'a', 'i', 'o'],
            targetFingers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            content: 'brave dynamic machine vibration combat carbon vibrant cabin'
          }
        ]
      },
      {
        id: 'lesson-11-zx-punct',
        moduleId: 'module-04-lower-deck',
        title: 'Lower Wings & Punctuation: Z, X, Comma, Period',
        description: 'Complete the alphabet: Z (left pinky), X (left ring), Comma (right middle), Period (right ring).',
        targetKeys: ['z', 'x', ',', '.'],
        exercises: [
          {
            id: 'ex-11-zx-intro',
            title: 'Outer Lower Reaches',
            type: 'introduction',
            instructions: 'Tuck left pinky down for Z and left ring for X. Use right middle for comma and ring for period.',
            targetKeys: ['z', 'x', ',', '.'],
            targetFingers: [1, 2, 6, 7],
            content: 'aza sxs k,k l.l zero exact, text, prize. maze, complex.'
          },
          {
            id: 'ex-11-zx-pangram',
            title: 'Full Alphabet Pangram Sprint',
            type: 'speed-sprint',
            instructions: 'Pangrams use every letter in the alphabet from A to Z.',
            targetKeys: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            targetFingers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            content: 'the quick brown fox jumps over a lazy dog, quiet and swift.'
          }
        ]
      }
    ]
  },
  {
    id: 'module-05-capitalization',
    title: 'Capitalization & Shift Dynamics',
    description: 'Learn dual-hand opposite Shift coordination for effortless, rapid capitalization.',
    level: 'Advanced',
    iconName: 'ArrowUpCircle',
    lessons: [
      {
        id: 'lesson-12-shift',
        moduleId: 'module-05-capitalization',
        title: 'Opposite Hand Shift Mechanics',
        description: 'When typing a capital letter on your left hand, hold the RIGHT Shift. For right-hand keys, hold LEFT Shift.',
        targetKeys: ['Shift', 'A', 'B', 'C', 'D', 'E'],
        exercises: [
          {
            id: 'ex-12-shift-intro',
            title: 'Opposite Shift Principle',
            type: 'introduction',
            instructions: 'Never reach for Shift with the same hand that types the letter. Always use the opposite pinky!',
            targetKeys: ['A', 'J', 'S', 'K'],
            targetFingers: [1, 5, 2, 6, 8],
            content: 'Alice Jack Sam Kate Adam John Sarah Kevin'
          },
          {
            id: 'ex-12-shift-proper-nouns',
            title: 'Proper Nouns & Sentence Openers',
            type: 'sentence',
            instructions: 'Practice capitalized sentences with punctuation and fluid transitions.',
            targetKeys: ['Shift'],
            targetFingers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            content: 'London, Tokyo, New York, and Paris are vibrant world capitals.'
          }
        ]
      }
    ]
  },
  {
    id: 'module-06-developer-drills',
    title: 'Developer & Technical Drills',
    description: 'Designed specifically for programmers, engineers, and power users typing code syntax.',
    level: 'Mastery',
    iconName: 'Code',
    lessons: [
      {
        id: 'lesson-13-code-syntax',
        moduleId: 'module-06-developer-drills',
        title: 'Brackets, Operators & Syntax Flow',
        description: 'Train fast access to {}, [], (), =>, !=, ==, &&, ||, and camelCase naming.',
        targetKeys: ['{', '}', '[', ']', '(', ')', '=', '>', '<', '&', '|', '_'],
        exercises: [
          {
            id: 'ex-13-brackets',
            title: 'Delimiters & Parentheses',
            type: 'finger-drill',
            instructions: 'Type brackets and quotes without losing thumb position over the spacebar.',
            targetKeys: ['{', '}', '(', ')', '[', ']'],
            targetFingers: [7, 8, 9],
            content: '() {} [] () => { return [1, 2, 3]; }'
          },
          {
            id: 'ex-13-code-patterns',
            title: 'Modern TypeScript / Rust Snippets',
            type: 'sentence',
            instructions: 'Type authentic modern code constructs with clean accuracy.',
            targetKeys: ['a', 'b', 'c', '{', '}', ';', '='],
            targetFingers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            content: 'const calculateSpeed = (distance: number, time: number) => distance / time;'
          }
        ]
      }
    ]
  }
];
