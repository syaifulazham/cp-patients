// src/app/api/profile/route.ts
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma/prisma';

export async function POST(req: NextRequest) {
    const userEmail = await req.json();

  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.patientUser.findUnique({
      where: { email: userEmail },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
