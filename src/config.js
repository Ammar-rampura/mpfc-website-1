// Contact details. Enquiry form goes to WhatsApp; the public phone is shown separately.
export const WHATSAPP = '917723868522'
export const PHONE_DISPLAY = '+91 8770330395'
export const PHONE_TEL = '+918770330395'
export const waLink = (text) =>
  `https://wa.me/${WHATSAPP}` + (text ? `?text=${encodeURIComponent(text)}` : '')
