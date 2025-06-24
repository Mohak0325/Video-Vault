import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import Spinner from '../components/Spinner';

const PublicVideo = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`${BASE_URL}videos/public/${id}`);
        setVideo(res.data.video);
      } catch (err) {
        setError('Video not found or not publicly available');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full shadow-lg rounded-lg p-4">
        <video className="w-full rounded" controls src={video.videoUrl}></video>
        <h2 className="text-xl font-semibold mt-4">{video.title}</h2>
        <p className="text-gray-600 mt-2">{video.description}</p>
      </div>
    </div>
  );
};

export default PublicVideo;
