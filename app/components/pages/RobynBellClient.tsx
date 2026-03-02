'use client'

import Breadcrumb from '@/app/components/common/Breadcrumb'
import Picture from '@/app/components/common/Picture'
import { motion } from 'framer-motion'

export const RobynBellClient = ({ data }) => {
  const field = (id: string) => data?.content?.find((item) => item.id === id)?.value ?? ''

  return (
    <main id="main-content">
      <Breadcrumb breadcrumb="Robyn Bell" />

      <div className="relative min-h-dvh">
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover opacity-5"
          style={{ backgroundImage: `url('/images/robyn-2.png')`, backgroundAttachment: 'fixed' }}
          aria-hidden="true"
        />

        {/* Page Header */}
        <header className="relative z-10 pt-32 pb-20 px-4 990:px-12 xl:px-4 text-center border-b border-white/10">
          <div className="max-w-[320px] 430:max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 mx-auto flex flex-col items-center">
            <p className="font-changa text-xs uppercase tracking-[0.3em] text-blaze mb-4">
              {field('robyn_bell_eyebrow')}
            </p>
            <div className="flex items-center gap-3 430:gap-4 justify-center mb-4">
              <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
              <h1 className="text-4xl 430:text-5xl sm:text-6xl font-changa text-white leading-none">
                {field('robyn_bell_heading')}
              </h1>
              <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
            </div>
            <p className="font-lato text-white/50 text-sm 430:text-base max-w-xl leading-relaxed mt-4">
              {field('robyn_bell_subheading')}
            </p>
          </div>
        </header>

        {/* Main Content */}
        <section aria-labelledby="robyn-bell-heading" className="relative z-10 px-4 990:px-12 xl:px-4 py-20 990:py-32">
          <div className="max-w-[320px] 430:max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 mx-auto">
            <div className="grid grid-cols-1 1200:grid-cols-12 gap-8 990:gap-12 items-start">
              {/* Main Column */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="1200:col-span-8 flex flex-col gap-8"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <Picture
                    src="/images/robyn-2.png"
                    alt="Robyn Bell conducting The Pops Orchestra"
                    className="w-full h-auto aspect-video object-cover"
                    priority={true}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" aria-hidden="true" />
                </div>

                {/* Body Content */}
                <div className="bg-duskgray/60 backdrop-blur-sm border-t-2 border-blaze px-6 430:px-10 py-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-px bg-blaze" aria-hidden="true" />
                    <span className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">Biography</span>
                  </div>

                  <h2
                    id="robyn-bell-heading"
                    className="font-changa text-2xl 430:text-3xl text-white mb-8 leading-tight"
                  >
                    {field('robyn_bell_main_title')}
                  </h2>

                  <div className="flex flex-col gap-5 font-lato text-white/70 text-sm 430:text-base leading-relaxed">
                    <p>{field('robyn_bell_p1')}</p>
                    <p>{field('robyn_bell_p2')}</p>
                    <p>{field('robyn_bell_p3')}</p>
                    <p>{field('robyn_bell_p4')}</p>
                  </div>

                  {/* Credentials — sunburst uppercase block */}
                  <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8">
                    <p className="font-changa text-xs tracking-wider text-sunburst uppercase leading-relaxed">
                      {field('robyn_bell_credentials')}
                    </p>
                    <p className="font-changa text-xs tracking-wider text-sunburst uppercase leading-relaxed">
                      {field('robyn_bell_roles')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                aria-label="About Robyn Bell"
                className="1200:col-span-4 flex flex-col gap-6"
              >
                <div className="bg-duskgray/60 backdrop-blur-sm border-t-2 border-blaze px-6 430:px-8 py-8 sticky top-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-px bg-blaze" aria-hidden="true" />
                    <span className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">About</span>
                  </div>
                  <h2 className="font-changa text-xl 430:text-2xl text-blaze mb-5 leading-tight">
                    {field('robyn_bell_side_title')}
                  </h2>
                  <p className="font-lato text-white/70 text-sm 430:text-base leading-relaxed">
                    {field('robyn_bell_side_p1')}
                  </p>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
