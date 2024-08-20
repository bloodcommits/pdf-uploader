"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';

import PDFToText from 'react-pdftotext';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>('');

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handlePromptChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitted")

    if (!selectedFile || !prompt) {
      alert('Please upload a file and enter a prompt');
      return;
    }
    const text = await PDFToText(selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error(await response.text())
      } catch (e: any) {
        console.error(e)
      }


  };


  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
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
          <div>
            <input
              type="text"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Enter your prompt here"
              className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
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
    </div>
  );
}
