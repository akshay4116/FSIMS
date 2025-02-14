import Header from "../components/Header";

export default function Dashboard({ auth }) {
    const userLinks = auth.user.role === "admin"
        ? [{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Colleges", href: "/admin/colleges" }]
        : auth.user.role === "college"
            ? [{ label: "Dashboard", href: "/college/dashboard" }, { label: "Students", href: "/college/students" }]
            : [{ label: "Profile", href: "/student/profile" }, { label: "Status", href: "/student/status" }];

    return (
        <div>
            <Header user={auth.user} links={userLinks} />
            <div className="p-6"> {/* Content goes here */} </div>
        </div>
    );
}
