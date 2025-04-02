import { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';
import './DatasetList.css';

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

function DatasetList() {
  const [datasets, setDatasets] = useState([]);
  const [purchasingId, setPurchasingId] = useState(null);
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const res = await fetch('https://akaveai.onrender.com/api/datasets');
        const data = await res.json();
        setDatasets(data);
      } catch (error) {
        console.error('Failed to fetch datasets:', error);
      }
    };
    fetchDatasets();
  }, []);

  const handlePurchase = async (mongoId, contractId, name, price) => {
    if (!isConnected || !walletClient) {
      toast.error('Please connect your wallet first');
      return;
    }
    setPurchasingId(mongoId);
  
    try {
      const provider = new ethers.providers.Web3Provider(walletClient);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
      // Log wallet balance and dataset details
      const balance = await provider.getBalance(address);
      console.log('Wallet balance:', ethers.utils.formatEther(balance), 'tFIL');
      console.log('Purchasing dataset:', { mongoId, contractId, name, price });
  
      // Check datasetCount
      const count = await contract.datasetCount();
      console.log('Current datasetCount:', count.toString());
  
      // Check dataset exists
      const dataset = await contract.getDataset(contractId);
      console.log('Dataset from contract:', {
        bucketName: dataset[0],
        fileName: dataset[1],
        price: ethers.utils.formatEther(dataset[2]),
        owner: dataset[3],
      });
  
      // Verify price matches
      const contractPrice = ethers.utils.formatEther(dataset[2]);
      if (parseFloat(contractPrice) !== parseFloat(price)) {
        throw new Error(`Price mismatch: UI says ${price} tFIL, contract says ${contractPrice} tFIL`);
      }
  
      // Purchase on blockchain
      const priceWei = ethers.utils.parseEther(price.toString());
      console.log('Sending transaction with value:', ethers.utils.formatEther(priceWei), 'tFIL');
  
      try {
        const gasEstimate = await contract.estimateGas.buyDataset(contractId, { value: priceWei });
        console.log('Gas estimate:', gasEstimate.toString());
      } catch (gasError) {
        console.error('Gas estimation failed:', gasError);
        throw gasError;
      }
  
      const tx = await contract.buyDataset(contractId, { value: priceWei });
      console.log('Transaction submitted:', tx.hash);
      await tx.wait();
      console.log('Purchase transaction completed:', tx.hash);
  
      // Fetch encrypted data
      const res = await fetch('https://akaveai.onrender.com/api/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-wallet-address': address,
        },
        body: JSON.stringify({ datasetId: mongoId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to retrieve dataset');
  
      // Decrypt and download
      const encryptedBytes = CryptoJS.enc.Base64.parse(data.encryptedData);
      const key = CryptoJS.enc.Hex.parse(data.encryptionKey);
      const iv = CryptoJS.enc.Hex.parse(data.iv);
      const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedBytes }, key, { iv });
      const decryptedBytes = CryptoJS.enc.Base64.stringify(decrypted);
  
      const byteCharacters = atob(decryptedBytes);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteNumbers], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
      toast.success(`Purchased and downloaded "${name}"!`);
    } catch (error) {
      console.error('Purchase error:', error);
      if (error.data) {
        try {
          const revertReason = ethers.utils.toUtf8String(error.data.data || '0x');
          console.error('Revert reason:', revertReason);
        } catch (e) {
          console.error('No readable revert reason, raw data:', error.data.data);
        }
      } else if (error.reason) {
        console.error('Revert reason:', error.reason);
      }
      toast.error(error.message || 'Purchase failed');
    } finally {
      setPurchasingId(null);
    }
  };

  return (
    <div className="dataset-list">
      <h2 className="section-title">Available Datasets</h2>
      <div className="dataset-grid">
        {datasets.map((dataset) => (
          <div key={dataset._id} className="dataset-card">
            <h3 className="dataset-name">{dataset.name}</h3>
            <div className="dataset-seller">by {dataset.owner.slice(0, 6)}...</div>
            <p className="dataset-description">{dataset.description}</p>
            <div className="dataset-footer">
              <div className="dataset-price">{dataset.price} tFIL</div>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  handlePurchase(dataset._id, dataset.contractId, dataset.name, dataset.price)
                }
                disabled={purchasingId === dataset._id || !isConnected || !dataset.contractId}
              >
                {purchasingId === dataset._id ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DatasetList;