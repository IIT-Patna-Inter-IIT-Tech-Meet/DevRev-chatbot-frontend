import { Inter } from 'next/font/google'
import { useState, useRef, useEffect } from 'react'
import ChatBubble from '@/components/ChatBubble'
import { IoSend } from 'react-icons/io5'
import { Bars } from 'react-loader-spinner'
import Link from 'next/link'
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
            {/* Create a loader when loading is true */}
            <div className='flex items-center justify-between w-full'>
            <Link href='/' className="text-white text-5xl ">Chat Bot</Link>
            <div className='flex gap-4'>
                <Link href='/addtool' className='text-white text-xl bg-[#3e3c3c] py-2 px-3 rounded-full'>Add Tool</Link>
                <Link href='/updatetool' className='text-white text-xl bg-[#3e3c3c] py-2 px-3 rounded-full'>Update Tool</Link>
                <Link href='/removetool' className='text-white text-xl bg-[#3e3c3c] py-2 px-3 rounded-full'>Remove Tool</Link>
            </div>
            </div>
            <div
                className="bg-[#3e3c3c] border-white border-6 rounded-lg w-full h-[80vh] overflow-x-auto"
                ref={chatContainerRef}
            >
                {/* Chat Bubble */}
                <ChatBubble
                    text="Summarize issues similar to don:core:dvrv-us-1:devo/0:issue/1"
                    isResponse={false}
                />
                <ChatBubble
                    text="To find the similar issues, we first need to find the similar work items. We can use the get_similar_work_items tool to do this. After that we can use the summarize_objects tool to summarize the issues."
                    isResponse={true}
                    code={[
                        {
                            tool_name: 'get_similar_work_items',
                            arguments: [
                                {
                                    argument_name: 'work_id',
                                    argument_value:
                                        'don:core:dvrv-us-1:devo/0:issue/1',
                                },
                            ],
                        },
                        {
                            tool_name: 'summarize_objects',
                            arguments: [
                                {
                                    argument_name: 'objects',
                                    argument_value: '$$PREV[0]',
                                },
                            ],
                        },
                    ]}
                />
                {console.log(messages)}
                {messages &&
                    messages.map((message, index) => (
                        <ChatBubble {...message} />
                    ))}
                {loading && (
                    <div className={`flex justify-start p-4`}>
                        <div
                            className={`bg-${'green'} text-${'black'} rounded-lg p-4 max-w-4xl bg-[#272626]`}
                        >
                            <Bars
                                height="80"
                                width="180"
                                color="#4fa94d"
                                ariaLabel="bars-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="w-full">
                <input
                    type="text"
                    className="bg-[#3e3c3c] border-white border-2 px-5 rounded-lg w-[92%] h-[5vh]"
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
                    className="bg-[#3e3c3c] text-3xl border-white border-2 border-solid px-5 rounded-lg w-[6%] ml-3 h-[7vh] inline-flex items-center justify-center"
                    onClick={handleQuery}
                >
                    <IoSend />
                </button>
            </div>
        </main>
    )
}
