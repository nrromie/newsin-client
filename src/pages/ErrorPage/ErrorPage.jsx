import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <section className="flex items-center h-screen p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
          <p className="mt-4 mb-8 dark:text-gray-400"><i>{error.statusText || error.message}</i></p>
          <Link to={'/'} className="px-8 py-3 font-semibold rounded-lg text-white bg-violet-500 hover:bg-violet-700">Back to homepage</Link>
        </div>
      </div>
    </section>
  );
}