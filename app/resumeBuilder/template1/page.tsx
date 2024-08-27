"use client"
import ResumeTemplate1 from "@/app/components/resumeTemplate/ResumeTemplate1"
import { useRef } from "react";
import ReactToPrint from 'react-to-print'; 

const StandardTemplate =()=>{
    const resumeDownloadRef = useRef(null);


    return(
        <div className="bg-gray-100" >

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

            <div ref={resumeDownloadRef}>
            <ResumeTemplate1  />
            </div>


            
            </div>
    )
}
export default StandardTemplate