import { z } from 'zod'

export const socialLinkSchema = z.object({
  label: z.string(),
  href: z.string().url(),
})

export const siteMetaSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  ogImage: z.string().optional(),
  social: z.array(socialLinkSchema),
})

export const navItemSchema = z.object({
  label: z.string(),
  href: z.string(),
})

export const heroContentSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  subheadline: z.string(),
  primaryCta: z.object({
    label: z.string(),
    href: z.string(),
  }),
  secondaryCta: z
    .object({
      label: z.string(),
      href: z.string(),
    })
    .optional(),
})

export const aboutContentSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  body: z.array(z.string()),
})

export const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  body: z.array(z.string()).min(1),
  tech: z.array(z.string()),
  href: z.string().url().optional(),
  repo: z.string().url().optional(),
  featured: z.boolean().default(false),
})

const monthYearSchema = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM with month 01–12')

export const experienceSchema = z
  .object({
    role: z.string(),
    company: z.string(),
    start: monthYearSchema,
    end: z.union([monthYearSchema, z.literal('present')]),
    description: z.string().optional(),
    summary: z.string().optional(),
    highlights: z.array(z.string()).min(1).optional(),
    skills: z.array(z.string()).optional(),
  })
  .refine(
    (data) =>
      Boolean(data.description || data.summary || (data.highlights?.length ?? 0) > 0),
    {
      message: 'Experience entry must include description, summary, or highlights',
    },
  )

export const skillGroupSchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
})

export const contactContentSchema = z.object({
  title: z.string(),
  email: z.string().email(),
  message: z.string(),
})

export const portfolioSchema = z.object({
  meta: siteMetaSchema,
  nav: z.array(navItemSchema),
  hero: heroContentSchema,
  about: aboutContentSchema,
  projects: z.array(projectSchema),
  experience: z.array(experienceSchema),
  skills: z.array(skillGroupSchema),
  contact: contactContentSchema,
})

export type Portfolio = z.infer<typeof portfolioSchema>
export type SiteMeta = z.infer<typeof siteMetaSchema>
export type NavItem = z.infer<typeof navItemSchema>
export type HeroContent = z.infer<typeof heroContentSchema>
export type AboutContent = z.infer<typeof aboutContentSchema>
export type Project = z.infer<typeof projectSchema>
export type Experience = z.infer<typeof experienceSchema>
export type SkillGroup = z.infer<typeof skillGroupSchema>
export type ContactContent = z.infer<typeof contactContentSchema>
