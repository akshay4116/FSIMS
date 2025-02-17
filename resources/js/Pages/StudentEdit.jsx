import { useState, useRef } from "react";
import { router } from "@inertiajs/react";
import Header from "../components/Header";
import {
    AcademicCapIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, GlobeAltIcon, IdentificationIcon,
    ClockIcon, CheckCircleIcon, XCircleIcon, ArrowLeftIcon, ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/solid";

export default function StudentEdit({ auth, student }) {
    const isAdmin = auth.user.user_role === "admin";

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


    const [form, setForm] = useState({
        studentName: student.student_name,
        email: student.student_email,
        phoneNumber: student.student_phone_number,
        dob: student.student_dob,
        fatherName: student.student_father_name,
        address: student.student_address,
        city: student.student_city,
        state: student.student_state,
        countryname: student.student_country,
        passportNumber: student.student_passport_number,
        visaNumber: student.student_visa_number,
        visaStatus: student.student_visa_status,
        collegeCode: student.college_code,
        collegeComments: student.college_comments,
        adminComments: student.admin_comments,
        password: "",
        passportCopy: null,
        visaDocument: null,
        academicCertificate: null,
    });

    const passportRef = useRef(null);
    const visaRef = useRef(null);
    const academicRef = useRef(null);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type !== "application/pdf") {
            alert("Only PDF files are allowed!");
            return;
        }
        if (file && file.size > 5 * 1024 * 1024) {
            alert("File size should not exceed 5MB!");
            return;
        }
        setForm({ ...form, [e.target.name]: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach((key) => {
            formData.append(key, form[key]);
        });

        const updatedData = { ...form };
        if (!form.password) {
            delete updatedData.password;
        }
        router.post(isAdmin ? `/admin/update-student/${student.id}` : `/college/update-student/${student.id}`, form, {
            preserveScroll: true,
            onSuccess: () => {
                alert("Student updated successfully!");
                setForm((prev) => ({
                    ...prev,
                    passportCopy: null,
                    visaDocument: null,
                    academicCertificate: null,
                }));

                // Reset File Inputs
                if (passportRef.current) passportRef.current.value = "";
                if (visaRef.current) visaRef.current.value = "";
                if (academicRef.current) academicRef.current.value = "";
            },
            onError: (errors) => console.error("Update error:", errors)
        });
    };

    const visaBgColor =
        form.visaStatus === "Approved" ? "bg-green-500" :
            form.visaStatus === "Pending" ? "bg-yellow-500" :
                "bg-red-500";

    return (
        <div>
            <Header user={auth.user} links={userLinks ?? []} />


            <div className="max-w-7xl mx-auto mt-6">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => router.visit(isAdmin ? "/admin/students" : "/college/students")}
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg shadow"
                    >
                        <ArrowLeftIcon className="h-5 w-5" /> Back
                    </button>
                    <h2 className="text-2xl font-bold text-center flex-1">Edit Student Details</h2>
                    <div className="bg-gray-200 rounded-lg shadow px-2 py-2 font-bold">
                        Visa Status for 2025&nbsp;
                        {isAdmin ? (
                            <select
                                name="visaStatus"
                                value={form.visaStatus}
                                onChange={handleChange}
                                className={`px-6 py-2 border-0 text-white font-bold outline-none cursor-pointer rounded-lg transition-colors duration-300 ${form.visaStatus === "Approved" ? "bg-green-500" :
                                    form.visaStatus === "Pending" ? "bg-yellow-500 text-black" :
                                        "bg-red-500"
                                    }`}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        ) : (
                            <span className={`px-6 py-2 rounded-lg ${form.visaStatus === "Approved" ? "text-green-600" :
                                form.visaStatus === "Pending" ? "text-yellow-600" :
                                    "text-red-600"
                                }`}>
                                {form.visaStatus}
                            </span>
                        )}
                    </div>


                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        {/* Left Side - Student Information */}
                        <div className="col-span-1 bg-gray-100 p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-bold mb-4 flex items-center">
                                <IdentificationIcon className="h-6 w-6 text-blue-600 mr-2" /> Student Information
                            </h3>
                            <ul className="space-y-3 text-lg">
                                {[
                                    { label: "Name", icon: AcademicCapIcon, name: "studentName", editable: true },
                                    { label: "Email", icon: EnvelopeIcon, name: "email", editable: false },
                                    { label: "Phone", icon: PhoneIcon, name: "phoneNumber", editable: true },
                                    { label: "College", icon: AcademicCapIcon, name: "collegeCode", editable: false },
                                    { label: "Address", icon: MapPinIcon, name: "address", editable: true },
                                    { label: "Country", icon: GlobeAltIcon, name: "countryname", editable: true },
                                    { label: "Passport No", icon: IdentificationIcon, name: "passportNumber", editable: false },
                                    { label: "Visa No", icon: IdentificationIcon, name: "visaNumber", editable: false },
                                    { label: "New Password", icon: IdentificationIcon, name: "password", editable: true },
                                ].map(({ label, icon: Icon, name, editable }) => (
                                    <li key={name} className="flex justify-between border-b pb-2">
                                        <span className="flex items-center">
                                            <Icon className="h-5 w-5 text-blue-600 mr-2" /> {label}:
                                        </span>
                                        <input
                                            type={name === "password" ? "password" : "text"}
                                            name={name}
                                            value={form[name]}
                                            onChange={handleChange}
                                            className={`w-60 p-2 border rounded-md ${editable ? "" : "bg-gray-200"}`}
                                            readOnly={!editable}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Side - Comments */}
                        <div className="flex flex-col gap-4">
                            {[
                                { field: "collegeComments", label: "College Comments", disabled: isAdmin },
                                { field: "adminComments", label: "Admin Comments", disabled: !isAdmin }
                            ].map(({ field, label, disabled }) => (
                                <div key={field} className="bg-gray-100 p-4 rounded-lg shadow-md flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold flex items-center mb-2">
                                        <ChatBubbleBottomCenterTextIcon className={`h-6 w-6 ${field === "collegeComments" ? "text-blue-600" : "text-red-600"} mr-2`} />
                                        {label}
                                    </h3>
                                    <textarea
                                        name={field}
                                        value={form[field]}
                                        onChange={handleChange}
                                        disabled={disabled}
                                        className={`w-full p-2 border rounded-md resize-none ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
                                    />
                                </div>
                            ))}
                            {isAdmin && (
                                <div className="bg-gray-100 p-4 rounded-lg shadow-md flex-1 flex flex-col">

                                    <div className="">
                                        <h3 className="text-lg font-bold mb-4">File Uploads (Admin Only)</h3>
                                        <div className="grid grid-cols-2 gap-6 mb-4">
                                            {[
                                                { field: "passportCopy", label: "Passport Copy", ref: passportRef, existingFile: student.passport_copy },
                                                { field: "visaDocument", label: "Visa Document", ref: visaRef, existingFile: student.visa_document },
                                                { field: "academicCertificate", label: "Academic Certificate", ref: academicRef, existingFile: student.academic_certificate },
                                            ].map(({ field, label, ref, existingFile }) => (

                                                <div key={field} className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">{label} (PDF Only):</label>
                                                    {existingFile && (
                                                        <a href={`/storage/${existingFile}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline block mb-2">
                                                            View Existing File
                                                        </a>
                                                    )}
                                                    <input
                                                        type="file"
                                                        name={field}
                                                        accept="application/pdf"
                                                        onChange={handleFileChange}
                                                        ref={ref}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                </div>

                                            ))}
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition mt-4"
                    >
                        Update Student
                    </button>
                </form>
            </div>
        </div>
    );
}
