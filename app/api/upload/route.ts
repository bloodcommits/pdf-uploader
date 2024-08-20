import { NextRequest, NextResponse } from 'next/server';
import {
  BedrockRuntimeClient,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";

// import pdfParse from 'pdf-parse';
import { PdfReader } from "pdfreader";


export async function POST(request: NextRequest) {
  try {
    const {text} = await request.json();

    const result = text

    // const result = await processWithBedrock(Uint8, prompt);
    console.log(result)

    // Prompt we gonna use
    const prompt = `Review the following resume content and provide concise, actionable suggestions for improvement with a focus on increasing ATS (Applicant Tracking System) compliance. Keep each suggestion brief and avoid exceeding a total of 500 words.

    1. **Avoid Repetition**: Identify repeated words or phrases and suggest alternatives.
    2. **Spelling and Grammar**: Point out any spelling or grammatical errors and provide corrections.
    3. **Quantify Impact**: Add specific, quantifiable achievements to the experience section.
    4. **Formatting and Keywords**: Ensure proper formatting and include relevant keywords from the job description.
    5. **Content Relevance**: Verify that the content is relevant and organized with distinct sections.
    6. **Section-Specific Feedback**: Provide brief suggestions for each resume section, including Contact Information, Summary/Objective, Work Experience, Education, Skills, and Certifications or Achievements.
    
    Resume content:
    ${text}
    
    Please provide your suggestions in a clear and structured format, addressing each point above in a maximum of 700 words.
    The output format should be: for every suggestion, give heading and its description, that's it dont give anything else, like:
    {
        suggestions: [
            {
                heading: [suggestion heading],
                description: [suggestion description]
            }, {
                heading: [suggestion heading],
                description: [suggestion description]
            }
        ]
    }

    Give me the correct json format without voilating the rules of JSON object, give me the accurate json object.
    `

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Error processing file' }, { status: 500 });
  }
}

const processWithBedrock = async (fileContent: Uint8Array, prompt: string) => {

  // Initialize the AWS Bedrock client
  // Create a Bedrock Runtime client in the AWS Region you want to use.
  const client = new BedrockRuntimeClient({ region: "us-east-1" });
  const modelId = "anthropic.claude-3-haiku-20240307-v1:0";

  const userMessage =
    "Describe the purpose of a 'hello world' program in one line.";
  const command = new ConverseCommand({
    modelId,
    messages: [
      {
        content: [
          {
            // text: "",
            document: {
              format: "pdf",
              name: "resume.pdf",
              source: {
                bytes: fileContent,
              },
            },
          }
        ],
        role: "user"
      },
    ],

    inferenceConfig: { maxTokens: 512, temperature: 0.5, topP: 0.9 },
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
