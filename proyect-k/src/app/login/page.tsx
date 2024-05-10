import React from "react";
import AuthenticationForm from "@/components/Authentication/AuthenticationForm";
import "@/styles/Authentication.css"

export default function LoginPage () {
    const authProps = {
        isRegistration: false,
        APIstring: "hellothereimpapu"
    }


    return (
        <div className = "AuthenticationBody" >
            <AuthenticationForm {...authProps} />
        </div>
    );
}