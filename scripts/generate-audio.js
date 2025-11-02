const fs = require('fs');
const path = require('path');
const lame = require('lamejs');

const SAMPLE_RATE = 44100;
const DURATION_SECONDS = 1.2;
const FREQUENCIES = [523.25, 659.25, 783.99];
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'audio');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function generateWave(frequency, length) {
  const samples = new Int16Array(length);
  for (let i = 0; i < length; i++) {
    const amplitude = Math.sin((2 * Math.PI * frequency * i) / SAMPLE_RATE);
    samples[i] = amplitude * 32767 * Math.exp(-3 * i / length);
  }
  return samples;
}

function buildMelody() {
  const totalSamples = Math.floor(SAMPLE_RATE * DURATION_SECONDS);
  const buffer = new Int16Array(totalSamples);
  const segment = Math.floor(totalSamples / FREQUENCIES.length);

  FREQUENCIES.forEach((freq, index) => {
    const wave = generateWave(freq, segment);
    for (let i = 0; i < segment; i++) {
      const pos = index * segment + i;
      if (pos < buffer.length) {
        buffer[pos] = wave[i];
      }
    }
  });

  return buffer;
}

function encodeMp3(samples, fileName) {
  const mp3Encoder = new lame.Mp3Encoder(1, SAMPLE_RATE, 128);
  const sampleBlockSize = 1152;
  const mp3Data = [];

  for (let i = 0; i < samples.length; i += sampleBlockSize) {
    const sampleChunk = samples.subarray(i, i + sampleBlockSize);
    const mp3buf = mp3Encoder.encodeBuffer(sampleChunk);
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }
  }

  const end = mp3Encoder.flush();
  if (end.length > 0) {
    mp3Data.push(end);
  }

  const buffer = Buffer.concat(mp3Data.map((arr) => Buffer.from(arr)));
  fs.writeFileSync(path.join(OUTPUT_DIR, fileName), buffer);
}

const melody = buildMelody();
encodeMp3(melody, 'encouragement.mp3');
encodeMp3(generateWave(880, Math.floor(SAMPLE_RATE * 0.3)), 'success.mp3');
encodeMp3(generateWave(220, Math.floor(SAMPLE_RATE * 0.3)), 'error.mp3');
console.log('Audio mp3 généré dans', OUTPUT_DIR);
