import { useState, type FormEvent } from 'react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { loadPortfolio } from '@/content'
import { Container, Section, SectionHeading } from '@/shared/ui'

import { buildMailtoUrl } from './mailto'

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactFormSchema>
type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

export function ContactSection() {
  const { contact } = loadPortfolio()
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})

  function handleChange(field: keyof ContactFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = contactFormSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: ContactFormErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormData
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      }
      setErrors(fieldErrors)
      return
    }

    const { name, email, message } = result.data
    window.location.href = buildMailtoUrl(contact.email, name, email, message)
  }

  return (
    <Section id="contact" ariaLabel="Contact">
      <Container className="max-w-xl">
        <SectionHeading title={contact.title} subtitle={contact.message} />
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              name="name"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
            />
            {errors.name ? (
              <p id="contact-name-error" className="text-sm text-destructive">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
            />
            {errors.email ? (
              <p id="contact-email-error" className="text-sm text-destructive">
                {errors.email}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              name="message"
              rows={5}
              value={form.message}
              onChange={(e) => handleChange('message', e.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? 'contact-message-error' : undefined
              }
            />
            {errors.message ? (
              <p id="contact-message-error" className="text-sm text-destructive">
                {errors.message}
              </p>
            ) : null}
          </div>
          <Button type="submit">Send message</Button>
        </form>
      </Container>
    </Section>
  )
}
