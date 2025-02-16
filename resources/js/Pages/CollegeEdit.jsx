import { useState } from "react";
import { router } from "@inertiajs/react";
import Header from "../components/Header";
import {
    AcademicCapIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, ArrowLeftIcon
} from "@heroicons/react/24/solid";

export default function CollegeEdit({ auth, college }) {
    const isAdmin = auth.user.user_role === "admin";

    const userLinks = [
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Colleges", href: "/admin/colleges" },
    ];

    const [form, setForm] = useState({
        collegeName: college.college_name,
        collegeCode: college.college_code,
        email: college.college_email,
        phoneNumber: college.college_phone_number,
        address: college.college_address,
        city: college.college_city,
        state: college.college_state,
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = { ...form };
        if (!form.password) {
            delete updatedData.password;
        }
        router.post(`/admin/update-college/${college.id}`, updatedData, {
            preserveScroll: true,
            onSuccess: () => alert("College updated successfully!"),
            onError: (errors) => console.error("Update error:", errors)
        });
    };

    return (
        <div>
            <Header user={auth.user} links={userLinks} />

            <div className="max-w-4xl mx-auto mt-6">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => router.visit("/admin/colleges")}
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg shadow"
                    >
                        <ArrowLeftIcon className="h-5 w-5" /> Back
                    </button>
                    <h2 className="text-2xl font-bold text-center flex-1">Edit College Details</h2>
                </div>

                <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <div className="space-y-4">
                        {[
                            { label: "College Name", icon: AcademicCapIcon, name: "collegeName", editable: true },
                            { label: "College Code", icon: AcademicCapIcon, name: "collegeCode", editable: false },
                            { label: "Email", icon: EnvelopeIcon, name: "email", editable: false },
                            { label: "Phone", icon: PhoneIcon, name: "phoneNumber", editable: true },
                            { label: "Address", icon: MapPinIcon, name: "address", editable: true },
                            { label: "City", icon: MapPinIcon, name: "city", editable: true },
                            { label: "State", icon: MapPinIcon, name: "state", editable: true },
                            { label: "New Password", icon: AcademicCapIcon, name: "password", editable: true },
                        ].map(({ label, icon: Icon, name, editable }) => (
                            <div key={name} className="flex items-center justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <Icon className="h-5 w-5 text-blue-600 mr-2" /> {label}:
                                </span>
                                <input
                                    type={name === "password" ? "password" : "text"}
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                    className={`w-72 p-2 border rounded-md ${editable ? "" : "bg-gray-200"}`}
                                    readOnly={!editable}
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition mt-4"
                    >
                        Update College
                    </button>
                </form>
            </div>
        </div>
    );
}