'use client'
import { cn } from '@lib/class-names'
import { X } from 'lucide-react'
import QRCode from 'qrcode'
import { useEffect, useRef, useState } from 'react'

export function QRGen() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [input, setInput] = useState<string>('')
  // QR code data derived from input when user presses Enter
  const [qr, setQr] = useState<string>('')
  const [scale, setScale] = useState(10)

  useEffect(() => {
    if (canvasRef.current && qr) {
      QRCode.toCanvas(canvasRef.current, qr, { scale })
    }
  }, [canvasRef.current, qr, scale])

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

        <div className="flex flex-row w-full items-center gap-x-4 justify-center">
          <div className="flex flex-row items-center justify-center overflow-hidden gap-x-2 py-1 pl-2 pr-1.5 w-full xl:w-1/2  rounded-xl border shadow-sm bg-white border-gray-200">
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
                className="hover:bg-gray-200 transition-colors duration-300 flex flex-row items-center justify-center aspect-square w-6 h-6 rounded-full"
                onClick={() => {
                  setInput('')
                  setQr('')
                }}
              >
                <X className="w-4 h-4 shrink-0" />
              </button>
            )}
          </div>
          <div className="flex flex-row items-center gap-x-8">
            <button
              disabled={!input}
              className="h-9 px-4 disabled:bg-gray-300 bg-blue-500 hover:bg-blue-600 text-sm transition-colors duration-300 rounded-full text-white font-semibold"
              onClick={() => {
                setQr(input)
              }}
            >
              Generate
            </button>
          </div>
        </div>

        <div
          className={cn('flex flex-col items-center gap-y-4', [
            qr !== '',
            'visible',
            'invisible',
          ])}
        >
          <div className="flex flex-col items-center gap-y-4">
            <div className="flex flex-row gap-x-2 items-center">
              <label htmlFor="size-dropdown">Size</label>
              <select
                id="size-dropdown"
                value={scale}
                onChange={e => setScale(Number(e.target.value))}
                className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 bg-white   focus:ring-indigo-400 focus:border-indigo-400"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>
            {/* <span className="text-xs font-semibold text-center">
              QR code for {qr}
            </span> */}
            <canvas
              ref={canvasRef}
              id="canvas"
              className="border border-gray-200 transition-color duration-300 hover:border-gray-300 rounded-lg bg-white"
            />
          </div>

          <button
            onClick={handleDownload}
            className="text-sm font-semibold text-blue-500 hover:underline duration-300 transition-colors text-wrap"
          >
            Download QR code for {qr}
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
