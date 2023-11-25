import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import useAuth from '../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosPublic } from '../../Hooks/useAxiosPublic';

const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { googleLogin } = useAuth();

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                const userInfo = {
                    name: res?.user?.displayName,
                    email: res?.user?.email,
                    image: res?.user?.photoURL,
                    role: "user"
                }

                axiosPublic.post("/users", { ...userInfo })
                    .then(res => {
                        console.log(res);
                        navigate(location.state || "/");
                    }).catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="flex flex-col gap-2 items-center">
            <button
                onClick={handleGoogleLogin}
                style={{
                    background: "linear-gradient( to left, #4CC9F0, #F72585)"
                }}
                className='py-5 w-full rounded-lg flex justify-center text-white'><GoogleIcon></GoogleIcon></button>
            <button
                style={{
                    background: "linear-gradient( to left, #4CC9F0, #F72585)"
                }}
                className='py-5 w-full rounded-lg flex justify-center text-white'><TwitterIcon></TwitterIcon></button>
        </div>
    );
};

export default SocialLogin;