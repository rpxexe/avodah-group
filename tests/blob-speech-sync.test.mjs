import { describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Feral Blob Expression & Cloud Text Synchronization", () => {
  test("FeralBlobShowcase synchronizes speech cloud messages and blob moods via MOOD_SEQUENCE", () => {
    const filePath = path.resolve("src/components/feral/FeralBlobShowcase.tsx");
    assert.equal(fs.existsSync(filePath), true);
    const content = fs.readFileSync(filePath, "utf-8");

    // Sequence and speeches definitions
    assert.match(content, /MOOD_SEQUENCE/);
    assert.match(content, /PROPTECH_SPEECHES/);
    assert.match(content, /FINTECH_SPEECHES/);

    // Synchronous state driving both BlobSpeech and JellyBlobMascot
    assert.match(content, /<BlobSpeech[^>]*mood=\{mood\}/);
    assert.match(content, /<JellyBlobMascot[^>]*mood=\{mood\}/);

    // Interactive cloud click advances mood
    assert.match(content, /handleCloudClick/);
    assert.match(content, /advanceMood/);

    // Narrative mood indicator dots
    assert.match(content, /MOOD_SEQUENCE\.map/);
  });

  test("LaunchingSoonClient drives blob expression and gaze from input focus, typing, and submission", () => {
    const clientPath = path.resolve("src/components/launching-soon/LaunchingSoonClient.tsx");
    assert.equal(fs.existsSync(clientPath), true);
    const content = fs.readFileSync(clientPath, "utf-8");

    // Blob reaction states
    assert.match(content, /blobMood/);
    assert.match(content, /blobGaze/);
    assert.match(content, /blobCelebrate/);

    // Form input triggers
    assert.match(content, /onFocus/);
    assert.match(content, /onBlur/);
    assert.match(content, /onChange/);
    assert.match(content, /handleSubmit/);

    // External props passed to FeralBlobShowcase
    assert.match(content, /externalMood=\{blobMood\}/);
    assert.match(content, /gazeTarget=\{blobGaze\}/);
    assert.match(content, /celebrate=\{blobCelebrate\}/);
    assert.match(content, /customSpeeches=/);
  });

  test("Globals CSS allows ample width for full cloud speech texts without clipping", () => {
    const cssPath = path.resolve("src/app/globals.css");
    const content = fs.readFileSync(cssPath, "utf-8");

    assert.match(content, /\.blob-bubble-text/);
    assert.match(content, /max-width:\s*3[0-9]{2}px/);
  });
});
