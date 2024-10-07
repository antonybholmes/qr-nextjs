'use client'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
      QRCode.toCanvas(canvasRef.current, input, { scale: 10 })
    }
  }, [qr])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (canvas) {
      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL('image/png')

      // Create a link element
      const link = document.createElement('a')
      link.href = dataURL
      link.download = 'qr.png' // Set the desired file name

      // Append to the body, click and remove it
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="flex flex-col gap-y-5 py-6 relative bg-gray items-center min-h-screen px-3">
      <h1 className="text-4xl md:text-5xl font-bold text-center">
        QR Code Generator
      </h1>

      <div className="flex flex-col w-full items-center gap-y-3">
        <div className="flex flex-row items-center justify-center overflow-hidden gap-x-2 py-2 pl-3 px-2 w-full lg:w-1/2 rounded-md border bg-white border-gray-200">
          <input
            type="text"
            placeholder={`Enter a link or any text and click "Generate QR Code"...`}
            className="text-sm w-full h-8 px-1 rounded placeholder:text-gray-300"
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
              className="text-sm hover:bg-gray-100 transition-colors duration-300 px-4 flex flex-row items-center justify-center aspect-square w-8 h-8 rounded font-medium"
              onClick={() => {
                setInput('')
                setQr('')
              }}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          )}
        </div>
        <button
          className="h-10 px-4 bg-blue-500 hover:bg-blue-600 text-sm transition-colors duration-300 rounded-md text-white font-semibold"
          onClick={() => {
            setQr(input)
          }}
        >
          Generate QR Code
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
            className="border border-gray-200 transition-shadow duration-300 shadow hover:shadow-md rounded-lg bg-white"
          />
        </div>

        <button
          onClick={handleDownload}
          className="text-sm font-semibold text-blue-500 hover:underline duration-300 transition-colors"
        >
          Download PNG
        </button>
      </div>

      <footer className="fixed left-0 right-0 bottom-0 w-full text-xs py-3 flex flex-row justify-center border-t border-gray-200 bg-gray-50 text-gray-500">
        Copyright &copy; {new Date().getFullYear()} Antony Holmes. All rights
        reserved.
      </footer>
    </div>
  )
}
