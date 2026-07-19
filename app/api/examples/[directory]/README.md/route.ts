import { NextResponse } from 'next/server';
import { readTextUnderExamples } from '../../../../lib/safePath';

export async function GET(
  _request: Request,
  { params }: { params: { directory: string } }
) {
  const { directory } = params;
  const content = readTextUnderExamples(directory, 'README.md');

  if (content !== null) {
    return new NextResponse(content);
  }
  return new NextResponse('README.md not found', { status: 404 });
}
