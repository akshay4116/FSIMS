import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        user_email: "",
        user_password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* ✅ FSIMS Logo Centered Above Card */}
            <div className="flex items-center gap-2 mb-4">
                <AcademicCapIcon className="h-8 w-8 text-blue-500" />
                <span className="text-xl font-bold text-gray-800">FSIMS</span>
            </div>

            {/* ✅ Login Card */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                {errors.error && <p className="text-red-500 text-center">{errors.error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold">Email</label>
                        <input
                            type="email"
                            value={data.user_email}
                            onChange={(e) => setData("user_email", e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Password</label>
                        <input
                            type="password"
                            value={data.user_password}
                            onChange={(e) => setData("user_password", e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600"
                        disabled={processing}
                    >
                        {processing ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
