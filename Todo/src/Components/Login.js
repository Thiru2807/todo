import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const [errorMessage, setErrorMessage] = useState("");
    console.log(errors)
    const navigate = useNavigate();

    async function onSubmit(data) {
        try {
            const response = await axios.post("http://localhost:4000/signin", data);
            console.log("Login successful:", response.data);
            navigate('/home');
        } catch (error) {
            if (error.response) {
                console.error("Server responded with an error:", error.response.data);
                setErrorMessage(error.response.data.message);
            } else {
                console.error("Error occurred while logging in:", error.message);
                setErrorMessage("An unexpected error occurred. Please try again later.");
            }
        }
    }

    // function onSubmit(data) {
    //     console.log("Submit button is clicked", data)
    //     navigate('/home')
    // }
    return (
        <>
            <div className="flex flex-row justify-center items-center bg-violet-200">
                <form className="flex flex-col w-[400px] h-[600px] justify-center" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        id="email"
                        placeholder="Email Address"
                        className="
                                w-full h-[44px] px-2 py-1 border border-gray-300
                                placeholder-gray-500 text-gray-700 rounded-md
                                focus:outline-none focus:ring-indigo-500
                                focus:border-indigo-500 "
                        {...register("email", { required: 'Email is required' })} />
                    <p className="text-red-500 mt-1 text-xs">{errors?.email?.message}</p>
                    <br /><input
                        type="text"
                        id="password"
                        placeholder="Password"
                        className="
                                w-full h-[44px] px-2 py-1 border border-gray-300
                                placeholder-gray-500 text-gray-700 rounded-md
                                focus:outline-none focus:ring-indigo-500
                                focus:border-indigo-500 "
                        {...register("password", { required: 'Password is required' })} />
                    <p className="text-red-500 mt-1 text-xs">{errors?.password?.message}</p>
                    <button className="mt-4 mb-2 px-5 h-12 w-full text-white bg-violet-500 hover:bg-violet-600 rounded-md"
                        type='submit' >Login</button>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <p>Don't have an account? <a href="signup" className="text-violet-600">Signup</a></p>

                </form>
            </div>

        </>
    );
}

export default Login;