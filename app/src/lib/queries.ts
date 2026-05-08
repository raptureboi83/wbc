import groq from 'groq';

export const heroSectionQuery = groq`
  *[_type == "heroSection"][0]{
    _id,
    headline,
    subtext,
    buttonLabel,
    buttonUrl,
    "backgroundImageUrl": backgroundImage.asset->url
  }
`;

export const aboutSectionQuery = groq`
  *[_type == "aboutSection"][0]{
    _id,
    title,
    paragraphs,
    "imageUrl": image.asset->url
  }
`;

export const packagesQuery = groq`
  *[_type == "package"] | order(order asc){
    _id,
    title,
    price,
    description,
    features,
    order
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc){
    _id,
    quote,
    name,
    role,
    order
  }
`;

export const filmsQuery = groq`
  *[_type == "film"] | order(order asc){
    _id,
    title,
    eventDate,
    location,
    blurb,
    videoUrl,
    "posterUrl": poster.asset->url,
    order
  }
`;

export const vendorCategoriesQuery = groq`
  *[_type == "vendorCategory"] | order(order asc){
    _id,
    name,
    order,
    vendors[]{
      name,
      phone,
      description,
      website
    }
  }
`;

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
`;

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
`;