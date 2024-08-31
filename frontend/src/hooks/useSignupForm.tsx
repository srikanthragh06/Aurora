import { signupApi } from "@/api/auth";
import { isLoggedInAtom } from "@/state/auth";
import { setAuthToken } from "@/utils/token";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { z } from "zod";

// validation schema using zod
const schema = z.object({
    email: z.string().email("Enter a valid email address"),
    username: z
        .string()
        .min(4, "Must be at least 4 characters long")
        .max(24, "Must be at most 24 characters long"),
    password: z
        .string()
        .min(10, "Must be at least 10 characters long")
        .max(32, "Must be at most 32 characters long"),
    confirmPassword: z
        .string()
        .min(10, "Must be at least 10 characters long")
        .max(32, "Must be at most 32 characters long"),
});

// Type inferred from the validation schema
type FormFields = z.infer<typeof schema>;

export const useSignupForm = () => {
    // Recoil hook to update the logged-in state
    const setLoggedIn = useSetRecoilState(isLoggedInAtom);

    // Initialize the form with validation using react-hook-form and Zod
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors: formErrors, isSubmitting: formIsSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    // Function to handle form submission
    const onSubmit: SubmitHandler<FormFields> = async (formData) => {
        // Check if password equal to confirm password
        if (formData.confirmPassword !== formData.password) {
            return setError("confirmPassword", {
                message: "Passwords do not match!",
            });
        }

        try {
            // Make API call to sign up
            const res = (await signupApi(
                formData.email,
                formData.password,
                formData.username
            )) as AxiosResponse<{ jwtToken: string }>;

            // On success, update the logged-in state and set the authentication token
            setLoggedIn(true);
            setAuthToken(res.data.jwtToken);
        } catch (err) {
            // Handle errors during API call
            if (err instanceof AxiosError && err.response) {
                // If there's a response error from the API, set it as a form error
                setError("root", { message: err.response.data.error });
            } else {
                // For unknown errors, set a generic error message
                setError("root", { message: "Unknown Error" });
            }
        }
    };

    // Return form methods and state for use in components
    return {
        register,
        handleSubmit,
        formErrors,
        formIsSubmitting,
        onSubmit,
    };
};
