import { useEffect } from "react";
import Header from "../components/Header";
import { EyeIcon, PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react"; // ✅ Use Inertia Link
import { router } from "@inertiajs/react"; // ✅ Import router


export default function CollegeList({ auth, colleges = [], errorMessage = null, successMessage = null }) {
    useEffect(() => {
        console.log("Colleges Data:", colleges); // ✅ Debug Data
    }, [colleges]);

    const userLinks = [
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Colleges", href: "/admin/colleges" },
        { label: "Students", href: "/admin/students" },
    ];


    useEffect(() => {
        if (errorMessage) {
            alert(errorMessage); // ✅ Show error if students exist
        }
        if (successMessage) {
            alert(successMessage); // ✅ Show success if college deleted
        }
    }, [errorMessage, successMessage]);

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this college?")) return;

        router.delete(`/admin/colleges/${id}`, {
            preserveScroll: true, // ✅ Keep the page state
        });
    };

    return (
        <div>
            {/* ✅ Include Header */}
            <Header user={auth.user} links={userLinks} />

            <div className="max-w-7xl mx-auto mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">College List</h2>

                    {/* ✅ Add College Button (Only for Admin) */}
                    <Link
                        href="/admin/add-college"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Add College
                    </Link>
                </div>
                {colleges.length === 0 ? (
                    <p className="bg-gray-200 py-2 text-center font-bold text-lg rounded-lg">No colleges available.</p>
                ) : (
                    <div className="border rounded-lg overflow-hidden shadow-md">
                        <h3 className="bg-gray-200 py-2 text-center font-bold text-lg">Colleges</h3>


                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-purple-600 text-white">
                                    <th className="py-2 px-4 text-left">Sl. No</th>
                                    <th className="py-2 px-4 text-left">College Name</th>
                                    <th className="py-2 px-4 text-left">College Code</th>
                                    <th className="py-2 px-4 text-left">Email</th>
                                    <th className="py-2 px-4 text-left">Address</th>
                                    <th className="py-2 px-4 text-left">State</th>
                                    <th className="py-2 px-4 text-left">City</th>
                                    <th className="py-2 px-4 text-left">Phone Number</th>
                                    <th className="py-2 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {colleges.map((college, index) => (
                                    <tr key={college.id} className="border-b text-center">
                                        <td className="py-2 px-4 text-left">{index + 1}</td>
                                        <td className="py-2 px-4 text-left">{college.college_name}</td>
                                        <td className="py-2 px-4 text-left">{college.college_code}</td>
                                        <td className="py-2 px-4 text-left">{college.college_email}</td>
                                        <td className="py-2 px-4 text-left">{college.college_address}</td>
                                        <td className="py-2 px-4 text-left">{college.college_state}</td>
                                        <td className="py-2 px-4 text-left">{college.college_city}</td>
                                        <td className="py-2 px-4 text-left">{college.college_phone_number}</td>
                                        <td className="py-2 px-4 flex justify-left gap-2">
                                            <Link href={`/admin/view-college/${college.id}`} className="text-blue-500 hover:text-blue-700">
                                                <EyeIcon className="h-5 w-5" />
                                            </Link>
                                            <Link href={`/admin/edit-college/${college.id}`} className="text-green-500 hover:text-green-700">
                                                <PencilIcon className="h-5 w-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(college.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                )}
            </div>

        </div>
    );
}
