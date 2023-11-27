import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAccessAgentProperties = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["agent-properties"],
        queryFn: async () => {
            const response = await axiosSecure.get(`/agent-properties?email=${user?.email}`);
            return response.data;
        }
    })
};

export default useAccessAgentProperties;