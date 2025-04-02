import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useReadContract } from 'wagmi';
import { ethers } from 'ethers';
import './Dashboard.css';

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

function Dashboard() {
  const [activeTab, setActiveTab] = useState('creator');
  const [uploads, setUploads] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const { address, isConnected } = useAccount();

  const { data: purchaseIds } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getPurchases',
    args: [address],
    enabled: !!address,
  });

  const { data: totalSales } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getTotalSales',
    args: [address], // Add address argument
    enabled: !!address,
  });

  const { data: totalEarnings } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getTotalEarnings',
    args: [address],
    enabled: !!address,
  });

  console.log('purchaseIds:', purchaseIds);
  console.log('totalSales:', totalSales);
  console.log('totalEarnings:', totalEarnings);

  useEffect(() => {
    if (isConnected && address) {
      fetch(`http://localhost:3001/api/datasets?owner=${address}`)
        .then((res) => res.json())
        .then((data) => setUploads(data))
        .catch((error) => console.error('Failed to fetch uploads:', error));

      if (purchaseIds && purchaseIds.length > 0) {
        fetch(`http://localhost:3001/api/datasets/purchased?ids=${purchaseIds.join(',')}`)
          .then((res) => res.json())
          .then((data) => setPurchases(data))
          .catch((error) => console.error('Failed to fetch purchases:', error));
      } else {
        setPurchases([]);
      }
    }
  }, [address, isConnected, purchaseIds]);

  const formattedEarnings = totalEarnings
    ? ethers.utils.formatEther(totalEarnings.toString())
    : '0';

  return (
    <div className="dashboard">
      <h2 className="section-title">Your Dashboard</h2>
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'creator' ? 'active' : ''}`}
          onClick={() => setActiveTab('creator')}
        >
          Creator View
        </button>
        <button
          className={`tab-btn ${activeTab === 'buyer' ? 'active' : ''}`}
          onClick={() => setActiveTab('buyer')}
        >
          Buyer View
        </button>
      </div>
      {activeTab === 'creator' ? (
        <div className="creator-view">
          <div className="dashboard-summary">
            <div className="summary-card">
              <h3>Total AIAgents</h3>
              <div className="summary-value">{uploads.length}</div>
            </div>
            <div className="summary-card">
              <h3>Total Sales</h3>
              <div className="summary-value">{totalSales ? totalSales.toString() : '0'}</div>
            </div>
            <div className="summary-card">
              <h3>Total Earnings</h3>
              <div className="summary-value">{formattedEarnings} tFIL</div>
            </div>
          </div>
          <h3 className="dashboard-subtitle">Your Uploads</h3>
          <div className="uploads-list">
            {uploads.map((dataset) => (
              <div key={dataset._id} className="dashboard-card">
                <h4>{dataset.name}</h4>
                <p>{dataset.description}</p>
                <p>Price: {dataset.price} tFIL</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="buyer-view">
          <h3 className="dashboard-subtitle">Your Purchases</h3>
          <div className="purchases-list">
            {purchases.map((purchase) => (
              <div key={purchase._id} className="dashboard-card">
                <h4>{purchase.name}</h4>
                <p>{purchase.description}</p>
                <p>Purchased on: {new Date(purchase.createdAt).toLocaleDateString()}</p>
                <p>Price: {purchase.price} tFIL</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;