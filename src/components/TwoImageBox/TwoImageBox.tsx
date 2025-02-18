import Image from 'next/image'
import React from 'react'
import { FaPlus } from 'react-icons/fa6'
type TwoImageBoxType = {
    img1: string
    img2: string
    name: string
    text: string
}
export default function TwoImageBox({ img1, img2, name, text }: TwoImageBoxType) {
    return (
        <div className="rounded-xl p-6" style={{ backgroundImage: `url(/dot-top.png), linear-gradient(177deg, rgb(45 45 45 / 15%), rgba(0, 0, 0, 0))` }}>
            <div className="flex justify-evenly mt-10">
                <div className="bg-contain bg-no-repeat bg-center w-24 flex justify-center items-center h-24" style={{ backgroundImage: `url(/circle-icon.png)` }}>
                    <Image src={img1} width={50} height={50} alt="icon" />
                </div>
                <i className='text-white flex items-center'>
                    <FaPlus size={30}/>
                </i>
                <div className="bg-contain bg-no-repeat bg-center w-24 flex justify-center items-center h-24" style={{ backgroundImage: `url(/circle-icon.png)` }}>
                    <Image src={img2} width={30} height={30} alt="icon" />
                </div>
            </div>
            <span className="text-w-90 mt-4 mb-4 md:mb-6 font-semibold text-center block text-lg md:text-xl">{name}</span>
            <p className="text-w-50 text-center text-sm md:text-base">{text}</p>
        </div>
    )
}
