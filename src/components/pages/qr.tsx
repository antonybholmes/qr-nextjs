'use client'
import { cn } from '@lib/class-names'
import { X } from 'lucide-react'
import QRCode from 'qrcode'
import { useEffect, useRef, useState } from 'react'

export function QRGen() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [input, setInput] = useState<string>('')
  const [qr, setQr] = useState<string>('')
  const [response, setResponse] = useState(null)

  useEffect(() => {
    if (qr) {
      QRCode.toCanvas(canvasRef.current, input, { scale: 10 })
    }
  }, [qr])

  const handleDownload = () => {
    const canvas = canvasRef.current

    if (canvas) {
      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL('image/png')

      // get first word of input as filename using regex
      const filenameMatch = input
        .replace(/^.+\/\//g, '')
        .replace('www.', '')
        .trim()
        .match(/(\w+)/)
      const filename = filenameMatch ? filenameMatch[0] : 'item'

      // Create a link element
      const link = document.createElement('a')
      link.href = dataURL
      link.download = `${filename}_qr.png` // Set the desired file name

      // Append to the body, click and remove it
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex flex-col gap-y-8 py-6 relative bg-gray items-center grow px-3 w-full md:w-2/3">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          QR Code Generator
        </h1>

        <div className="flex flex-col w-full items-center gap-y-3">
          <div className="flex flex-row items-center justify-center overflow-hidden gap-x-2 py-1 pl-2 pr-1.5 w-full xl:w-1/2 2xl:w-5/12 rounded-xl border bg-white border-gray-200">
            <input
              type="text"
              placeholder={`Enter a link or any text and click "Generate QR Code"...`}
              className="text-sm w-full h-8 px-1 placeholder:text-gray-400"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  setQr(input)
                }
              }}
            />

            {input !== '' && (
              <button
                title="Clear"
                className="hover:bg-gray-100 transition-colors duration-300 px-4 flex flex-row items-center justify-center aspect-square w-8 h-8 rounded-full"
                onClick={() => {
                  setInput('')
                  setQr('')
                }}
              >
                <X className="w-4 h-4 shrink-0" />
              </button>
            )}
          </div>
          <button
            className="h-10 px-4 bg-blue-500 hover:bg-blue-600 text-sm transition-colors duration-300 rounded-full text-white font-semibold"
            onClick={() => {
              setQr(input)
            }}
          >
            Make QR Code
          </button>
        </div>

        <div
          className={cn('flex flex-col items-center gap-y-4 mt-4', [
            qr !== '',
            'visible',
            'invisible',
          ])}
        >
          <div className="flex flex-col items-center gap-y-2">
            <span className="text-xs font-semibold text-center">{qr}</span>
            <canvas
              ref={canvasRef}
              id="canvas"
              className="border border-gray-200 transition-shadow duration-300 hover:shadow-lg rounded-lg bg-white"
            />
          </div>

          <button
            onClick={handleDownload}
            className="text-sm font-semibold text-blue-500 hover:underline duration-300 transition-colors"
          >
            Download Image
          </button>
        </div>
      </div>
      <footer className="w-full text-xs py-6 flex flex-row justify-center border-t border-gray-200 text-gray-500 mx-auto w-full md:w-2/3">
        <span>
          &copy; {new Date().getFullYear()}{' '}
          <a href="https://antonyholmes.dev" className="hover:underline">
            Antony Holmes
          </a>
          . All rights reserved.
        </span>
      </footer>
    </div>
  )
}
