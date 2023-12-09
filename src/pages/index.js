import { Inter } from 'next/font/google'
import { useState, useRef, useEffect } from 'react'
import ChatBubble from '@/components/ChatBubble'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [query, setQuery] = useState('')
    const [messages, setMessages] = useState([])
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const chatContainerRef = useRef(null)

    const handleQuery = async (e) => {
        messages.push({ text: query, isResponse: false })
        setQuery('')
        setLoading(true)
        const res = await fetch('http://127.0.0.1:8000/api/query/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
        const json = await res.json()
        setResponse(json)
        console.log(json)
        setLoading(false)
        messages.push({
            text: json.text,
            isResponse: json.isResponse,
            code: json.code,
        })
    }

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight
        }
    }, [messages.length]) // Assuming 'messages' is your array of chat messages

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between px-24 pt-8 pb-2 ${inter.className} bg-[#272626]`}
        >
            <h1 className="text-white text-5xl ">Chat Bot</h1>
            <div
                className="bg-[#3e3c3c] border-white border-6 rounded-lg w-full h-[80vh] overflow-x-auto"
                ref={chatContainerRef}
            >
                {/* Chat Bubble */}
                <ChatBubble
                    text="I need help with my account"
                    isResponse={false}
                />
                <ChatBubble
                    text="Here find the details"
                    isResponse={true}
                    code={{
                        intent: {
                            name: 'account',
                            confidence: 0.9999999999999999,
                        },
                        entities: {},
                    }}
                />
                {console.log(messages)}
                {messages &&
                    messages.map((message, index) => (
                        <ChatBubble {...message} />
                    ))}
            </div>
            <div className="w-full">
                <input
                    type="text"
                    className="bg-[#3e3c3c] border-white border-6 px-5 rounded-lg w-[92%] h-[5vh]"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.shiftKey && e.key === 'Enter') {
                            setQuery((prev) => prev + '\n')
                        }
                        if (e.key === 'Enter' && !e.shiftKey) {
                            handleQuery()
                        }
                    }}
                ></input>
                <button
                    className="bg-[#3e3c3c] border-white border-6 px-5 rounded-lg w-[6%] ml-3 h-[5vh]"
                    onClick={handleQuery}
                >
                    Send
                </button>
            </div>
        </main>
    )
}
