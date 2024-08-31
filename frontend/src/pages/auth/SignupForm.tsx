import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VscLoading } from "react-icons/vsc";
import { useSignupForm } from "@/hooks/useSignupForm";

const SignupForm = () => {
    // Destructure form handling properties from the useSignupForm
    const { register, handleSubmit, formErrors, formIsSubmitting, onSubmit } =
        useSignupForm();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)} // Handle form submission with the custom hook's onSubmit function
            className="text-base 
            flex flex-col items-center 
            sm:py-4 py-2 sm:px-10 
            md:w-3/4 w-full  
            md:mt-8 mt-4"
        >
            {/* Form title */}
            <h1
                className="sm:text-2xl text-xl
                             font-bold sm:mb-8 mb-6"
            >
                Create a new account
            </h1>
            {/* Email input field */}
            <Input
                className="my-2"
                {...register("email")} // Register the input with react-hook-form
                type="email"
                placeholder="Email"
            />
            {/* Display email validation error */}
            {formErrors.email && (
                <p className="text-xs text-red-400">
                    {formErrors.email.message}
                </p>
            )}
            {/* Username input field */}
            <Input
                className="my-2"
                {...register("username")} // Register the input with react-hook-form
                type="text"
                placeholder="Username"
            />
            {/* Display username validation error */}
            {formErrors.username && (
                <p className="text-xs text-red-400">
                    {formErrors.username.message}
                </p>
            )}
            {/* Password input field */}
            <Input
                className="my-2"
                {...register("password")} // Register the input with react-hook-form
                type="password"
                placeholder="Password"
            />
            {/* Display password validation error */}
            {formErrors.password && (
                <p className="text-xs text-red-400">
                    {formErrors.password.message}
                </p>
            )}
            {/* Confirm Password input field */}
            <Input
                className="my-2"
                {...register("confirmPassword")} // Register the input with react-hook-form
                type="password"
                placeholder="Confirm Password"
            />
            {/* Display confirm password validation error */}
            {formErrors.confirmPassword && (
                <p className="text-xs text-red-400">
                    {formErrors.confirmPassword.message}
                </p>
            )}
            {/* Submit button */}
            <Button
                disabled={formIsSubmitting} // Disable the button while form is submitting
                className="sm:w-1/2 w-3/4 
                            mt-10 mb-2"
            >
                {/* Show loading spinner or text based on submission state */}
                {formIsSubmitting ? (
                    <VscLoading className="animate-spin" />
                ) : (
                    "Submit"
                )}
            </Button>
            {/* Display general form error */}
            {formErrors.root && (
                <p className="text-sm text-red-600">
                    {formErrors.root.message}
                </p>
            )}
        </form>
    );
};

export default SignupForm;
