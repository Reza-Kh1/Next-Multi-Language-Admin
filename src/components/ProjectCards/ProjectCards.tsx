"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { ProjectType } from '@/app/type'
import ImageCustom from '../ImageCustom/ImageCustom'
import { Button } from '@nextui-org/react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

export default function ProjectCards({ data }: { data: ProjectType }) {
    const [showMore, setShowMore] = useState<boolean>(false)
    const [teamMember, setTeamMember] = useState<any[]>([])
    const locale = useLocale()
    useEffect(() => {
        if (data.users.length && data.programmer_rules) {
            const parsedBody = JSON.parse(data.programmer_rules);
            const groupedByValue = parsedBody.reduce((acc: any, obj: any) => {
                const key = Object.keys(obj)[0];
                const value = obj[key];
                if (!acc[value]) {
                    acc[value] = [];
                }
                const detail = data.users.find(item => item.id === parseInt(key));
                acc[value].push({ name: detail?.username || "", profile: detail?.profile || "" });
                return acc;
            }, {});
            const result = Object.keys(groupedByValue).map(value => ({
                value,
                detail: groupedByValue[value]
            }));
            setTeamMember(result);
        }
    }, [data.users, data.programmer_rules]);
    const Detail = () => (
        <div className='mt-5 md:mt-10 flex flex-col gap-6'>
            <div className='border justify-between border-d-60 p-3 md:p-6 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10'>
                <div className='flex flex-col gap-2 border-r border-d-60'>
                    <span className='text-w-50 text-xs md:text-base'>{locale === "fa" ? "دسته" : "Category"}</span>
                    <span className='text-w-90 text-sm md:text-base'>{data.categories}</span>
                </div>
                <div className='flex flex-col gap-2 md:border-r border-d-60'>
                    <span className='text-w-50 text-xs md:text-base'> {locale === "fa" ? "زمان مد نظر" : "Time Taken"}</span>
                    <span className='text-w-90 text-sm md:text-base'>{data.time_to_do} {locale === "fa" ? "روز" : "Days"}</span>
                </div>
                <div className='md:hidden col-span-2 border-b border-d-60 h-1'></div>
                <div className='flex flex-col gap-2 border-r border-d-60'>
                    <span className='text-w-50 text-xs md:text-base'>{locale === "fa" ? "تاریخ شروع" : "Start Date"}</span>
                    <span className='text-w-90 text-sm md:text-base'>{new Date(data.start_date).toLocaleDateString(locale === "fa" ? "fa" : "en")}</span>
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-w-50 text-xs md:text-base'>{locale === "fa" ? "تاریخ تکمیل" : "Completed Date"}</span>
                    <span className='text-w-90 text-sm md:text-base'>{new Date(data.end_date).toLocaleDateString(locale === "fa" ? "fa" : "en")}</span>
                </div>
            </div>
            <div className='flex gap-3 md:gap-7 flex-col md:flex-row border items-center border-d-60 p-3 md:p-6 rounded-xl'>
                <span className='text-w-100'>{locale === "fa" ? "تکنولوژی های استفاده شده" : "Technologies Used"} </span>
                <div className='flex gap-3 md:gap-7 items-center'>
                    {data.technologies ? JSON.parse(data.technologies)?.map((icon: any) => (
                        <i key={icon.name} className={`p-2 rounded-full  bg-gradient-to-b to-d-100 from-gray-700/90 border border-d-60 text-w-100 devicon-${icon.name}-${icon.icon}`}></i>
                    )) : null}
                </div>
            </div>
            <div className='border items-center border-d-60 p-3 md:p-6 rounded-xl'>
                <span className='text-w-100 w-full col-span-3'>{locale === "fa" ? "اعضای تیم" : "Team Members"}</span>
                <div className='flex flex-col md:flex-row gap-3 md:gap-7 mt-4 justify-between'>
                    {teamMember.map((row: any, index: number) => (
                        <div className='w-full md:w-1/3 md:rounded-xl p-3 border-d-60 border-b md:border' key={index}>
                            <span className='block text-w-100 mb-5 md:mb-3 text-sm md:text-base'>{row.value}</span>
                            <div className='flex'>
                                <div className='relative w-1/3'>
                                    {row.detail.map((item: any, idx: number) => (
                                        <figure key={idx} className='absolute right-3 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                            <Image src={item.profile || "/profile/prof2.png"} alt='profile' width={40} height={40} />
                                        </figure>
                                    ))}
                                </div>
                                <div className='text-w-90 md:text-sm text-xs'>
                                    {row.detail.map((item: any, idx: number) => (
                                        <span key={idx}>{item.name}{row.detail.length > idx + 1 ? " , " : null}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <section className='w-full md:w-3/4 flex flex-col gap-6 md:gap-8 mx-auto p-3 md:p-6 border border-d-60 rounded-xl'>
            <ImageCustom src={data.picture} alt={data.en_title} width={1000} height={600} />
            <div className='flex justify-between flex-col gap-3 md:flex-row md:gap-0'>
                <h3 className='text-w-100 order-2 md:order-1 font-semibold text-xl'>{locale === "fa" ? data.fa_title : data.en_title}</h3>
                <div className='order-1 md:order-2 text-center'>
                    <span className='text-w-50'>
                        {showMore ? locale === "fa" ? "بستن جزئیات" : "Show Less" : locale === "fa" ? "نمایش جزئیات" : "Show More"}
                    </span>
                    <Button title='button more' aria-label='button more' onPress={() => setShowMore(prev => !prev)} isIconOnly className='border mx-2 border-d-60 p-3 rounded-full text-w-100 bg-gradient-to-b to-d-100 from-gray-700/90'>
                        {showMore ?
                            <FaChevronUp />
                            :
                            <FaChevronDown />
                        }
                    </Button>
                </div>
            </div>
            <div className='flex-col md:flex-row flex gap-3 items-start  md:items-center'>
                <div className='p-1 border rounded-full px-2 border-d-60 text-w-100 flex items-center gap-2'>
                    {/* <ImageCustom figureClass='p-2 bg-d-60 rounded-full' src={"/icons/chart.png"} alt={"iamge"} width={15} height={15} /> */}
                    <span className='text-sm'>
                        {data.categories}
                    </span>
                </div>
            </div>
            <div className='border border-d-60 p-3 md:p-6 rounded-xl'>
                <span className='text-w-90 block'>{locale === "fa" ? "توضیحات پروژه" : "Project Description"}</span>
                <p className='text-w-50'>
                    {locale === "fa" ? data.fa_description : data.en_description}
                </p>
                {showMore ?
                    <Detail />
                    : null}
            </div>
        </section>
    )
}
