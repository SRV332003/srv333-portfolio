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
  resumeUrl: z.string(),
  resumeLabel: z.string().optional(),
  social: z.array(socialLinkSchema),
})

export const navItemSchema = z.object({
  label: z.string(),
  href: z.string(),
})

export const heroContentSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  roleLine: z.string(),
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
  avatar: z.string(),
  avatarAlt: z.string().optional(),
  location: z.string().optional(),
  openTo: z.string().optional(),
  body: z.array(z.string()),
})

export const projectOutcomeSchema = z.object({
  value: z.string(),
  label: z.string(),
})

export const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  body: z.array(z.string()).min(1),
  tech: z.array(z.string()),
  href: z.string().url().optional(),
  repo: z.string().url().optional(),
  featured: z.boolean(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  role: z.string().optional(),
  year: z.number().int().min(2000).max(2100).optional(),
  domain: z.string().optional(),
  outcomes: z.array(projectOutcomeSchema).min(1).optional(),
  flagship: z.boolean(),
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

const sectionIntroSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
})

export const projectsSectionSchema = sectionIntroSchema
export const experienceSectionSchema = sectionIntroSchema

export const skillGroupSchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
})

export const contactContentSchema = z.object({
  title: z.string(),
  email: z.string().email(),
  message: z.string(),
})

export const portfolioSchema = z
  .object({
    meta: siteMetaSchema,
    nav: z.array(navItemSchema),
    hero: heroContentSchema,
    about: aboutContentSchema,
    projectsSection: projectsSectionSchema,
    projects: z.array(projectSchema),
    experienceSection: experienceSectionSchema,
    experience: z.array(experienceSchema),
    skills: z.array(skillGroupSchema),
    contact: contactContentSchema,
  })
  .refine((data) => data.meta.resumeUrl.startsWith('/'), {
    message: 'resumeUrl must be a site-relative path',
    path: ['meta', 'resumeUrl'],
  })
  .refine(
    (data) =>
      data.projects.every((p) => p.image && (p.outcomes?.length ?? 0) >= 1),
    {
      message: 'Every project must include image and at least one outcome',
      path: ['projects'],
    },
  )

export type Portfolio = z.infer<typeof portfolioSchema>
export type SiteMeta = z.infer<typeof siteMetaSchema>
export type NavItem = z.infer<typeof navItemSchema>
export type HeroContent = z.infer<typeof heroContentSchema>
export type AboutContent = z.infer<typeof aboutContentSchema>
export type ProjectsSectionContent = z.infer<typeof projectsSectionSchema>
export type ExperienceSectionContent = z.infer<typeof experienceSectionSchema>
export type Project = z.infer<typeof projectSchema>
export type ProjectOutcome = z.infer<typeof projectOutcomeSchema>
export type Experience = z.infer<typeof experienceSchema>
export type SkillGroup = z.infer<typeof skillGroupSchema>
export type ContactContent = z.infer<typeof contactContentSchema>

export function getResumeLabel(meta: SiteMeta): string {
  return meta.resumeLabel ?? 'Resume'
}
