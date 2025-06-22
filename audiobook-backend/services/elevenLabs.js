const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = async function (text, voiceId = "1qEiC6qsybMkmnNdVMbK") {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  if (!ELEVENLABS_API_KEY) throw new Error('ElevenLabs API key missing');
  if (!voiceId) throw new Error('Voice ID is required');

  // Ensure the uploads directory exists
  const uploadsDir = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const timestamp = Date.now();
  const fileName = `audio_${timestamp}.mp3`;
  const fullPath = path.join(uploadsDir, fileName);
  const relativePath = path.join('/uploads', fileName).replace(/\\/g, '/');
  
  console.log(`Will save audio to: ${fullPath}`);

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      { text },
      {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json'
        },
        responseType: 'stream'
      }
    );

    console.log('Audio generated successfully with ElevenLabs');

    // Create a write stream to save the audio file
    const writer = fs.createWriteStream(fullPath);
    
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      
      writer.on('finish', () => {
        console.log(`Audio saved successfully to: ${fullPath}`);
        resolve(relativePath);
      });

      writer.on('error', (error) => {
        console.error('Error writing audio file:', error);
        reject(error);
      });
    });

  } catch (error) {
    console.error('Error generating audio with ElevenLabs:', error.message);
    throw new Error('ElevenLabs TTS failed');
  }
}
