import axios from 'axios';
import { useState } from 'react';

const UploadVideo = () => {
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const upload = async () => {
    const formData = new FormData();
    formData.append('file', file!);
    const response = await axios.post('/api/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const { message } = response.data;
    alert(message);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    upload();
  };

  return (
    <section className="h-screen w-full flex items-center justify-center">
      <form
        onSubmit={handleUpload}
        className="flex flex-col gap-4 bg-extra-dark p-4 rounded-lg"
      >
        <input type="file" onChange={handleFileChange} />
        <button type="submit" className="bg-primary px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </section>
  );
};

export default UploadVideo;
