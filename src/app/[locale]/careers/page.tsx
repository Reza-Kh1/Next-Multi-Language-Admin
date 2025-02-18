import CareersBox from '@/components/CareersBox/CareersBox'
import ContainerHeader from '@/components/ContainerHeader/ContainerHeader'
import HeaderTitle from '@/components/HeaderTitle/HeaderTitle'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { Metadata } from 'next'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import { BsDot } from 'react-icons/bs'
export const metadata: Metadata = {
  title: 'Careers | Site',
  description: 'Careers | Site'
}
export default function page() {
  const local = useLocale()
  const t = useTranslations("Carrees")
  return (
    <>
      <ContainerHeader dark={t("header.nameDark")} light={t("header.nameLight")} text={t("header.text")} />
      <main className="main-class">
        <HeaderTitle firstLight dark={t("section-1.header.nameDark")} light={t("section-1.header.nameLight")} text={t("section-1.header.text")} />
        <div className='flex flex-col gap-10 mt-10'>
          {t.raw("section-1.array").map((row: any, index: number) => (
            <CareersBox address={row.address} bags={row.bags} image={row.image} price={row.price} skill={row.skill} title={row.title} key={index} />
          ))}
        </div>
        <div>
          <HeaderTitle firstLight dark={t("section-2.header.nameDark")} light={t("section-2.header.nameLight")} text={t("section-2.header.text")} />
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 my-12'>
            {t.raw("section-2.array").map((row: any, index: number) => (
              <section key={index}>
                <div className='rounded-t-xl border border-d-60 h-16 md:h-24 flex overflow-hidden'>
                  <div className={`${local === "fa" ? "pr-6" : "pl-6"} w-1/2 text-w-100 flex justify-start items-center bg-black h-full`}>
                    {row.number} {local === "fa" ? "قدم" : "Step"}
                  </div>
                  <div className='w-1/2 bg-d-60 h-full'></div>
                </div>
                <div className='p-4 md:p-6'>
                  <span className='block mb-2 text-w-100'>{row.name}</span>
                  <p className='text-w-50 text-sm md:text-base'>{row.text}</p>
                </div>
              </section>
            ))}
          </div>
          <div className='my-12 p-6 rounded-xl border border-d-60 flex flex-col'>
            <div className='flex gap-2 items-center'>
              <div className='p-3 rounded-full' style={{ background: "linear-gradient(180deg, #7f7d7d29, #000000c4)" }}>
                <ImageCustom src={'/icons/3star.png'} figureClass='w-auto' className='rounded-full' width={25} height={25} alt={"mouse"} />
              </div>
              <span className='text-w-100'>{t("section-4.name")}</span>
            </div>
            <p className='text-w-50 mt-4'>{t("section-4.text")}</p>
          </div>
          <HeaderTitle firstLight dark={t("section-3.header.nameDark")} light={t("section-3.header.nameLight")} text={t("section-3.header.text")} />
          <div className='flex flex-col gap-10 mt-12'>
            {t.raw("section-3.array").map((row: any, index: number) => (
              <section key={index} className='md:p-8 p-4 relative rounded-xl flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 justify-between' style={{ background: "linear-gradient(181deg, #9595950d, #0000004d)" }}>
                <div className='flex gap-2 items-center'>
                  <i className='rounded-full p-3' style={{ background: "linear-gradient(180deg, #7f7d7d29, #000000c4)" }}>
                    <Image src={row.image} alt='icon' width={30} height={30} />
                  </i>
                  <span className='text-xl font-semibold text-w-80'>{row.name}</span>
                </div>
                <div className='p-4 md:p-6 rounded-xl border border-d-60 flex flex-col gap-2 w-full md:w-4/6'>
                  {row.arry.map((item: any, number: number) => (
                    <div key={number} className='flex text-w-50 gap-1 items-center'>
                      <i className='w-6'>
                        <BsDot />
                      </i>
                      <p>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
                <span className={`${local === "fa" ? "right-0 bg-right" : "left-0  bg-left"} absolute top-0 w-1/3 h-full bg-no-repeat bg-contain`} style={{ backgroundImage: "url(/dot-top.png)" }}></span>
              </section>
            ))}
          </div>
        </div>
        <HeaderTitle firstLight dark={t("section-4.header.nameDark")} light={t("section-4.header.nameLight")} text={t("section-4.header.text")} />
        <div className='py-6 md:py-10 relative mt-12 text-2xl font-semibold rounded-t-xl text-center text-w-100 border border-d-60'>
          {local === "fa" ? "چگونه کار میکند" : "How It Works"}
          <span className='absolute left-1/2 w-1/3 h-full top-1/2 transform -translate-x-1/2 -translate-y-1/2' style={{ backgroundImage: 'url(/dot-top.png)' }}></span>
        </div>
        <div className='rounded-b-xl  border border-d-60 p-4 md:p-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {t.raw("section-2.array").map((row: any, index: number) => {
              if (index + 1 > 5) return
              return <section key={index}>
                <div className='rounded-t-xl border bg-center bg-no-repeat h-16 md:h-24 flex overflow-hidden border-d-60' style={{ backgroundImage: 'url(/color-range.png)' }}>
                  <div className={`${local === "fa" ? "pr-6 " : "pl-6 "} w-1/2 text-w-100 flex justify-start items-center h-full`}>
                    {row.number} {local === "fa" ? "قدم" : "Step"}
                  </div>
                  <div className='w-1/2  h-full'></div>
                </div>
                <div className='p-3 md:p-6'>
                  <span className='block mb-2 text-w-100'>{row.name}</span>
                  <p className='text-w-50 text-sm md:text-base'>{row.text}</p>
                </div>
              </section>
            })}
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-12'>
          {t.raw("section-4.array").map((row: any, index: number) => (
            <div key={index} className='flex flex-col h-full'>
              <div className='py-6 md:py-10 relative text-2xl font-semibold rounded-t-xl text-center text-w-100 border border-d-60'>
                {row.name}
                <span className='absolute left-1/2 w-1/3 h-full top-1/2 transform -translate-x-1/2 -translate-y-1/2' style={{ backgroundImage: 'url(/dot-top.png)' }}></span>
              </div>
              <div className='p-3 md:p-6 rounded-b-xl border border-d-60 h-full'>
                <div className={`${local === "fa" ? "!pr-0" : "!pl-0"} rounded-xl flex flex-col gap-5 border h-full border-d-60 p-4 md:p-10`}>
                  {row.boxs.map((item: any, ind: number) => (
                    <div key={ind} className='flex text-w-50 gap-1 items-start'>
                      <i className='w-1/12 flex justify-end'><BsDot /></i>
                      <p className='w-11/12'>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
