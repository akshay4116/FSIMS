import Header from "../components/Header";
import { Link } from "@inertiajs/react";

import {
    DocumentIcon, AcademicCapIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, GlobeAltIcon, IdentificationIcon,
    ClockIcon, CheckCircleIcon, XCircleIcon, ArrowLeftIcon, ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/solid";

export default function StudentView({ auth, student }) {
    const isAdmin = auth.user.user_role === "admin";
    const isCollege = auth.user.user_role === "college";

    // ✅ Sidebar Links Based on Role
    const userLinks = isAdmin
        ? [
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Colleges", href: "/admin/colleges" },
            { label: "Students", href: "/admin/students" },
        ]
        : [
            { label: "Dashboard", href: "/college/dashboard" },
            { label: "Students", href: "/college/students" },
        ];

    // ✅ Visa Status UI
    const visaBgColor =
        student.student_visa_status === "Approved" ? "bg-green-500" :
            student.student_visa_status === "Pending" ? "bg-yellow-500" :
                "bg-red-500";

    const visaIcon =
        student.student_visa_status === "Approved" ? <CheckCircleIcon className="h-10 w-10 text-white" /> :
            student.student_visa_status === "Pending" ? <ClockIcon className="h-10 w-10 text-white" /> :
                <XCircleIcon className="h-10 w-10 text-white" />;

    // ✅ Determine Back URL Based on Role
    const backUrl = auth.user.user_role === "admin" ? "/admin/students" : "/college/students";


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
                    <h2 className="text-2xl font-bold text-center flex-1">Student Details</h2>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* ✅ Left Side - Student Details (Full Height) */}
                    <div className="col-span-2 bg-gray-100 p-4 rounded-lg shadow-md h-full">
                        <h3 className="text-lg font-bold mb-4 flex items-center">
                            <IdentificationIcon className="h-6 w-6 text-blue-600 mr-2" /> Student Information
                        </h3>
                        <ul className="space-y-3 text-lg">
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <AcademicCapIcon className="h-5 w-5 text-blue-600 mr-2" /> Name:
                                </span>
                                <span>{student.student_name}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <EnvelopeIcon className="h-5 w-5 text-green-600 mr-2" /> Email:
                                </span>
                                <span>{student.student_email}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <PhoneIcon className="h-5 w-5 text-indigo-600 mr-2" /> Phone:
                                </span>
                                <span>{student.student_phone_number}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <AcademicCapIcon className="h-5 w-5 text-purple-600 mr-2" /> College:
                                </span>
                                <span>{student.college_code}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <MapPinIcon className="h-5 w-5 text-red-600 mr-2" /> Address:
                                </span>
                                <span>{student.student_address}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <GlobeAltIcon className="h-5 w-5 text-yellow-600 mr-2" /> Country:
                                </span>
                                <span>{student.student_country}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <IdentificationIcon className="h-5 w-5 text-gray-600 mr-2" /> Passport No:
                                </span>
                                <span>{student.student_passport_number}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="flex items-center">
                                    <IdentificationIcon className="h-5 w-5 text-gray-700 mr-2" /> Visa No:
                                </span>
                                <span>{student.student_visa_number}</span>
                            </li>
                        </ul>
                        {/* ✅ Uploaded Documents Section */}
                        <div className="mt-6">
                            <h3 className="text-lg font-bold mb-4 flex items-center">
                                <DocumentIcon className="h-6 w-6 text-blue-600 mr-2" /> Uploaded Documents
                            </h3>
                            <ul className="space-y-3 text-lg">
                                {/* Passport Copy */}
                                {student.passport_copy ? (
                                    <li className="flex justify-between border-b pb-2">
                                        <span className="flex items-center">
                                            <DocumentIcon className="h-5 w-5 text-gray-600 mr-2" /> Passport Copy:
                                        </span>
                                        <a
                                            href={`/storage/${student.passport_copy}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-700 underline"
                                        >
                                            View PDF
                                        </a>
                                    </li>
                                ) : (
                                    <li className="text-gray-400">Passport Copy: Not Uploaded</li>
                                )}

                                {/* Visa Document */}
                                {student.visa_document ? (
                                    <li className="flex justify-between border-b pb-2">
                                        <span className="flex items-center">
                                            <DocumentIcon className="h-5 w-5 text-gray-600 mr-2" /> Visa Document:
                                        </span>
                                        <a
                                            href={`/storage/${student.visa_document}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-700 underline"
                                        >
                                            View PDF
                                        </a>
                                    </li>
                                ) : (
                                    <li className="text-gray-400">Visa Document: Not Uploaded</li>
                                )}

                                {/* Academic Certificate */}
                                {student.academic_certificate ? (
                                    <li className="flex justify-between">
                                        <span className="flex items-center">
                                            <DocumentIcon className="h-5 w-5 text-gray-600 mr-2" /> Academic Certificate:
                                        </span>
                                        <a
                                            href={`/storage/${student.academic_certificate}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-700 underline"
                                        >
                                            View PDF
                                        </a>
                                    </li>
                                ) : (
                                    <li className="text-gray-400">Academic Certificate: Not Uploaded</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* ✅ Right Side - Visa Status & Comments */}
                    <div className="flex flex-col gap-6">
                        {/* ✅ Visa Status */}
                        <div className={`${visaBgColor} text-white p-4 rounded-lg shadow-md flex justify-between items-center`}>
                            <h3 className="text-lg font-bold">Visa Status</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold">{student.student_visa_status}</span>
                                {visaIcon}
                            </div>
                        </div>

                        {/* ✅ Comments Section */}
                        <div className="flex flex-col gap-4 h-full">
                            {/* ✅ College Comments */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md flex-1 flex flex-col">
                                <h3 className="text-lg font-bold flex items-center mb-2">
                                    <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-blue-600 mr-2" />
                                    College Comments
                                </h3>
                                <div className="overflow-y-auto max-h-40 flex-1">
                                    {student.college_comments ? (
                                        <p className="text-gray-700 text-lg">{student.college_comments}</p>
                                    ) : (
                                        <p className="text-gray-400">No comments available</p>
                                    )}
                                </div>
                            </div>

                            {/* ✅ Admin Comments */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md flex-1 flex flex-col">
                                <h3 className="text-lg font-bold flex items-center mb-2">
                                    <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-red-600 mr-2" />
                                    Admin Comments
                                </h3>
                                <div className="overflow-y-auto max-h-40 flex-1">
                                    {student.admin_comments ? (
                                        <p className="text-gray-700 text-lg">{student.admin_comments}</p>
                                    ) : (
                                        <p className="text-gray-400">No comments available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
