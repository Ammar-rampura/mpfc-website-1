import { MessageCircle } from 'lucide-react'
import { waLink, PHONE_DISPLAY } from '../config'

export default function Footer() {
  return (
    <>
      <footer><span>© MPFC – Madhya Pradesh Freight Carrier</span><span>{PHONE_DISPLAY}</span></footer>
      <a className="wa" href={waLink()} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} style={{ marginRight: 8 }} />WhatsApp us</a>
    </>
  )
}
