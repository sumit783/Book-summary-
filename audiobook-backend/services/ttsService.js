const elevenLabs = require('./elevenLabs');
const voiceRss = require('./voiceRss');
const googleTTS = require('./googleTTS');

async function generateAudio(text, title) {
  try {
    console.log('Trying ElevenLabs TTS...');
    return await elevenLabs(text);
    
  } catch {
    console.warn('ElevenLabs failed, trying VoiceRSS...');
    try {
        // Attempt to use VoiceRSS TTS
        console.log('Trying VoiceRSS TTS...');
      return await voiceRss(text, title);

    } catch {
      console.warn('VoiceRSS failed, trying Google Translate TTS...');
      return await googleTTS(text, title);
    }
  }
}

module.exports = generateAudio;
