import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const videoPath = join(process.cwd(), 'public', 'videos', 'Demo_shrunk.mp4');
    const stat = statSync(videoPath);
    const fileSize = stat.size;
    const range = request.headers.get('range');

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = createReadStream(videoPath, { start, end });

      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
        'Cache-Control': 'public, max-age=31536000, immutable',
      };

      return new NextResponse(file, {
        status: 206,
        headers: head,
      });
    }

    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
      'Cache-Control': 'public, max-age=31536000, immutable',
    };

    const file = createReadStream(videoPath);
    return new NextResponse(file, {
      status: 200,
      headers: head,
    });
  } catch (error) {
    console.error('Video serving error:', error);
    return new NextResponse('Error loading video', { status: 500 });
  }
} 