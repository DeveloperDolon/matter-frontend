
import { Elements, } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

const PaymentPage = () => {
    const {id} = useParams();
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    return (
        <div className="w-full md:px-10 px-5 md:py-10 py-5 md:pb-32 pb-24">
            <h1 className="uppercase md:text-5xl text-3xl font-semibold text-center">Payment</h1>

            <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm id={id}></CheckoutForm>
                    </Elements>
                </div>
        </div>
    );
};

export default PaymentPage;