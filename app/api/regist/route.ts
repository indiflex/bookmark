import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from '@/lib/i18n-zod';
import {
  hashPassword,
  parseZodErrorMessage,
  toErrorMessage,
} from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('🚀  body:', body);

    const parsedBody = z
      .object({
        nickname: z.string({
          message: '닉네임을 입력하세요!',
        }),
        email: z.string().email(),
        passwd: z.string().min(6).optional(),
      })
      .safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { user: null, message: parseZodErrorMessage(parsedBody.error) },
        { status: 400 }
      );
      // throw new Error(parsedBody.error.message);
    }
    const { nickname, email, passwd } = body;

    const existsUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log('🚀  existsUser:', existsUser);

    if (existsUser) {
      return NextResponse.json(
        { user: null, message: 'Already exists user!' },
        { status: 409 }
      );
    }

    console.log('🚀  existsUser22:', existsUser);

    const { passwd: pw, ...user } = await prisma.user.create({
      data: {
        nickname,
        email,
        passwd: await hashPassword(passwd),
      },
    });
    console.log('🚀  newer:', user);

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ user: null, message: toErrorMessage(error) });
  }
}
