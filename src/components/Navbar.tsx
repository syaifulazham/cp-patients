'use client';
import { useState } from "react";
import { useUser, SignOutButton, SignInButton } from '@clerk/nextjs';
import { motion } from "framer-motion";
import Link from "next/link";
import logo from '@/lib/images/carepod-green.png';
import Image from 'next/image';
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/patient/dashboard" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const { isSignedIn, user } = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold text-blue-500">
                    <Link href="/"><Image src={logo} alt="logo" width={35} height={35} /></Link>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="text-gray-800 hover:text-blue-500 transition">
                            {link.name}
                        </Link>
                    ))}
                    
                    {isSignedIn ? (
                        <Link href="/patient/profile" className="text-gray-800 hover:text-blue-500 transition">
                            {user?.firstName}
                        </Link>
                    ) : (
                        <></>
                    )}
                    {isSignedIn ? <SignOutButton>Sign Out</SignOutButton> : <SignInButton>Sign In</SignInButton>}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={handleToggle} aria-label="Toggle menu" className="text-gray-800 focus:outline-none">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: isOpen ? "auto" : 0 }}
                className="overflow-hidden md:hidden"
            >
                <div className="flex flex-col space-y-4 px-6 py-4 bg-gray-50">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="text-gray-800 hover:text-blue-500 transition">
                            {link.name}
                        </Link>
                    ))}
                    {isSignedIn ? (
                        <Link href="/patient/profile" className="text-white hover:border-b border-white rounded-md">
                            {user?.firstName}
                        </Link>
                    ) : (
                        <></>
                    )}
                    {isSignedIn ? <SignOutButton>Sign Out</SignOutButton> : <SignInButton>Sign In</SignInButton>}
                </div>
            </motion.div>
        </nav>
    );
}
