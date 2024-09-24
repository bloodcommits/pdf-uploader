"use client";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import PDFToText from "react-pdftotext";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [template, settemplate] = useState<number>(2);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitted");

    if (!selectedFile) {
      alert("Please upload a file and enter a prompt");
      return;
    }

    setLoading(true);
    const text = await PDFToText(selectedFile);

    const prompt = `
  This is a resume which is unformatted. Fix any grammatical mistakes/errors and extract all data from resume and insert corrected data into json format as below given json structure.
{ 
 "personalInfo": { "name": "", "phone": "", "email": "", "age": "", "location": "" },
 
 "professionalSummary": [ "" , // ...multiple items ],
 
 "professionalExperience": [ { "position": "", "company": "", "description": "","duration": "" } ],
 
 "additionalResponsibilities": [ "" , // ...multiple items ],
 
 "professionalSkills": [ "" , // ...multiple items just get skill in a singlel word do not use brakets and expalian it   ],
 
 "projects:[ { name: string; url: string; description: string; date: string }],

 "sociallinks":[ {platform: string; url: string}],

 "academicQualifications": [ { InstituteName: string; description: string; duration: string } ],

 "roleCandidateDeserve": string (after parsing the text tell me what the person is applying for  )

 "certifications":[{nameOfCertificate:string , durationOfCompletion:string}]

 "awards":[{nameOfCertificate:string , duration:string}] 

  }
  i want all the information in exact same format

 
 Resume content:${text}
  `

    try {
      const response = await fetch("https://api-resume-enhancer.krida.top/auth/upload-resume", {
        method: "POST",
        body: JSON.stringify({ text: prompt }),
      });

      if (!response.ok) throw new Error(await response.text());
      const response_json = await response.json();
      setLoading(false);
      setResult(JSON.parse(response_json?.data));
      localStorage.setItem("data", response_json?.data);
      console.log(JSON.parse(response_json?.data))
      router.push(`/resumeBuilder/template${template}`);
    } catch (e: any) {
      setLoading(false);
      console.error(e);
    }
  };


  const templateselect = (value: number) => {
    settemplate(value);
  };


  const handleClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 pt-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Upload PDF and Enter Prompt
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="w-full max-w-md">
        {(result || loading) && (
          <pre>
            result:{" "}
            {result ?
              // "JSON.stringify(result, undefined, 2)"
              "Done"
              : "Loading...."}
          </pre>
        )}
      </div>
      <h2 className="font-bold m-5 text-3xl ">Select the template</h2>
      <div className="flex  gap-5">
        <button
          onClick={() => {
            handleClick('button1')
            templateselect(1);
          }}
          className={`px-4 py-2 rounded-lg focus:outline-none transition-colors duration-300 ${activeButton === 'button1'
            ? 'bg-blue-500 text-white'
            : 'bg-blue-200 text-blue-800'
            }`}
        >
          Template 1
        </button>
        <button
          onClick={() => {
            handleClick('button2')
            templateselect(2);
          }}
          className={`px-4 py-2 rounded-lg focus:outline-none transition-colors duration-300 ${activeButton === 'button2'
            ? 'bg-blue-500 text-white'
            : 'bg-blue-200 text-blue-800'
            }`}
        >
          Template 2
        </button>
        <button
          onClick={() => {
            handleClick('button3')
            templateselect(3);
          }}
          className={`px-4 py-2 rounded-lg focus:outline-none transition-colors duration-300 ${activeButton === 'button3'
            ? 'bg-blue-500 text-white'
            : 'bg-blue-200 text-blue-800'
            }`}
        >
          Template 3
        </button>
      </div>
    </div>
  );
}
