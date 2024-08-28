import { platform } from "os";
import React, { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";

const ResumeTemplate3 = () => {
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
<button
            className='bg-blue-300 px-3 py-3 rounded-lg mt-2 ml-2'
            onClick={() => toPDF()}
          >
            <p className='ml-1 text-sm'>Download Template 3</p>
          </button>
    <div className="max-w-4xl mx-auto my-8 p-8 bg-white shadow-lg rounded-lg" ref={targetRef} id="pdf-content">
    
        <header className="text-center mb-8">
            <h1 className="text-4xl font-bold">John Doe</h1>
            <p className="text-lg text-gray-600">Full Stack Developer</p>
            <p className="text-sm text-gray-500">Email: johndoe@example.com | Phone: +123 456 7890 | LinkedIn: linkedin.com/in/johndoe</p>
        </header>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 border-b pb-2">Summary</h2>
            <p>
                Experienced Full Stack Developer with 5+ years of experience in developing scalable web applications. Proficient in JavaScript, React, Node.js, and Tailwind CSS. Strong problem-solving skills and a passion for creating intuitive user interfaces and efficient backend systems.
            </p>
        </section>


        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 border-b pb-2">Work Experience</h2>

            <div className="mb-4">
                <h3 className="text-xl font-bold">Senior Full Stack Developer</h3>
                <p className="text-sm text-gray-500">ABC Corporation | June 2019 - Present</p>
                <ul className="list-disc ml-6 mt-2 text-gray-700">
                    <li>Developed and maintained full-stack web applications using React, Node.js, and MongoDB.</li>
                    <li>Collaborated with cross-functional teams to define, design, and ship new features.</li>
                    <li>Improved application performance by optimizing code and implementing caching strategies.</li>
                    <li>Mentored junior developers and conducted code reviews to ensure coding standards.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-bold">Full Stack Developer</h3>
                <p className="text-sm text-gray-500">XYZ Inc. | January 2016 - May 2019</p>
                <ul className="list-disc ml-6 mt-2 text-gray-700">
                    <li>Designed and implemented RESTful APIs for various web applications.</li>
                    <li>Developed responsive front-end interfaces using React and Tailwind CSS.</li>
                    <li>Worked closely with the UX/UI team to create a seamless user experience.</li>
                    <li>Participated in Agile ceremonies and contributed to sprint planning and retrospectives.</li>
                </ul>
            </div>
        </section>


        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 border-b pb-2">Education</h2>

            <div className="mb-4">
                <h3 className="text-xl font-bold">Bachelor of Science in Computer Science</h3>
                <p className="text-sm text-gray-500">University of Technology | 2012 - 2016</p>
                <p className="text-gray-700 mt-2">Graduated with honors. Coursework included Algorithms, Data Structures, Software Engineering, and Web Development.</p>
            </div>
        </section>


        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 border-b pb-2">Skills</h2>

            <ul className="flex flex-wrap gap-4">
                <li className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">JavaScript</li>
                <li className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">React</li>
                <li className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">Node.js</li>
                <li className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">Tailwind CSS</li>
                <li className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">MongoDB</li>
                <li className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">Express.js</li>
                <li className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">Git</li>
                <li className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">RESTful APIs</li>
            </ul>
        </section>

                <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 border-b pb-2">Projects</h2>

            <div className="mb-4">
                <h3 className="text-xl font-bold">Project Name 1</h3>
                <p className="text-sm text-gray-500">January 2023 - March 2023</p>
                <ul className="list-disc ml-6 mt-2 text-gray-700">
                    <li>Developed a real-time chat application using React, Node.js, and Socket.io.</li>
                    <li>Implemented user authentication and authorization using JWT.</li>
                    <li>Designed a responsive UI with Tailwind CSS and ensured cross-browser compatibility.</li>
                    <li>Deployed the application on AWS using Docker and Nginx.</li>
                </ul>
            </div>

            <div className="mb-4">
                <h3 className="text-xl font-bold">Project Name 2</h3>
                <p className="text-sm text-gray-500">August 2022 - November 2022</p>
                <ul className="list-disc ml-6 mt-2 text-gray-700">
                    <li>Built an e-commerce platform with a custom CMS for managing products and orders.</li>
                    <li>Used React for the front-end and Node.js with Express for the back-end.</li>
                    <li>Integrated Stripe API for payment processing and implemented security best practices.</li>
                    <li>Optimized performance by implementing server-side rendering and lazy loading.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-bold">Project Name 3</h3>
                <p className="text-sm text-gray-500">May 2022 - July 2022</p>
                <ul className="list-disc ml-6 mt-2 text-gray-700">
                    <li>Created a data visualization dashboard using React and D3.js.</li>
                    <li>Developed complex interactive charts and graphs to represent real-time data.</li>
                    <li>Implemented a RESTful API for data retrieval and aggregation.</li>
                    <li>Ensured accessibility and responsiveness for various screen sizes.</li>
                </ul>
            </div>
        </section>

    </div>
</div>


    );
};

export default ResumeTemplate3;