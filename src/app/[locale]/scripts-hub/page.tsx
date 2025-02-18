import ContainerHeader from '@/components/ContainerHeader/ContainerHeader'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { FaInstagram } from 'react-icons/fa'
import { FaArrowLeftLong, FaArrowRightLong, FaFacebook, FaTwitter } from 'react-icons/fa6'
import { HiOutlineMenu } from 'react-icons/hi'
import Products from './Products'
import { getTranslations } from 'next-intl/server'
import { fetchApi } from '@/action/fetchApi'
import pageCache from '@/data/cache'
import { OptionsGetAllMeta, ProducrtType } from '@/app/type'
import PaginationSeo from '@/components/PaginationSeo/PaginationSeo'
export const metadata: Metadata = {
    title: 'Scripts Hub | Site',
    description: 'Scripts Hub | Site'
}
const getData = (page: string) => {
    return fetchApi({ url: `products?page=${page}`, next: pageCache.products.cache, tags: [pageCache.products.tag] })
}
export default async function page({ params, searchParams }: any) {
    const { locale } = await params
    const { page = 1 } = await searchParams
    const { data, meta }: { data: ProducrtType[], meta: OptionsGetAllMeta } = await getData(page)
    const t = await getTranslations("Scripts")
    return (
        <>
            <ContainerHeader firstDark dark={t("header.nameDark")} light={t("header.nameLight")} text={t("header.text")} />
            <main className='main-class'>
                <div className='flex flex-col text-center md:text-start md:flex-row w-full md:w-2/3 gap-3 my-8 md:my-32 mx-auto items-center'>
                    <div className='w-1/5'>
                        <ImageCustom className='rounded-full border border-d-60' src={'/profile/man.png'} alt={"profile"} width={100} height={100} />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className='text-w-100'>{t("prof.name")}</span>
                        <p className='text-w-50'>{t("prof.text")}</p>
                    </div>
                    <div className='flex flex-col gap-3 w-2/5   '>
                        <span className='text-w-80'>{locale === "fa" ? "راه ارتباطی" : "Lets connect"}</span>
                        <div className='flex gap-2 items-center text-w-80'>
                            <i className='p-3 rounded-full border border-d-60' style={{ background: "linear-gradient(180deg, #7f7d7d29, #000000c4)" }}>
                                <FaInstagram />
                            </i>
                            <i className='p-3 rounded-full border border-d-60' style={{ background: "linear-gradient(180deg, #7f7d7d29, #000000c4)" }}>
                                <FaTwitter />
                            </i>
                            <i className='p-3 rounded-full border border-d-60' style={{ background: "linear-gradient(180deg, #7f7d7d29, #000000c4)" }}>
                                <FaFacebook />
                            </i>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-14 md:gap-10 my-16 md:my-24'>
                    <div>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-w-100 font-semibold text-2xl'>{t("section-1.name")}</h2>
                            <Link href={"#"} title='more products' aria-labelledby='more' className='p-3 md:hidden rounded-full border border-d-60' style={{ background: "linear-gradient(180deg, #7f7d7d29, #000000c4)" }}>
                                {locale === "fa" ?
                                    <FaArrowLeftLong className="text-w-100" />
                                    :
                                    <FaArrowRightLong className="text-w-100" />
                                }
                            </Link>
                        </div>
                        <p className='text-w-50 mt-3'>{t("section-1.text")}</p>
                    </div>
                    {t.raw("section-1.array").map((row: any, index: number) => (
                        <div key={index} className='text-center relative pt-12 items-center p-6 justify-center rounded-xl border-d-60 border' style={{ backgroundImage: 'linear-gradient(204deg, #ffffff0d, #0202028f)' }}>
                            <div className="p-3 absolute left-1/2 -top-8 transform -translate-x-1/2 border-4 overflow-hidden rounded-full border-d-50" style={{ backgroundImage: `url('/dote.png')` }}>
                                <span className="absolute w-full h-full bg-gradient-to-tl to-[#ffffff26] from-black/90 left-0 top-0 "></span>
                                <ImageCustom alt={"lamp"} src={row.image} width={30} height={30} />
                            </div>
                            <span className='text-w-100'>{row.name}</span>
                            <p className='text-w-50'>{row.text}</p>
                        </div>
                    ))}
                    <div className='hidden md:flex items-center'>
                        <Link href={"#"} title='more products' aria-labelledby='more' className='p-3 rounded-full border border-d-60' style={{ background: "linear-gradient(180deg, #7f7d7d29, #000000c4)" }}>
                            {locale === "fa" ?
                                <FaArrowLeftLong className="text-w-100" />
                                :
                                <FaArrowRightLong className="text-w-100" />
                            }
                        </Link>
                    </div>
                </div>
                {data.length ?
                    <div>
                        <h2 className='text-w-100 text-2xl md:text-4xl font-semibold mb-12'>Code Snippet</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10'>
                            {data.map((item, index) => (
                                <Products key={index} row={item}>
                                    <div>
                                        <span className='text-xl md:text-2xl text-w-100 font-semibold'>{locale === "fa" ? item.fa_name : item.en_name}</span>
                                        <p className='text-w-50 text-sm md:text-base mt-4'>{locale === "fa" ? item.fa_description : item.en_description}</p>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex gap-1 items-center'>
                                            <span className='text-w-80'>
                                                {locale === "fa" ? "قیمت" : "price"} : {Number(item.price).toLocaleString()} T
                                            </span>
                                        </div>
                                        <div className='flex gap-4'>
                                            {JSON.parse(item.technologies).map((icon: any) => (
                                                <i key={icon?.name} className={`p-2 rounded-full bg-d-80 border border-d-60 text-w-100 devicon-${icon.name}-${icon.icon}`}>
                                                </i>
                                            ))}
                                        </div>
                                    </div>
                                </Products>
                            ))}
                        </div>
                        <PaginationSeo meta={meta} />
                    </div>
                    : null}
                <div className='my-12 md:my-24'>
                    <h2 className='text-w-100 text-2xl md:text-4xl font-semibold mb-6'>Mentorship</h2>
                    <div className='flex md:flex-row flex-col gap-7 items-start'>
                        <div className='flex flex-col gap-4 w-full md:w-1/3'>
                            <p className='text-w-50'>
                                Menghabiskan banyak waktu untuk belajar sendiri dan tetap merasa stuck?
                            </p>
                            <p className='text-w-50'>
                                Mentorship Frontend ini menjadi jawaban atas permasalahanmu. Karena disini, kamu bakal merasakan mentoring yang lebih personal
                            </p>
                        </div>
                        <div className='flex flex-col gap-5 w-full md:w-2/3'>
                            <div className='flex flex-col md:flex-row gap-5 p-3 md:p-6 rounded-xl border border-d-60'>
                                <div className='flex gap-2 p-4 rounded-xl border border-d-60'>
                                    <div className='flex flex-col gap-5'>
                                        <div className='flex gap-2 items-center'>
                                            <ImageCustom width={55} figureClass='w-auto  rounded-full bg-d-80 border border-d-60' alt={"prof"} height={55} src={"/profile/prof2.png"} />
                                            <span className='text-w-100 font-semibold'>Minggu Pertama</span>
                                        </div>
                                        <p className='text-w-50 text-sm'>Membahas dasar dari website seperti tag atribut dan element. </p>
                                    </div>
                                </div>
                                <div className='flex gap-2 p-4 rounded-xl border border-d-60'>
                                    <div className='flex flex-col gap-5'>
                                        <div className='flex gap-2 items-center'>
                                            <ImageCustom width={55} figureClass='w-auto  rounded-full bg-d-80 border border-d-60' alt={"prof"} height={55} src={"/profile/prof.png"} />
                                            <span className='text-w-100 font-semibold'>Minggu Pertama</span>
                                        </div>
                                        <p className='text-w-50 text-sm'>Membahas dasar dari website seperti tag atribut dan element. </p>
                                    </div>
                                </div>
                                <div className='flex gap-2 p-4 rounded-xl border border-d-60'>
                                    <div className='flex flex-col gap-5'>
                                        <div className='flex gap-2 items-center'>
                                            <ImageCustom width={55} figureClass='w-auto  rounded-full bg-d-80 border border-d-60' alt={"prof"} height={55} src={"/profile/prof3.png"} />
                                            <span className='text-w-100 font-semibold'>Minggu Pertama</span>
                                        </div>
                                        <p className='text-w-50 text-sm'>Membahas seputar konsep layoung seperti flexbox dan grid.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-start'>
                                <Link href={"#"} className='text-w-100 flex items-center text-xs md:text-base gap-4 p-2 px-4 md:p-3 md:px-6 border border-d-60 rounded-full '>
                                    <HiOutlineMenu />
                                    Baca selengkapnya
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='my-12 md:my-24 flex-col md:flex-row flex'>
                    <div className='md:w-1/3 text-center'>
                        <h2 className='text-w-100 text-2xl md:text-4xl font-semibold mb-6'>Keuntungan Mentorship</h2>
                        <ImageCustom alt={"ex"} src={"/biting.png"} figureClass='w-auto text-center flex justify-center' className='w-52 md:w-72' width={300} height={400} />
                    </div>
                    <div className='md:w-2/3 flex flex-col gap-5'>
                        <div className={`${locale === "fa" ? "md:mr-16  md:pr-14" : "md:ml-16  md:pl-14"} relative flex flex-col mt-8 p-6 pt-10 md:p-8 md:pt-8 border border-d-60 rounded-xl`}>
                            <span className='text-w-100 mb-6'>Mentorship 1 : 1</span>
                            <p className='text-w-50'>Video Call 1 : 1 dengan mentor untuk berdiskusi, bertanya dan konsultasi seputar mentorship frontend atau hal lainnya</p>
                            <div className={`${locale === "fa" ? "right-1/2 translate-x-1/2 md:-right-9" : "left-1/2 md:-left-9 -translate-x-1/2"} p-4 -top-8 md:translate-x-0 absolute md:top-1/2 transform md:-translate-y-1/2 border-1 overflow-hidden rounded-full border-d-50`} style={{ background: 'linear-gradient(134deg, #3a3838e6, #000000ed)' }}>
                                <ImageCustom alt={"lamp"} src={"/icons/code.png"} width={30} height={30} />
                            </div>
                        </div>
                        <div className={`${locale === "fa" ? "md:mr-16  md:pr-14" : "md:ml-16  md:pl-14"} relative flex flex-col mt-8 p-6 pt-10 md:p-8 md:pt-8 border border-d-60 rounded-xl`}>
                            <span className='text-w-100 mb-6'>Terarah</span>
                            <p className='text-w-50'>Video Call 1 : 1 dengan mentor untuk berdiskusi, bertanya dan konsultasi seputar mentorship frontend atau hal lainnya</p>
                            <div className={`${locale === "fa" ? "right-1/2 md:-right-9 translate-x-1/2" : "left-1/2 md:-left-9 -translate-x-1/2"} p-4 -top-8  md:translate-x-0 absolute md:top-1/2 transform md:-translate-y-1/2 border-1 overflow-hidden rounded-full border-d-50`} style={{ background: 'linear-gradient(134deg, #3a3838e6, #000000ed)' }}>
                                <ImageCustom alt={"lamp"} src={"/icons/code.png"} width={30} height={30} />
                            </div>
                        </div>
                        <div className={`${locale === "fa" ? "md:mr-16  md:pr-14" : "md:ml-16  md:pl-14"} relative flex flex-col mt-8 p-6 pt-10 md:p-8 md:pt-8 border border-d-60 rounded-xl`}>
                            <span className='text-w-100 mb-6'>Silabus</span>
                            <p className='text-w-50'>Silabus praktis, fundamental yang bisa diimplementasikan berdasarkan studi kasus</p>
                            <div className={`${locale === "fa" ? "right-1/2 md:-right-9 translate-x-1/2" : "left-1/2 md:-left-9 -translate-x-1/2"} p-4 -top-8  md:translate-x-0 absolute md:top-1/2 transform md:-translate-y-1/2 border-1 overflow-hidden rounded-full border-d-50`} style={{ background: 'linear-gradient(134deg, #3a3838e6, #000000ed)' }}>
                                <ImageCustom alt={"lamp"} src={"/icons/code.png"} width={30} height={30} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
