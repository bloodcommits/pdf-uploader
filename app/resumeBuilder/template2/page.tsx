"use client"
import dynamic from 'next/dynamic'
const NoSSR = dynamic(() => import('@/app/components/resumeTemplate/resume2/ReactPdfResumeTemplate2'), { ssr: false })

// import ResumeTemplate1 from "@/app/components/resumeTemplate/ResumeTemplate1"


const StandardTemplate = () => {
  return (
    <>
      <div className="bg-gray-100 max-h-full h-svh" >
        {/* <ResumeTemplate1 /> */}
        <NoSSR />


      </div >
    </>
  )
}
export default StandardTemplate