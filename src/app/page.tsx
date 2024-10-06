import { QRGen } from '@components/pages/qr'
import { makeMetaData } from '@lib/metadata'

export const metadata = makeMetaData('QR Code Generator')

export default function Page() {
  return <QRGen />
}
