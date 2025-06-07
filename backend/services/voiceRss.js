const axios = require('axios');

const VOICERSS_API_KEY = process.env.VOICERSS_API_KEY;

async function generateAudioVoiceRss(text) {
  if (!VOICERSS_API_KEY) throw new Error('VoiceRSS API key missing');

  const url = `https://api.voicerss.org/?key=${VOICERSS_API_KEY}&hl=en-us&src=${encodeURIComponent(text)}`;

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    // VoiceRSS returns audio if success, or XML if error
    if (response.headers['content-type'] !== 'audio/mpeg') {
      throw new Error('VoiceRSS returned non-audio content');
    }
    return Buffer.from(response.data);
  } catch (error) {
    throw new Error('VoiceRSS TTS failed');
  }
}

module.exports = { generateAudioVoiceRss };
