import { useState } from 'react';
import AuthForm from './AuthForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slice/authSlice';
import Spinner from '../components/Spinner';

const Auth = () => {
  const [type, setType] = useState('login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuth = async (formData) => {
    setLoading(true);
    if (type === 'login') {
      // Login API call here
      try{
        if (!formData.email || !formData.password) {
          throw new Error('Email and password are required');
        }
        const result = await axios.post( BASE_URL + 'auth/login', formData , {withCredentials: true});

        if (result.status !== 200) {
          throw new Error('Login failed');
        }

        dispatch(addUser(result?.data?.user));
        navigate('/upload');
      }
      catch(error) {
        console.error('Login failed:', error.message);
        return;
      }
      finally{
        setLoading(false);
      }
    } else {
        try{
            // Registration API call here
            setLoading(true);
            if (!formData.firstname || !formData.lastname || !formData.email || !formData.password) {
                throw new Error('All fields are required');
            }
            const result = await axios.post( BASE_URL + 'auth/register', {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                password: formData.password
            } , {withCredentials: true});

            if (result.status !== 201) {
                throw new Error('Registration failed');
            }
            dispatch(addUser(result?.data?.user));
            navigate('/upload');
        }
        catch(error) {
          console.error('Registration failed:', error.message);
          return;
        }
        finally{
            setLoading(false);
        }
    }
  };

  return (
    <>
      {loading ? (<div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <Spinner />
      </div>) : (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {type === 'login' ? 'Login to Your Account' : 'Create an Account'}
        </h2>

        <AuthForm onSubmit={handleAuth} type={type} />

        <p className="text-center text-sm text-gray-600">
          {type === 'login' ? "Don't have an account?" : 'Already registered?'}{' '}
          <button
            onClick={() => setType(prev => (prev === 'login' ? 'register' : 'login'))}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {type === 'login' ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
      )}
    </>

  );
};

export default Auth;
