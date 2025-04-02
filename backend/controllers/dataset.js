const { ethers } = require('ethers');
const fs = require('fs'); // Full fs module for sync operations
const fsPromises = require('fs').promises; // Promises API for async operations
const path = require('path');
const Dataset = require('../models/Dataset');
const { createBucket, uploadToAkave, downloadFromAkave } = require('../utils/akave');
const { encryptFile, decryptFile } = require('../utils/encryption');
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.FVM_RPC_URL);
const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
const contractABI = JSON.parse(fs.readFileSync('smart-contract/DataMarketplace.abi', 'utf8'));
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

const uploadDataset = async (req, res) => {
  const { name, description, price } = req.body;
  const file = req.file.buffer;
  const owner = req.headers['x-wallet-address'];

  const bucketName = `bucket-${Date.now()}`;
  const fileName = `${name.replace(/\s+/g, '-')}.zip`;
  const tempDir = path.resolve('./temp');
  const filePath = path.join(tempDir, fileName);

  try {
    // Create temp directory if it doesn’t exist
    await fsPromises.mkdir(tempDir, { recursive: true });

    await createBucket(bucketName);

    const { encrypted, key, iv } = encryptFile(file);
    await fsPromises.writeFile(filePath, encrypted);
    const uploadResult = await uploadToAkave(bucketName, filePath, encrypted);
    console.log('Upload result:', uploadResult);
    await fsPromises.unlink(filePath).catch(err => console.warn('Cleanup failed:', err.message));

    const dataset = new Dataset({
      name,
      description,
      price: parseFloat(price),
      bucketName,
      fileName,
      owner,
      encryptionKey: key,
      iv,
    });
    await dataset.save();

    res.json({ tempId: dataset._id, bucketName, fileName });
  } catch (error) {
    console.error('Error in uploadDataset:', error);
    res.status(500).json({ message: 'Failed to upload dataset', error: error.message });
  }
};

const getDatasets = async (req, res) => {
  const { owner } = req.query;
  let query = {};
  if (owner) query.owner = owner;
  const datasets = await Dataset.find(query).select('-encryptionKey -iv');
  res.json(datasets);
};

const buyDataset = async (req, res) => {
  const { datasetId } = req.body;
  const buyer = req.headers['x-wallet-address'];
  try {
    const dataset = await Dataset.findById(datasetId);
    if (!dataset) return res.status(404).json({ message: 'Dataset not found' });
    if (!dataset.contractId) return res.status(400).json({ message: 'Dataset not listed on contract' });

    const encryptedBuffer = await downloadFromAkave(dataset.bucketName, dataset.fileName);
    res.json({
      encryptedData: encryptedBuffer.toString('base64'),
      encryptionKey: dataset.encryptionKey,
      iv: dataset.iv,
    });
  } catch (error) {
    console.error('Error in buyDataset:', error.stack);
    res.status(500).json({ message: 'Failed to retrieve dataset', error: error.message });
  }
};

const updateDatasetContractId = async (req, res) => {
  const { tempId, contractId } = req.body;
  try {
    const dataset = await Dataset.findByIdAndUpdate(tempId, { contractId }, { new: true });
    if (!dataset) return res.status(404).json({ message: 'Dataset not found' });
    res.json({ message: 'Dataset updated with contract ID' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update dataset' });
  }
};

const getPurchasedDatasets = async (req, res) => {
  const { ids } = req.query;
  if (!ids) return res.status(400).json({ message: 'No IDs provided' });
  const contractIds = ids.split(',');
  try {
    const datasets = await Dataset.find({ contractId: { $in: contractIds } });
    res.json(datasets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch purchased datasets' });
  }
};

module.exports = { uploadDataset, getDatasets, buyDataset, updateDatasetContractId, getPurchasedDatasets };