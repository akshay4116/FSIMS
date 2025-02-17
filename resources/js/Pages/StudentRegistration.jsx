import { useState, useRef } from "react";
import Header from "../components/Header";
import { router } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function StudentRegistration({ auth, colleges = [] }) {
    // ✅ Role Check
    const isAdmin = auth?.user?.user_role === "admin";
    const isCollege = auth?.user?.user_role === "college";

    // ✅ Restrict Access: Redirect students properly using Inertia
    if (auth?.user?.user_role === "student") {
        router.visit("/student/dashboard");
        return null;
    }



    // ✅ Form State
    const [form, setForm] = useState({
        studentName: "",
        email: "",
        dob: new Date(),
        fatherName: "",
        phoneNumber: "",
        address: "",
        city: "",
        state: "",
        countryname: "",
        collegeCode: isAdmin ? "" : auth?.user?.college_code, // ✅ Auto-assign for College users
        passportNumber: "",
        visaNumber: "",
        password: "",
        passportCopy: null,
        visaDocument: null,
        academicCertificate: null,
    });

    const [successMessage, setSuccessMessage] = useState(""); // ✅ Success Message State

    // ✅ Create refs for file inputs
    const passportRef = useRef(null);
    const visaRef = useRef(null);
    const academicRef = useRef(null);

    // ✅ Handle File Selection
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

    // ✅ Handle Form Input Changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach((key) => {
            formData.append(key, form[key]);
        });

        router.post(isAdmin ? "/admin/register-student" : "/college/register-student", form, {
            headers: { "Content-Type": "multipart/form-data" },
            onSuccess: () => {
                // ✅ Clear Form After Successful Submission
                setForm({
                    studentName: "",
                    email: "",
                    dob: new Date(),
                    fatherName: "",
                    phoneNumber: "",
                    address: "",
                    city: "",
                    state: "",
                    countryname: "",
                    collegeCode: isAdmin ? "" : auth?.user?.college_code,
                    passportNumber: "",
                    visaNumber: "",
                    password: "",
                    passportCopy: null,
                    visaDocument: null,
                    academicCertificate: null,
                });

                // ✅ Reset file inputs using refs
                if (passportRef.current) passportRef.current.value = "";
                if (visaRef.current) visaRef.current.value = "";
                if (academicRef.current) academicRef.current.value = "";

                // ✅ Show Success Message
                setSuccessMessage("Student registered successfully!");
                setTimeout(() => setSuccessMessage(""), 3000); // ✅ Hide after 3 seconds
            },
        });
    };

    // ✅ Correct User Links for Header
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
            {/* ✅ Include Header for Admin & College */}
            <Header user={auth.user} links={userLinks} />

            <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">
                    {isAdmin ? "Register Student (Admin)" : "Register Student (College)"}
                </h2>

                {/* ✅ Show Success Message */}
                {successMessage && (
                    <div className="mb-4 bg-green-100 border border-green-500 text-green-700 px-4 py-2 rounded">
                        {successMessage}
                    </div>
                )}

                {/* ✅ Form Submission */}
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-2 gap-6">
                        {/* LEFT SIDE */}
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Student Full Name:</label>
                                <input
                                    type="text"
                                    name="studentName"
                                    value={form.studentName}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email ID:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4 flex gap-2">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth:</label>
                                    <DatePicker
                                        selected={form.dob}
                                        onChange={(date) => setForm({ ...form, dob: date })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        maxDate={new Date()}  // ✅ Restrict future dates
                                        showYearDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={100}
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={form.phoneNumber}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4 flex gap-2">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Father's Name:</label>
                                    <input
                                        type="text"
                                        name="fatherName"
                                        value={form.fatherName}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4 flex gap-2">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">State:</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={form.state}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4 flex gap-2">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Country:</label>
                                    <input
                                        type="text"
                                        name="countryname"
                                        value={form.countryname}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">College Code:</label>
                                    {isAdmin ? (
                                        <select
                                            name="collegeCode"
                                            value={form.collegeCode}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        >
                                            <option value="">Select College</option>
                                            {colleges.map((college) => (
                                                <option key={college.college_code} value={college.college_code}>
                                                    {college.college_name} ({college.college_code})
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            name="collegeCode"
                                            value={form.collegeCode}
                                            readOnly
                                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="mb-4 flex gap-2">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Passport :</label>
                                    <input
                                        type="text"
                                        name="passportNumber"
                                        value={form.passportNumber}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Visa :</label>
                                    <input
                                        type="text"
                                        name="visaNumber"
                                        value={form.visaNumber}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 grid grid-cols-3 gap-4">
                        {/* ✅ Passport Copy */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Passport Copy (PDF Only):</label>
                            <input
                                type="file"
                                name="passportCopy"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                ref={passportRef} // ✅ Assign ref to reset
                            />
                        </div>

                        {/* ✅ Visa Document */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Visa Document (PDF Only):</label>
                            <input
                                type="file"
                                name="visaDocument"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                ref={visaRef} // ✅ Assign ref to reset
                            />
                        </div>

                        {/* ✅ Academic Certificate */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Academic Certificate (PDF Only):</label>
                            <input
                                type="file"
                                name="academicCertificate"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                ref={academicRef} // ✅ Assign ref to reset
                            />
                        </div>
                    </div>



                    <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
