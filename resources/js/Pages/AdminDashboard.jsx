import Header from "../components/Header";
import { BuildingLibraryIcon, UserGroupIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function AdminDashboard({ auth }) {
    // Dummy Statistics
    const adminStats = {
        totalColleges: 15,
        totalStudents: 1200,
        visaPending: 200,
        visaApproved: 900,
        visaExpired: 100,
    };

    const userLinks = [
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Colleges", href: "/admin/colleges" },
        { label: "Students", href: "/admin/students" },
    ];

    return (
        <div>
            {/* ✅ Header Component */}
            <Header user={auth.user} links={userLinks} />

            <div className="max-w-7xl mx-auto mt-6">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>

                <div className="grid grid-cols-2 gap-6 mb-4">
                    {/* ✅ Total Colleges */}
                    <div className="bg-purple-600 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Total Colleges</h3>
                            <p className="text-3xl font-bold">{adminStats.totalColleges}</p>
                        </div>
                        <BuildingLibraryIcon className="h-10 w-10 text-white" />
                    </div>

                    {/* ✅ Total Students */}
                    <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Total Students</h3>
                            <p className="text-3xl font-bold">{adminStats.totalStudents}</p>
                        </div>
                        <UserGroupIcon className="h-10 w-10 text-white" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    {/* ✅ Visa Pending */}


                    {/* ✅ Visa Approved */}
                    <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Visa Approved</h3>
                            <p className="text-2xl font-bold">{adminStats.visaApproved}</p>
                        </div>
                        <CheckCircleIcon className="h-8 w-8 text-white" />
                    </div>

                    <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Visa Pending</h3>
                            <p className="text-2xl font-bold">{adminStats.visaPending}</p>
                        </div>
                        <ClockIcon className="h-8 w-8 text-white" />
                    </div>

                    {/* ✅ Visa Expired */}
                    <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Visa Expired</h3>
                            <p className="text-2xl font-bold">{adminStats.visaExpired}</p>
                        </div>
                        <XCircleIcon className="h-8 w-8 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}
