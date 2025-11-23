import { UIMessage } from 'ai'

export type MessageProps = {
  message: UIMessage
}
export function Message({ message: { role, parts } }: MessageProps) {
  const isUser = role === 'user'
  return (
    <div
      className={`flex p-4 gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="size-8 flex justify-center items-center rounded-full font-semibold bg-purple-600 text-white text-sm">
          AI
        </div>
      )}
      <div
        className={`rounded-lg px-4 py-2 text-sm  ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900 flex-1'
        }`}
      >
        {parts.map((part, i) => {
          if (part.type === 'text') {
            return <span key={i}>{part.text}</span>
          }
          return null
        })}
      </div>
    </div>
  )
}
