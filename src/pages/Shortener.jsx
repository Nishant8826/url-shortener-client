import { useState } from "react";
import axios from "axios";
import "../App.css";
import Analytics from "../components/Analytics";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { servicebaseurl } from "../config";

function Shortener() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme)
    const [inputURL, setInputURL] = useState("");
    const [shortURL, setShortURL] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function shortenURL() {
        if (!inputURL) {
            setError("Please enter a URL.");
            return;
        }
        setLoading(true);
        setError(null);
        setShortURL(null);

        try {
            const response = await axios.post(`${servicebaseurl}shorten`, { longUrl: inputURL });
            if (response?.data?.short_code) {
                setShortURL(`${servicebaseurl}${response.data.short_code}`);
            } else {
                throw new Error("Invalid response from server.");
            }
        } catch (err) {
            setError(err?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    const changeTheme = () => {
        dispatch(toggleTheme())
    };


    return (
        <div className={`${theme == 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen p-6 transition-all duration-300`}>

            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-4">URL's Analytics</h2>

                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={changeTheme}
                        className="px-4 py-2 rounded-lg text-sm font-medium shadow bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                        {theme === 'dark' ? <CiLight /> : <MdDarkMode />}
                    </button>
                </div>
            </div>


            <div className="flex flex-col items-center mt-5">

                <div className={`${theme == 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} w-full max-w-md shadow-lg rounded-2xl p-6`}>
                    <h1 className="text-3xl font-bold text-center mb-6">
                        URL Shortener
                    </h1>

                    <input
                        type="url"
                        placeholder="Enter a URL"
                        value={inputURL}
                        onChange={(e) => setInputURL(e.target.value)}
                        className={`${theme == 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-300'
                            : 'bg-gray-100 border-gray-300 text-black placeholder-gray-500'
                            } w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4`}
                    />

                    <button
                        onClick={shortenURL}
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition-colors ${loading
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {loading ? "Shortening…" : "Shorten"}
                    </button>

                    {error && (
                        <p className="mt-4 text-red-500 text-sm font-medium text-center">{error}</p>
                    )}

                    {shortURL && (
                        <div className="mt-6 text-center">
                            <p className={`${theme == 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}>Shortened URL:</p>
                            <a
                                href={shortURL}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-400 hover:underline break-all"
                            >
                                {shortURL}
                            </a>
                        </div>
                    )}
                </div>

                <Analytics />

            </div>
        </div>
    );
}

export default Shortener;
