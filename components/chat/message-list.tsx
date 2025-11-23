import { UIMessage } from 'ai'
import { Message } from './message'

type MessageListProps = {
  messages: UIMessage[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      {messages.map(message => {
        return <Message key={message.id} message={message} />
      })}
    </div>
  )
}
