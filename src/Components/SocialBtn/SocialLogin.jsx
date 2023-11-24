import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';

const SocialLogin = () => {
    return (
        <div className="flex flex-col gap-2 items-center">
            <button
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