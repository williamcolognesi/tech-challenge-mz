import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/api/client';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await fetch(`${API_URL}/comprovantes/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    return new NextResponse('Comprovante não encontrado', { status: res.status });
  }

  const contentType = res.headers.get('content-type') ?? 'application/octet-stream';
  const contentDisposition =
    res.headers.get('content-disposition') ?? `attachment; filename="comprovante-${id}"`;

  const buffer = Buffer.from(await res.arrayBuffer());

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': contentDisposition,
    },
  });
}
