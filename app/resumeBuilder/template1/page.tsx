"use client"
import dynamic from 'next/dynamic'
const NoSSR = dynamic(() => import('@/app/components/resumeTemplate/resume1/ReactPdfResumeTemplate1'), { ssr: false })



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