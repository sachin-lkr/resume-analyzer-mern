import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from "react";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="h-48 w-48 animate-spin rounded-full border-4 border-[#E2E8F0] border-t-[#6366F1] border-r-[#8B5CF6]"></div>
      </main>
    );
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default Protected;
