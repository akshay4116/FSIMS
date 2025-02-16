import { useState } from "react";
import Header from "../components/Header";
import { router } from "@inertiajs/react";

export default function AddCollege({ auth }) {
    if (auth?.user?.user_role !== "admin") {
        router.visit("/admin/colleges");
        return null;
    }

    // ✅ Form State
    const [form, setForm] = useState({
        collegeName: "",
        collegeCode: "",
        collegeEmail: "",
        collegeAddress: "",
        collegeState: "",
        collegeCity: "",
        collegePhoneNumber: "",
        password: "", // ✅ Add Password Field
    });

    const [message, setMessage] = useState("");

    // ✅ Handle Input Changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/admin/store-college", form, {
            onSuccess: () => {
                setMessage("College added successfully!");
                setTimeout(() => setMessage(""), 3000); // ✅ Hide after 3 seconds
                setForm({
                    collegeName: "",
                    collegeCode: "",
                    collegeEmail: "",
                    collegeAddress: "",
                    collegeState: "",
                    collegeCity: "",
                    collegePhoneNumber: "",
                    password: "", // ✅ Clear password field
                });
            },
        });
    };

    return (
        <div>
            <Header user={auth.user} links={[
                { label: "Dashboard", href: "/admin/dashboard" },
                { label: "Colleges", href: "/admin/colleges" },
                { label: "Students", href: "/admin/students" },
            ]} />

            <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Add College</h2>

                {/* ✅ Success Message UI Alert */}
                {message && (
                    <div className="bg-green-500 text-white p-3 rounded-lg text-center mb-4">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        {/* LEFT SIDE */}
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">College Name:</label>
                                <input type="text" name="collegeName" value={form.collegeName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="mb-4 flex gap-2">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 font-bold mb-2">College Code:</label>
                                    <input type="text" name="collegeCode" value={form.collegeCode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
                                </div>
                                <div className="w-1/2"><label className="block text-gray-700 font-bold mb-2">Phone Number:</label>
                                    <input type="text" name="collegePhoneNumber" value={form.collegePhoneNumber} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Email:</label>
                                <input type="email" name="collegeEmail" value={form.collegeEmail} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>


                        </div>

                        {/* RIGHT SIDE */}
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Address:</label>
                                <input type="text" name="collegeAddress" value={form.collegeAddress} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>

                            <div className="mb-4 flex gap-2">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 font-bold mb-2">State:</label>
                                    <input type="text" name="collegeState" value={form.collegeState} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-gray-700 font-bold mb-2">City:</label>
                                    <input type="text" name="collegeCity" value={form.collegeCity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
                                </div>
                            </div>


                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Password:</label>
                                <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition">
                        Add College
                    </button>
                </form>
            </div>
        </div>
    );
}
