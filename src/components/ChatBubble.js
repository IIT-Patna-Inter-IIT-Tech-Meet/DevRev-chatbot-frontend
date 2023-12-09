import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism/material-dark'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const ChatBubble = ({ text, code, isResponse }) => {
    return (
        <div
            className={`flex ${isResponse ? 'justify-end' : 'justify-start'}
            } p-4`}
        >
            <div
                className={`bg-${isResponse ? 'green' : '#272626'} text-${
                    isResponse ? 'black' : 'white'
                } rounded-lg p-4 max-w-4xl bg-[#272626]`}
            >
                <p className={`text-white`}>{text}</p>
                {code && (
                    <div className="mt-2">
                        <SyntaxHighlighter language="json" style={a11yDark}>
                            {JSON.stringify(code, null, 2)}
                        </SyntaxHighlighter>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatBubble
