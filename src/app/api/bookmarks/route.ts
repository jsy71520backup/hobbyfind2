import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('bookmarks')
      .select('hobby_id')
      .eq('user_id', session.user.id);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch bookmarks' },
        { status: 500 }
      );
    }

    const hobbyIds = data.map((bookmark) => bookmark.hobby_id);
    return NextResponse.json({ hobbyIds });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { hobbyId } = body;

    if (!hobbyId) {
      return NextResponse.json(
        { error: 'Hobby ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('bookmarks')
      .insert({
        user_id: session.user.id,
        hobby_id: hobbyId,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Bookmark already exists' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to create bookmark' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, bookmark: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const hobbyId = searchParams.get('hobbyId');

    if (!hobbyId) {
      return NextResponse.json(
        { error: 'Hobby ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', session.user.id)
      .eq('hobby_id', hobbyId);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete bookmark' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

