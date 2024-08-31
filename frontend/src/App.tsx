import {
    RouteObject,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";

function App() {
    // Define route configuration
    const appRouter: RouteObject[] = [
        { path: "/", element: <div /> },
        { path: "/auth", element: <AuthPage /> },
        { path: "/*", element: <div /> },
    ];

    return (
        <div className="w-screen h-screen flex flex-col items-center text-3xl bg-background text-white dark">
            <RouterProvider router={createBrowserRouter(appRouter)} />
        </div>
    );
}

export default App;
