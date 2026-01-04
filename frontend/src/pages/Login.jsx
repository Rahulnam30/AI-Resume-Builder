import LoginArt from '../assets/Login Art.png';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Input from '../components/Input';
import SocialButton from '../components/SocialButton';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="flex min-h-screen w-full">
            {/* Left Section (Form Area) */}
            <div className="flex w-full flex-col justify-center px-8 sm:px-12 lg:w-1/2 xl:px-24 bg-white">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto w-full max-w-sm"
                >
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group mb-8 w-fit" data-discover="true">
                        <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white transition-transform group-hover:scale-105">
                            <span className="material-symbols-outlined text-xl">description</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">Resume<span className="text-primary-hover">AI</span></span>
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                            Welcome Back <span role="img" aria-label="wave">👋</span>
                        </h1>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Today is a new day. It's your day. You shape it.
                            <br />
                            Sign in to start making your Resume.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <Input
                            label="Email"
                            placeholder="Example@email.com"
                            type="email"
                            id="email"
                            name="email"
                        />
                        <Input
                            label="Password"
                            placeholder="at least 8 characters"
                            type="password"
                            id="password"
                            name="password"
                        />

                        <div className="flex justify-end">
                            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                Forgot Password?
                            </a>
                        </div>

                        <Button fullWidth type="submit" className="mt-2">
                            Sign in
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or</span>
                        </div>
                    </div>

                    {/* Social Auth */}
                    <SocialButton />

                    {/* Footer */}
                    <div className="mt-8 text-center text-sm text-gray-600">
                        Don't you have an account?{' '}
                        <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
                            Sign up
                        </Link>
                    </div>

                    {/* Copyright */}
                    <div className="mt-12 text-center text-xs text-gray-400">
                        © 2026 ALL RIGHTS RESERVED
                    </div>
                </motion.div>
            </div>

            {/* Right Section (Showcase Area) */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#F3F4F6] relative items-center justify-center p-12 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative w-full max-w-3xl"
                >
                    <img
                        src={LoginArt}
                        alt="Login Art"
                        className="w-full h-auto object-contain"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
