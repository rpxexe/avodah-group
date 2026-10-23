const fs = require('fs');
const filePath = 'node_modules/feral-blob/dist/feral-blob.js';
let code = fs.readFileSync(filePath, 'utf8');

// Replace the 5 problematic multi-keyframe spring transitions with smooth duration/ease
code = code.replace(
  'y: [0, -22, -6, -10],\n    scaleX: [1, 1, 1.05, 1],\n    scaleY: [1, 1.06, 0.96, 1],\n    transition: { type: "spring", stiffness: 220, damping: 9, mass: 0.7 }',
  'y: [0, -22, -6, -10],\n    scaleX: [1, 1, 1.05, 1],\n    scaleY: [1, 1.06, 0.96, 1],\n    transition: { duration: 0.65, ease: "easeOut" }'
);

code = code.replace(
  'y: [0, -22, -6, -10],\n    scale: 1,\n    transition: { delay: 0.05, type: "spring", stiffness: 220, damping: 9, mass: 0.7 }',
  'y: [0, -22, -6, -10],\n    scale: 1,\n    transition: { delay: 0.05, duration: 0.65, ease: "easeOut" }'
);

code = code.replace(
  'y: [0, -19, -5, -9],\n    rotate: -8,\n    transition: { delay: 0.1, type: "spring", stiffness: 210, damping: 11, mass: 0.8 }',
  'y: [0, -19, -5, -9],\n    rotate: -8,\n    transition: { delay: 0.1, duration: 0.65, ease: "easeOut" }'
);

code = code.replace(
  'y: [0, -19, -5, -9],\n    rotate: 8,\n    transition: { delay: 0.12, type: "spring", stiffness: 210, damping: 11, mass: 0.8 }',
  'y: [0, -19, -5, -9],\n    rotate: 8,\n    transition: { delay: 0.12, duration: 0.65, ease: "easeOut" }'
);

code = code.replace(
  'happy: { y: [0, -16, -5, -9], rotate: [0, -1.5, 0], ty: { delay: 0.1, type: "spring", stiffness: 200, damping: 11, mass: 0.8 }, tr: { delay: 0.1, type: "spring", stiffness: 180, damping: 14 } }',
  'happy: { y: [0, -16, -5, -9], rotate: [0, -1.5, 0], ty: { delay: 0.1, duration: 0.65, ease: "easeOut" }, tr: { delay: 0.1, duration: 0.65, ease: "easeOut" } }'
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully patched feral-blob.js!');
