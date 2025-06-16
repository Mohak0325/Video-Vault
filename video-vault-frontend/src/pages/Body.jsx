import {Outlet} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { addUser } from '../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading , setLoading] = useState(true);
    
    const fetchUser = async () => {
        try{
            setLoading(true);
            const res = await axios.get(BASE_URL + 'auth/me', {
                withCredentials: true
            });
            dispatch(addUser(res?.data?.user));
        }
        catch(err){
            return navigate('/');
            
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
       fetchUser();
    }, []);

  if (loading) return <div className="text-center py-10">🔄 Checking session...</div>;

    return <Outlet />;
}

export default Body;