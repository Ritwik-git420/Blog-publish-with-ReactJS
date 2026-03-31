import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Inputbox, Logo } from "../index";
import authService from '../../appwrite/auth'
import { useForm } from "react-hook-form";
import {useSelector, useDispatch} from 'react-redux'
import {login as loginstate } from '../../store/authSlice'

function Login() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (data) => {
        try {
            const session = await authService.login(
                data.email,
                data.password
            )
            if(session){
                console.log("Login success");
                const user = await authService.getCurrentUser()
                dispatch(loginstate(user))
                navigate("/")
            }
                
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex items-center justify-center w-full min-h-screen">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">

                {/* Logo */}
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>

                {/* Signup Link */}
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-500 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {/* Form */}
                <form className="mt-8"
                    onSubmit={handleSubmit(handleLogin)}>
                    <div className="space-y-5">

                        <Inputbox
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            {...register(
                                "email", {
                                required: true,

                            }
                            )}
                        />

                        <Inputbox
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register(
                                "password", {
                                required: true,

                            }
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Sign in
                        </Button>

                    </div>
                </form>

            </div>
        </div>
    );
}

export default Login;