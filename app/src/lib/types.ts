export interface HeroSection {
  _id: string
  headline: string
  subtext: string
  backgroundImageUrl?: string
  buttonLabel: string
  buttonUrl: string
}

export interface AboutSection {
  _id: string
  title: string
  paragraphs: { _key: string; _type: string; text: string }[]
  imageUrl?: string
}

export interface ContactSection {
  _id: string
  headline: string
  subtext: string
  email: string
  phone: string
  basedIn: string
  buttonLabel: string
  helperText: string
  footerCopyright: string
}

export interface SocialLink {
  network: 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'twitter' | 'linkedin' | 'pinterest'
  url: string
  enabled: boolean
}

export interface SiteSettings {
  _id: string
  siteName: string
  brandingMode?: 'text' | 'logo'
  logoUrl?: string
  socialLinks: SocialLink[]
}

export interface Package {
  _id: string
  title: string
  price: string
  description: string
  features?: string[]
  order: number
}

export interface Testimonial {
  _id: string
  quote: string
  name: string
  role?: string
  order: number
}

export interface Film {
  _id: string
  title: string
  eventDate: string
  location: string
  blurb: string
  videoUrl: string
  posterUrl?: string
  posterAlt?: string
  order: number
}

export interface Vendor {
  name: string
  phone: string
  description: string
  website?: string
}

export interface VendorCategory {
  _id: string
  name: string
  order: number
  vendors?: Vendor[]
}