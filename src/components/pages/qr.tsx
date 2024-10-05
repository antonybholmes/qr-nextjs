'use client'
import { cn } from '@lib/class-names'
import QRCode from 'qrcode'
import { useEffect, useRef, useState } from 'react'

export function QRGen() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [input, setInput] = useState<string>('')
  const [qr, setQr] = useState<string>('')
  const [response, setResponse] = useState(null)

  useEffect(() => {
    if (qr) {
      QRCode.toCanvas(canvasRef.current, input, { scale: 8 })
    }
  }, [qr])

  return (
    <div className="flex flex-col gap-y-8 py-5 relative bg-gray font-mono items-center min-h-screen">
      <h1 className="text-5xl font-bold">QR Code Generator</h1>
      <h2 className="text-active text-2xl">
        Generate QR Codes for sharing your content for free.
      </h2>
      <input
        type="text"
        placeholder="Enter a link, number or any text to generate the QR Code..."
        className="text-sm w-1/2 p-4 rounded-md shadow-md border border-gray-100 placeholder:text-gray-300"
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            setQr(input)
          }
        }}
      ></input>
      <button
        className="py-3 px-6 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 rounded-md text-white font-bold"
        onClick={() => {
          setQr(input)
        }}
      >
        Generate QR Code
      </button>

      <canvas
        ref={canvasRef}
        id="canvas"
        className={cn('shadow-md rounded', [qr !== '', 'visible', 'invisible'])}
      ></canvas>

      <footer className="fixed left-0 right-0 bottom-0 w-full text-xs py-4 flex flex-row justify-center">
        {`Copyright (C) ${new Date().getFullYear()} Antony Holmes. All rights reserved.`}
      </footer>
    </div>
  )
}
