import { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi'; // Replace useSigner with useWalletClient
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
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "bucketName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "fileName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "DatasetListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "DatasetPurchased",
		"type": "event"
	},
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
	{
		"inputs": [],
		"name": "datasetCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "datasets",
		"outputs": [
			{
				"internalType": "string",
				"name": "bucketName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fileName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getDataset",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_buyer",
				"type": "address"
			}
		],
		"name": "getPurchases",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getTotalEarnings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getTotalSales",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "purchases",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalEarnings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalSales",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

function UploadForm() {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', file: null });
  const [isUploading, setIsUploading] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient(); // Use useWalletClient instead of useSigner

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
	  const uploadRes = await fetch('https://akaveai.onrender.com/api/upload', {
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

      // 2. List dataset on the smart contract
      const provider = new ethers.providers.Web3Provider(walletClient);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const priceWei = ethers.utils.parseEther(formData.price.toString());
      const tx = await contract.listDataset(bucketName, fileName, priceWei);
      const receipt = await tx.wait();

      // Extract dataset ID from the DatasetListed event
      const event = receipt.events.find((e) => e.event === 'DatasetListed');
      const datasetId = event.args.id.toNumber();

      // 3. Update backend with contract dataset ID
      const updateRes = await fetch('https://akaveai.onrender.com/api/updateDatasetContractId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempId, contractId: datasetId }),
      });
      if (!updateRes.ok) throw new Error('Failed to update dataset ID');

      toast.success('AIAgent listed successfully!');
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
          <label htmlFor="name">AIAgent name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="file-upload">AIAgent File (ZIP only)</label>
          <input
            type="file"
            id="file-upload"
            accept=".zip"
            onChange={handleFileChange}
            required
          />
          <small>Please upload your AIAgent as a compressed .zip file</small>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload Dataset'}
        </button>
      </form>
    </div>
  );
}

export default UploadForm;