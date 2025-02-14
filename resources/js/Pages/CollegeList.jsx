import Header from "../components/Header";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function CollegeList({ auth }) {
    // Dummy Static Data for Colleges
    const colleges = [
        { id: 1, name: "College A", code: "COLL001", address: "123 Main St", state: "New York", city: "NYC" },
        { id: 2, name: "College B", code: "COLL002", address: "456 Elm St", state: "California", city: "Los Angeles" },
        { id: 3, name: "College C", code: "COLL003", address: "789 Oak St", state: "Texas", city: "Houston" },
    ];

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
                <h2 className="text-2xl font-bold text-center mb-6">College List</h2>

                {/* ✅ College List Table */}
                <div className="border rounded-lg overflow-hidden shadow-md">
                    <h3 className="bg-gray-200 py-2 text-center font-bold text-lg">Colleges</h3>
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-purple-600 text-white ">
                                <th className="py-2 px-4 text-left">Sl. No</th>
                                <th className="py-2 px-4 text-left">College Name</th>
                                <th className="py-2 px-4 text-left">College Code</th>
                                <th className="py-2 px-4 text-left">Address</th>
                                <th className="py-2 px-4 text-left">State</th>
                                <th className="py-2 px-4 text-left">City</th>
                                <th className="py-2 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {colleges.map((college, index) => (
                                <tr key={college.id} className="border-b text-center">
                                    <td className="py-2 px-4 text-left">{index + 1}</td>
                                    <td className="py-2 px-4 text-left">{college.name}</td>
                                    <td className="py-2 px-4 text-left">{college.code}</td>
                                    <td className="py-2 px-4 text-left">{college.address}</td>
                                    <td className="py-2 px-4 text-left">{college.state}</td>
                                    <td className="py-2 px-4 text-left">{college.city}</td>
                                    <td className="py-2 px-4 flex justify-left gap-2">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <EyeIcon className="h-5 w-5" />
                                        </button>
                                        <button className="text-green-500 hover:text-green-700">
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700">
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
