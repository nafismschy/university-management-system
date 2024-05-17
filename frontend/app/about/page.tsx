import Footer from "../components/footer";
import Navbar from "../components/navbar";

function AboutUsPage() {
    return (
        <div>
            <Navbar/>
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-6">About University Management System</h1>
            <p className="text-lg text-gray-700 mb-6">
                The University Management System is designed to streamline administrative tasks, enhance communication between staff and students, and provide a seamless experience for managing academic activities within the university.
            </p>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
                Our mission is to empower educational institutions with innovative technology solutions that simplify complex processes, foster collaboration, and promote student success.
            </p>
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="list-disc ml-8 text-lg text-gray-700 mb-6">
                <li>Student Enrollment and Registration</li>
                <li>Course Management</li>
                <li>Faculty Management</li>
                <li>Grades and Transcript Management</li>
                <li>Communication Tools (Messaging, Announcements)</li>
            </ul>
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-gray-700 mb-6">
                Our team consists of dedicated professionals with expertise in software development, user experience design, and education management. Together, we strive to deliver cutting-edge solutions that meet the evolving needs of educational institutions.
            </p>
        </div>
        <Footer/>
        </div>
    );
}

export default AboutUsPage;
