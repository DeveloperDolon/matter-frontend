import { Suspense, useState } from "react";
import useMeasure from "react-use-measure";
import { useMotionValue, motion, MotionConfig } from "framer-motion";
import { transition } from "./settings";
import { Shapes } from "./Shapes";
import "./style.css";
import PropTypes from "prop-types";

const Button3D = ({text, className}) => {

    const [ref, bounds] = useMeasure({ scroll: false });
    const [isHover, setIsHover] = useState(false);
    const [isPress, setIsPress] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const resetMousePosition = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <MotionConfig transition={transition}>
        <motion.button
            className={className}
            ref={ref}
            initial={false}
            animate={isHover ? "hover" : "rest"}
            whileTap="press"
            variants={{
                rest: { scale: 1 },
                hover: { scale: 1.5 },
                press: { scale: 1.4 }
            }}
            onHoverStart={() => {
                resetMousePosition();
                setIsHover(true);
            }}
            onHoverEnd={() => {
                resetMousePosition();
                setIsHover(false);
            }}
            onTapStart={() => setIsPress(true)}
            onTap={() => setIsPress(false)}
            onTapCancel={() => setIsPress(false)}
            onPointerMove={(e) => {
                mouseX.set(e.clientX - bounds.x - bounds.width / 2);
                mouseY.set(e.clientY - bounds.y - bounds.height / 2);
            }}
        >
            <motion.div
                className="shapes"
                variants={{
                    rest: { opacity: 0 },
                    hover: { opacity: 1 }
                }}
            >
                <div className="pink blush" />
                <div className="blue blush" />
                <div className="container">
                    <Suspense fallback={null}>
                        <Shapes
                            isHover={isHover}
                            isPress={isPress}
                            mouseX={mouseX}
                            mouseY={mouseY}
                        />
                    </Suspense>
                </div>
            </motion.div>
            <motion.div
                variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }}
                className="label title-text"
            >
                {text}
            </motion.div>
        </motion.button>
    </MotionConfig>
    );
};

export default Button3D;
Button3D.propTypes = {
    text: PropTypes.string,
    link: PropTypes.string,
    className: PropTypes.string,
}