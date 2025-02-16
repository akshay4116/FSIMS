import Header from "../components/Header";
import {
    AcademicCapIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, GlobeAltIcon, IdentificationIcon,
    ClockIcon, CheckCircleIcon, XCircleIcon, ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/solid";

export default function StudentDashboard({ auth, student }) {
    if (!student) {
        return <p className="text-center text-red-600">Error: Student data not available.</p>;
    }

    const visaBgColor =
        student.student_visa_status === "Approved" ? "bg-green-500" :
            student.student_visa_status === "Pending" ? "bg-yellow-500" :
                "bg-red-500";

    const visaIcon =
        student.student_visa_status === "Approved" ? <CheckCircleIcon className="h-10 w-10 text-white" /> :
            student.student_visa_status === "Pending" ? <ClockIcon className="h-10 w-10 text-white" /> :
                <XCircleIcon className="h-10 w-10 text-white" />;

    const userLinks = [
        { label: "Dashboard", href: "/student/dashboard" },
    ];

    return (
        <div>
            {/* ✅ Header Component */}
            <Header user={auth?.user} links={userLinks} />

            <div className="max-w-7xl mx-auto mt-6">
                <h2 className="text-2xl font-bold text-center mb-6">Student Dashboard</h2>

                {/* ✅ Visa Status (Full Width) */}
                <div className={`${visaBgColor} text-white p-6 rounded-lg shadow-md flex justify-between items-center mb-6`}>
                    <h3 className="text-lg font-bold">Visa Status: {student.student_visa_status}</h3>
                    {visaIcon}
                </div>

                {/* ✅ Grid Layout (60% Student Details, 40% Comments) */}
                <div className="grid grid-cols-5 gap-6">
                    {/* ✅ Student Details (60%) */}
                    <div className="col-span-3 bg-gray-100 p-6 rounded-lg shadow-md h-full">
                        <h3 className="text-lg font-bold mb-4 flex items-center">
                            <IdentificationIcon className="h-6 w-6 text-blue-600 mr-2" /> Student Details
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
                                    <AcademicCapIcon className="h-5 w-5 text-purple-600 mr-2" /> College Code:
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
                                    <GlobeAltIcon className="h-5 w-5 text-yellow-600 mr-2" /> City:
                                </span>
                                <span>{student.student_city}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <PhoneIcon className="h-5 w-5 text-indigo-600 mr-2" /> Contact:
                                </span>
                                <span>{student.student_phone_number}</span>
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
                    </div>

                    {/* ✅ Comments Section (40%, One Below Another) */}
                    <div className="col-span-2 flex flex-col justify-between">
                        {/* ✅ College Comments */}
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-4 flex-1">
                            <h3 className="text-lg font-bold mb-4 flex items-center">
                                <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-blue-600 mr-2" /> College Comments
                            </h3>
                            <p className="text-gray-700 text-lg">{student.college_comments || "No comments yet."}</p>
                        </div>

                        {/* ✅ Admin Comments */}
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1">
                            <h3 className="text-lg font-bold mb-4 flex items-center">
                                <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-red-600 mr-2" /> Admin Comments
                            </h3>
                            <p className="text-gray-700 text-lg">{student.admin_comments || "No comments yet."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
