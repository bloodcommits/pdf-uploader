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
