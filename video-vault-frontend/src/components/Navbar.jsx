import { useSelector , useDispatch } from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { removeUser } from "../redux/slice/authSlice";

const Navbar = () => {
    const user = useSelector((state) => state.user);
    if (!user) return null; 

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            const response = await axios.post(`${BASE_URL}auth/logout`, {} , {withCredentials: true});
            if (response.status === 200) {
                dispatch(removeUser());
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }

    };
    return (
        <>
        <div className="navbar bg-base-100 shadow-sm z-100">
            <div className="flex-1">
                <Link to="/upload" className="btn btn-ghost text-xl">Video Vault</Link>
            </div>
            <div className="flex gap-2 items-center">
                <p>Hello {user.firstname}</p>  
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><Link to="/videos">My Videos</Link> </li>
                    <li><Link onClick={handleLogout}>Logout</Link></li>
                </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default Navbar;