const axios = require('axios');

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

async function generateAudioElevenLabs(text, voiceId = "1qEiC6qsybMkmnNdVMbK") {
  if (!ELEVENLABS_API_KEY) throw new Error('ElevenLabs API key missing');
  if (!voiceId) throw new Error('Voice ID is required');

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      { text },
      {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    );

    return Buffer.from(response.data);
  } catch (error) {
    throw new Error('ElevenLabs TTS failed');
  }
}

module.exports = { generateAudioElevenLabs };
