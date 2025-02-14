import Header from "../components/Header";
import {
    AcademicCapIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, GlobeAltIcon, IdentificationIcon,
    ClockIcon, CheckCircleIcon, XCircleIcon, ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/solid";

export default function StudentDashboard({ auth }) {
    // Dummy Student Data
    const studentDetails = {
        name: "John Doe",
        email: "johndoe@student.com",
        dob: "2001-05-21",
        passport: "A123456",
        visa: "VISA123",
        visaStatus: "Approved", // Possible values: Approved, Pending, Expired
        college: "ABC Engineering College",
        collegeCode: "COLL001",
        address: "123 Main St, New York",
        country: "USA",
        contact: "+1 9876543210",
    };

    // Dummy Comments
    const collegeComment = "Student performance is good. No issues reported.";
    const adminComment = "Visa renewal is under process. Expected completion in 2 weeks.";

    // Get Background Color Based on Visa Status
    const visaBgColor =
        studentDetails.visaStatus === "Approved" ? "bg-green-500" :
            studentDetails.visaStatus === "Pending" ? "bg-yellow-500" :
                "bg-red-500";

    const visaIcon =
        studentDetails.visaStatus === "Approved" ? <CheckCircleIcon className="h-10 w-10 text-white" /> :
            studentDetails.visaStatus === "Pending" ? <ClockIcon className="h-10 w-10 text-white" /> :
                <XCircleIcon className="h-10 w-10 text-white" />;

    const userLinks = [
        { label: "Dashboard", href: "/student/dashboard" },
        { label: "Profile", href: "/student/profile" },
    ];

    return (
        <div>
            {/* ✅ Header Component */}
            <Header user={auth.user} links={userLinks} />

            <div className="max-w-7xl mx-auto mt-6">
                <h2 className="text-2xl font-bold text-center mb-6">Student Dashboard</h2>

                {/* ✅ Visa Status (Full Width) */}
                <div className={`${visaBgColor} text-white p-6 rounded-lg shadow-md flex justify-between items-center mb-6`}>
                    <h3 className="text-lg font-bold">Visa Status: {studentDetails.visaStatus}</h3>
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
                                <span>{studentDetails.name}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <EnvelopeIcon className="h-5 w-5 text-green-600 mr-2" /> Email:
                                </span>
                                <span>{studentDetails.email}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <AcademicCapIcon className="h-5 w-5 text-purple-600 mr-2" /> College:
                                </span>
                                <span>{studentDetails.college} ({studentDetails.collegeCode})</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <MapPinIcon className="h-5 w-5 text-red-600 mr-2" /> Address:
                                </span>
                                <span>{studentDetails.address}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <GlobeAltIcon className="h-5 w-5 text-yellow-600 mr-2" /> Country:
                                </span>
                                <span>{studentDetails.country}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <PhoneIcon className="h-5 w-5 text-indigo-600 mr-2" /> Contact:
                                </span>
                                <span>{studentDetails.contact}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <IdentificationIcon className="h-5 w-5 text-gray-600 mr-2" /> Passport No:
                                </span>
                                <span>{studentDetails.passport}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="flex items-center">
                                    <IdentificationIcon className="h-5 w-5 text-gray-700 mr-2" /> Visa No:
                                </span>
                                <span>{studentDetails.visa}</span>
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
                            <p className="text-gray-700 text-lg">{collegeComment}</p>
                        </div>

                        {/* ✅ Admin Comments */}
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1">
                            <h3 className="text-lg font-bold mb-4 flex items-center">
                                <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-red-600 mr-2" /> Admin Comments
                            </h3>
                            <p className="text-gray-700 text-lg">{adminComment}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
