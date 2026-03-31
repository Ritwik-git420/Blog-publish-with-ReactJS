import React from "react";
import { Link } from "react-router-dom";
import { Button, Inputbox, Logo } from "../index.js";
import authService from '../../appwrite/auth'
import { useForm } from "react-hook-form";

function Signup() {
    const { register, handleSubmit ,formState: { errors } } = useForm()
    console.log(errors)

    const handleSignup = async (data) => {
        try {
            const userData = await authService.createAccount(
                data.email,
                data.password,
                data.name
            )
            console.log("User created:", userData)
        }
        catch (error) {
            console.log("Signup error:", error)
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
                    Sign up to create account
                </h2>

                {/* Login link */}
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-500 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {/* Form */}
                <form className="mt-8"
                    onSubmit={handleSubmit(handleSignup)}>
                    <div className="space-y-5">

                        <Inputbox
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register(
                                "name", {
                                required: true,
                                maxLength: 20,
                                pattern: {
                                    value: /^[A-Za-z\s]{2,50}$/,
                                    message: "Invalid name"
                                }

                            }
                            )}
                        />

                        <Inputbox
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            {...register(
                                "email", {
                                required: true,
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address"
                                }

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
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Password must be strong"
                                }
                            }
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"

                        >
                            Create Account
                        </Button>

                    </div>
                </form>

            </div>

        </div>
    );
}

export default Signup;