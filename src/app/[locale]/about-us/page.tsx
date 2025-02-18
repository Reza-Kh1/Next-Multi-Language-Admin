import CircleBox from '@/components/CircleBox/CircleBox'
import ContainerHeader from '@/components/ContainerHeader/ContainerHeader'
import HeaderTitle from '@/components/HeaderTitle/HeaderTitle'
import { Button } from '@heroui/button'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeftLong, FaArrowRightLong, FaCalendar, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6'
export const metadata: Metadata = {
  title: 'About Us | Site',
  description: 'About Us | Site'
}
export default async function page({ params }: any) {
  const { locale } = params
  const t = await getTranslations("About-us")
  const ProfileBox = ({ image, name, skill }: { name: string, image: string, skill: string }) => {
    return <div className='p-3 rounded-xl flex flex-col justify-center items-center' style={{ backgroundImage: 'url(/dot-top.png), linear-gradient(3deg, #00000000, #4141411f)' }} >
      <div className='flex justify-center items-center bg-no-repeat bg-center bg-contain h-[120px] w-2/3' style={{ backgroundImage: 'url(/circle-icon.png)' }}>
        <Image src={image} alt={"man"} width={60} height={60} />
      </div>
      <span className='text-w-100 block text-center'>{name}</span>
      <span className='text-w-100 text-xs px-5 text-center py-3 rounded-full border border-d-60 inline-block mt-5 mx-auto' style={{ background: 'linear-gradient(45deg, #2f2f2f, #000000)' }}>{skill}</span>
      <span className='block w-full h-[1px] my-6 bg-d-60'></span>
      <div className='flex gap-3'>
        <Link href={"#"} className='border border-d-60 p-3 rounded-full text-w-100 bg-gradient-to-b to-d-100 from-gray-700/90'>
          <FaInstagram className='text-w-100' />
        </Link>
        <Link href={"#"} className='border border-d-60 p-3 rounded-full text-w-100 bg-gradient-to-b to-d-100 from-gray-700/90'>
          <FaTwitter className='text-w-100' />
        </Link>
        <Link href={"#"} className='border border-d-60 p-3 rounded-full text-w-100 bg-gradient-to-b to-d-100 from-gray-700/90'>
          <FaLinkedin className='text-w-100' />
        </Link>
      </div>
    </div>
  }
  return (
    <>
      <ContainerHeader dark={t("header.nameDark")} light={t("header.nameLight")} text={t("header.text")} />
      <main className="main-class">
        <HeaderTitle dark={t("section-1.header.nameDark")} light={t("section-1.header.nameLight")} text={t("section-1.header.text")} />
        <div className='mt-12 grid grid-cols-1  md:grid-cols-4 gap-10'>
          {t.raw("section-1.array").map((row: any, index: number) => (
            <ProfileBox image={row.image} name={row.name} key={index} skill={row.skill} />
          ))}
        </div>
        <HeaderTitle dark={t("section-2.header.nameDark")} light={t("section-2.header.nameLight")} text={t("section-2.header.text")} />
        <div className='flex mt-12 flex-col gap-8 md:gap-16'>
          {t.raw("section-2.array").map((row: any, index: number) => (
            <section className='flex gap-2 md:gap-5' key={index}>
              <span className='text-4xl md:text-7xl mt-2 md:mt-0 font-semibold text-w-100 block'>{row.num}</span>
              <div className='flex flex-col gap-4 md:gap-8 w-full'>
                <div className='flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-start md:items-center mt-5'>
                  <h3 className='md:text-lg font-semibold text-w-100'>{row.name}</h3>
                  <span className='flex gap-2 items-center py-3 px-5 border text-xs rounded-full border-d-60 text-w-80'>
                    <FaCalendar />
                    {row.date}
                  </span>
                </div>
                <div className='p-4 md:p-6 rounded-xl border border-d-60'>
                  <span className='text-w-90'>{locale === "fa" ? "توضیحات" : "Description"}</span>
                  <p className='text-w-50 mt-1'>{row.text}</p>
                </div>
              </div>
            </section>
          ))}
        </div>
        <HeaderTitle dark={t("section-3.header.nameDark")} light={t("section-3.header.nameLight")} text={t("section-3.header.text")} />
        <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10'>
          {t.raw("section-3.array").map((row: any, index: number) => (
            <CircleBox image='/icons/win.png' key={index} date={row.date} why={row.why} name={row.name} text={row.text} />
          ))}
        </div>
        <div className='mt-8 md:mt-24'>
          <span className='text-w-90 block text-center'>See This Pages</span>
          <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
            {t.raw("section-4").map((row: any, index: number) => (
              <CircleBox image={row.image} key={index}
                customText={<>
                  <div>
                    <Button className='bg-d-100 p-3 px-3  text-w-100 items-center border border-d-60 rounded-full'>
                      {locale === "fa" ?
                        "نمایش صفحه"
                        :
                        "View Page"
                      }
                      <i className='bg-d-60 py-1 px-3 rounded-full'>
                        {locale === "fa" ?
                          <FaArrowLeftLong />
                          :
                          <FaArrowRightLong />
                        }
                      </i>
                    </Button>
                  </div>
                </>}
                name={row.name} text={row.text} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
