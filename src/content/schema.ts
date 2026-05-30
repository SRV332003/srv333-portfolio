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

export const credibilityBadgeSchema = z.object({
  label: z.string(),
  detail: z.string().optional(),
})

export const heroContentSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  roleLine: z.string(),
  subheadline: z.string(),
  credibilityBadges: z.array(credibilityBadgeSchema).optional(),
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
  softSkills: z.array(z.string()).min(1).optional(),
  interests: z.array(z.string()).min(1).optional(),
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
  hrefLabel: z.string().optional(),
  hrefBadge: z.string().optional(),
  repo: z.string().url().optional(),
  featured: z.boolean(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  video: z
    .string()
    .refine((value) => value.startsWith('/'), {
      message: 'video must be a site-relative path',
    })
    .optional(),
  role: z.string().optional(),
  year: z.number().int().min(2000).max(2100).optional(),
  domain: z.string().optional(),
  outcomes: z.array(projectOutcomeSchema).min(1).optional(),
  flagship: z.boolean(),
})

const monthYearSchema = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM with month 01–12')

export const missionPhaseSchema = z.enum(['launch', 'orbit', 'dock'])

export const employmentTypeSchema = z.enum(['intern', 'full-time', 'contract'])

export const experienceSchema = z
  .object({
    role: z.string(),
    company: z.string(),
    start: monthYearSchema,
    end: z.union([monthYearSchema, z.literal('present')]),
    employmentType: employmentTypeSchema.optional(),
    missionPhase: missionPhaseSchema.optional(),
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
export const achievementsSectionSchema = sectionIntroSchema
export const educationSectionSchema = sectionIntroSchema
export const skillsSectionSchema = sectionIntroSchema
export const contactSectionSchema = sectionIntroSchema

export const achievementSchema = z.object({
  title: z.string(),
  organization: z.string().optional(),
  year: z.number().int().min(2000).max(2100).optional(),
  summary: z.string(),
})

export const educationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  start: monthYearSchema.optional(),
  end: monthYearSchema.optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).min(1).optional(),
})

export const skillGroupSchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
})

export const contactContentSchema = z.object({
  email: z.string().email(),
  message: z.string(),
})

export const missionControlShortcutSchema = z.object({
  label: z.string(),
  href: z.string(),
})

export const missionControlTransmissionSchema = z.object({
  label: z.string(),
  href: z.string().refine(
    (value) => value.startsWith('/') || /^https?:\/\//.test(value),
    { message: 'href must be a URL or site-relative path' },
  ),
  kind: z.enum(['article', 'talk']).optional(),
})

export const missionControlSchema = z.object({
  title: z.string(),
  hint: z.string(),
  shortcuts: z.array(missionControlShortcutSchema).min(1),
  transmissions: z.array(missionControlTransmissionSchema).min(1),
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
    achievementsSection: achievementsSectionSchema,
    achievements: z.array(achievementSchema),
    educationSection: educationSectionSchema,
    education: z.array(educationSchema),
    skillsSection: skillsSectionSchema,
    skills: z.array(skillGroupSchema),
    contactSection: contactSectionSchema,
    contact: contactContentSchema,
    missionControl: missionControlSchema,
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
export type EmploymentType = z.infer<typeof employmentTypeSchema>
export type AchievementsSectionContent = z.infer<typeof achievementsSectionSchema>
export type Achievement = z.infer<typeof achievementSchema>
export type EducationSectionContent = z.infer<typeof educationSectionSchema>
export type Education = z.infer<typeof educationSchema>
export type SkillsSectionContent = z.infer<typeof skillsSectionSchema>
export type ContactSectionContent = z.infer<typeof contactSectionSchema>
export type CredibilityBadge = z.infer<typeof credibilityBadgeSchema>
export type SkillGroup = z.infer<typeof skillGroupSchema>
export type ContactContent = z.infer<typeof contactContentSchema>
export type MissionPhase = z.infer<typeof missionPhaseSchema>
export type MissionControl = z.infer<typeof missionControlSchema>
export type MissionControlTransmission = z.infer<
  typeof missionControlTransmissionSchema
>

export function getResumeLabel(meta: SiteMeta): string {
  return meta.resumeLabel ?? 'Resume'
}
