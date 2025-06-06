import { useState } from "react";
import {Link,useNavigate} from "react-router-dom"
export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate=useNavigate()

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validateLogin = () => {
        let isValid = true;
        setEmailError("");
        setPasswordError("");

        if (!email.trim()) {
            setEmailError("Email is required.");
            isValid = false;
        } else if (!emailPattern.test(email)) {
            setEmailError("Invalid email format.");
            isValid = false;
        }

        if (!password.trim()) {
            setPasswordError("Password is required.");
            isValid = false;
        } else if (!passwordPattern.test(password)) {
            setPasswordError("Password must be 8+ characters with capital, number, and special char.");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateLogin()) {
            console.log("Form submitted:", email, password);
        }
    };
    return (
        <div className="py-10 flex items-center justify-center px-4 z-40">
            <div className="max-w-md w-full  md:max-w-lg  bg-white   p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Sign In</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
                        <input id="email" name="email" type="email" placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-black"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="text-red-500  text-sm mt-1">{emailError}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
                        <input id="password" name="password" type="password" placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-black"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>
                    {/* {error && <p className="text-red-500 text-sm mb-3">{error}</p>} */}

                    <button type="submit" onClick={()=>navigate("/")}
                        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition mb-6" >
                        Sign In
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-red-600 hover:underline">
                      Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
