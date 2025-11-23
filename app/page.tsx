'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { stat } from 'fs'

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat()
  const [input, setInput] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage({ text: input })
    console.log('handleSubmit: ', input)
    setInput('')
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }
  const handleChange = (e: any) => {
    setInput(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3 ">
        <h1 className="text-lg font-semibold">Simple Chat</h1>
      </header>

      {/* Messages */}
      <div className="w-full max-w-3xl mx-auto mt-10">
        {messages.map(message => {
          const isUser = message.role === 'user'
          return (
            <div
              key={message.id}
              className={`flex p-4 gap-2 ${
                isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!isUser && (
                <div className="size-8 flex justify-center items-center rounded-full font-semibold bg-purple-600 text-white text-sm">
                  AI
                </div>
              )}
              <div
                className={`rounded-lg px-4 py-2 text-sm  ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900 flex-1'
                }`}
              >
                {message.parts.map((part, i) => {
                  if (part.type == 'text') {
                    return <span key={i}>{part.text}</span>
                  }
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="fixed bottom-0  left-0 right-0  border-t bg-white p-4 ">
        <form className="mx-auto flex max-w-3xl gap-2" onSubmit={handleSubmit}>
          <textarea
            name="input"
            autoFocus
            rows={1}
            value={input}
            disabled={status !== 'ready'}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="flex-1 resize-none p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
            placeholder="Type a message..."
          ></textarea>
          <button
            disabled={!input.trim() || status !== 'ready'}
            className="disabled:bg-gray-200 disabled:text-white px-2 py-1 text-sm rounded-lg bg-black text-white "
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
