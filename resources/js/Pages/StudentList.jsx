import Header from "../components/Header";
import { EyeIcon, PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

export default function StudentList({ auth, students }) {


    const isAdmin = auth.user.user_role === "admin"; // Ensure correct property name


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

    return (
        <div>
            {/* ✅ Header Component */}
            <Header user={auth.user} links={userLinks} />

            <div className="max-w-7xl mx-auto mt-6">
                {/* ✅ Heading & Add Student Button */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                        {isAdmin ? "Student List (Admin)" : "Student List (College)"}
                    </h2>

                    {/* ✅ Add Student Button */}
                    <Link
                        href={isAdmin ? "/admin/register-student" : "/college/register-student"}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Add Student
                    </Link>
                </div>

                {/* ✅ Student List Table */}
                <div className="border rounded-lg overflow-hidden shadow-md">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="py-2 px-2 text-left">Sl. No</th>
                                <th className="py-2 px-2 text-left">Student Name</th>
                                <th className="py-2 px-2 text-left">Phone Number</th>
                                <th className="py-2 px-2 text-left">College Code</th>
                                <th className="py-2 px-2 text-left">Address</th>
                                <th className="py-2 px-2 text-left">Country</th>
                                <th className="py-2 px-2 text-left">Passport No</th>
                                <th className="py-2 px-2 text-left">Visa No</th>
                                <th className="py-2 px-2 text-left">Visa Status</th>
                                <th className="py-2 px-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.id} className="border-b text-center">
                                    <td className="py-2 px-2 text-left">{index + 1}</td>
                                    <td className="py-2 px-2 text-left">{student.student_name}</td>
                                    <td className="py-2 px-2 text-left">{student.student_phone_number}</td>
                                    <td className="py-2 px-2 text-left">{student.college_code}</td>
                                    <td className="py-2 px-2 text-left">{student.student_address}</td>
                                    <td className="py-2 px-2 text-left">{student.student_country}</td>
                                    <td className="py-2 px-2 text-left">{student.student_passport_number}</td>
                                    <td className="py-2 px-2 text-left">{student.student_visa_number}</td>
                                    <td className={`py-2 px-2 font-bold ${student.student_visa_status === "Approved" ? "text-green-600" : student.student_visa_status === "Pending" ? "text-yellow-600" : "text-red-600"}`}>
                                        {student.student_visa_status}
                                    </td>
                                    <td className="py-2 px-2 flex justify-center gap-2">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <EyeIcon className="h-5 w-5" />
                                        </button>
                                        <button className="text-green-500 hover:text-green-700">
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        {isAdmin && (
                                            <button className="text-red-500 hover:text-red-700">
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        )}
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
