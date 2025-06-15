import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { servicebaseurl } from "../App";


function Analytics() {
    const [analytics, setAnalytics] = useState([]);

    const [showAnalytics, setShowAnalytics] = useState(false);
    const [expandedId, setExpandedId] = useState(null);
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState({});
    const [error, setError] = useState(null);

    async function handleToggle(shortCode) {
        if (expandedId === shortCode) {
            setExpandedId(null);
            return;
        }
        setLoading((prev) => ({ ...prev, [shortCode]: true }))
        try {
            const res = await axios.get(`${servicebaseurl}analytics/${shortCode}`);
            const data = res?.data;

            setDetails((prev) => ({ ...prev, [shortCode]: data }))
            setExpandedId(shortCode);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading((prev) => ({ ...prev, [shortCode]: false }))
        }
    }

    async function fetchAnalytics() {
        try {
            const response = await axios.get(`${servicebaseurl}url/allcode`);
            const res = response?.data || []
            setAnalytics(res);
            setShowAnalytics(true);
        } catch (err) {
            setError(err?.message || "Unable to fetch analytics.");
        }
    }

    const close = () => {
        setShowAnalytics(false);
        setExpandedId(null);
    }

    return (
        <>
            <div className="header">
                <button onClick={fetchAnalytics} className="analyticsBtn">
                    View Analytics
                </button>
            </div>

            {error && <p className="error">{error}</p>}

            {showAnalytics && (
                <div className="modal" onClick={() => setShowAnalytics(false)}>
                    <div
                        className="modalContent"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span
                            className="closeBtn"
                            onClick={close}
                        >
                            ✕
                        </span>

                        <h2>All Shortened URLs</h2>

                        {analytics.length > 0 ? (
                            <ul>
                                {analytics.map((item, idx) => (
                                    <li key={idx}>
                                        <div
                                            className="linkHeader"
                                            onClick={() => handleToggle(item.short_code)}
                                        >
                                            <span>{expandedId === item.short_code ? "▲" : " ▼"}</span>

                                            <span>{`${servicebaseurl}${item.short_code}`}</span>
                                        </div>

                                        {expandedId === item.short_code && (
                                            <div className="linkDetails">
                                                {loading[item.short_code] ? (
                                                    <p>Loading...</p>
                                                ) : details[item.short_code] ? (
                                                    <>
                                                        <div className="detailBlock">
                                                            <h4>🔥 Summary</h4>
                                                            <p>Total Access: <span className="badge">{details[item.short_code].total}</span></p>
                                                        </div>

                                                        <div className="detailBlock">
                                                            <h4>⏱ Last Access</h4>
                                                            <ul>
                                                                {details[item.short_code].last_access?.map((acc, idx) => (
                                                                    <li key={idx}>
                                                                        {new Date(acc.accessed_at).toLocaleString()}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div className="detailBlock">
                                                            <h4>🔗 Referrers</h4>
                                                            <ul>
                                                                {details[item.short_code].referrers?.map((ref, idx) => (
                                                                    <li key={idx}>
                                                                        {ref.referrer} <span className="badge">{ref.count}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div className="detailBlock">
                                                            <h4>🌍 IP Addresses</h4>
                                                            <ul>
                                                                {details[item.short_code].ip_groups?.map((ip, idx) => (
                                                                    <li key={idx}>
                                                                        {ip.ip} <span className="badge">{ip.count}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <p>No details available</p>
                                                )}

                                            </div>
                                        )}

                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No URLs found.</p>
                        )}

                    </div>
                </div>
            )}

        </>
    )
}

export default Analytics;
