export function buildMailtoUrl(
  email: string,
  name: string,
  senderEmail: string,
  message: string,
): string {
  const subject = encodeURIComponent(`Portfolio contact from ${name}`)
  const body = encodeURIComponent(`From: ${name} <${senderEmail}>\n\n${message}`)
  return `mailto:${email}?subject=${subject}&body=${body}`
}
