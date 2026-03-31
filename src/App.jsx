import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { Header, Footer, Container, Signup, Login, Home, AllPost, AddPost } from "./components/index";
import Layout from "./components/layout/Layout";
import AuthLayout from './components/layout/AuthLayout'
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { login as loginstate, logout as logoutstate } from './store/authSlice'
import authService from './appwrite/auth'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                element: <AuthLayout authentication={true}/>,
                children: [
                    {
                        path: "/all-posts",
                        element: <AllPost />,
                    }
                ],
            },
            {
                element: <AuthLayout authentication={true}/>,
                children: [
                    {
                        path: "/add-post",
                        element: <AddPost />,
                    }
                ],
            },
        ],
    },
    {
        element: <AuthLayout authentication={false}/>,
        children: [
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
        ],
    },
]);

function App() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkuser = async () => {
            try {
                const user = await authService.getCurrentUser()
                if (user) dispatch(loginstate(user))
                else dispatch(logoutstate())
            }
            catch (error) {
                console.log("Cant detect user")
            }
            finally {
                setLoading(false)
            }
        }
        checkuser()
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }
    return <RouterProvider router={router} />;
}
export default App;
