import React from "react";
import AuthenticationForm from "@/components/AuthenticationForm";
import "@/styles/Authentication.css"

export default function RegisterPage () {
    const authProps = {
        isRegistration: true,
        APIstring: "hellothereimpapu"
    }
    return (
        <div className = "AuthenticationBody" >
            <AuthenticationForm {...authProps} />
        </div>
    );
}