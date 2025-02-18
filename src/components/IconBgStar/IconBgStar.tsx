import React from 'react'
import ImageCustom from '../ImageCustom/ImageCustom'
import { Button } from '@heroui/button'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { useLocale } from 'next-intl'
type IconBgStarType = {
    name: string
    image: string
    text: string
    index: number
}
export default function IconBgStar({ name, text, image, index }: IconBgStarType) {
    const local = useLocale()
    return index === 3 ?
        <>
            <div className='hidden md:block border-t my-5 border-d-60'></div>
            <div className='hidden md:block border-t my-5 border-d-60'></div>
            <div className='hidden md:block border-t my-5 border-d-60'></div>
            <section key={index} className={`${(index + 1 !== 3 && index + 1 !== 6) ? local === "fa" ? "md:border-l" : "md:border-r" : ""} flex w-full border-b md:border-b-0 pb-5 md:pb-5 flex-col md:p-8 border-d-60 justify-center items-center gap-5 text-center`}>
                <div className="p-3 relative border-4 overflow-hidden rounded-full border-d-50" style={{ backgroundImage: `url('/dote.png')` }}>
                    <span className="absolute w-full h-full bg-gradient-to-tl to-[#ffffff26] from-black/90 left-0 top-0 "></span>
                    <ImageCustom alt={"lamp"} src={image} width={30} height={30} />
                </div>
                <span className="text-w-100">{name}</span>
                <p className="text-w-80">{text}</p>
                <Button className="p-4 py-5 rounded-full border bg-d-100 text-w-80 border-d-60">
                    {local === "fa" ? "نمایش بیشتر" : "Learn More"}
                    <i className="py-1 px-3 bg-d-60 rounded-full">
                        {local === "fa" ?
                            <FaArrowLeft className="text-w-100" color="#ffff" />
                            :
                            <FaArrowRight className="text-w-100" color="#ffff" />
                        }
                    </i>
                </Button>
            </section>
        </>
        : <section key={index} className={`${(index + 1 !== 3 && index + 1 !== 6) ? local === "fa" ? "md:border-l" : "md:border-r" : ""} flex w-full border-b md:border-b-0 pb-5 md:pb-5 flex-col md:p-8 border-d-60 justify-center items-center gap-5 text-center`}>
            <div className="p-3 relative border-4 overflow-hidden rounded-full border-d-50" style={{ backgroundImage: `url('/dote.png')` }}>
                <span className="absolute w-full h-full bg-gradient-to-tl to-[#ffffff26] from-black/90 left-0 top-0 "></span>
                <ImageCustom alt={"lamp"} src={image} width={30} height={30} />
            </div>
            <span className="text-w-100">{name}</span>
            <p className="text-w-80">{text}</p>
            <Button className="p-3 py-5 rounded-full border bg-d-100 text-w-80 border-d-60">
                {local === "fa" ? "نمایش بیشتر" : "Learn More"}
                <i className="py-1 px-3 bg-d-60 rounded-full">
                    {local === "fa" ?
                        <FaArrowLeft className="text-w-100" color="#ffff" />
                        :
                        <FaArrowRight className="text-w-100" color="#ffff" />
                    }
                </i>
            </Button>
        </section>
}