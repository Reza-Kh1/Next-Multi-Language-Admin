import { Button } from '@heroui/button'
import { useLocale } from 'next-intl'
import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'
type SelectCustomtType = {
    label: string
    placeholder: string
    arry: string[]
    setText: (val: string) => void
    text: string
}
export default function SelectCustom({ label, placeholder, arry, setText, text }: SelectCustomtType) {
    const [openSelect, setOpenSelect] = useState<boolean>()
    const local = useLocale()
    return (
        <label htmlFor="" className='flex flex-col gap-2 relative'>
            <span className='font-semibold text-w-100'>{local === "fa" ? 'سرویس' : 'Select Service'}</span>
            <Button onPress={() => setOpenSelect(prev => !prev)} className='w-full justify-between rounded-full text-w-80 p-5 py-[24px] border border-d-60 bg-d-100'>
                <span>
                    {text ? text : local === "fa" ? 'سرویس خود را انتخاب کنید' : 'Select your Service'}
                </span>
                <i>
                    {openSelect ? <FaAngleUp /> : <FaAngleDown />}
                </i>
            </Button>
            <div className={`${openSelect ? "absolute" : "hidden"} left-0 top-full flex flex-col gap-3 w-full z-50 p-3 rounded-xl border bg-d-100 border-d-60`}>
                {arry.map((i, index) => (
                    <Button key={index} onPress={() => { setText(i), setOpenSelect(false) }} className='w-full rounded-full text-w-80 p-5 border bg-d-60 border-d-60 '>
                        {i}
                    </Button>
                ))}
            </div>
        </label>
    )
}
