import { Helmet } from "react-helmet";
import useAuth from "../../../Hooks/useAuth";


const AgentProfile = () => {
    const { user, userRole } = useAuth();

    return (
        <div className=" max-h-screen w-full md:px-10 px-5 md:py-16 py-5">
        <Helmet>
            <title>MATTER | User Profile</title>
        </Helmet>
        <div className="max-w-xl mx-auto bg-cyan-300 rounded-2xl shadow-xl py-8 flex justify-center flex-col items-center">
            <div className="md:py-5">
                <img className="border-[20px] md:w-[150px] md:h-[150px] w-[90px] h-[90px] object-cover outline outline-[30px] outline-cyan-100 border-opacity-40 border-white rounded-full" src={user?.photoURL} alt="" />
            </div>

            <div>
                <h1 className="mt-8 md:text-3xl text-xl font-bold title-text">{user?.displayName}</h1>
                <h3 className="capitalize mt-2 md:text-xl text-lg font-medium">Role: {userRole}</h3>
            </div>
        </div>
    </div>
    );
};

export default AgentProfile;