const axios = require('axios');
const fs = require('fs');

module.exports = async function (text, title) {
  const url = `http://api.voicerss.org/?key=${process.env.VOICERSS_API_KEY}&hl=en-us&src=${encodeURIComponent(text)}`;
  const response = await axios.get(url, { responseType: 'arraybuffer' });

  const filePath = `uploads/audio_voicerss_${Date.now()}.mp3`;
  fs.writeFileSync(filePath, response.data);
  return filePath;
};
