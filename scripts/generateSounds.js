const fs = require('fs');
const path = require('path');

const soundsDir = path.join(__dirname, '../assets/sounds');

if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

function generateClick(frequency, durationMs, decayRate) {
  const sampleRate = 44100;
  const samples = Math.ceil((durationMs / 1000) * sampleRate);
  const buffer = Buffer.alloc(samples * 2);

  for (let i = 0; i < samples; i++) {
    const t = i / sampleRate;
    const envelope = Math.exp(-decayRate * t);
    const sample = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3;
    const int16 = Math.max(-32768, Math.min(32767, Math.round(sample * 32767)));
    buffer.writeInt16LE(int16, i * 2);
  }

  return buffer;
}

function writeWav(filename, pcmData) {
  const sampleRate = 44100;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcmData.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcmData.length, 40);

  const wav = Buffer.concat([header, pcmData]);
  fs.writeFileSync(filename, wav);
  console.log(`Generated ${filename} (${wav.length} bytes)`);
}

const accentClick = generateClick(1000, 40, 80);
const normalClick = generateClick(660, 35, 90);

writeWav(path.join(soundsDir, 'click-accent.wav'), accentClick);
writeWav(path.join(soundsDir, 'click-normal.wav'), normalClick);

console.log('Sound generation complete!');
