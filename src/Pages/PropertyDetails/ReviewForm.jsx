

import { Button } from '@mui/material';
import { useState } from 'react';
import { FaStar } from "react-icons/fa";
import useAuth from '../../Hooks/useAuth';
import PropTypes from "prop-types";
import useAccessPropertyReviews from '../../Hooks/useAccessPropertyReviews';
import useReviewMutation from '../../Hooks/useReviewMutation';

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

};

const ReviewForm = ({id, title, agentName}) => {

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0);
    const {user} = useAuth();
    const {refetch} = useAccessPropertyReviews();

    const handleClick = value => {
        setCurrentValue(value);
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue);
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined);
    }

    const {mutate: addReview} = useReviewMutation();


    const handleAddReview = (e) => {
        e.preventDefault();
        
        const reviewDescription = e.target.reviewDescription.value;
        const reviewData = {
            property_id: id,
            property_title : title,
            property_agent: agentName,
            reviewer_email: user?.email,
            reviewer_name: user?.displayName,
            reviewer_image: user?.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            review_date: new Date(),
            review_description: reviewDescription,
            review_star: currentValue
        }

        addReview(reviewData);
        refetch();
    }

    return (
        <form onSubmit={handleAddReview} className=' md:px-0 sm:px-5 px-3 mt-16'>
            <h1 className='md:text-4xl text-2xl font-medium text-center py-3 title-text'>Your opinion matters!</h1>
            <p className='text-center pb-5 md:text-base text-sm'>How was your experience?</p>
            <div className='w-full' style={styles.container}>
                <div style={styles.stars}>
                    {stars.map((_, index) => {
                        return (
                            <FaStar
                                key={index}
                                size={24}
                                onClick={() => handleClick(index + 1)}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                style={{
                                    marginRight: 10,
                                    cursor: "pointer"
                                }}
                            />
                        )
                    })}
                </div>
                <textarea
                    name='reviewDescription'
                    className='bg-gray-50 md:w-[80%] mx-auto py-5 px-5 mt-5 border rounded-lg'
                    placeholder="What's your experience?"
                    required
                />

                <div className='mt-10'>
                    <Button
                        type='submit'
                        size='large'
                        variant="contained"
                    >
                        Submit
                    </Button>
                </div>


            </div>
        </form>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    stars: {
        display: "flex",
        flexDirection: "row",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",
        minHeight: 100,
        width: 300
    },
    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        padding: 10,
    }

};


export default ReviewForm;

ReviewForm.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    agentName: PropTypes.string,
}