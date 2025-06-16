
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { BASE_URL } from '../utils/constant';
import Spinner from '../components/Spinner';

const VideoList = () => {
  const user = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + 'videos/my', {
        withCredentials: true,
      });
      setVideos(res.data.videos);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="p-6 mt-2">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">Your Uploaded Videos</h2>

        {loading && <div className='flex justify-center min-h-screen bg-gray-100'><Spinner/></div>}

       {!loading && (
          <>
            {error ? (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            ) : videos.length === 0 ? (
              <p className="text-gray-500">You haven't uploaded any videos yet.</p>
            ) : null}
          </>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
            <div key={video.id} className="card bg-base-100 shadow-md">
            <video className="w-full h-48 object-cover" controls>
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="card-body">
                <h3 className="card-title text-lg">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.description.split("").slice(0,50).join("")+ "..."} </p>
                <Link
                to={`/videos/${video.id}`}
                className="btn btn-primary btn-sm mt-2"
                >
                View Details
                </Link>
            </div>
            </div>
        ))}
        </div>
    </div>
    </>
  );
};

export default VideoList;