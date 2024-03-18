import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = ({isScrolled}) => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
        <div className="login-logout">
            <button className={`btn-login-logout ${isScrolled ? 'btn-scrolled-log' : ''}`} onClick={() => loginWithRedirect()}>
            Log in
            </button>
        </div>
        )
    )
}

export default Login;