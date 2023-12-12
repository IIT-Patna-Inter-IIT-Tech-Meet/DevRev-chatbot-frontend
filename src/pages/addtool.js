import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { FaPlusSquare } from 'react-icons/fa'

const addtool = () => {
    const [names, setNames] = useState([['','','']]) // Initial state with an empty name field
    const [apiName, setApiName] = useState('')
    const [apiDesc, setApiDesc] = useState('')

    const handleAddName = () => {
        const updatedNames = [...names, ['','','']] // Add a new empty name field
        setNames(updatedNames)
    }

    // const handleNameChange = (index, event) => {
    //     const updatedNames = [...names]
    //     updatedNames[index] = event.target.value // Update the name at a specific index
    //     setNames(updatedNames)
    // }
    const handleArgumentChange = (index, event) => {
        const updatedNames = [...names]
        updatedNames[index][0] = event.target.value // Update the name at a specific index
        setNames(updatedNames)
    }
    const handleArgumentDescChange = (index, event) => {
        const updatedNames = [...names]
        updatedNames[index][1] = event.target.value // Update the name at a specific index
        setNames(updatedNames)
    }
    const handleArgumentReturnChange = (index, event) => {
        const updatedNames = [...names]
        updatedNames[index][2] = event.target.value // Update the name at a specific index
        setNames(updatedNames)
    }
    const handleSubmit = async () => {
        // const requestBody = {
        //     api_name: apiName,
        //     api_desc: apiDesc,
        //     names: names,
        // }

        // console.log(JSON.stringify(requestBody))

        const res = await fetch(
            'http://127.0.0.1:8000/api/addtool/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ apiName, apiDesc, names }),
            }
        )

        const json = await res.json()
        console.log(json)
    }

  return (
      <div
          className={`flex min-h-screen flex-col items-center justify-around px-24 pt-8 pb-2 bg-[#272626]`}
      >
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
                  <div className="flex gap-7">
                      <h2 className="flex items-center text-2xl">
                          API Description
                      </h2>
                      <input
                          type="text"
                          className="border-white border rounded-lg w-3/4 h-10 bg-[#3e3c3c] p-2"
                          value={apiDesc}
                          onChange={(event) => {
                              setApiDesc(event.target.value)
                          }}
                      />
                  </div>
                  <div className="flex gap-7">
                      <h2 className="flex items-center text-2xl">Arguments</h2>
                      <button className="text-2xl" onClick={handleAddName}>
                          <FaPlusSquare />
                      </button>
                  </div>
                  {names.map((name, index) => (
                      <div className="flex gap-7">
                          <h2 className="flex items-center text-2xl">
                              API Argument
                          </h2>
                          <input
                              type="text"
                              className="border-white border rounded-lg w-1/4 h-10 bg-[#3e3c3c] p-2"
                              value={name[0]}
                              onChange={(event) =>
                                  handleArgumentChange(index, event)
                              }
                          />
                          <h2 className="flex items-center text-2xl">
                              Argument Description
                          </h2>
                          <input
                              type="text"
                              className="border-white border rounded-lg w-1/4 h-10 bg-[#3e3c3c] p-2"
                              value={name[1]}
                              onChange={(event) =>
                                  handleArgumentDescChange(index, event)
                              }
                          />
                          <h2 className="flex items-center text-2xl">
                              Return Type
                          </h2>
                          <input
                              type="text"
                              className="border-white border rounded-lg w-1/4 h-10 bg-[#3e3c3c] p-2"
                              value={name[2]}
                              onChange={(event) =>
                                  handleArgumentReturnChange(index, event)
                              }
                          />
                      </div>
                  ))}
              <button className="text-black text-xl bg-[#ff9e42] py-2 px-3 rounded-full mx-3 w-36" onClick={handleSubmit}>
                  Add Tool
              </button>
              </div>

          </div>
      </div>
  )
}

export default addtool
