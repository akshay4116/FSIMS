import Header from "../components/Header";
import { BuildingLibraryIcon, UserGroupIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function AdminDashboard({ auth, adminStats }) {
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
                            <p className="text-3xl font-bold">{adminStats?.totalColleges ?? 0}</p>
                        </div>
                        <BuildingLibraryIcon className="h-10 w-10 text-white" />
                    </div>

                    {/* ✅ Total Students */}
                    <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Total Students</h3>
                            <p className="text-3xl font-bold">{adminStats?.totalStudents ?? 0}</p>
                        </div>
                        <UserGroupIcon className="h-10 w-10 text-white" />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* ✅ Visa Approved */}
                    <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Visa Approved</h3>
                            <p className="text-2xl font-bold">{adminStats?.visaApproved ?? 0}</p>
                        </div>
                        <CheckCircleIcon className="h-8 w-8 text-white" />
                    </div>

                    {/* ✅ Visa Pending */}
                    <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Visa Pending</h3>
                            <p className="text-2xl font-bold">{adminStats?.visaPending ?? 0}</p>
                        </div>
                        <ClockIcon className="h-8 w-8 text-white" />
                    </div>

                    {/* ✅ Visa Expired */}
                    <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Visa Expired</h3>
                            <p className="text-2xl font-bold">{adminStats?.visaExpired ?? 0}</p>
                        </div>
                        <XCircleIcon className="h-8 w-8 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}
