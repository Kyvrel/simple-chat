'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { ChatHeader } from '@/components/chat/chat-header'
import { MessageList } from '@/components/chat/message-list'
import { ChatInput } from '@/components/chat/chat-input'

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat()
  const [input, setInput] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage({ text: input })
    setInput('')
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ChatHeader />
      <MessageList messages={messages} />
      <ChatInput
        input={input}
        status={status}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
