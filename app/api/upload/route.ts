import { NextRequest, NextResponse } from 'next/server';
import {
  BedrockRuntimeClient,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";

// import pdfParse from 'pdf-parse';
import { PdfReader } from "pdfreader";


export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    const prompt = `
  This is a resume which is unformatted. Fix any grammatical mistakes/errors and extract all data from resume and insert corrected data into json format as below given json structure.
{ 
 "personalInfo": { "name": "", "phone": "", "email": "", "age": "", "location": ""(only give the state) },
 
 "professionalSummary": [ "" , // ...multiple items ],
 
 "professionalExperience": [ { "position": "", "company": "", "description": "","duration": "" } ],
 
 "additionalResponsibilities": [ "" , // ...multiple items ],
 
 "professionalSkills": [ "" , // ...multiple items ],
 
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

    const response = await processWithBedrock(prompt);
    let data = "";
    // console.log(response)
    const textarray = response.output?.message?.content
    // console.log("🚀 ~ POST ~ textarray:", textarray)
    if (textarray) {
      const jsonString = textarray[0].text;
      if (jsonString) {
        const simpleString = jsonString.replace(/\s+/g, " ");
        // console.log(simpleString)
        const startIndex = simpleString.indexOf("{");
        // console.log(startIndex);
        const endIndex = simpleString.lastIndexOf("}");
        // console.log(endIndex);
        data = simpleString.substring(startIndex, endIndex + 1);
        // console.log(data)
      }

    }

    console.log(data.toString())

    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Error processing file' }, { status: 500 });
  }
}

const processWithBedrock = async (prompt: string) => {

  const client = new BedrockRuntimeClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY || "",
      secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
    }
  });
  const modelId = "anthropic.claude-3-5-sonnet-20240620-v1:0";
  const command = new ConverseCommand({
    modelId,
    messages: [
      {
        "content": [{ "text": prompt }],
        role: "user"
      },
    ],

    inferenceConfig: { maxTokens: 4000, temperature: 0.5, topP: 0.9 },
  });



  // Invoke the Bedrock model with the file and prompt
  try {
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error('Error invoking Bedrock:', error);
    throw new Error('Failed to process with Bedrock');
  }
};

