import { QRGen } from '@components/pages/qr'
import { makeMetaData } from '@lib/metadata'

export const metadata = makeMetaData('QR Codes')

export default function Page() {
  return <QRGen />
}
