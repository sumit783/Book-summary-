const googleTTS = require('google-tts-api');
const axios = require('axios');
const fs = require('fs');

module.exports = async function (text, title) {
  const url = googleTTS.getAudioUrl(text, { lang: 'en', slow: false });
  const response = await axios.get(url, { responseType: 'arraybuffer' });

  const filePath = `uploads/audio_google_${Date.now()}.mp3`;
  fs.writeFileSync(filePath, response.data);
  return filePath;
};
