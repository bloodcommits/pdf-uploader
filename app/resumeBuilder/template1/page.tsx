"use client"
import ResumeTemplate1 from "@/app/components/resumeTemplate/ResumeTemplate1"
import ReactToPrint from 'react-to-print'; 

const StandardTemplate =()=>{


    return(
        <div className="bg-gray-100" >
            <ReactToPrint>
            <ResumeTemplate1 />
            </ReactToPrint>
            </div>
    )
}
export default StandardTemplate