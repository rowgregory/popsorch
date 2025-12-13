'use client'

import Breadcrumb from '../components/common/Breadcrumb'
import Picture from '../components/common/Picture'
import EditableTextArea from '../components/common/EditableTextArea'
import { RootState, useAppSelector } from '../redux/store'
import { motion } from 'framer-motion'
import { containerVariants, fadeInVariants, itemVariants, scaleVariants } from '../lib/constants/advertise-with-us'

const AdvertiseWithUs = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  return (
    <>
      <Breadcrumb breadcrumb="Advertise With Us" />
      <motion.section
        className="px-4 990:px-12 xl:px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto grid grid-cols-12 990:gap-x-12 pt-32 pb-44">
          {/* Main Content */}
          <motion.div
            className="order-2 1200:order-1 col-span-12 1200:col-span-8 mb-4 1200:mb-0 flex flex-col gap-y-4 w-full"
            variants={itemVariants}
          >
            {/* Hero Image */}
            <motion.div variants={scaleVariants}>
              <Picture
                src="/images/awu.jpg"
                className="w-full h-full aspect-video rounded-lg overflow-hidden shadow-lg"
                priority={true}
              />
            </motion.div>

            {/* Main Content Block */}
            <motion.div
              className="bg-duskgray p-7 430:p-14 font-medium leading-relaxed font-lato text-white flex flex-col rounded-lg shadow-lg"
              variants={scaleVariants}
            >
              <EditableTextArea
                tag="h1"
                initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsTitle}
                type="ADVERTISE_WITH_US_PAGE"
                textBlockKey="advertiseWithUsTitle"
                className="font-changa text-2xl mb-5 text-white"
              />

              {/* Benefits List */}
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <motion.div
                  key={num}
                  className="mb-4"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <EditableTextArea
                    tag="h2"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.[`advertiseWithUsWhyTitle${num}`]}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey={`advertiseWithUsWhyTitle${num}`}
                    className="font-changa mb-1 text-blaze"
                  />
                  <EditableTextArea
                    tag="p"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.[`advertiseWithUsWhyDesc${num}`]}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey={`advertiseWithUsWhyDesc${num}`}
                    className="text-white"
                  />
                </motion.div>
              ))}

              <EditableTextArea
                tag="h4"
                initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsSubtitle1}
                type="ADVERTISE_WITH_US_PAGE"
                textBlockKey="advertiseWithUsSubtitle1"
                className="mb-2 font-changa text-12 font-medium tracking-wider text-sunburst uppercase"
              />
            </motion.div>

            {/* Pricing Table */}
            <motion.div
              className="bg-duskgray p-7 430:p-14 font-medium leading-relaxed font-lato text-white flex flex-col rounded-lg shadow-lg"
              variants={scaleVariants}
            >
              <div className="max-w-4xl mx-auto border border-gray-300 p-6 rounded-lg bg-white/5 backdrop-blur-sm">
                <motion.h2 className="text-xl font-bold text-center mb-6 text-blaze" variants={fadeInVariants}>
                  Advertising Rates — Rates apply for one full, regular season (8 concerts: 4 in Sarasota; 4 in
                  Bradenton)
                </motion.h2>

                <div className="grid grid-cols-12 gap-6">
                  {/* Full Page Section */}
                  <motion.div className="col-span-12 990:col-span-6" variants={itemVariants}>
                    <div className="mb-6">
                      <h3 className="font-bold uppercase mb-4 text-sunburst border-b border-sunburst/30 pb-2">
                        Full Page
                      </h3>
                      <div className="space-y-3">
                        {[
                          { name: 'Outside Back Cover*', price: '$1,250', spec: '4-color | 5.75"w x 8.75"h' },
                          { name: 'Inside Front Cover*', price: '$1,000', spec: '4-color | 5.75"w x 8.75"h' },
                          { name: 'Inside Back Cover*', price: '$1,000', spec: '4-color | 5.75"w x 8.75"h' },
                          { name: 'Regular*', price: '$800', spec: '4-color | 4.5"w x 7.5"h' },
                          { name: 'Regular*', price: '$750', spec: 'B&W | 4.5"w x 7.5"h' }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start bg-white/5 p-3 rounded hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <span className="font-bold text-blaze">{item.name}</span>
                                <span className="font-bold text-sunburst">{item.price}</span>
                              </div>
                              <div className="text-sm text-gray-300 mt-1">{item.spec}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm text-gray-300 mb-4">
                      <p>*4 complimentary season tickets</p>
                      <p>**4 complimentary single concert tickets</p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-lg">
                      <h3 className="font-bold mb-3 text-sunburst">Artwork specifications</h3>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Submit in digital format as press quality PDF, EPS, TIFF or JPEG files</li>
                        <li>
                          • Minimum resolution should be 300 dpi{' '}
                          <span className="font-bold text-blaze">AT THE ACTUAL SIZE</span>. This includes all placed
                          images, logo and photos.
                        </li>
                        <li>• Submit ads to info@thepopsorchestra.org</li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* Half and Quarter Page Section */}
                  <motion.div className="col-span-12 990:col-span-6" variants={itemVariants}>
                    <div className="mb-6">
                      <h3 className="font-bold uppercase mb-4 text-sunburst border-b border-sunburst/30 pb-2">
                        1/2 Page
                      </h3>
                      <div className="space-y-3">
                        {[
                          { name: 'Horizontal**', price: '$350', spec: '4-color | 4.5"w x 3.625"h' },
                          { name: 'Horizontal**', price: '$300', spec: 'B&W | 4.5"w x 3.625"h' }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start bg-white/5 p-3 rounded hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <span className="font-bold text-blaze">{item.name}</span>
                                <span className="font-bold text-sunburst">{item.price}</span>
                              </div>
                              <div className="text-sm text-gray-300 mt-1">{item.spec}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-bold uppercase mb-4 text-sunburst border-b border-sunburst/30 pb-2">
                        1/4 Page
                      </h3>
                      <div className="space-y-3">
                        {[
                          { name: 'Vertical', price: '$200', spec: '4-color | 2.25"w X 3.625"h' },
                          { name: 'Vertical', price: '$150', spec: 'B&W | 2.25"w X 3.625"h' },
                          { name: 'Horizontal**', price: '$200', spec: '4-color | 4.5"w x 1.75"h' },
                          { name: 'Horizontal**', price: '$150', spec: 'B&W | 4.5"w x 1.75"h' }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start bg-white/5 p-3 rounded hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <span className="font-bold text-blaze">{item.name}</span>
                                <span className="font-bold text-sunburst">{item.price}</span>
                              </div>
                              <div className="text-sm text-gray-300 mt-1">{item.spec}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Call to Action Button */}
                <motion.div className="text-center mt-8" variants={itemVariants}>
                  <motion.a
                    href="https://ci.ovationtix.com/35505/store/donations/55884"
                    target="_blank"
                    className="inline-block bg-blaze hover:bg-blaze/90 text-white font-bold py-3 px-6 430:py-4 430:px-8 rounded-lg shadow-lg transition-all duration-300 font-changa text-sm 430:text-lg uppercase tracking-wide"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="block 430:hidden">Advertise Now</span>
                    <span className="hidden 430:block">Start Advertising</span>
                  </motion.a>
                  <p className="text-xs 430:text-sm text-gray-400 mt-3 430:mt-7 px-2">
                    Contact us today to secure your advertising space
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="order-1 1200:order-2 col-span-12 1200:col-span-4 mb-12 1200:mb-0 flex flex-col gap-y-4 w-full"
            variants={itemVariants}
          >
            {/* Download Section */}
            <motion.div
              className="bg-duskgray p-7 430:p-14 rounded-lg shadow-lg"
              variants={scaleVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <EditableTextArea
                tag="h1"
                initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelTitle}
                type="ADVERTISE_WITH_US_PAGE"
                textBlockKey="advertiseWithUsWhySidePanelTitle"
                className="font-changa text-2xl text-blaze mb-5 text-center max-w-60 mx-auto"
              />

              <p className="mb-4 font-medium leading-relaxed font-lato text-center">
                <motion.a
                  href="/pdf/advertising.pdf"
                  download="Pops 2025-26 Advertising Form.pdf"
                  className="inline-block mr-2 text-blaze hover:text-sunburst transition-colors font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download
                </motion.a>
                <EditableTextArea
                  tag="span"
                  initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelDownloadP}
                  type="ADVERTISE_WITH_US_PAGE"
                  textBlockKey="advertiseWithUsWhySidePanelDownloadP"
                  className="text-white"
                />
              </p>
            </motion.div>

            {/* Statistics Section */}
            <motion.div
              className="bg-duskgray p-7 430:p-14 rounded-lg shadow-lg"
              variants={scaleVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <EditableTextArea
                tag="h1"
                initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelTitle2}
                type="ADVERTISE_WITH_US_PAGE"
                textBlockKey="advertiseWithUsWhySidePanelTitle2"
                className="font-changa text-2xl text-blaze mb-5 text-center max-w-60 mx-auto"
              />

              <div className="flex items-center justify-center">
                <motion.div
                  className="grid grid-cols-2 gap-y-4 py-4 border-y border-zinc-700/70 text-white font-lato text-sm w-full"
                  variants={containerVariants}
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <motion.div key={num} className="contents" variants={itemVariants} whileHover={{ scale: 1.05 }}>
                      <EditableTextArea
                        tag="div"
                        initialValue={
                          textBlockMap?.ADVERTISE_WITH_US_PAGE?.[`advertiseWithUsWhySidePanelNum${num}value`]
                        }
                        type="ADVERTISE_WITH_US_PAGE"
                        textBlockKey={`advertiseWithUsWhySidePanelNum${num}value`}
                        className="font-semibold text-right pr-4 border-r border-[#555] text-sunburst"
                      />
                      <EditableTextArea
                        tag="div"
                        initialValue={
                          textBlockMap?.ADVERTISE_WITH_US_PAGE?.[`advertiseWithUsWhySidePanelNum${num}Text`]
                        }
                        type="ADVERTISE_WITH_US_PAGE"
                        textBlockKey={`advertiseWithUsWhySidePanelNum${num}Text`}
                        className="pl-4"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}

export default AdvertiseWithUs
