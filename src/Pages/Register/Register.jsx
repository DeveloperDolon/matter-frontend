
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
import SocialLogin from "../../Components/SocialBtn/SocialLogin";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { axiosPublic } from "../../Hooks/useAxiosPublic";

const Register = () => {
    const {createUser} = useAuth();
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = async (data) => {
        const creatingUserId = toast.loading("Creating user...");

        const imageFile = {image: data?.image[0]};

        const res = await axios.post(image_hosting_api, imageFile,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        const imageUrl = res?.data?.data?.display_url;

        const userInfo = {
            name: data.name,
            email: data.email,
            image: imageUrl,
            role: "user"
        }

        createUser(data.email, data.password)
        .then((res) => {
            updateProfile(res.user, {
                displayName: data.name,
                photoURL: imageUrl
            }).then(() => {

                axiosPublic.post("/users", {...userInfo})
                .then(res => {
                    toast.success("Registration successful!", {id: creatingUserId});
                    console.log(res);
                    navigate(location.state || "/");
                }).catch(err => console.log(err));

            }).catch((err) => toast.error(err.message, {id: creatingUserId}));
        })
        .catch(err => toast.error(err.message, {id: creatingUserId}));

    }

    return (
        <div className="min-h-screen sm:p-10 p-2 bg-[#fafafa]">
            <div className="grid lg:grid-cols-2 grid-cols-1 h-full min-h-[calc(100vh-80px)] rounded-3xl overflow-hidden max-w-7xl mx-auto shadow-2xl">
                <div style={{ background: `url('${bgImg}') no-repeat center center`, backgroundSize: "cover" }}
                    className="h-full px-10 pt-10 relative">
                    <Link to="/" className="flex gap-5 items-center">
                        <img className="md:w-[100px] w-[50px]" src={logo} alt="" />
                        <h2 className="md:text-3xl text-xl font-medium">MATTER</h2>
                    </Link>

                    <div className="sm:mt-24 mt-8 flex justify-center items-center flex-col">
                        <h2 className="title-text md:text-6xl text-4xl font-semibold text-white">Welcome Here</h2>
                        <p className="mt-9 md:text-lg text-base font-medium title-text text-gray-100 sm:pb-0 pb-10">Create Account in to <br /> continue access</p>
                    </div>

                    <a className="absolute bottom-1 text-white md:text-lg text-base font-bold">www.matter.com</a>
                </div>
                <div className="py-10 sm:px-20 px-2">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <h1 className="md:text-3xl text-xl font-bold py-5 title-text">Register</h1>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div className="w-full space-y-5">
                                <TextField
                                    {...register("name", { required: true })}
                                    sx={{width: "100%" }}
                                    id="name"
                                    label="Name"
                                    name="name"
                                    type="text"
                                    variant="filled"
                                />
                                {errors.name?.type === "required" ? (<p className="text-red-500 md:text-sm text-xs ">Name is required!</p>) : ""}

                                <TextField
                                    {...register("email", { required: true })}
                                    sx={{width: "100%" }}
                                    id="email"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    variant="filled"
                                />
                                {errors.email?.type === "required" ? (<p className="text-red-500 md:text-sm text-xs ">Email is required!</p>) : ""}


                                <FormControl sx={{width: '100%' }} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password"
                                        name="password"
                                        {...register("password", { required: true, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })}
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

                                <div className="my-3  w-full">
                                    <label className="flex gap-6 rounded-t-md items-center  py-3 sm:px-5 px-3 w-full border-2">
                                        Upload your image <br />
                                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                            Upload file
                                            <VisuallyHiddenInput {...register("image")} type="file" />
                                        </Button>
                                    </label>
                                </div>

                                <p className=" sm:text-sm text-xs">Already have an account? <Link to={"/login"} className="font-bold text-violet-600">Login!</Link></p>
                                <button style={{
                                    background: "linear-gradient( to left, #4CC9F0, #7209B7)"
                                }} className=" block w-full mt-2 login-btn rounded-lg md:text-xl text-lg font-semibold title-text" type="submit">Create Account</button>
                            </div>
                        </Box>
                    </form>

                    <div className=" w-full">
                        <p className="text-center mb-3">Or sign in with social media</p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>

            </div >
        </div >
    );
};

export default Register;