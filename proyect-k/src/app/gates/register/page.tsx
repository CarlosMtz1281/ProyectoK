import React from "react";
import RegistrationForm from "@/components/Authentication/RegistrationForm";
import "@/styles/Authentication.css"

export default function RegisterPage () {
    return (
        <div className = "AuthenticationBody" >
            <RegistrationForm />
        </div>
    );
}