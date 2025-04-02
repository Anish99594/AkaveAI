import UploadForm from '../components/UploadForm';

function Upload() {
  return (
    <div className="upload-page">
      <h1 className="section-title">Share Your AIAgent</h1>
      <p className="upload-intro">
      Share your AI agents with researchers and developers.
Your agents will be stored securely on Filecoin through Akave, ensuring
proper attribution and fair compensation for your work.
      </p>
      <UploadForm />
    </div>
  );
}

export default Upload;