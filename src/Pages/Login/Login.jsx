
import bgImg from "../../assets/cool-background.png";
import logo from "../../assets/logo.png";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import "./style.css";
import SocialLogin from "../../Components/SocialBtn/SocialLogin";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="min-h-screen sm:p-10 p-2 bg-[#fafafa]">
            <div className="grid md:grid-cols-2 grid-cols-1 h-full min-h-[calc(100vh-80px)] rounded-3xl overflow-hidden max-w-7xl mx-auto shadow-2xl">
                <div style={{ background: `url('${bgImg}') no-repeat center center`, backgroundSize: "cover" }}
                    className="h-full px-10 pt-10 relative">
                    <Link to="/" className="flex gap-5 items-center">
                        <img className="md:w-[100px] w-[50px]" src={logo} alt="" />
                        <h2 className="md:text-3xl text-xl font-medium">MATTER</h2>
                    </Link>

                    <div className="sm:mt-24 mt-8 flex justify-center items-center flex-col">
                        <h2 className="title-text md:text-6xl text-4xl font-semibold text-white">Welcome Here</h2>
                        <p className="mt-9 md:text-lg text-base font-medium title-text text-gray-100 sm:pb-0 pb-10">Sign in to <br /> continue access</p>
                    </div>

                    <a className="absolute bottom-1 text-white md:text-lg text-base font-bold">www.matter.com</a>
                </div>
                <div className="py-10 sm:px-20 px-2">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <h1 className="md:text-3xl text-xl font-bold py-5 title-text pl-2">Sign In</h1>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div className="w-full">
                                <TextField
                                    {...register("email", {required: true})}
                                    sx={{ m: 1, width: "100%" }}
                                    id="email"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    variant="filled"
                                />
                                {errors.email?.type === "required" ? (<p className="text-red-500 md:text-sm text-xs ml-2">Email is required!</p>) : ""}


                                <FormControl sx={{ m: 1, width: '100%' }} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password"
                                        name="password"
                                        {...register("password", {required: true, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/})}
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {errors.password?.type === "required" ? (<p className="text-red-500 md:text-sm text-xs mt-2">Password is required!</p>) : ""}
                                    {errors.password?.type === "pattern" ? (<p className="text-red-500 md:text-sm text-xs mt-2">Password must include 6 character, capital letter and special character!</p>) : ""}
                                </FormControl>
                                <p className="ml-2 mt-3 sm:text-sm text-xs">Don&apos;t have an account? <Link to={"/register"} className="font-bold text-violet-600">Create Account!</Link></p>
                                <button style={{
                                    background: "linear-gradient( to left, #4CC9F0, #7209B7)"
                                }} className="ml-2 block w-full mt-2 login-btn rounded-lg md:text-xl text-lg font-semibold title-text" type="submit">Login</button>
                            </div>
                        </Box>
                    </form>

                    <div className="ml-2 mt-5 w-full">
                        <p className="text-center mb-3">Or sign in with social media</p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div> 

            </div >
        </div >
    );
};

export default Login;