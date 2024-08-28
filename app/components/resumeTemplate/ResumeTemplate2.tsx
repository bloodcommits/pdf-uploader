import { platform } from "os";
import React, { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";

const ResumeTemplate2 = () => {
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf', page: { orientation: "p", format: "A4", } });

    const [personalInfo, setPersonalInfo] = useState({
        name: "",
        phone: "",
        email: "",
        age: "",
        location: "",
    });

    const [academicQualifications, setAcademicQualifications] = useState<
        string[]
    >([]);
    const [professionalSummary, setProfessionalSummary] = useState<string[]>([]);
    const [professionalExperience, setProfessionalExperience] = useState<
        string[]
    >([]);
    const [additionalResponsibilities, setAdditionalResponsibilities] = useState<
        string[]
    >([]);
    const [professionalDevelopment, setProfessionalDevelopment] = useState<
        string[]
    >([]);
    const [professionalSkills, setProfessionalSkills] = useState<string[]>([]);
    const [professionalAccolades, setProfessionalAccolades] = useState<string[]>(
        []
    );
    const [projects, setProjects] = useState<
        { name: string; url: string; description: string; date: string }[]
    >([]);
    const [socialLinks, setSocialLinks] = useState<
        { platform: string; url: string }[]
    >([]);

    // Fetch data from local storage when component mounts

    useEffect(() => {
        const jsondata = localStorage.getItem("data");
        if (jsondata) {
            const data = JSON.parse(jsondata);
            console.log(data);

            // Update state with data from local storage
            setPersonalInfo(data.personalInfo);
            setAcademicQualifications(data.academicQualifications);
            setProfessionalSummary(data.professionalSummary);
            setProfessionalExperience(data.professionalExperience);
            setAdditionalResponsibilities(data.additionalResponsibilities);
            setProfessionalDevelopment(data.professionalDevelopment);
            setProfessionalSkills(data.professionalSkills);
            setProfessionalAccolades(data.professionalAccolades);
            setProjects(data.projects);
            setSocialLinks(data.socialLinks);
        }
    }, []);

    return (
        <div className="bg-gray-100 text-gray-900">
    <div className="max-w-screen-lg mx-auto my-10 p-6 bg-white shadow-lg rounded-lg flex">

        <aside className="w-1/4 bg-gray-200 p-6 rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Emma Brown</h1>
            <p className="text-lg text-gray-600 mb-4">UX/UI Designer</p>
            <p className="text-sm text-gray-500 mb-4">Email: emma.brown@example.com</p>
            <p className="text-sm text-gray-500 mb-4">Phone: +123 456 7890</p>
            <p className="text-sm text-gray-500 mb-4">LinkedIn: linkedin.com/in/emmabrown</p>
        </aside>

        <main className="w-3/4 ml-6">
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 pb-1">Summary</h2>
                <p>
                    Creative UX/UI Designer with over 5 years of experience in designing user-centered interfaces and enhancing user experiences. Expertise in user research, wireframing, prototyping, and usability testing. Passionate about delivering visually appealing and highly functional designs.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 pb-1">Work Experience</h2>

                <div className="mb-6">
                    <h3 className="text-xl font-bold">Lead UX/UI Designer</h3>
                    <p className="text-sm text-gray-500">Creative Agency | March 2020 - Present</p>
                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                        <li>Led design projects for various clients, including user research, wireframing, and prototyping.</li>
                        <li>Collaborated with development teams to ensure design feasibility and implementation.</li>
                        <li>Conducted usability testing to gather feedback and iterate on design solutions.</li>
                        <li>Mentored junior designers and provided guidance on best practices and design principles.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold">UX Designer</h3>
                    <p className="text-sm text-gray-500">Design Studio | June 2016 - February 2020</p>
                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                        <li>Created wireframes, mockups, and interactive prototypes for web and mobile applications.</li>
                        <li>Worked closely with clients to understand their requirements and deliver tailored design solutions.</li>
                        <li>Participated in design reviews and provided constructive feedback to enhance the overall user experience.</li>
                        <li>Utilized tools such as Sketch and Adobe XD to create high-fidelity designs.</li>
                    </ul>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 pb-1">Projects</h2>

                <div className="mb-6">
                    <h3 className="text-xl font-bold">Project Zen</h3>
                    <p className="text-sm text-gray-500">June 2023 - August 2023</p>
                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                        <li>Designed an innovative meditation app with a focus on user relaxation and engagement.</li>
                        <li>Developed interactive prototypes and conducted user testing to refine the user interface.</li>
                        <li>Collaborated with developers to ensure seamless integration of design elements into the app.</li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-bold">E-commerce Redesign</h3>
                    <p className="text-sm text-gray-500">January 2022 - May 2022</p>
                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                        <li>Led the redesign of an e-commerce website to enhance user experience and increase conversion rates.</li>
                        <li>Conducted user research and competitive analysis to inform design decisions.</li>
                        <li>Implemented a new design system to ensure consistency across the website.</li>
                    </ul>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 pb-1">Education</h2>

                <div>
                    <h3 className="text-xl font-bold">Bachelor of Fine Arts in Graphic Design</h3>
                    <p className="text-sm text-gray-500">Art University | 2012 - 2016</p>
                    <p className="text-gray-700 mt-2">Graduated with honors. Focused on visual design, user experience, and digital media.</p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 pb-1">Skills</h2>

                <div className="flex flex-wrap gap-4">
                    <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg">User Research</span>
                    <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg">Wireframing</span>
                    <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg">Prototyping</span>
                    <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg">Usability Testing</span>
                    <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg">Sketch</span>
                    <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg">Adobe XD</span>
                    <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg">Figma</span>
                    <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg">HTML/CSS</span>
                </div>
            </section>

            <section className="text-center">
                <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 pb-1">Contact</h2>
                <p>If you would like to get in touch, please contact me via email or LinkedIn.</p>
            </section>
        </main>
    </div>
    </div>

    );
};

export default ResumeTemplate2;