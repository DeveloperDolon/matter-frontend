import { Button } from "@mui/material";
import "./style.css";
import Container from '@mui/material/Container';
import { TypeAnimation } from 'react-type-animation';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Button3D from "./Button3D";

const Banner = () => {
   

    return (
        <div>
            <div className="w-full h-screen relative flex justify-center overflow-hidden items-center">

                <iframe className="z-0 pageheader__video" src="https://player.vimeo.com/video/766143045?autoplay=1&amp;loop=1&amp;background=1&amp;hd=1&amp;controls=0" autoPlay>
                </iframe>
                <span className="absolute w-full h-full bg-black bg-opacity-50 z-20"></span>

                <Container maxWidth="lg" className="grid md:grid-cols-2 grid-cols-1 relative ">
                    <div className="w-full relative grid md:grid-cols-3 grid-cols-1">
                        <div className="md:col-span-2">
                            <h1 className="z-50 relative title-text md:text-7xl sm:text-5xl text-3xl font-bold text-white">
                                We build <br />
                                <TypeAnimation
                                    sequence={[
                                        "real estate businesses", // Types 'One'
                                        4000, // Waits 1s
                                        'mordern businesses', // Deletes 'One' and types 'Two'
                                        4000,
                                        () => {
                                            console.log('Sequence completed');
                                        },
                                    ]}
                                    wrapper="span"
                                    cursor={true}
                                    repeat={Infinity}

                                />
                            </h1>
                            <p className="text-white relative z-20 mt-5 title-text md:text-lg text-base font-medium">Where Every Home Tells a Story: <span className="text-[#4CC9F0]">Your Journey to</span> <br /> Timeless Living Begins Here!</p>

                            <div className="z-30 relative flex gap-5 mt-10">
                                <Button3D link={"/"} className={"md:text-lg font-semibold text-sm text-white bg-blue-600 title-text"} text={"View More"}></Button3D>
                                <Button variant="outlined" sx={{ border: "2px solid", transition: ".5s easy all", color: "#6cb5fd", borderRadius: "50px" }} size="large">Our Properties</Button>
                            </div>

                            <div className="z-30 flex relative gap-4 mt-10">
                                <Button variant="contained">
                                    <TwitterIcon></TwitterIcon>
                                </Button>
                                <Button variant="contained">
                                    <FacebookIcon></FacebookIcon>
                                </Button>

                                <Button variant="contained">
                                    <InstagramIcon></InstagramIcon>
                                </Button>
                                <Button variant="contained">
                                    <LinkedInIcon></LinkedInIcon>
                                </Button>
                            </div>
                        </div>

                        <div className="relative z-30">
                        </div>
                    </div>
                </Container>
            </div>
        </div >
    );
};

export default Banner;