import Header from "../components/Header";
import { Link } from "@inertiajs/react";
import {
    AcademicCapIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, GlobeAltIcon, IdentificationIcon,
    ArrowLeftIcon
} from "@heroicons/react/24/solid";

export default function CollegeView({ auth, college }) {
    const isAdmin = auth.user.user_role === "admin";

    // ✅ Sidebar Links
    const userLinks = [
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Colleges", href: "/admin/colleges" },
        { label: "Students", href: "/admin/students" },
    ];

    // ✅ Determine Back URL
    const backUrl = "/admin/colleges";

    return (
        <div>
            {/* ✅ Header */}
            <Header user={auth.user} links={userLinks} />

            <div className="max-w-7xl mx-auto mt-6">
                <div className="flex items-center justify-between mb-6">
                    {/* ✅ Back Button */}
                    <Link
                        href={backUrl}
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg shadow transition"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                        Back
                    </Link>

                    {/* ✅ Centered Page Title */}
                    <h2 className="text-2xl font-bold text-center flex-1">College Details</h2>
                </div>

                <div className="flex justify-center items-center">
                    <div className="max-w-3xl w-full bg-white">

                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <ul className="space-y-3 text-lg">
                                {[
                                    { label: "College Name", icon: AcademicCapIcon, value: college.college_name },
                                    { label: "College Code", icon: IdentificationIcon, value: college.college_code },
                                    { label: "Email", icon: EnvelopeIcon, value: college.college_email },
                                    { label: "Phone", icon: PhoneIcon, value: college.college_phone_number },
                                    { label: "Address", icon: MapPinIcon, value: college.college_address },
                                    { label: "State", icon: GlobeAltIcon, value: college.college_state },
                                    { label: "City", icon: GlobeAltIcon, value: college.college_city },
                                ].map(({ label, icon: Icon, value }) => (
                                    <li key={label} className="flex justify-between border-b pb-2">
                                        <span className="flex items-center">
                                            <Icon className="h-5 w-5 text-blue-600 mr-2" /> {label}:
                                        </span>
                                        <span className="font-semibold">{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
