import { NextResponse } from 'next/server';
import pinataSDK from '@pinata/sdk';
import { Readable } from 'stream';

export async function POST(request: Request) {
  try {
    console.log('Received POST request');

    const formData = await request.formData();
    console.log('FormData parsed');

    const file = formData.get('file') as File | null;
    console.log('File retrieved from FormData:', file ? file.name : 'No file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!process.env.PINATA_JWT) {
      console.error('PINATA_JWT environment variable is not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });
    console.log('Pinata SDK initialized');

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const stream = Readable.from(buffer);
    console.log('File converted to stream');

    const options = {
      pinataMetadata: {
        name: file.name || 'unnamed',
      },
    };

    console.log('Uploading to Pinata...');
    const result = await pinata.pinFileToIPFS(stream, options);
    console.log('Pinata upload result:', result);

    if (!result.IpfsHash) {
      throw new Error('IPFS hash not received from Pinata');
    }

    return NextResponse.json({ ipfsUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}` });
  } catch (error:any) {
    console.error('Error in upload-to-pinata route:', error);
    return NextResponse.json({ error: error.message || 'Error uploading to Pinata' }, { status: 500 });
  }
}