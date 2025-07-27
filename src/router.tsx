import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminRoutes from "./pages/AdminRoutes";
import DashBoard from "./pages/Dashboard";
import ReaderPage from "./pages/ReaderPage";
import BookPage from "./pages/BookPage";
import LendingPage from "./pages/LendingPage";
import Layout from "./pages/Layout";




const router = createBrowserRouter([
    {path: "/", element: <Layout/>,
    children: [
        { path: "/", element: <LoginPage /> },
         { path: "/login", element: <LoginPage /> },
        //  { path: "/signup", element: <Signup /> },
        {element: <AdminRoutes/>,
        children: [
            {path: "/dashboard", element: <DashBoard/>},
            {path: "/dashboard/readers", element: <ReaderPage/>},
            {path: "/dashboard/books", element: <BookPage/>},
            {path: "/dashboard/lendings", element: <LendingPage/>},
        ]


        }
    ]
    }
])

export default router