// backend/services/backblaze.js (updated for S3-compatible private bucket)
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require("fs").promises;
const path = require("path");

const s3 = new S3Client({
  endpoint: "https://s3.us-east-005.backblazeb2.com",
  region: "us-east-005",
  credentials: {
    accessKeyId: process.env.B2_APPLICATION_KEY_ID,
    secretAccessKey: process.env.B2_APPLICATION_KEY,
  },
});

const uploadAudio = async (buffer, fileName) => {
  const command = new PutObjectCommand({
    Bucket: process.env.B2_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: "audio/mpeg", // or dynamic type
  });

  await s3.send(command);
  return fileName;
};

const uploadImage = async (filePath, fileName) => {
  const fileBuffer = await fs.readFile(filePath);
  const mimeType = "image/png"; // You may want to dynamically detect this

  const command = new PutObjectCommand({
    Bucket: process.env.B2_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType,
  });

  await s3.send(command);
  return fileName;
};

const generateSignedUrl = async (fileName) => {
  const command = new GetObjectCommand({
    Bucket: process.env.B2_BUCKET_NAME,
    Key: fileName,
  });

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 3600,
  });

  return signedUrl;
};

module.exports = { uploadAudio, uploadImage, generateSignedUrl };
