import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';

export async function POST(request: NextRequest) {
  try {

    const formData = await request.formData();
    const file = formData.get('file') as Blob;
    const prompt = formData.get('prompt') as string;

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    if (!prompt) {
      return NextResponse.json({ error: 'prompt is required' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await processWithBedrock(buffer, prompt);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Error processing file' }, { status: 500 });
  }
}

const processWithBedrock = async (fileContent: Buffer, prompt: string) => {
  // Initialize the AWS Bedrock client
  const bedrock = new AWS.Bedrock({
    region: 'your-region',
    // Add your AWS credentials if not using IAM roles
    // accessKeyId: 'your-access-key-id',
    // secretAccessKey: 'your-secret-access-key',
  });

  // Define your parameters for Bedrock integration
  const params = {
    ModelId: 'your-model-id', // Specify your model ID
    InputData: {
      file: fileContent.toString('base64'), // Convert file content to Base64 if needed
      prompt: prompt,
    },
  };

  // Invoke the Bedrock model with the file and prompt
  try {
    const response = await bedrock.invoke(params).promise();
    return response;
  } catch (error) {
    console.error('Error invoking Bedrock:', error);
    throw new Error('Failed to process with Bedrock');
  }
};
