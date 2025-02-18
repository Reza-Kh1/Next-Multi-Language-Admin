import ContainerHeader from '@/components/ContainerHeader/ContainerHeader'
import React from 'react'
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6'
import FormContact from './FormContact'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { useTranslations } from 'next-intl'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact Us | Site',
  description: 'Contact Us | Site'
}
export default function page() {
  const t = useTranslations("Contact-us")
  return (
    <>
      <ContainerHeader bgMid='/big-logo.png' />
      <main className="main-class">
        <div className='border my-6 md:my-12 relative  bg-center bg-no-repeat border-d-60 rounded-xl p-6 md:p-12 py-12 md:py-24' style={{ backgroundImage: "url(/dot-top.png)" }}>
          <div className='mx-auto w-full md:w-2/3 text-center'>
            <h2 className='text-3xl md:text-4xl font-semibold mb-4 text-w-100'><span className='text-w-50'>{t("header.nameDark")}</span>{t("header.nameLight")}</h2>
            <p className='text-w-50'>{t("header.text")}</p>
          </div>
          <span className='absolute w-5/6 md:w-auto text-center text-xs md:text-base p-4 text-w-100 left-1/2 -translate-x-1/2 -bottom-7 rounded-full border border-d-60 transform bg-d-100'>{t("header.hover")}</span>
        </div>
        <div className='mt-10'>
          <h3 className='text-w-100 font-semibold text-xl block text-center'>{t("section-2.header.name")}</h3>
          <p className='text-w-50 block text-center'>{t("section-2.header.text")}</p>
          <FormContact />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-12'>
          {t.raw("section-3").map((row: any, index: number) => (
            <div key={index} className='rounded-xl border border-d-60 p-6 md:p-8' style={{ background: 'linear-gradient(194deg, #5552523b, #00000066)' }}>
              <div className='flex items-center gap-2 text-w-100'>
                <i className='p-3 rounded-full' style={{ background: 'linear-gradient(334deg, #000000, #272626b5)' }}>
                  <ImageCustom alt={"clock"} src={row.image} width={30} height={30} />
                </i>
                <span className='text-lg md:text-xl'>{row.name}</span>
              </div>
              <p className='text-w-50 mt-6 text-sm md:text-base'>{row.text}</p>
            </div>
          ))}
        </div>
        <div className='mt-8 md:mt-16'>
          <h3 className='text-w-100 font-semibold text-xl block text-center'>{t("section-4.header.text")}</h3>
          <p className='text-w-50 block text-center mt-2'>{t("section-4.header.text")}</p>
          <div className='rounded-xl border mt-8 md:mt-16 border-d-60 p-6 md:p-8 py-8 md:py-20' style={{ background: 'linear-gradient(194deg, #5552523b, #00000066)' }}>
            <div className='flex items-center justify-center gap-2 text-w-100'>
              <i className='p-3 rounded-full text-w-100' style={{ background: 'linear-gradient(334deg, #000000, #272626b5)' }}>
                <FaTwitter className='text-2xl' />
              </i>
              <i className='p-3 rounded-full text-w-100' style={{ background: 'linear-gradient(334deg, #000000, #272626b5)' }}>
                <FaInstagram className='text-2xl' />
              </i>
              <i className='p-3 rounded-full text-w-100' style={{ background: 'linear-gradient(334deg, #000000, #272626b5)' }}>
                <FaLinkedin className='text-2xl' />
              </i>
            </div>
            <div className='w-full md:w-2/3 mx-auto mt-4 md:mt-8'>
              <span className='text-center block text-w-100 text-xl md:text-2xl font-semibold'>{t("section-4.name")}</span>
              <p className='text-w-50 mt-2 text-center'>{t("section-4.text")}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
