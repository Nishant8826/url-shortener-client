import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { servicebaseurl } from '../config';
import Cookies from "js-cookie";
import { setUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const formInitial = {
    email: '',
    password: '',
    displayName: ''
}

const LoginModal = ({ showLogin, setShowLogin }) => {
    const theme = useSelector((state) => state.theme.theme);
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const [isSignup, setIsSignup] = useState(false);
    const [form, setForm] = useState(formInitial);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (isSignup && !form.displayName?.trim()) {
            newErrors.displayName = 'Display Name is required';
        }

        if (!form.email?.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!form.password?.trim()) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            let result;
            if (isSignup) {
                const data = await axios.post(`${servicebaseurl}user/signup`, form)
                result = data.data;
                if (result && result.msg) setErrors({ email: result.msg })
            } else {
                const data = await axios.post(`${servicebaseurl}user/login`, form)
                result = data.data;
                if (result && result.msg) setErrors({ [result.type]: result.msg })
            }
            if (result && result.user && result.token) {

                Cookies.set("authUser", JSON.stringify(result.user), { expires: 1 / (24 * 60) });
                Cookies.set("authToken", result.token, { expires: 1 / (24 * 60) });

                dispatch(setUser({ user: result.user, token: result.token }))

                setForm(formInitial);
                navigation('/analytics');
            }
        }
    };

    if (!showLogin) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    {isSignup ? 'Sign Up' : 'Log In'}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {isSignup && (
                        <>
                            <input
                                type="text"
                                placeholder="Display Name"
                                className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
                                value={form.displayName || ''}
                                onChange={(e) => setForm(prev => ({ ...prev, displayName: e.target.value }))}
                            />
                            {errors.displayName && <span className="text-red-500 text-sm">{errors.displayName}</span>}
                        </>
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
                        value={form.email || ''}
                        onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

                    <input
                        type="password"
                        placeholder="Password"
                        className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
                        value={form.password || ''}
                        onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                    >
                        {isSignup ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        type="button"
                        className="text-blue-600 hover:underline font-medium"
                        onClick={() => {
                            setIsSignup(!isSignup);
                            setErrors({});
                        }}
                    >
                        {isSignup ? 'Log In' : 'Sign Up'}
                    </button>
                </p>

                <button
                    onClick={() => {
                        setShowLogin(false);
                        setErrors({});
                    }}
                    className="mt-4 text-red-600 hover:underline text-sm font-medium"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default LoginModal;
