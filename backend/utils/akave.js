const { exec } = require('child_process');
const fs = require('fs').promises;
const util = require('util');
const execPromise = util.promisify(exec);
const path = require('path');
const { setTimeout } = require('timers/promises');
require('dotenv').config();

const uploadToAkave = async (bucketName, filePath, encryptedBuffer) => {
  try {
    await fs.writeFile(filePath, encryptedBuffer);
    console.log('File written to:', filePath);

    const cmd = `./bin/akavecli ipc file upload ${bucketName} ${filePath} --node-address=${process.env.AKAVE_NODE_ADDRESS} --private-key "${process.env.AKAVE_PRIVATE_KEY}"`;
    console.log('Executing command:', cmd);

    const { stdout, stderr } = await execPromise(cmd);
    console.log('Upload stdout:', stdout);
    console.log('Upload stderr:', stderr || 'No stderr');
    if (stderr && !stderr.includes('File uploaded successfully')) {
      throw new Error(`Akave upload failed: ${stderr}`);
    }
    return stdout.trim() || stderr;
  } catch (error) {
    console.error('UploadToAkave error:', error.stack);
    throw error;
  }
};

const downloadFromAkave = async (bucketName, fileName) => {
  console.log('Running downloadFromAkave', { bucketName, fileName });
  if (!bucketName || !fileName) {
    throw new Error(`Invalid input: bucketName=${bucketName}, fileName=${fileName}`);
  }
  const tempDir = path.resolve('./temp');
  const downloadedPath = path.join(tempDir, fileName);

  // Ensure temp directory exists
  await fs.mkdir(tempDir, { recursive: true });

  const cmd = `./bin/akavecli ipc file download ${bucketName} ${fileName} ${tempDir} --node-address=${process.env.AKAVE_NODE_ADDRESS} --private-key "${process.env.AKAVE_PRIVATE_KEY}"`;
  console.log('Executing command:', cmd);

  const { stdout, stderr } = await execPromise(cmd);
  console.log('Download stdout:', stdout);
  console.log('Download stderr:', stderr || 'No stderr');
  if (stderr && !stderr.includes('File downloaded successfully')) {
    throw new Error(`Akave download failed: ${stderr}`);
  }
  await setTimeout(2000); // Keep delay to ensure file is written
  const buffer = await fs.readFile(downloadedPath);
  console.log('File read, size:', buffer.length);
  await fs.unlink(downloadedPath).catch(err => console.warn('Delete failed:', err.message));
  return buffer;
};

const createBucket = async (bucketName) => {
  const cmd = `./bin/akavecli ipc bucket create ${bucketName} --node-address=${process.env.AKAVE_NODE_ADDRESS} --private-key "${process.env.AKAVE_PRIVATE_KEY}"`;
  console.log('Executing create bucket command:', cmd);
  const { stdout, stderr } = await execPromise(cmd);
  console.log('Bucket create stdout:', stdout);
  console.log('Bucket create stderr:', stderr);
  if (stderr && !stderr.includes('Bucket created:')) {
    throw new Error(`Bucket creation failed: ${stderr}`);
  }
  return bucketName;
};

module.exports = { uploadToAkave, downloadFromAkave, createBucket };