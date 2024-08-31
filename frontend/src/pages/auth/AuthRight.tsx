import SwitchButton from "@/myComponents/SwitchButton";
import { isLoginAtom } from "@/state/auth";
import { useRecoilState } from "recoil";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const AuthRight = () => {
    // Use Recoil state to manage the current authentication mode (login or signup)
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

    return (
        <div
            className="md:w-[55%] w-full 
                p-2 
                flex flex-col items-center"
        >
            {/* Container for the SwitchButton and forms */}
            <div
                className="w-full 
                    md:px-4 
                    sm:text-lg text-base"
            >
                {/* SwitchButton component for toggling between login and signup modes */}
                <SwitchButton
                    toggleTrueText="Login"
                    toggleFalseText="Sign up"
                    toggleState={isLogin} // State that determines which form is shown
                    setToggleState={setIsLogin} // Function to update the state
                />
            </div>
            {/* Conditionally render SigninForm or SignupForm based on the current state */}
            {isLogin ? <SigninForm /> : <SignupForm />}
        </div>
    );
};

export default AuthRight;
