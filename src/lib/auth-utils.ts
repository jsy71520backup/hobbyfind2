import 'server-only';

import { createClient } from '@/lib/supabase/server';
import bcrypt from 'bcryptjs';

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function getUserByUsername(username: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('users')
    .select('id, username, password_hash')
    .eq('username', username)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function createUser(username: string, password: string) {
  const supabase = await createClient();
  const passwordHash = await hashPassword(password);

  const { data, error } = await supabase
    .from('users')
    .insert({
      username,
      password_hash: passwordHash,
    })
    .select('id, username')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

