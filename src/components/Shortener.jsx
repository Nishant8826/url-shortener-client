import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { servicebaseurl } from "../App";


function Shortener() {
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

    return (
        <div className="card">
            <h1>URL Shortener</h1>

            <input
                type="url"
                placeholder="Enter a URL"
                value={inputURL}
                onChange={(e) => setInputURL(e.target.value)}
            />

            <br />

            <button onClick={shortenURL} disabled={loading}>
                {loading ? "Shortening…" : "Shorten"}
            </button>

            {error && <p className="error">{error}</p>}

            {shortURL && (
                <div className="result">
                    <p>Shortened URL:</p>
                    <a
                        href={shortURL}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {shortURL}
                    </a>
                </div>
            )}

        </div>
    )
}

export default Shortener;
