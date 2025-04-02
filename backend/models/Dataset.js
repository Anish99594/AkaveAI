const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  bucketName: String,
  fileName: String,
  owner: String, // Wallet address
  encryptionKey: String,
  iv: String,
  contractId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Dataset', datasetSchema);