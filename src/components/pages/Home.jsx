import React from 'react'
import { useSelector } from "react-redux";

function Home() {
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    return (
        <div>
            <h1>Home Page</h1>

            <p>Status: {authStatus ? "Logged In ✅" : "Logged Out ❌"}</p>

            <p>User: {userData ? userData.name : "No user"}</p>
        </div>
    )
}

export default Home
