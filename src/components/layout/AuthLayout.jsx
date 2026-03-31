import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useEffect} from "react";

function AuthLayout({ authentication = true }) {
    const navigate = useNavigate()
    const authstatus = useSelector((state) => state.auth.status);

    //  lets do authpages first what is authentication 
    // if true = this component/route need user to be logged in, 

    useEffect(() => {
        if (authentication && !authstatus) {
            navigate("/login")
        }

        if (!authentication && authstatus) {
            navigate("/")
        }
    }, [authstatus, navigate])


    return (
        <div className="">
            <Outlet />
        </div>
    );
}

export default AuthLayout;