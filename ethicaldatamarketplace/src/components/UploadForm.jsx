import { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import './UploadForm.css';

const CONTRACT_ADDRESS = '0xe66f3fc56808251Ca578dD839bd809Ed45C51fc7';
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "buyDataset",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	// ABI shortened for brevity
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_bucketName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fileName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "listDataset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	// Other contract functions
];

function UploadForm() {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', file: null });
  const [isUploading, setIsUploading] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    if (!walletClient) {
      toast.error('Wallet client not available');
      return;
    }
    setIsUploading(true);
  
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('file', formData.file);
  
    try {
      const uploadRes = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        headers: { 'x-wallet-address': address },
        body: form,
      });
      
      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        throw new Error(errorData.message || 'Upload failed');
      }
      
      const uploadData = await uploadRes.json();
      const { tempId, bucketName, fileName } = uploadData;

      // List dataset on the smart contract
      const provider = new ethers.providers.Web3Provider(walletClient);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const priceWei = ethers.utils.parseEther(formData.price.toString());
      
      const tx = await contract.listDataset(bucketName, fileName, priceWei);
      const receipt = await tx.wait();

      // Extract dataset ID from event
      const event = receipt.events.find((e) => e.event === 'DatasetListed');
      const datasetId = event.args.id.toNumber();

      // Update backend with contract dataset ID
      const updateRes = await fetch('http://localhost:3001/api/updateDatasetContractId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempId, contractId: datasetId }),
      });
      
      if (!updateRes.ok) throw new Error('Failed to update dataset ID');

      toast.success('Dataset listed successfully!');
      setFormData({ name: '', description: '', price: '', file: null });
      document.getElementById('file-upload').value = '';
    } catch (error) {
      toast.error(error.message || 'Upload failed');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-form">
      <h2 className="section-title">Upload Your AIAgent</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">AIAgent Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter a descriptive name for your AIAgent"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe what's in your AIAgent, its source, and potential uses"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (tFIL)</label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="Set your price in tFIL"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="file-upload">Dataset File (ZIP only)</label>
          <input
            type="file"
            id="file-upload"
            accept=".zip"
            onChange={handleFileChange}
            required
          />
          <small>Please upload your AIAgent as a compressed .zip file (Max size: 50MB)</small>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isUploading}>
          {isUploading ? 'Processing...' : 'Upload AIAgent'}
        </button>
      </form>
    </div>
  );
}

export default UploadForm;