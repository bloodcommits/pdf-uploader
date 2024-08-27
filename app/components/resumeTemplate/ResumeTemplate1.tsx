import React from 'react'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResumeTemplate1 = () => {
  const generatePDF = async () => {
    const element = document.getElementById('pdf-content');

    if (!element) {
      return;
    }

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('download.pdf');
  };
  return (
    <div className="bg-gray-100 font-sans">
      {/* NOT WORKING RPOPERLY */}
      {/* <button onClick={generatePDF}>Download as PDF</button> */}
    <div  className="container mx-auto py-8 px-4">
        <div id="pdf-content" className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold">John Doe</h1>
            <p className="text-gray-600">Web Developer</p>

            <hr className="my-4"/>

            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="text-gray-700">Experienced web developer with a passion for creating responsive and user-friendly
                websites. Proficient in HTML, CSS, JavaScript, and various web development frameworks.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">Skills</h2>
            <ul className="list-disc list-inside text-gray-700">
                <li>HTML/CSS</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>Node.js</li>
                <li>Responsive Web Design</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4 mb-2">Experience</h2>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Web Developer, ABC Company</h3>
                <p className="text-gray-700">Developed and maintained company website, implementing responsive design and
                    optimizing performance. Collaborated with the design team to create visually appealing web pages.
                </p>
                <p className="text-gray-600">January 2020 - Present</p>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Frontend Developer, XYZ Agency</h3>
                <p className="text-gray-700">Worked on various client projects, translating design mockups into interactive
                    web pages. Utilized modern web technologies to ensure cross-browser compatibility.</p>
                <p className="text-gray-600">June 2018 - December 2019</p>
            </div>

            <h2 className="text-xl font-semibold mt-4 mb-2">Education</h2>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Bachelor of Science in Computer Science</h3>
                <p className="text-gray-700">University of Example</p>
                <p className="text-gray-600">Graduated in May 2018</p>
            </div>

            <h2 className="text-xl font-semibold mt-4 mb-2">Contact</h2>
            <ul className="list-disc list-inside text-gray-700">
                <li>Email: john.doe@example.com</li>
                <li>LinkedIn: <a href="https://www.linkedin.com/in/johndoe"
                        className="text-blue-500 hover:underline">linkedin.com/in/johndoe</a></li>
                <li>Website: <a href="https://www.johndoe.com" className="text-blue-500 hover:underline">johndoe.com</a>
                </li>
            </ul>
        </div>
    </div>

</div>  
  )
}

export default ResumeTemplate1