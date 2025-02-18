import { Button } from '@heroui/button'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { FaCalendar } from 'react-icons/fa'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
type CircleBoxType = {
    name: string
    text: string
    image: string
    price?: number
    date?: string
    why?: string
    btnMore?: boolean
    customText?: ReactNode
}
export default function CircleBox({ date, why, price, name, text, image, btnMore, customText }: CircleBoxType) {
    const local = useLocale()
    return (
        <section className="p-4 flex flex-col justify-between md:p-12 text-center bor-d-60 rounded-xl bg-no-repeat bg-cover" style={{ backgroundImage: `url(/dot-top.png), linear-gradient(177deg, #50505026, #00000000)` }}>
            <div className="bg-contain bg-no-repeat bg-center mt-6 flex justify-center items-center h-32 md:h-40" style={{ backgroundImage: `url(/circle-icon.png)` }}>
                <Image src={image} width={40} height={40} alt="icon" />
            </div>
            {
                date ?
                    <div className='flex justify-center'>
                        <span className='flex gap-2 items-center py-3 px-5 border text-xs rounded-full border-d-60 text-w-80'>
                            <FaCalendar />
                            {date}
                        </span>
                    </div>
                    : null
            }
            <span className="text-w-100 text-xl md:text-2xl font-semibold mt-2 md:mt-6 block">{name}</span>
            <p className="text-w-80 text-sm md:text-base mb-6 mt-4">{text}</p>
            {price ?
                < div className='flex w-full justify-between items-center'>
                    <div className='text-w-50 text-start md:text-center text-sm flex flex-col md:flex-row md:text-base'>
                        {local === "fa" ? "شروع قیمت از" : "Starts at Price"}:
                        <span className='text-w-90 font-medium'>${price.toLocaleString()}</span>
                    </div>
                    <Button className='py-4 md:py-5 px-3 text-xs md:text-base rounded-full text-w-100 bg-d-100 border border-d-60'>

                        {local === "fa" ? "تماس بگیرید" : "Book a Call"}:
                        <i className='px-3 py-1 rounded-full bg-d-80'>
                            {local === "fa" ?
                                <FaArrowLeftLong className="text-w-100" color="#ffff" />
                                :
                                <FaArrowRightLong className="text-w-100" color="#ffff" />
                            }
                        </i>
                    </Button>
                </div> : null
            }
            {customText ? customText : null}
            {btnMore ?
                <div>
                    < Button className="p-3 md:p-5 mt-3 md:mt-6 py-4 !text-xs md:!text-base md:py-6 rounded-full border bg-d-80 text-w-80 border-d-60">
                        {local === "fa" ? "نمایش بیشتر" : "Learn More"}
                        {local === "fa" ?
                            <FaArrowLeftLong className="text-w-100" color="#ffff" />
                            :
                            <FaArrowRightLong className="text-w-100" color="#ffff" />
                        }                    </Button>
                </div>
                : null
            }
            {why ?
                <div className='w-full p-4 md:p-8 border rounded-xl flex flex-col gap-3 justify-center items-center border-d-60'>
                    <span className='text-w-90'>{local === "fa" ? "چرا" : "why"}</span>
                    <p className='text-w-50 text-sm md:text-base'>{why}</p>
                </div>
                : null}
        </section >
    )
}
