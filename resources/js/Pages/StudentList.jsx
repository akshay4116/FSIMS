import Header from "../components/Header";
import { EyeIcon, PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function StudentList({ auth, initialStudents }) {
    const [students, setStudents] = useState(initialStudents || null);
    const [studentData, setStudentData] = useState([]);
    const [paginationLinks, setPaginationLinks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Keep track of current page
    const [searchQuery, setSearchQuery] = useState(""); // ✅ Search state

    const isAdmin = auth.user.user_role === "admin";

    useEffect(() => {
        if (initialStudents && initialStudents.data) {
            setStudents(initialStudents);
            setStudentData(initialStudents.data);
            setPaginationLinks(initialStudents.links);
            setCurrentPage(initialStudents.current_page);
        }
    }, [initialStudents]);

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

    // ✅ Handle Search Functionality
    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        // 🔥 Check user role and use the correct endpoint
        const searchUrl = isAdmin ? "/admin/students" : "/college/students";

        router.get(searchUrl, { search: query }, {
            preserveState: true,
            preserveScroll: true
        });
    };


    const handlePageChange = (link) => {
        if (link && link.url) {
            router.visit(link.url, { preserveScroll: true });
        } else {
            console.warn("Invalid pagination link:", link);
        }
    };

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this student?")) return;

        router.delete(`/admin/students/${id}`, {
            preserveScroll: true, // ✅ Keep page position
            onSuccess: (page) => {
                alert("Student deleted successfully!");

                // ✅ Update state with new student list after deletion
                setStudents(page.props.initialStudents);
                setStudentData(page.props.initialStudents.data);
                setPaginationLinks(page.props.initialStudents.links);
            },
            onError: (errors) => {
                console.error("Error deleting student:", errors);
            },
        });
    };



    return (
        <div>
            <Header user={auth.user} links={userLinks} />
            <div className="max-w-7xl mx-auto mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                        {isAdmin ? "Student List (Admin)" : "Student List (College)"}
                    </h2>
                    <input
                        type="text"
                        placeholder="Search by name, phone, address, visa status..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="border p-2 rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <Link
                        href={isAdmin ? "/admin/register-student" : "/college/register-student"}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Add Student
                    </Link>
                </div>

                {studentData.length === 0 ? (
                    <p className="bg-gray-200 py-2 text-center font-bold text-lg rounded-lg">No matching students found.</p>
                ) : (
                    <div className="border rounded-lg overflow-hidden shadow-md">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    {/* ... table headers */}
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
                                {studentData.map((student, index) => (
                                    <tr key={student.id} className="border-b text-center">
                                        {/* ... table cells */}
                                        <td className="py-2 px-2 text-left">{index + 1}</td>
                                        <td className="py-2 px-2 text-left">{student.student_name}</td>
                                        <td className="py-2 px-2 text-left">{student.student_phone_number}</td>
                                        <td className="py-2 px-2 text-left">{student.college_code}</td>
                                        <td className="py-2 px-2 text-left">{student.student_address}</td>
                                        <td className="py-2 px-2 text-left">{student.student_country}</td>
                                        <td className="py-2 px-2 text-left">{student.student_passport_number}</td>
                                        <td className="py-2 px-2 text-left">{student.student_visa_number}</td>
                                        <td className={`py-2 px-2 font-bold text-left ${student.student_visa_status === "Approved" ? "text-green-600" : student.student_visa_status === "Pending" ? "text-yellow-600" : "text-red-600"}`}>
                                            {student.student_visa_status}
                                        </td>
                                        <td className="py-2 px-2 flex justify-center gap-2">
                                            <Link href={`/admin/view-student/${student.id}`} className="text-blue-500 hover:text-blue-700">
                                                <EyeIcon className="h-5 w-5" />
                                            </Link>
                                            <Link
                                                href={isAdmin ? `/admin/edit-student/${student.id}` : `/college/edit-student/${student.id}`}
                                                className="text-green-500 hover:text-green-700"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </Link>
                                            {isAdmin && (
                                                <button
                                                    onClick={() => handleDelete(student.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}


                <div className="flex justify-center mt-4">
                    {paginationLinks.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(link)} // Pass the entire link object
                            disabled={!link.url || link.active}
                            className={`px-4 py-2 rounded mx-1 ${link.active ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        >
                            {link.label.replace("&laquo;", "«").replace("&raquo;", "»")}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}