import { ReactNode } from "react";

type MainPageProps = {
    children?: ReactNode;
    className?: string;
};

// MainPage functional component
const MainPage = ({ children, className = "" }: MainPageProps) => {
    return (
        <div
            className={`w-full h-full 
                        flex flex-col
                        overflow-x-hidden
                        ${className}`} // Apply the custom className along with default styles
        >
            {children} // Render children inside the div
        </div>
    );
};

export default MainPage;
