// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataMarketplace {
    struct Dataset {
        string bucketName;
        string fileName;
        uint256 price; 
        address owner;
        bool exists;
    }

    mapping(uint256 => Dataset) public datasets;
    mapping(address => uint256[]) public purchases; 
    uint256 public datasetCount;
    mapping(address => uint256) public totalSales; 
    mapping(address => uint256) public totalEarnings; 

    event DatasetListed(uint256 id, string bucketName, string fileName, uint256 price, address owner);
    event DatasetPurchased(uint256 id, address buyer);

    modifier onlyOwner(uint256 _id) {
        require(datasets[_id].owner == msg.sender, "Not the owner");
        _;
    }

    function listDataset(string memory _bucketName, string memory _fileName, uint256 _price) public {
        require(bytes(_bucketName).length > 0, "Bucket name cannot be empty");
        require(bytes(_fileName).length > 0, "File name cannot be empty");
        require(_price > 0, "Price must be greater than zero");
        datasetCount++;
        datasets[datasetCount] = Dataset(_bucketName, _fileName, _price, msg.sender, true);
        emit DatasetListed(datasetCount, _bucketName, _fileName, _price, msg.sender);
    }

    function buyDataset(uint256 _id) public payable {
        Dataset storage dataset = datasets[_id];
        require(dataset.exists, "Dataset does not exist");
        require(msg.value >= dataset.price, "Insufficient payment");
        
        address owner = dataset.owner;
        payable(owner).transfer(msg.value);
        purchases[msg.sender].push(_id); 
        totalSales[owner]++; 
        totalEarnings[owner] += msg.value; 
        emit DatasetPurchased(_id, msg.sender);
    }

    function getDataset(uint256 _id) public view returns (string memory, string memory, uint256, address) {
        Dataset memory dataset = datasets[_id];
        require(dataset.exists, "Dataset does not exist");
        return (dataset.bucketName, dataset.fileName, dataset.price, dataset.owner);
    }

    function getPurchases(address _buyer) public view returns (uint256[] memory) {
        return purchases[_buyer];
    }

    function getTotalEarnings(address _owner) public view returns (uint256) {
        return totalEarnings[_owner];
    }

    function getTotalSales(address _owner) public view returns (uint256) {
        return totalSales[_owner];
    }
}