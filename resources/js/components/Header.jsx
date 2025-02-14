import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { AcademicCapIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

export default function Header({ user, links }) {
    //console.log("Header User Data:", user);
    const { post } = useForm();

    const handleLogout = () => {
        post("/logout");
    };

    return (
        <header className="bg-white shadow-md py-3 px-6  w-full ">
            <div className="max-w-7xl flex justify-between items-center mx-auto">
                {/* Left Side: Logo + FSIMS */}
                <div className="flex items-center gap-2">
                    <AcademicCapIcon className="h-8 w-8 text-blue-500" />
                    <span className="text-xl font-bold text-gray-800">FSIMS</span>
                </div>

                {/* Center: Dynamic Navigation Links */}
                <nav className="flex space-x-6">
                    {links.map((link, index) => (
                        <Link key={index} href={link.href} className="text-gray-700 hover:text-blue-500 font-medium">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Side: Logged-in User & Logout */}
                <div className="flex items-center gap-3">
                    <span className="text-gray-800 font-medium">{user?.user_email || "Guest"}</span>
                    <button onClick={handleLogout} className="flex items-center bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                        <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
