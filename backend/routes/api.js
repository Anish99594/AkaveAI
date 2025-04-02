const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadDataset, getDatasets, buyDataset, updateDatasetContractId, getPurchasedDatasets } = require('../controllers/dataset');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), uploadDataset);
router.get('/datasets', getDatasets);
router.post('/buy', buyDataset);
router.post('/updateDatasetContractId', updateDatasetContractId);
router.get('/datasets/purchased', getPurchasedDatasets);

module.exports = router;