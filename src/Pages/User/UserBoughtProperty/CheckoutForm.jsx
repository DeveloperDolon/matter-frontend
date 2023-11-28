
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import PropTypes from "prop-types";
import useAccessSingleBoughtProperty from "../../../Hooks/useAccessSingleBoughtProperty";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({id}) => {
    const navigate = useNavigate();
    const {data} = useAccessSingleBoughtProperty(id);

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const axiosSecure = useAxiosSecure();
    
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useAuth();
    const [transactionID, setTransactionID] = useState(null);


    const totalPrice = data?.offered_price;

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post("/create-payment-intent", { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                }).catch(err => console.log(err));
        }

    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("hello world")

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            setError("");
        }
        // confirm payment

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "anonymous",
                        name: user?.displayName || "anonymous"
                    }
                }
            }
        )


        if (confirmError) {
            console.log("confirm error")
        } else {
            console.log("payment intent ", paymentIntent)
            if (paymentIntent.status === "succeeded") {
                setTransactionID(paymentIntent.id);

                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    date: new Date(),
                    transactionID: paymentIntent.id,
                    bought_property_id: id,
                    status: "pending"
                }

                const res = await axiosSecure.post(`/user-payment/${id}?email=${user?.email}`, {...payment});
                console.log(res);
                if(res?.data[0]?._id) {
                    toast.success("Transaction complete!!");
                    navigate("/user-dashboard/user-bought-property");
                }

            }
        }
    }

    return (
        <form className="2xl:w-[50%] md:w-[60%] w-[90%] mx-auto my-24" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            backgroundColor: "#fafafa",
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            <Button sx={{marginTop: "50px"}} variant="contained"  disabled={!stripe || !clientSecret} type="submit">Pay</Button>

            <p className="text-red-500 md:text-sm text-xs mt-5">
                {error}
            </p>

            {
                transactionID && <p className="text-green-600">Your Transaction ID : {transactionID}</p>
            }
        </form>
    );
};

export default CheckoutForm;

CheckoutForm.propTypes = {
    id: PropTypes.string
}