import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constant';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import { addVideo , removeVideo } from '../redux/slice/videoSlice';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchVideo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}videos/${id}`, { withCredentials: true });
      setVideo(res.data.video);
      dispatch(addVideo(res.data.video));
      setTitle(res.data.video.title);
      setDescription(res.data.video.description);
    } catch (err) {
      setError('Failed to fetch video');
    } finally {
      setLoading(false);
    }
  };

  const updateVideo = async () => {
    try {
      setUploading(true);
      const res = await axios.put(
        `${BASE_URL}edit/details/${id}`,
        { title, description },
        { withCredentials: true }
      );
      setVideo(res.data.video);
      dispatch(addVideo(res.data.video));
      setIsEditing(false);
    } catch (err) {
      alert('Failed to update video');
    } finally{
      setUploading(false);
    }
  };

  const deleteVideo = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this video?');
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}videos/${id}`, { withCredentials: true });
      dispatch(removeVideo());
      navigate('/videos');
    } catch (err) {
      alert('Failed to delete video');
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <video className="w-full rounded-lg shadow" controls src={video.videoUrl}></video>

        {isEditing ? (
          <div className="mt-4 space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Edit title"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Edit description"
            />
            <div className="flex gap-3">
              <button className="btn btn-success" onClick={updateVideo}>Save</button>
              <button className="btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{video.title}</h2>
            <p className="mt-2">{video.description}</p>
            <p className="mt-2 text-sm text-blue-500">
              Public URL: <a href={`http://localhost:5173/public/${video._id}`} className="underline" target="_blank" rel="noreferrer">
              http://localhost:5173/public/{video._id}
              </a>
            </p>
            <div className="flex gap-3 mt-4">
              
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
                disabled={uploading || loading}
              >
                {uploading ? 'Updating...' : 'Edit'}
              </button>
              <button
                className="btn btn-error"
                onClick={deleteVideo}
                disabled={uploading || loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
