import { Helmet } from "react-helmet";
import useAccessWishlist from "../../../Hooks/useAccessWishlist";
import WishlistPropertyCard from "./WishlistPropertyCard";
import { useEffect } from "react";


const UserWishlist = () => {

    // i have an api of propertys id, now i need to find all id and find property with this all id form another collection in mongodb. How can i access this all with moongose
    const { data: wishlistProperty, refetch } = useAccessWishlist();

    useEffect(() => {
        refetch();
    }, []);

    return (   
        <div className=" max-h-screen w-full md:px-10 px-5 md:py-16 py-5">
            <Helmet>
                <title>MATTER | User Wishlist</title>
            </Helmet>
            <h1 className="md:text-5xl text-3xl font-medium title-text flex items-center flex-row-reverse justify-end gap-5">Wishlist
            <svg className="md:w-24 w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="wishlist"><linearGradient id="a" x1="73.122" x2="444.535" y1="414.511" y2="43.098" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fcc60e"></stop><stop offset="1" stopColor="#e92e29"></stop></linearGradient><path fill="url(#a)" d="M235.24 125.18a7.986 7.986 0 0 1-6.205-2.944c-13.817-16.943-20.951-32.548-21.204-46.38-.271-14.959 5.214-27.112 15.447-34.222 7.099-4.934 15.252-7.068 24.205-6.344a7.999 7.999 0 0 1 7.33 8.617c-.355 4.404-4.226 7.673-8.617 7.33-5.243-.425-9.755.733-13.788 3.536-7.312 5.079-8.701 14.109-8.579 20.79.186 10.161 6.108 22.462 17.606 36.561a8 8 0 0 1-6.195 13.056zM512 155.107c0 2.975-.533 5.879-1.585 8.638l-42.417 137.522c-4.45 14.429-13.093 26.698-24.994 35.483-11.982 8.842-26.269 13.515-41.315 13.515H274.482c-3.025 9.794-12.161 16.931-22.935 16.931H145.623c-5.361 0-10.434 2.119-14.282 5.969-3.849 3.848-5.968 8.92-5.968 14.282 0 5.361 2.119 10.434 5.968 14.283 3.848 3.848 8.92 5.967 14.282 5.967h6.816c11.104-11.21 26.494-18.168 43.482-18.168s32.378 6.958 43.482 18.168h110.001c11.104-11.21 26.494-18.168 43.482-18.168 33.766 0 61.235 27.47 61.235 61.235S426.653 512 392.888 512c-31.923 0-58.204-24.557-60.979-55.771h-75.008C254.125 487.443 227.845 512 195.922 512c-32.215 0-58.68-25.01-61.044-56.631-14.254-2.256-27.486-8.958-37.852-19.324-13.017-13.019-20.185-30.276-20.185-48.598s7.168-35.58 20.185-48.598a69.544 69.544 0 0 1 19.409-13.654L57.086 79.355H24.267C10.886 79.355 0 68.47 0 55.09c0-13.381 10.886-24.267 24.267-24.267h37.156c9.766 0 18.956 3.173 26.58 9.175 7.592 5.977 12.821 14.174 15.12 23.706l16.208 67.138H191.8c-11.361-17.132-18.913-35.519-19.256-54.344-.588-32.223 16.021-59.37 43.344-70.846 29.302-12.309 63.945-4.266 91.974 20.899C335.887 1.39 370.525-6.654 399.831 5.65c27.32 11.473 43.931 38.615 43.349 70.836-.341 18.829-7.894 37.219-19.257 54.355h63.811c13.38.001 24.266 10.887 24.266 24.266zm-323.458-78.9c.432 23.682 16.183 51.254 45.548 79.737 27.29 26.47 58.346 46.382 73.771 55.547 15.427-9.166 46.486-29.081 73.776-55.552 29.367-28.485 45.116-56.06 45.544-79.742.469-25.92-12.071-46.777-33.546-55.795-25.154-10.564-55.837-1.819-80.07 22.821a8.003 8.003 0 0 1-11.408 0c-17.435-17.729-38.209-27.229-57.86-27.229-7.664 0-15.154 1.444-22.213 4.409-21.477 9.021-34.016 29.882-33.542 55.804zm198.795 137.788h-53.416a455.362 455.362 0 0 1-18.059 11.349v40.458h71.475v-51.807zm16 51.808h58.856l15.979-51.808h-74.835v51.808zm-16 16h-71.475v52.463h71.475v-52.463zm-113.311 52.463h25.836v-52.463h-71.475v36.861h23.159c10.281 0 19.068 6.499 22.48 15.602zm-45.638-136.271h30.659c-9.945-7.445-20.483-15.981-30.659-25.376v25.376zm0 16v51.808h71.475v-40.457a456.145 456.145 0 0 1-18.061-11.35h-53.414zm-16 0h-72.982l12.507 51.808h60.475v-51.808zm-56.613 67.808 8.899 36.861h47.714v-36.861h-56.613zm231.562-83.808v-25.378c-10.177 9.396-20.716 17.933-30.661 25.378h30.661zm-264.143-51.153 12.349 51.153h76.845v-41.297a236.028 236.028 0 0 1-8.655-9.856h-80.539zm224.458 303.923c0 24.943 20.292 45.235 45.235 45.235s45.235-20.292 45.235-45.235-20.292-45.235-45.235-45.235-45.235 20.291-45.235 45.235zm-96.821-27.068a60.731 60.731 0 0 1 5.4 16.532h76.347a60.731 60.731 0 0 1 5.4-16.532h-87.147zm-100.144 27.068c0 24.943 20.292 45.235 45.235 45.235s45.235-20.292 45.235-45.235-20.292-45.235-45.235-45.235-45.235 20.291-45.235 45.235zm108.859-108.101c0-4.411-3.588-8-7.999-8h-93.172a7.998 7.998 0 0 1-7.776-6.123L87.57 67.457c-1.449-6.007-4.723-11.154-9.465-14.888-4.774-3.76-10.543-5.746-16.683-5.746H24.267c-4.559 0-8.267 3.708-8.267 8.267 0 4.558 3.708 8.266 8.267 8.266h37.156c4.941 0 9.034 3.204 10.185 7.973l61.99 256.784a8 8 0 0 1-5.156 9.436c-7.497 2.599-14.448 6.961-20.102 12.615-9.995 9.995-15.499 23.236-15.499 37.284 0 14.047 5.504 27.288 15.499 37.284 7.571 7.571 17.121 12.605 27.438 14.57a60.757 60.757 0 0 1 5.38-15.889c-7.953-.983-15.334-4.571-21.132-10.369-6.87-6.872-10.653-15.962-10.653-25.597 0-9.636 3.783-18.727 10.653-25.597 6.871-6.87 15.962-10.654 25.597-10.654h105.924c4.411 0 7.999-3.589 7.999-8v-.532zm193.163-46.112 4.549-14.749h-53.921v52.431c10.995-.324 21.394-3.883 30.166-10.357 9.129-6.738 15.77-16.188 19.206-27.325zM496 155.107c0-4.558-3.708-8.266-8.267-8.266H411.99a236.015 236.015 0 0 1-8.653 9.854v41.299h79.77l12.103-39.239c.063-.203.133-.402.211-.6.385-.965.579-1.99.579-3.048zM166.247 450.765c0-16.363 13.313-29.676 29.675-29.676s29.675 13.313 29.675 29.676c0 16.362-13.313 29.675-29.675 29.675s-29.675-13.313-29.675-29.675zm16 0c0 7.54 6.135 13.675 13.675 13.675s13.675-6.135 13.675-13.675c0-7.541-6.135-13.676-13.675-13.676s-13.675 6.135-13.675 13.676zm180.966 0c0-16.363 13.313-29.676 29.675-29.676s29.675 13.313 29.675 29.676c0 16.362-13.313 29.675-29.675 29.675s-29.675-13.313-29.675-29.675zm16 0c0 7.54 6.135 13.675 13.675 13.675s13.675-6.135 13.675-13.675c0-7.541-6.135-13.676-13.675-13.676s-13.675 6.135-13.675 13.676z"></path></svg>
            </h1>

            <div className="md:mt-16 mt-10 md:pb-32 pb-24">
                {
                    wishlistProperty?.length > 0 ?
                        <div className="grid 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                            {
                                wishlistProperty?.map((item) => {

                                return <WishlistPropertyCard key={item?._id} data={item}></WishlistPropertyCard>})
                            }
                        </div>
                        : <div className="flex justify-center mt-10">
                            <img className="md:w-[60%] sm:w-[70%] w-full" src="https://www.beatsmed.com/static/images/empty-wishlist.png" alt="" />
                        </div>
                }
            </div>
        </div>
    );
};

export default UserWishlist;