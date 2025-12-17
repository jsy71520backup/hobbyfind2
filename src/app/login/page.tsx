'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Header } from '@/features/hobby/components/header';

const loginSchema = z.object({
  username: z.string().min(1, '아이디를 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        setIsLoading(false);
        return;
      }

      router.push('/');
      router.refresh();
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="bg-white p-6 rounded-xl shadow-sm">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              로그인
            </h1>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>아이디</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="아이디를 입력하세요"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="비밀번호를 입력하세요"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <div className="text-sm text-destructive text-center">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover"
                  disabled={isLoading}
                >
                  {isLoading ? '로그인 중...' : '로그인'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm text-gray-600">
              계정이 없으신가요?{' '}
              <Link
                href="/signup"
                className="text-primary hover:text-primary-hover font-medium"
              >
                회원가입
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}


