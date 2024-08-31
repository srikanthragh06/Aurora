import { Card } from "@/components/ui/card";
import MainPage from "../../myComponents/MainPage";
import WelcomeLeft from "./WelcomeLeft";
import AuthRight from "./AuthRight";

// Define the AuthPage functional component
const AuthPage = () => {
    return (
        // MainPage component used to provide layout and styling
        <MainPage className="flex flex-col justify-center items-center">
            {/* Card component used for the main content container */}
            <Card
                className="sm:w-[85%] sm:h-[90%]
                            w-full h-full
                            flex"
            >
                {/* Logo , background image and welcome image on the left side of the card */}
                <WelcomeLeft />
                {/* Authentication part on the right side of the page */}
                <AuthRight />
            </Card>
        </MainPage>
    );
};

export default AuthPage;
