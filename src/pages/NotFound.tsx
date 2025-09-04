import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold mb-4">404 - Page not found</h1>
      <p className="text-muted-foreground mb-6 max-w-md">The page you are looking for doesn't exist or was moved.</p>
      <Link to="/" className="text-primary underline">Go back home</Link>
    </div>
  );
};

export default NotFound;
