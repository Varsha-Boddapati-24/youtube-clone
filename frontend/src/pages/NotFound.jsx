import { Link, useRouteError } from "react-router-dom";

function NotFound() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      {error && (
        <p className="text-sm text-gray-500 mb-4">
          {error.status ? error.status : "Unknown Status"}
          {error.data && typeof error.data === "string" ? `, ${error.data.slice(6)}` : ""}
        </p>
      )}
      <Link
        to="/"
        className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
