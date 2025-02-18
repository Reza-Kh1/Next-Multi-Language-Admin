import ContainerHeader from '@/components/ContainerHeader/ContainerHeader'
import React from 'react'
import NavLink from './NavLink'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import Image from 'next/image'
import { MdOutlineAccessTime } from 'react-icons/md'
import { FaCalendar } from 'react-icons/fa6'
import { Metadata } from 'next'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { fetchApi } from '@/action/fetchApi'
import pageCache from '@/data/cache'
import { BlogType, OptionsGetAllMeta } from '@/app/type'
import PaginationSeo from '@/components/PaginationSeo/PaginationSeo'
export const metadata: Metadata = {
  title: 'Blogs | Site',
  description: 'Blogs | Site'
}
const getData = (page: string, category: string | null) => {
  return fetchApi({ url: `blogs?page=${page}${category ? `&categories[like]=%${category}%` : ""}`, next: pageCache.blogs.cache, tags: [pageCache.blogs.tag] })
}
export default async function Page({ params, searchParams }: any) {
  const { locale } = await params
  const { page = 1 } = await searchParams
  const cat = await searchParams["categories[like]"]
  const { data, meta }: { data: BlogType[], meta: OptionsGetAllMeta } = await getData(page, cat)
  const t = await getTranslations("Blog")
  return (
    <>
      <ContainerHeader light={t("header.nameLight")} dark={t("header.nameDark")} text={t("header.text")} />
      <main className="main-class">
        <div className='my-8 md:my-16 flex'>
          <div className='bg-d-80 mx-auto p-2 px-3 overflow-auto  text-w-100 rounded-full flex gap-2 items-center border-d-50 border'>
            <NavLink name={locale === "fa" ? "همه" : "All"} url={"?"} />
            <NavLink name={locale === "fa" ? "بیزینس" : "Business"} url={"%Development%"} />
            <NavLink name={locale === "fa" ? "طراحی" : "Design"} url={"%Development%"} />
            <NavLink name={locale === "fa" ? "توسعه دهنده" : "Development"} url={"%website%"} />
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-10'>
          <div className='p-8 w-full md:w-5/12 rounded-xl border border-d-60' style={{ backgroundImage: "url(/dot-top.png)" }}>
            <ImageCustom src={"/big-logo.png"} alt={"logo"} width={596} height={419} />
          </div>
          <div className='w-full md:w-7/12'>
            <h2 className='text-w-100 font-semibold text-xl mb-6'>{t("section-1.name")}</h2>
            <p className='text-w-80'>{t("section-1.text")}<Link href={"#"} aria-label='read more blog' className='text-w-100 underline'>{locale === "fa" ? " مطالعه بیشتر..." : " Read More..."}</Link></p>
            <div className='mt-12 grid grid-cols-1 md:grid-cols-4 items-center gap-3 md:gap-7 justify-between p-4 md:p-6 rounded-xl border border-d-60'>
              <div className={`flex flex-col gap-2 border-b md:border-b-0 pb-3 md:pb-0 border-d-60 ${locale === "fa" ? "md:border-l" : "md:border-r"}`}>
                <span className='text-sm text-w-80'>{locale === "fa" ? "زمان مطالعه" : "Read Time"}</span>
                <span className='text-w-100'>{t("section-1.time")}</span>
              </div>
              <div className={`flex flex-col gap-2 border-b md:border-b-0 pb-3 md:pb-0 border-d-60 ${locale === "fa" ? "md:border-l" : "md:border-r"}`}>
                <span className='text-sm text-w-80'>{locale === "fa" ? "نویسنده" : "Author"}</span>
                <span className='text-w-100'>{t("section-1.author")}</span>
              </div>
              <div className={`flex flex-col gap-2 border-b md:border-b-0 pb-3 md:pb-0 border-d-60 ${locale === "fa" ? "md:border-l" : "md:border-r"}`}>
                <span className='text-sm text-w-80'>{locale === "fa" ? "تاریخ انتشار" : "Published Date"}</span>
                <span className='text-w-100'>{t("section-1.published")}</span>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-sm text-w-80'>{locale === "fa" ? "دسته" : "Category"}</span>
                <span className='text-w-100'>{t("section-1.category")}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-12'>
          {
            data.map((row, index) => (
              <section key={index} className='flex justify-between flex-col gap-6'>
                <div className='p-4 rounded-xl border border-d-60' style={{ backgroundImage: "url(/dot-top.png)" }}>
                  <ImageCustom className='w-full' alt={row.en_title} src={row.picture} height={400} width={600} />
                </div>
                <div className='flex flex-col md:flex-row items-start gap-4 md:gap-0 md:items-center justify-between'>
                  <div className='flex gap-2 items-center'>
                    <Image src={"/profile-auth.jpg"} alt='profile' className='rounded-full' width={40} height={40} />
                    <span className='text-w-100'>{row?.author?.username}</span>
                  </div>
                  <div className='flex gap-2 text-w-80'>
                    <span className='py-2 px-3 border rounded-full flex items-center gap-1 text-xs border-d-60'><MdOutlineAccessTime /> {row.read_time} {locale === "fa" ? "دقیقه مطالعه" : "min read"}</span>
                    <span className='py-2 px-3 border rounded-full flex items-center gap-1 text-xs border-d-60'><FaCalendar />{new Date(row.updated_at).toLocaleDateString(locale === "fa" ? "fa" : "en")}</span>
                  </div>
                </div>
                <div>
                  <h3 className='text-w-100 text-lg'>{locale === "fa" ? row.fa_title : row.en_title}</h3>
                  <p className='text-w-80 mt-2'>{locale === "fa" ? row.fa_description : row.en_description}</p>
                </div>
                <div className='flex justify-center'>
                  <Link className='text-w-100 bg-d-60 text-xs md:text-base px-5 py-2 rounded-full border border-d-50' href={`/blogs/${row.id}`}>
                    {locale === "fa" ? "مطالعه بیشتر" : "Read More"}
                    <span className='screen-reader-text'>
                      {locale === "fa" ? row.fa_title : row.en_title}
                    </span>
                  </Link>
                </div>
              </section>
            ))
          }
        </div>
        <PaginationSeo meta={meta} />
      </main>
    </>
  )
}
