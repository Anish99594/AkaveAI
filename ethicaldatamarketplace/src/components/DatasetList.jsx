import { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';
import './DatasetList.css';

const CONTRACT_ADDRESS = '0xe66f3fc56808251Ca578dD839bd809Ed45C51fc7';
const CONTRACT_ABI = [
  // ABI shortened for brevity
  {
    "inputs": [{"internalType": "uint256", "name": "_id", "type": "uint256"}],
    "name": "buyDataset",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  // Other contract functions
];

function DatasetList() {
  const [datasets, setDatasets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState(null);
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:3001/api/datasets');
        const data = await res.json();
        setDatasets(data);
      } catch (error) {
        console.error('Failed to fetch datasets:', error);
        toast.error('Failed to load datasets');
      } finally {
        setIsLoading(false);
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
  
      // Get dataset from contract
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
      const tx = await contract.buyDataset(contractId, { value: priceWei });
      toast.success('Transaction submitted! Processing purchase...');
      
      await tx.wait();
  
      // Fetch encrypted data
      const res = await fetch('http://localhost:3001/api/buy', {
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
      toast.error(error.message || 'Purchase failed');
    } finally {
      setPurchasingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="dataset-list">
        <h2 className="section-title">Available Datasets</h2>
        <div className="loading-message">Loading available datasets...</div>
      </div>
    );
  }

  return (
    <div className="dataset-list">
      <h2 className="section-title">Available Datasets</h2>
      
      {datasets.length === 0 ? (
        <div className="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <h3>No datasets available yet</h3>
          <p>Be the first to upload a dataset to the marketplace!</p>
        </div>
      ) : (
        <div className="dataset-grid">
          {datasets.map((dataset) => (
            <div key={dataset._id} className="dataset-card">
              <h3 className="dataset-name">{dataset.name}</h3>
              <div className="dataset-seller">by {dataset.owner.slice(0, 6)}...{dataset.owner.slice(-4)}</div>
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
      )}
    </div>
  );
}

export default DatasetList;