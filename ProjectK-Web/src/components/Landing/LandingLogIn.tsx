import React from 'react';
import "@/styles/Landing/LandingButtons.css"

export type LandingLogInProps = {
    onClick: () => void;
}

function LandingLogin({onClick}: LandingLogInProps) {
    return (
        <button className = "LandingLogin" onClick={onClick}>
            Iniciar sesión
        </button>
    );
};

export default LandingLogin;