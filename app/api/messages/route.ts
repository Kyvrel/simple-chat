import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { chats, messages } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// POST /api/messages - 创建消息
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { chatId, role, content } = body

    if (!chatId) {
      return NextResponse.json({ error: 'chatId is required' }, { status: 400 })
    }
    if (!role) {
      return NextResponse.json({ error: 'role is required' }, { status: 400 })
    }
    if (!content) {
      return NextResponse.json(
        { error: 'content is required' },
        { status: 400 }
      )
    }

    const [newMessage] = await db
      .insert(messages)
      .values({
        chatId,
        role,
        content,
      })
      .returning()

    await db
      .update(chats)
      .set({ updatedAt: new Date() })
      .where(eq(chats.id, chatId))
    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    console.error('Failed to create message:', error)
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    )
  }
}
