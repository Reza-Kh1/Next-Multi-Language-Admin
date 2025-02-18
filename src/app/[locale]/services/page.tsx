import CircleBox from '@/components/CircleBox/CircleBox'
import ContainerHeader from '@/components/ContainerHeader/ContainerHeader'
import HeaderTitle from '@/components/HeaderTitle/HeaderTitle'
import React from 'react'
import CategoriesService from './CategoriesService'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import Link from 'next/link'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { Button } from '@heroui/button'
import { Metadata } from 'next'
import { useLocale, useTranslations } from 'next-intl'
export const metadata: Metadata = {
  title: 'Services | Site',
  description: 'Services | Site'
}
export default function page() {
  const local = useLocale()
  const t = useTranslations("Services")
  return (
    <>
      <ContainerHeader dark={t("header.nameDark")} light={t("header.nameLight")} text={t("header.text")} />
      <main className="main-class">
        <HeaderTitle dark={t("section-1.header.nameDark")} light={t("section-1.header.nameLight")} text={t("section-1.header.text")} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 md:mt-16'>
          {t.raw("section-1.arrayBox").map((row: any, index: number) => (
            <CircleBox price={row.price} image={row.image} name={row.name} key={index} text={row.text} />
          ))}
        </div>
        <HeaderTitle dark={t("section-2.header.nameDark")} light={t("section-2.header.nameLight")} text={t("section-2.header.text")} />
        <CategoriesService />
        <HeaderTitle dark={t("section-3.header.nameDark")} light={t("section-3.header.nameLight")} text={t("section-3.header.text")} />
        <div className='flex flex-col md:flex-row gap-6 md:gap-12'>
          {t.raw("section-3.array").map((row: any, index: number) => (
            <div key={index} className='w-full md:w-1/2 p-6 md:p-8 rounded-xl mt-6 md:mt-12' style={{ backgroundImage: "linear-gradient(48deg, #0f0f0f, #fefefe12)" }}>
              <div className='flex items-center gap-3 mb-4'>
                <ImageCustom alt={"logo"} figureClass='w-auto' src={row.image} width={50} height={50} />
                <h3 className='text-w-100 text-xl font-semibold'>{row.name}</h3>
              </div>
              <div className='flex flex-col md:flex-row items-start  md:items-center gap-3 mb-5 md:mb-8'>
                <div className='p-1 border rounded-full px-2 border-d-60 text-w-100 flex items-center gap-2'>
                  <ImageCustom figureClass='p-2 bg-d-60 rounded-full' src={"/icons/chart.png"} alt={"iamge"} width={15} height={15} />
                  <span className='text-sm'>
                    {row.chart}
                  </span>
                </div>
                <div className='p-1 border rounded-full px-2 border-d-60 text-w-100 flex items-center gap-2'>
                  <ImageCustom figureClass='p-2 bg-d-60 rounded-full' src={"/icons/bags.png"} alt={"iamge"} width={15} height={15} />
                  <span className='text-sm'>
                    {row.bags}
                  </span>
                </div>
              </div>
              <div className='p-6 border border-d-60 rounded-xl'>
                <div>
                  <span className='text-w-90 font-semibold'>{local === "fa" ? "چالش ها" : "Challenge"}</span>
                  <p className='text-w-50 mt-2'>{row.challenge}</p>
                </div>
                <span className='w-full h-[1px] bg-d-60 my-6 block'></span>
                <div>
                  <span className='text-w-90 font-semibold'>{local === "fa" ? "راه حل" : "Solution"}</span>
                  <p className='text-w-50 mt-2'>{row.solution}</p>
                </div>
                <Link href={"#"} className='underline mt-6 text-sm block text-w-90'>{local === "fa" ? "مطالعه کامل" : "Read Full Story"}</Link>
              </div>
            </div>
          ))}
        </div>
        <div className='w-full flex justify-center my-6 md:mt-12'>
          <Button className='py-6 pr-2 pl-4 items-center rounded-full text-w-100 bg-d-100 border border-d-60'>
            {local === "fa" ? "نمایش نمام پروژه ها" : "View All Projects"}
            <i className='px-4 py-2 rounded-full bg-d-80'>
              {local === "fa" ?
                <FaArrowLeftLong className="text-w-100" color="#ffff" />
                :
                <FaArrowRightLong className="text-w-100" color="#ffff" />
              }
            </i>
          </Button>
        </div>
      </main>
    </>
  )
}
