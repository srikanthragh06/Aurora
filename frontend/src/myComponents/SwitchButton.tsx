import React from "react";

// Define props type for the SwitchButton component
interface SwitchButtonProps {
    className?: string; // Optional additional CSS class names for customization
    toggleTrueText: string; // Text displayed when the toggle is true
    toggleFalseText: string; // Text displayed when the toggle is false
    toggleState: boolean; // Current state of the toggle (true or false)
    setToggleState: React.Dispatch<React.SetStateAction<boolean>>; // toggle state setter
}

// SwitchButton functional component
const SwitchButton = ({
    className = "",
    toggleTrueText,
    toggleFalseText,
    toggleState,
    setToggleState,
}: SwitchButtonProps) => {
    return (
        <div className={`${className}`}>
            <span
                className="cursor-pointer transition" // Apply cursor pointer and transition for smooth effect
                style={{ opacity: toggleState ? "100%" : "20%" }} // Adjust opacity based on toggle state
                onClick={() => setToggleState(true)} // Set toggle state to true on click
            >
                {toggleTrueText} {/*Display text for the true state*/}
            </span>{" "}
            <span className="opacity-20">/</span>{" "}
            {/* Separator with fixed opacity */}
            <span
                className="cursor-pointer transition" // Apply cursor pointer and transition for smooth effect
                style={{ opacity: !toggleState ? "100%" : "20%" }} // Adjust opacity based on toggle state
                onClick={() => setToggleState(false)} // Set toggle state to false on click
            >
                {toggleFalseText} {/*Display text for the false state*/}
            </span>
        </div>
    );
};

export default SwitchButton;
