import Logo from "../ui/Logo";
import Container from "../ui/Container";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout as Logoutstate} from '../../store/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authstatus = useSelector((state) => state.auth.status)

    const handleLogout = async() => {
        try {
            await authService.logout();
            dispatch(Logoutstate())
            navigate("/")
            console.log("Logout succesful")            
        } 
        catch (error) {
            console.log("Logout error - ", error)
        }
    }

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true,
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authstatus,

        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authstatus,

        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authstatus,

        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authstatus,

        },
        {
            name: 'logout',
            onClick: handleLogout,
            active: authstatus,
        }
    ]
    return (
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex items-center">
                    <div className="mr-4">
                        <Logo width="70px" />
                    </div>

                    {/* NAVIGATION RENDERING */}

                    <ul className="ml-auto flex">
                        {navItems.map((item) => 
                            item.active ? (
                            <li key={item.name}>
                                <button
                                    onClick={() => { 
                                        if(item.slug) 
                                        navigate(item.slug) 
                                        else
                                        item.onClick()
                                    }}
                                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                                    {item.name}
                                </button>
                            </li>

                        ) : null)}
                    </ul>

                </nav>
            </Container>
        </header>
    );
}

export default Header;