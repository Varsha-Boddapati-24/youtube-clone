import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showModal, setShowModal] = useState(false)

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const navigate=useNavigate()

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validateRegister = () => {
        let isValid = true;

        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");

        if (!username.trim()) {
            setUsernameError("Username is required.");
            isValid = false;
        }

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
            setPasswordError(
                "Password must be 8+ characters with uppercase, number, and special char."
            );
            isValid = false;
        }

        if (!confirmPassword.trim()) {
            setConfirmPasswordError("Please confirm your password.");
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateRegister()) {
            console.log("Register form submitted:", { username, email, password });
            // Proceed with API call or further logic
        }
    };

    return (
        <div className="py-10 flex items-center justify-center px-4 bg-gray-50 ">
            <div className="max-w-md w-full md:max-w-xl  bg-white p-8 rounded-lg shadow-md ">
                <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Register</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-1 font-medium text-gray-700">
                            Username
                        </label>
                        <input id="username" name="username" type="text" placeholder="Your username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-black"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                            Email
                        </label>
                        <input id="email" name="email" type="email" placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                            Password
                        </label>
                        <input id="password" name="password" type="password" placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-black"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmPasswordError && (
                            <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
                        )}
                    </div>

                    <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                        onClick={() => setShowModal(true)}>
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-red-600 hover:underline">
                        Sign in here
                    </Link>
                </p>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center border-2 border-green-600">
                        <h2 className="text-2xl font-semibold text-green-600 mb-4">Registration Successful!</h2>
                        <p className="mb-6">You can now log in with your credentials.</p>
                        <button
                            onClick={() => navigate('/signin')}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            Go to SignIn
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
