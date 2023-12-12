import Link from 'next/link'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const removetool = () => {
    const [apiName, setApiName] = useState('')

    const handleSubmit = async () => {
        
        const res = await fetch('http://127.0.0.1:8000/api/removetool/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ apiName }),
        })

        const json = await res.json()
        if (json.success == true) {
            toast('Tool Deleted Sucessfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            })
        }
        console.log(json)
    }

    return (
        <div
            className={`flex min-h-screen flex-col items-center justify-around px-24 pt-8 pb-2 bg-[#272626]`}
        >
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="flex items-center justify-between w-full">
                <Link href="/" className="text-white text-5xl ">
                    Chat Bot
                </Link>
                <div className="flex gap-4">
                    <Link
                        href="/addtool"
                        className="text-white text-xl bg-[#3e3c3c] py-2 px-3 rounded-full"
                    >
                        Add Tool
                    </Link>
                    <Link
                        href="/updatetool"
                        className="text-white text-xl bg-[#3e3c3c] py-2 px-3 rounded-full"
                    >
                        Update Tool
                    </Link>
                    <Link
                        href="/removetool"
                        className="text-white text-xl bg-[#3e3c3c] py-2 px-3 rounded-full"
                    >
                        Remove Tool
                    </Link>
                </div>
            </div>
            <div className="bg-[#3e3c3c] border-white border-6 rounded-lg w-full h-[80vh] overflow-x-auto">
                <div className="flex flex-col justify-center py-4 px-4 gap-5">
                    <div className="flex gap-7">
                        <h2 className="flex items-center text-2xl">API Name</h2>
                        <input
                            type="text"
                            className="border-white border rounded-lg w-3/4 h-10 bg-[#3e3c3c] p-2"
                            value={apiName}
                            onChange={(event) => {
                                setApiName(event.target.value)
                            }}
                        />
                    </div>
                    <button
                        className="text-black text-xl bg-[#ff9e42] py-2 px-3 rounded-full mx-3 w-36"
                        onClick={handleSubmit}
                    >
                        Remove Tool
                    </button>
                </div>
            </div>
        </div>
    )
}

export default removetool
