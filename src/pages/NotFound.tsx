import React from "react";
import { Link } from "react-router";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page Not Found</p>
      <Link to="/" className="text-primary hover:underline">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
