"use client"
import ResumeTemplate1 from "@/app/components/resumeTemplate/ResumeTemplate1"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import ReactToPrint from 'react-to-print';

const StandardTemplate = () => {
  const resumeDownloadRef = useRef(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const handleGeneratePdf = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current, {
      scale: 2, // Increase the scale to capture at higher resolution
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt', // Using points for better precision
      format: 'a4',
    });

    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('document.pdf');
  };


  return (
    <div className="bg-gray-100 flex justify-center flex-col items-center" >

      <ReactToPrint
        trigger={() => (
          <button
            className='bg-blue-300 px-3 py-3 rounded-lg mt-2 ml-2'
          >
            <p className='ml-1 text-sm'>Download PDF</p>
          </button>
        )}
        content={() => resumeDownloadRef.current}
        pageStyle="@page { margin: 0; }"
        documentTitle='Resume Builder'
      />
      {/* <button onClick={handleGeneratePdf}>
        DOWNLOAD PDF
      </button> */}

      <div
      className="p-0"
       ref={resumeDownloadRef}
      //  ref={contentRef}
        >
        <ResumeTemplate1 />


      </div>




    </div>
  )
}
export default StandardTemplate