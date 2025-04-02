import { ethers } from 'ethers';

const connectWallet = async () => {
  if (window.ethereum) {
    // Rainbow Wallet injects window.ethereum like MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []); // Same as MetaMask
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return address;
  }
  throw new Error('Install Rainbow Wallet or another Ethereum-compatible wallet');
};

export { connectWallet };