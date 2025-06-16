import { useState , useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { addVideo } from '../redux/slice/videoSlice';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

   useEffect(() => {
    if (message) {
        const timeout = setTimeout(() => {
        setMessage('');
        }, 4000);
        return () => clearTimeout(timeout);
    }
   }, [message]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !description || !videoFile) {
      setMessage('⚠️ All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('description', description);

    try {
      setUploading(true);
      const res = await axios.post(BASE_URL + 'videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      
      dispatch(addVideo({
        id: res.data.video._id,
        title: res.data.video.title,
        description: res.data.video.description,
        videoUrl: res.data.video.videoUrl,
        publicId: res.data.video.publicId
      }));

      setMessage('✅ Video uploaded successfully!');
      setTitle('');
      setDescription('');
      setVideoFile(null);
    } catch (err) {
      setMessage('❌ Failed to upload video. Please try again.');
    }
 finally {
      setUploading(false);
    }
  };

  return (
      <>
       <Navbar />
       <div className="flex items-center justify-center bg-base-200 py-10 px-4">
          <div className="w-full max-w-2xl bg-base-100 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">📤 Upload a video</h2>

            <form onSubmit={handleUpload} className="space-y-4">

              {/* Title */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Title</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter a clear and concise video title "
                  className="input input-bordered w-full border-1 border-solid border-gray-300"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Description */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <textarea
                  placeholder="Describe what this video is about"
                  className="textarea textarea-bordered w-full border-1 border-solid border-gray-300"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* Video Upload */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Video</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer">
                  <input
                    type="file"
                    accept="video/*"
                    required
                    className="hidden"
                    id="videoInput"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                  />
                  <label htmlFor="videoInput" className="cursor-pointer flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0 0l-3-3m3 3l3-3M4 4h16v4H4V4z" />
                    </svg>
                    <span className="text-gray-500">{videoFile ? videoFile.name : 'Click to upload your video'}</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-full" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload video'}
              </button>

              {/* Message */}
              {message && (
                <div className={`text-center font-semibold ${message.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>
                  {message}
                </div>
              )}
            </form>
          </div>
       </div>
      </> 
  );
};

export default Upload;
