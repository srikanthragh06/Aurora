import { signinApi } from "@/api/auth";
import { isLoggedInAtom } from "@/state/auth";
import { setAuthToken } from "@/utils/token";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { z } from "zod";

// Validation Schema for Sign in
const schema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z
        .string()
        .min(10, "Must be at least 10 characters long")
        .max(32, "Must be at most 32 characters long"),
});

// Type inferred from the validation schema
type FormFields = z.infer<typeof schema>;

// Interface for the expected response from the Signin api
interface SigninResponse {
    jwtToken: string;
}

export const useSigninForm = () => {
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

    // Submission handler
    const onSubmit: SubmitHandler<FormFields> = async (formData) => {
        try {
            // Make sign in api call
            const res = (await signinApi(
                formData.email,
                formData.password
            )) as AxiosResponse<SigninResponse>;

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
