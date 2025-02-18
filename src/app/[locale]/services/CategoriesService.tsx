"use client"
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { Button } from '@heroui/button'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
type BoxComponentType = {
    name: string
    text: string
    boxs: {
        name: string
        text: string
    }[]
}
export default function CategoriesService() {
    const local = useLocale()
    const [category, setCategory] = useState<string>(local === "fa" ? "طراحی وب" : "Web Design")
    const t = useTranslations("Services")
    const BoxComponent = ({ data }: { data: BoxComponentType }) => {
        return <div className='p-4 md:p-8 border border-d-60 rounded-xl my-4'>
            <span className='text-w-100'>{data.name}</span>
            {data.text && <p className='text-w-50 mt-4 mb-8'>{data.text}</p>}
            <div className='flex flex-wrap flex-col md:flex-row'>
                {data.boxs.map((row, index) => (
                    <React.Fragment key={index}>
                        <div key={index} className={`w-full md:w-1/2 py-3 md:py-8 md:pr-8 pb-4 md:pb-0 ${data.boxs.length === index + 1 ? "" : "border-b"} md:border-b-0 pl-0 border-d-60 ${(index + 1) % 2 === 0 ? local === "fa" ? " md:border-r md:pr-8" : " md:border-l  md:pl-8" : ""}`}>
                            <span className='text-w-90'>{row.name}</span>
                            <p className='text-w-50'>{row.text}</p>
                        </div>
                        {(index + 1) === 2 ? <div className='hidden md:flex w-full h-[1px] bg-d-60 my-6'></div> : null}
                    </React.Fragment>
                )
                )}
            </div>
        </div>
    }
    return (
        <div className='mt-12 flex flex-col md:flex-row gap-8 items-start'>
            <div className='static md:sticky flex flex-row overflow-x-auto md:flex-col gap-4 w-full md:w-1/4 top-5 h-auto left-0'>
                {t.raw("section-2.arrayCategory").map((row: any, index: number) => (
                    <button key={index} onClick={() => setCategory(row.name)} className={`${category === row.name ? "bg-d-60" : "bg-d-100"} border overflow-visible border-d-60 rounded-lg p-3 md:p-4 pr-8 py-3 items-center justify-start text-white w-full flex gap-2`}>
                        <Image src={row.img} alt='button' width={20} height={20} />
                        <span className='text-nowrap'>{row.name}</span>
                    </button>
                ))}
            </div>
            <div className='w-full md:w-3/4 flex flex-col'>
                <h2 className='text-w-100 font-semibold mb-4 text-xl'>{t.raw("section-2.name")}</h2>
                <p className='text-w-50 mb-10'>{t.raw("section-2.text")}</p>
                {t.raw("section-2.box-1").map((i: any, index: number) => (
                    <BoxComponent data={i} key={index} />
                ))}
                <div className='p-4 md:p-8 border border-d-60 rounded-xl my-4'>
                    <span className='text-w-100'>{t.raw("section-2.box-2.name")}</span>
                    <p className='text-w-50 mt-4 mb-8 text-sm md:text-base'>{t.raw("section-2.box-2.text")}</p>
                    <div className='flex gap-5 relative'>
                        <ImageCustom alt={"services"} src={"/service1.png"} width={500} height={300} />
                        <ImageCustom alt={"services"} src={"/service2.png"} width={500} height={300} />
                        <Button className='py-5 px-2 absolute bottom-0 items-center left-1/2 transform -translate-x-1/2 rounded-full text-w-100 bg-d-100 border border-d-60'>
                            {local === "fa" ? "نمایش تمام پروژه ها" : "View All Projects"}
                            <i className='px-4 py-2 rounded-full bg-d-80'>
                                {local === "fa" ?
                                    <FaArrowLeftLong className="text-w-100" color="#ffff" />
                                    :
                                    <FaArrowRightLong className="text-w-100" color="#ffff" />
                                }
                            </i>
                        </Button>
                    </div>
                </div>
                <div className='mobile-table md:hidden p-4 border border-d-60 rounded-xl mt-4'>
                    <span className='text-w-100'>{t("section-2.box-3.name")}</span>
                    <p className='text-w-50 mt-4 mb-8'>{t("section-2.box-3.text")}</p>
                    <div className='flex flex-col gap-5'>
                        {t.raw("section-2.box-3.array").map((row: any, index: number) => (
                            <ul key={index} className='flex flex-col border border-d-60 rounded-xl'>
                                <li className='flex flex-col border-b p-3 border-d-60'>
                                    <span className='text-w-100'>Project Name</span>
                                    <p className='text-w-50 text-sm'>{row.name}</p>
                                </li>
                                <li className='flex flex-col border-b p-3 border-d-60'>
                                    <span className='text-w-100'>Industry</span>
                                    <p className='text-w-50 text-sm'>{row.subject}</p>
                                </li>
                                <li className='flex p-3 flex-col'>
                                    <span className='text-w-100'>Website URL</span>
                                    <p className='text-w-50 text-sm'>{row.url}</p>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
                <div className='p-8 border hidden md:block border-d-60 rounded-xl mt-4'>
                    <span className='text-w-100'>{t("section-2.box-3.name")}</span>
                    <p className='text-w-50 mt-4 mb-8'>{t("section-2.box-3.text")}</p>
                    <ul className='w-full flex flex-col md:flex-row gap-5 md:gap-0 mb-6 ul-border'>
                        <li className='text-w-90 border w-full border-d-60 p-5 font-semibold md:w-1/3'>Project Name</li>
                        <li className='text-w-90 border w-full border-d-60 p-5 font-semibold md:w-1/3'>Industry</li>
                        <li className='text-w-90 border w-full border-d-60 p-5 font-semibold md:w-1/3'>Website URL</li>
                    </ul>
                    <div className='flex flex-col table-border'>
                        {t.raw("section-2.box-3.array").map((row: any, index: number) => (
                            <ul key={index} className='w-full flex flex-col md:flex-row border-d-80'>
                                <li className='text-w-80 border border-d-60 p-5  md:w-1/3'>{row.name}</li>
                                <li className='text-w-80 border border-d-60 p-5  md:w-1/3'>{row.subject}</li>
                                <li className='text-w-80 border border-d-60 p-5  md:w-1/3'>{row.url}</li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}