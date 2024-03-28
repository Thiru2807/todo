import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
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
            const response = await axios.post("http://localhost:4000/signup", data);
            console.log("User signed up successfully:", response.data);
            navigate('/');
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Server responded with an error:", error.response.data);
                setErrorMessage(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received from server:", error.request);
                setErrorMessage("No response received from server");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error setting up the request:", error.message);
                setErrorMessage(error.message);
            }
        }
    }
    // function onSubmit(data) {
    //     console.log("Submit button is clicked", data)
    //     navigate('/home')
    // }
    return (
        <>
            <div className="  flex flex-row justify-center items-center bg-violet-200">
                <form className="flex flex-col w-[400px] h-[600px] justify-center" onSubmit={handleSubmit(onSubmit)}>

                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        className="
                            w-full h-[44px] px-2 py-1 border border-gray-300
                            placeholder-gray-500 text-gray-700 rounded-md
                            focus:outline-none focus:ring-indigo-500
                            focus:border-indigo-500 "
                        {...register("user_name", { required: 'Name is required' })} />
                    <p className="text-red-500 text-xs">{errors?.name?.message}</p><br />
                    <input
                        type="text"
                        id="phoneNumber"
                        placeholder="Phone Number"
                        className="
                            w-full h-[44px] px-2 py-1 border border-gray-300
                            placeholder-gray-500 text-gray-700 rounded-md
                            focus:outline-none focus:ring-indigo-500
                            focus:border-indigo-500 "
                        {...register("phone_number", {
                            required: 'Phone Number is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Phone number must be 10 digits"
                            }
                        })} />
                    <p className="text-red-500 text-xs">{errors?.phoneNumber?.message}</p><br />
                    <input
                        type="text"
                        id="email"
                        placeholder="Email Address"
                        className="
                            w-full h-[44px] px-2 py-1 border border-gray-300
                            placeholder-gray-500 text-gray-700 rounded-md
                            focus:outline-none focus:ring-indigo-500
                            focus:border-indigo-500 "
                        {...register("email", {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                message: "Please enter a valid email address"
                            }
                        })} />
                    <p className="text-red-500 text-xs">{errors?.email?.message}</p><br />
                    
                    <input
                        type="password"
                        id="age"
                        placeholder="Password"
                        className="
                        w-full h-[44px] px-2 py-1 border border-gray-300
                        placeholder-gray-500 text-gray-700 rounded-md
                        focus:outline-none focus:ring-indigo-500
                        focus:border-indigo-500 "
                        {...register("password", { required: 'Password is required' })} />
                    <p className="text-red-500 text-xs">{errors?.password?.message}</p><br />
                    <input
                        type="password"
                        id="age"
                        placeholder="Confirm Password"
                        className="
                        w-full h-[44px] px-2 py-1 border border-gray-300
                        placeholder-gray-500 text-gray-700 rounded-md
                        focus:outline-none focus:ring-indigo-500
                        focus:border-indigo-500 "
                        {...register("cpassword", { required: 'Confirm Password is required' })} />
                    <p className="text-red-500 text-xs">{errors?.cpassword?.message}</p>
                    <button className="mt-4 mb-2 px-5 h-12 w-full text-white bg-violet-500 hover:bg-violet-600 rounded-md"
                        type='submit' >SignUp</button>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <p>Already Registered? <a href="/" className="text-violet-600">sign in</a></p>
                </form>
            </div>



        </>
    );
}

export default SignUp;