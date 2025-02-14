import Header from "../components/Header";

export default function StudentRegistration({ auth }) {
    // Restrict Access: Redirect students to their dashboard
    if (auth.user.role === "student") {
        window.location.href = "/student/dashboard";
        return null;
    }

    // ✅ Dynamic Route Handling for Admin & College
    const submitUrl = auth.user.role === "admin" ? "/admin/register-student" : "/college/register-student";

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
                <h2 className="text-2xl font-bold text-center mb-4">Student Registration</h2>
                <form method="POST" action={submitUrl}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-700">Full Name</label>
                            <input type="text" name="full_name" className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input type="email" name="email" className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Date of Birth</label>
                            <input type="date" name="dob" className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Phone Number</label>
                            <input type="text" name="phone" className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-700">College Code</label>
                            <select name="college_code" className="w-full px-3 py-2 border rounded-lg" required>
                                <option>Select College</option>
                                <option value="COLL001">College A</option>
                                <option value="COLL002">College B</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Visa Number</label>
                            <input type="text" name="visa_number" className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg">Submit</button>
                </form>
            </div>
        </div>
    );
}
