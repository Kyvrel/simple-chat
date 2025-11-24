import Image from 'next/image'

export function ChatHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 ">
      <div className="flex items-center gap-2">
        <Image src="/elephant.png" alt="Elly" width={24} height={24} />
        <h1 className="text-lg font-semibold">Elly Chat</h1>
      </div>
    </header>
  )
}
