

import { QRGen } from "@components/pages/qr";
import { makeMetaData } from "@lib/metadata";

export const metadata = makeMetaData("QR Code")

export default function Page() {
  
  return (
    <QRGen/>
  );
}
