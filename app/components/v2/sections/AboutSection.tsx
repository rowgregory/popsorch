'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { PhotoGalleryImage } from '@prisma/client'
import Picture from '../../common/Picture'

interface AboutSectionProps {
  galleryImages: PhotoGalleryImage[]
  aboutText?: string
}

const FALLBACK_TEXT = [
  'The Pops Orchestra of Bradenton and Sarasota has delivered acclaimed performances to diverse audiences for over five decades, including residents, seasonal visitors, and tourists, contributing culturally and economically to the Sarasota area.',
  'The 65-piece orchestra features professional musicians, educators, and students, offering concerts across beloved genres like Broadway, Jazz, Motown, and holiday music. Each season is crafted to entertain and inspire.'
]

export function AboutSection({ galleryImages, aboutText }: AboutSectionProps) {
  const hero = galleryImages.filter((g) => g.isHomeHero)
  const display = hero.length >= 2 ? hero : galleryImages
  const imgOne = display[0]
  const imgThree = display[2] ?? display[0]
  const mobileImage = imgThree ?? imgOne

  const paragraphs = aboutText ? aboutText.split('\n').filter(Boolean) : FALLBACK_TEXT

  return (
    <section className="bg-white overflow-hidden" aria-labelledby="about-heading">
      {/* ── Mobile — full bleed image with text overlay ── */}
      <div className="relative lg:hidden">
        {mobileImage ? (
          <Picture
            priority
            src={mobileImage.imageUrl}
            alt="The Pops Orchestra — a night of world-class music"
            className="w-full h-[85vh] min-h-125 object-cover object-center"
          />
        ) : (
          <div className="w-full h-[85vh] min-h-125 bg-neutral-200" aria-hidden="true" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" aria-hidden="true" />

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-0 inset-x-0 px-6 pb-10 pt-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-blaze" aria-hidden="true" />
            <span className="font-heebo text-[10px] tracking-[0.3em] uppercase text-blaze-text">Since 1975</span>
          </div>

          <h2 id="about-heading" className="font-c-infant font-bold text-4xl uppercase leading-tight mb-4 text-white">
            We Are
            <br />
            The Pops
          </h2>

          <p className="font-heebo font-light text-white/70 text-sm leading-relaxed mb-8 max-w-sm">{paragraphs[0]}</p>

          <Link
            href="/about"
            className="inline-flex items-center gap-3 px-8 py-4 min-h-11 bg-blaze hover:bg-secondary-light text-white font-heebo text-xs tracking-[0.2em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Read More
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>

      {/* ── Desktop — original layout, untouched ── */}
      <div className="hidden lg:block px-0 py-40 overflow-hidden">
        <div className="max-w-285 mx-auto">
          <div className="grid lg:grid-cols-2 gap-0 items-start">
            {/* Left Column */}
            <div className="flex flex-col justify-end h-full mr-14">
              <div className="relative h-full mb-0">
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="absolute top-24 left-0 w-150 z-10"
                >
                  {imgOne ? (
                    <Picture
                      priority
                      src={imgOne.imageUrl}
                      alt="The Pops Orchestra performing on stage"
                      className="w-full aspect-4/2 object-cover grayscale"
                    />
                  ) : (
                    <div className="w-full aspect-4/3 bg-neutral-200 grayscale" aria-hidden="true" />
                  )}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="px-6"
              >
                <h2
                  id="about-heading-desktop"
                  className="font-c-infant font-bold text-[50px] uppercase leading-tight mb-6 text-blaze-text"
                >
                  We Are The Pops
                </h2>

                <div className="space-y-4 mb-10">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="font-heebo font-light text-neutral-600 text-base leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 px-8 py-4 min-h-11 bg-neutral-900 hover:bg-neutral-700 text-white font-heebo text-xs tracking-[0.2em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                >
                  Read More
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </motion.div>
            </div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16 flex justify-end items-end w-full"
            >
              {imgThree ? (
                <Picture
                  priority
                  src={imgThree.imageUrl}
                  alt="The Pops Orchestra — a night of world-class music"
                  className="w-full h-207.5 object-cover"
                />
              ) : (
                <div className="w-full h-180 bg-neutral-200" aria-hidden="true" />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
