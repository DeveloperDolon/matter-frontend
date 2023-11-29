import Lottie from "lottie-react";
import animationData from "../../../public/Animation - 1699426170132.json"
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const ErrorPage = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <Helmet>
                <meta charSet="utf-8" />
                <title>MATTER | 404 not found</title>
            </Helmet>
            <div className="w-full text-center">
                <Lottie
                    className="md:w-[30%] w-[80%] mx-auto"
                    options={defaultOptions}
                    animationData={animationData}
                    height={200}
                    width={200}
                ></Lottie>
                <h2 className="md:text-7xl mb-8 text-5xl font-medium text-center title-text">Page Not Found!</h2>
                <Link to="/" className="px-7 py-4 bg-cyan-500 rounded-xl shadow-lg text-white title-text font-semibold uppercase md:text-sm text-xs">Back to home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;