import groq from 'groq'

export const heroSectionQuery = groq`
  *[_type == "heroSection"][0]{
    _id,
    headline,
    subtext,
    buttonLabel,
    buttonUrl,
    "backgroundImageUrl": backgroundImage.asset->url
  }
`

export const aboutSectionQuery = groq`
  *[_type == "aboutSection"][0]{
    _id,
    title,
    paragraphs,
    "imageUrl": image.asset->url
  }
`

export const packagesQuery = groq`
  *[_type == "packagesSection"][0]{
    _id,
    title,
    boxes[]{
      _key,
      _type,
      title,
      price,
      description,
      features,
      items
    }
  }
`

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(orderRank){
    _id,
    quote,
    name,
    role
  }
`

export const filmsQuery = groq`
  *[_type == "film"] | order(orderRank){
    _id,
    title,
    eventDate,
    location,
    blurb,
    videoUrl,
    "posterUrl": poster.asset->url,
    "posterAlt": poster.alt,
    slug
  }
`

export const vendorCategoriesQuery = groq`
  *[_type == "vendorCategory"] | order(orderRank){
    _id,
    name,
    vendors[]{
      name,
      phone,
      description,
      website
    }
  }
`

export const contactSectionQuery = groq`
  *[_type == "contactSection"][0]{
    _id,
    headline,
    subtext,
    email,
    phone,
    basedIn,
    buttonLabel,
    helperText,
    footerCopyright
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    _id,
    siteName,
    brandingMode,
    "logoUrl": logo.asset->url,
    socialLinks[]{
      network,
      url,
      enabled
    }
  }
`

export const filmBySlugQuery = groq`
  *[_type == "film" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    eventDate,
    location,
    blurb,
    videoUrl,
    "posterUrl": poster.asset->url,
    "posterAlt": poster.alt
  }
`