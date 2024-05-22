import React from "react";
import AuthenticationForm from "@/components/Authentication/AuthenticationForm";
import "@/styles/Authentication.css";

export default function LoginPage() {
  return (
    <div className="AuthenticationBody">
      <AuthenticationForm />
    </div>
  );
}
