import React from 'react';
import "@/styles/Landing/LandingButtons.css"

export type LandingRegisterProps = {
    onClick: () => void;
}

function LandingRegister({onClick}: LandingRegisterProps) {
    return (
        <button className = "LandingRegister" onClick={onClick}>
            Crear cuenta
        </button>
    );
};

export default LandingRegister;