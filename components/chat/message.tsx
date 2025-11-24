import { UIMessage } from 'ai'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

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
        <div className="size-8 flex justify-center items-center rounded-full font-semibold bg-purple-600 text-white text-base">
          AI
        </div>
      )}
      <div
        className={`rounded-lg px-4 py-2 text-base ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900 flex-1'
        }`}
      >
        {parts.map((part, i) => {
          if (part.type === 'text') {
            if (isUser) {
              return <span key={i}>{part.text}</span>
            }
            return (
              <div key={i} className="prose prose-base max-w-2xl">
                <ReactMarkdown
                  components={{
                    code(props) {
                      const { children, className } = props
                      const match = /language-(\w+)/.exec(className || '')
                      console.log('[Message] match:', match?.[1])
                      return match ? (
                        <SyntaxHighlighter
                          language={match[1]}
                          style={dracula}
                          PreTag="div"
                          customStyle={{ fontSize: '16px' }}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className={`${className} text-sm bg-gray-200 px-1 rounded`}
                        >
                          {children}
                        </code>
                      )
                    },
                  }}
                >
                  {part.text}
                </ReactMarkdown>
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
