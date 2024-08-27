"use client"
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation'
import PDFToText from 'react-pdftotext';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitted")

    if (!selectedFile) {
      alert('Please upload a file and enter a prompt');
      return;
    }

    setLoading(true)
    const text = await PDFToText(selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error(await response.text())
      const response_json = await response.json();
      setLoading(false)
      setResult(JSON.parse(response_json?.data));
      // redirect("/resumeBuilder/template1")
      localStorage.setItem("data",JSON.stringify(response_json?.data))
    } catch (e: any) {
      setLoading(false)
      console.error(e)
    }


  };



  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 pt-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload PDF and Enter Prompt</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>
          {/* <div>
            <input
              type="text"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Enter your prompt here"
              className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Submit
          </button>
        </form>

      </div>
      <div className='w-full max-w-md' >

        {
          (result || loading) &&
          <pre>
            result: {result ? JSON.stringify(result, undefined, 2) : "Loading...."}
          </pre>
        }
      </div>
      <h2 className='font-bold m-5 text-3xl '>Select the template</h2>
      <div className='flex flex-auto gap-5'>
        <button>
        <Image src="/template1.png" className='' objectFit='cover' height={500} width={500} alt='temp1' />
        </button>
        <button>
        <Image src="/template1.png" className='' objectFit='cover' height={500} width={500} alt='temp1' />
        </button>
        <button>
        <Image src="/template1.png" className='' objectFit='cover' height={500} width={500} alt='temp1' />
        </button>
      </div>
    </div>
  );
}
