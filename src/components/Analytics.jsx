import { useEffect, useState } from "react";
import "../App.css";
import { auth, provider, signInWithPopup } from "../config/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/authSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";

function Analytics() {
    const currentUser = useSelector((state) => state.currentUser.user);
    const [showLogin, setShowLogin] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = Cookies.get("authUser");
        const token = Cookies.get("authToken");
        if (storedUser && token) {
            dispatch(setUser({ user: JSON.parse(storedUser), token }));
        }
    }, []);

    const analyticBtn = async () => {
        console.log(currentUser)
        try {
            if (currentUser?.email) {
                navigate("/analytics");

            } else {
                // for firebase authentication 
                // const result = await signInWithPopup(auth, provider);
                // const user = result.user;
                // const token = await user.getIdToken();
                // 
                // const firebaseUser = {
                //     uid: user.uid,
                //     email: user.email,
                //     displayName: user.displayName,
                //     photoURL: user.photoURL,
                //     providerData: user.providerData,
                // };

                // Cookies.set("authUser", JSON.stringify(firebaseUser), { expires: 1 / (24 * 60) });
                // Cookies.set("authToken", token, { expires: 1 / (24 * 60) });

                // dispatch(setUser({ user: firebaseUser, token }));

                setShowLogin(true)

            }
        } catch (err) {
            console.error("Login error:", err.message);
        }
    };

    return (
        <>
            <div className="flex justify-end mt-10">
                <button onClick={analyticBtn} className="mb-4 px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md transition">
                    View Analytics
                </button>
            </div>
            {
                showLogin && (
                    <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} />
                )
            }
        </>
    );
}

export default Analytics;
