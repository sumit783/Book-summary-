const axios = require('axios');

async function generateAudioGoogleTranslate(text) {
  try {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=tw-ob`;
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
  } catch (error) {
    throw new Error('Google Translate TTS failed');
  }
}

module.exports = { generateAudioGoogleTranslate };
