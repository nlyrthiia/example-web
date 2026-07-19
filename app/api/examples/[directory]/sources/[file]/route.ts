import { NextResponse } from 'next/server';
import { readTextUnderExamples } from '../../../../../lib/safePath';

export async function GET(
  _request: Request,
  { params }: { params: { directory: string; file: string } }
) {
  const { directory, file } = params;
  const decodedFile = decodeURIComponent(file);
  const content = readTextUnderExamples(directory, 'sources', decodedFile);

  if (content !== null) {
    return new NextResponse(content);
  }
  return new NextResponse('File not found', { status: 404 });
}
