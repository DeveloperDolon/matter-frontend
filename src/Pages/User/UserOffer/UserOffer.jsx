import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";


const UserOffer = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { id } = useParams();

    const { data: wishlistData } = useQuery({
        queryKey: ["single-wishlist-data", user],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users-wishlist/${id}?email=${user?.email}`)

            return response.data;
        }
    })

    console.log(wishlistData)

    return (
        <div className="w-full md:px-10 px-5 md:py-16 py-5 md:pb-32 pb-24">
            <Helmet>
                <title>MATTER | Make offer</title>
            </Helmet>
            <div className="max-w-5xl mx-auto md:px-0 sm:px-5 px-3">
                <form>
                    <div className="w-full bg-white p-10">

                        <h1 tabIndex={0} role="heading" aria-label="profile information" className="focus:outline-none text-3xl font-bold text-gray-800">
                            Make an offer
                        </h1>
                        <p role="contentinfo" className=" focus:outline-nonetext-sm font-light leading-tight text-gray-600 mt-4">
                            Make your offer in between the price.
                        </p>
                        <h2 role="heading" aria-label="enter Personal data" className="text-xl font-semibold leading-7 text-gray-800 mt-10">
                            Property data
                        </h2>
                        <p className="text-sm font-light leading-none text-gray-600 mt-0.5">Property details and place of amount</p>
                        <p className="md:text-lg text-base font-bold mt-3 text-blue-700">Price Range : {wishlistData?.property?.price_range} TK</p>
                        
                        <div className="mt-8 md:flex items-center">
                            <div className="flex flex-col">
                                <label className="mb-3 text-sm leading-none text-gray-800">Property title</label>
                                <input type="text" tabIndex={0} name="propertyTitle" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" value={wishlistData?.property?.property_title} readOnly />
                            </div>
                            <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                                <label className="mb-3 text-sm leading-none text-gray-800">Property location</label>
                                <input type="text" readOnly tabIndex={0} className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" name="propertyLocation" value={wishlistData?.property?.property_location} />
                            </div>
                        </div>
                        <div className="mt-12 md:flex items-center">
                            <div className="flex flex-col">
                                <label className="mb-3 text-sm leading-none text-gray-800">Agent Name</label>
                                <input type="text" readOnly tabIndex={0} name="agentName" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" value={wishlistData?.property?.agent_name} />
                            </div>
                            <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                                <label className="mb-3 text-sm leading-none text-gray-800">Offered amount</label>
                                <input type="number" tabIndex={0} aria-label="Enter phone number" required className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" defaultValue="+81 839274" />
                            </div>
                        </div>
                        <div className="mt-12 md:flex items-center">
                            <div className="flex flex-col">
                                <label className="mb-3 text-sm leading-none text-gray-800">Buyer Email</label>
                                <input type="email" tabIndex={0} readOnly className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" value={wishlistData?.wishlistData?.buyer_email} />
                            </div>
                            <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                                <label className="mb-3 text-sm leading-none text-gray-800">Buyer email</label>
                                <input type="text" tabIndex={0} aria-label="Enter place of birth" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" value={wishlistData?.wishlistData?.buyer_name} />
                            </div>
                        </div>
                        <div className="mt-12">
                            <div className="flex flex-col">
                                <label className="mb-3 text-sm leading-none text-gray-800">Buying Date</label>
                                <input type="date" name="date" required tabIndex={0} aria-label="Enter place of birth" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"  />
                            </div>
                        </div>

                        <div className="mt-12">
                            <div className="py-4 flex items-center">
                                <div className="bg-white dark:bg-gray-800 border rounded-sm border-gray-400 dark:border-gray-700 w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                    <input type="checkbox" tabIndex={0} aria-label="I agree with the terms of service" defaultChecked className="checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                                    <div className="check-icon hidden bg-blue-500 text-white rounded-sm">
                                        <svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <path d="M5 12l5 5l10 -10" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-sm leading-none ml-2">
                                    I agree with the <span className="text-indigo-700">terms of service</span>
                                </p>
                            </div>
                        </div>
                        <button role="button" aria-label="Next step" className="flex items-center justify-center py-4 px-7 focus:outline-none bg-cyan-200 border rounded border-gray-400 mt-7 md:mt-14 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
                            <span className="md:text-lg text-base font-bold text-center text-gray-800 capitalize">Offer</span>
                        </button>
                    </div>
                    <style dangerouslySetInnerHTML={{ __html: "\n          .checkbox:checked + .check-icon {\n              display: flex;\n          }\n      " }} />
                </form>
            </div>
        </div>
    );
};

export default UserOffer;