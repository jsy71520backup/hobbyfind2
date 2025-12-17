import { NextResponse } from 'next/server';
import { createUser, getUserByUsername } from '@/lib/auth-utils';
import { z } from 'zod';

const signupSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(100),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = signupSchema.parse(body);

    const existingUser = await getUserByUsername(validatedData.username);
    if (existingUser) {
      return NextResponse.json(
        { error: '이미 사용 중인 아이디입니다.' },
        { status: 400 }
      );
    }

    const user = await createUser(validatedData.username, validatedData.password);

    return NextResponse.json(
      { message: '회원가입이 완료되었습니다.', userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '입력값이 올바르지 않습니다.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '회원가입 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}


