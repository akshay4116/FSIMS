import Header from "../components/Header";
import {
    AcademicCapIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, GlobeAltIcon, IdentificationIcon, BuildingLibraryIcon,
    ClockIcon, CheckCircleIcon, XCircleIcon, UsersIcon
} from "@heroicons/react/24/solid";

export default function CollegeDashboard({ auth }) {
    // Dummy College Data
    const collegeDetails = {
        name: "ABC Engineering College",
        code: "COLL001",
        address: "123 Main St, New York",
        city: "New York",
        state: "NY",
        country: "USA",
        contact: "+1 9876543210",
        email: "info@abcengineering.com",
    };

    // Dummy Stats
    const stats = {
        totalStudents: 120,
        visaPending: 15,
        visaApproved: 90,
        visaExpired: 15,
    };

    const userLinks = [
        { label: "Dashboard", href: "/college/dashboard" },
        { label: "Students", href: "/college/students" },
    ];

    return (
        <div>
            {/* ✅ Header Component */}
            <Header user={auth.user} links={userLinks} />

            <div className="max-w-7xl mx-auto mt-6 ">
                <h2 className="text-2xl font-bold text-center mb-6">College Dashboard</h2>

                {/* ✅ Grid Layout (60% College Details, 40% Stats) */}
                <div className="grid grid-cols-5 gap-6">
                    {/* ✅ College Details (60%) */}
                    <div className="col-span-3 bg-gray-100 p-6 rounded-lg shadow-md h-full">
                        <h3 className="text-lg font-bold mb-4 flex items-center">
                            <BuildingLibraryIcon className="h-6 w-6 text-blue-600 mr-2" /> College Details
                        </h3>
                        <ul className="space-y-3 text-lg">
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <AcademicCapIcon className="h-5 w-5 text-blue-600 mr-2" /> Name:
                                </span>
                                <span>{collegeDetails.name}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <IdentificationIcon className="h-5 w-5 text-gray-600 mr-2" /> College Code:
                                </span>
                                <span>{collegeDetails.code}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <MapPinIcon className="h-5 w-5 text-red-600 mr-2" /> Address:
                                </span>
                                <span>{collegeDetails.address}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <MapPinIcon className="h-5 w-5 text-purple-600 mr-2" /> City:
                                </span>
                                <span>{collegeDetails.city}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <GlobeAltIcon className="h-5 w-5 text-yellow-600 mr-2" /> State:
                                </span>
                                <span>{collegeDetails.state}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <GlobeAltIcon className="h-5 w-5 text-green-600 mr-2" /> Country:
                                </span>
                                <span>{collegeDetails.country}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="flex items-center">
                                    <PhoneIcon className="h-5 w-5 text-indigo-600 mr-2" /> Contact:
                                </span>
                                <span>{collegeDetails.contact}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="flex items-center">
                                    <EnvelopeIcon className="h-5 w-5 text-gray-700 mr-2" /> Email:
                                </span>
                                <span>{collegeDetails.email}</span>
                            </li>
                        </ul>
                    </div>

                    {/* ✅ Right Side: Stats Cards (2x2 Grid) */}
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        {/* ✅ Total Students */}
                        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold">Total Students</h3>
                                <p className="text-2xl font-bold">{stats.totalStudents}</p>
                            </div>
                            <UsersIcon className="h-10 w-10 text-white" />
                        </div>

                        {/* ✅ Visa Pending */}
                        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold">Visa Pending</h3>
                                <p className="text-2xl font-bold">{stats.visaPending}</p>
                            </div>
                            <ClockIcon className="h-10 w-10 text-white" />
                        </div>

                        {/* ✅ Visa Approved */}
                        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold">Visa Approved</h3>
                                <p className="text-2xl font-bold">{stats.visaApproved}</p>
                            </div>
                            <CheckCircleIcon className="h-10 w-10 text-white" />
                        </div>

                        {/* ✅ Visa Expired */}
                        <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold">Visa Expired</h3>
                                <p className="text-2xl font-bold">{stats.visaExpired}</p>
                            </div>
                            <XCircleIcon className="h-10 w-10 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
