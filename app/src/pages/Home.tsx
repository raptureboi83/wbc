import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity.client';
import {
  heroSectionQuery,
  aboutSectionQuery,
  packagesQuery,
  testimonialsQuery,
  vendorCategoriesQuery,
  filmsQuery,
  contactSectionQuery,
  siteSettingsQuery,
} from '@/lib/queries';
import type {
  HeroSection,
  AboutSection,
  Package,
  Testimonial,
  VendorCategory,
  Film,
  ContactSection,
  SiteSettings,
} from '@/lib/types';

import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import FeaturedWork from '../sections/FeaturedWork';
import Packages from '../sections/Packages';
import Testimonials from '../sections/Testimonials';
import Vendors from '../sections/Vendors';
import Contact from '../sections/Contact';

export default function Home() {
  const [heroData, setHeroData] = useState<HeroSection | null>(null);
  const [aboutData, setAboutData] = useState<AboutSection | null>(null);
  const [packagesData, setPackagesData] = useState<Package[]>([]);
  const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>([]);
  const [vendorsData, setVendorsData] = useState<VendorCategory[]>([]);
  const [filmsData, setFilmsData] = useState<Film[]>([]);
  const [contactData, setContactData] = useState<ContactSection | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hero, about, packages, testimonials, vendors, films, contact, settings] =
          await Promise.all([
            client.fetch(heroSectionQuery),
            client.fetch(aboutSectionQuery),
            client.fetch(packagesQuery),
            client.fetch(testimonialsQuery),
            client.fetch(vendorCategoriesQuery),
            client.fetch(filmsQuery),
            client.fetch(contactSectionQuery),
            client.fetch(siteSettingsQuery),
          ]);

        setHeroData(hero);
        setAboutData(about);
        setPackagesData(packages);
        setTestimonialsData(testimonials);
        setVendorsData(vendors);
        setFilmsData(films);
        setContactData(contact);
        setSiteSettings(settings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-warm-beige overflow-x-hidden">
      <Navbar siteSettings={siteSettings} />
      <Hero data={heroData} />
      <About data={aboutData} />
      {/* Displaying only 3 films for the row of 3 */}
      <FeaturedWork films={filmsData.slice(0, 3)} mode="home" />
      <Packages packages={packagesData} />
      <Testimonials testimonials={testimonialsData} />
      <Vendors vendorCategories={vendorsData} />
      <Contact data={contactData} siteSettings={siteSettings} />
    </div>
  );
}