import { fetchApi } from '@/action/fetchApi'
import { OptionsGetAllMeta, ProjectType } from '@/app/type'
import ContainerHeader from '@/components/ContainerHeader/ContainerHeader'
import HeaderTitle from '@/components/HeaderTitle/HeaderTitle'
import IconBgStar from '@/components/IconBgStar/IconBgStar'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import PaginationSeo from '@/components/PaginationSeo/PaginationSeo'
import ProjectCards from '@/components/ProjectCards/ProjectCards'
import pageCache from '@/data/cache'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import React from 'react'
export const metadata: Metadata = {
  title: 'Project | Site',
  description: 'Project | Site'
}
const getData = () => {
  return fetchApi({ url: "projects", next: pageCache.projects.cache, tags: [pageCache.projects.tag] })
}
export default async function page({ params }: any) {
  const { locale } = await params
  const { data, meta }: { data: ProjectType[], meta: OptionsGetAllMeta } = await getData()
  const t = await getTranslations('HomePage');
  const p = await getTranslations('Projects');
  return (
    <>
      <ContainerHeader firstDark dark={p("header.nameDark")} light={p("header.nameLight")} text={p("header.text")} />
      <main className="main-class">
        <HeaderTitle firstLight light={p("section-1.header.nameDark")} dark={p("section-1.header.nameLight")} text={p("section-1.header.text")} />
        <div className="grid grid-cols-1 gap-6 md:gap-0 md:grid-cols-3 mt-10 md:mt-16">
          {t.raw("containerBox").map((item: any, index: number) => (
            <IconBgStar image={item.image} index={index} key={index} name={item.name} text={item.text} />
          ))}
        </div>
        <HeaderTitle firstLight light={p("section-2.header.nameDark")} dark={p("section-2.header.nameLight")} text={p("section-2.header.text")} />
        {data?.length ?
          <>
            <div className='my-8 md:my-12 flex flex-col gap-10'>
              {data?.map((row, index: number) => (
                <ProjectCards data={row} key={index} />
              ))}
            </div>
            <PaginationSeo meta={meta} />
          </>
          : null}
        <HeaderTitle firstLight light={p("section-3.header.nameDark")} dark={p("section-3.header.nameLight")} text={p("section-3.header.text")} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-10 md:mt-12' >
          {p.raw("section-3.array").map((row: any, index: number) => (
            <div key={index} className='md:p-8 p-4 rounded-xl flex flex-col gap-4 md:gap-7' style={{ backgroundImage: "linear-gradient(31deg, rgb(15 15 15 / 0%), rgb(62 62 62 / 7%))" }}>
              <div className='flex items-center gap-3'>
                <ImageCustom figureClass='w-auto' src={row.image} width={40} height={40} alt={"icon"} />
                <h3 className='text-w-100 font-semibold md:text-xl'>{row.name}</h3>
              </div>
              <div className='p-4 md:p-6 border border-d-60 rounded-xl justify-between flex flex-col md:flex-row items-center'>
                <div className='flex flex-col gap-1 items-start md:w-auto w-full'>
                  <span className='text-w-50 text-sm'>{locale === "fa" ? "دسته" : 'Category'}</span>
                  <span className='text-w-90'>{row.cat}</span>
                </div>
                <div className='w-[1px] border border-d-60 h-full bg-d-60'></div>
                <div className='flex flex-col gap-1 items-start md:w-auto w-full'>
                  <span className='text-w-50 text-sm'>{locale === "fa" ? "زمان تکمیل" : "Expected Completion"}</span>
                  <span className='text-w-90'>{row.date}</span>
                </div>
              </div>
              <div className='p-4 md:p-6 border border-d-60 rounded-xl'>
                <span className='text-w-90'>{locale === "fa" ? "توضیحات پروژه " : "Project Description"}</span>
                <p className='text-w-50 mt-4'>{row.text}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
