import DatasetList from '../components/DatasetList';

function Marketplace() {
  return (
    <div className="marketplace-page">
      <h1 className="section-title">AkaveAI Marketplace</h1>
      <p className="marketplace-intro">
      Browse and purchase ethically sourced AI agents for your projects.
All agents are stored on Filecoin using Akave for decentralized, secure access,
ensuring proper attribution to creators and fair compensation models.
      </p>
      <DatasetList />
    </div>
  );
}

export default Marketplace;