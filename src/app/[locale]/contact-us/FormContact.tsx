"use client"
import SelectCustom from '@/components/SelectCustom/SelectCustom'
import { Button } from '@heroui/button'
import { useLocale } from 'next-intl'
import React, { useState } from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
const dataSelect = [
    "service1",
    "service2",
    "service3",
    "service4",
]
type InputCustomType = {
    label: string
    placeholder: string
    name: string
}
export default function FormContact() {
    const local = useLocale()
    const [text, setText] = useState<string>("")
    const [text1, setText1] = useState<string>("")
    const InputCustom = ({ label, placeholder, name }: InputCustomType) => {
        return <label htmlFor="" className='flex flex-col gap-2'>
            <span className='font-semibold text-w-100'>{label}</span>
            <input type="text" name={name} placeholder={placeholder} title='Name' className='bg-d-100 border border-d-60 rounded-full p-3 text-w-80' />
        </label>
    }
    return (
        <form className='w-full p-6 md:p-10 border border-d-60 rounded-xl mt-8 md:mt-12'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <InputCustom label={local === "fa" ? 'نام' : 'Name'} name='name' placeholder={local === "fa" ? 'نام وارد کنید' : 'Enter your Name'} />
                <InputCustom label={local === "fa" ? 'ایمیل' : 'Email'} name='email' placeholder={local === "fa" ? 'ایمیل وارد کنید' : 'Enter your Email'} />
                <InputCustom label={local === "fa" ? 'شماره تلفن' : 'Phone Number'} name='phone' placeholder={local === "fa" ? 'شماره تلفن وارد کنید' : 'Enter your Phone Number'} />
                <SelectCustom arry={dataSelect} label={local === "fa" ? 'سرویس' : 'Select Service'} placeholder={local === "fa" ? 'سرویس خود را انتخاب کنید' : 'Select your Service'} setText={setText} text={text} />
                <InputCustom label={local === "fa" ? 'شرکت' : 'Company / Organization Name'} name='desc' placeholder='Enter Name' />
                <SelectCustom arry={dataSelect} label={local === "fa" ? 'سرویس' : 'Select Service'} placeholder={local === "fa" ? 'سرویس خود را انتخاب کنید' : 'Select your Service'} setText={setText1} text={text1} />
            </div>
            <label htmlFor="" className='flex flex-col gap-2 mb-8 mt-6'>
                <span className='font-semibold text-w-100'>{local === "fa" ? 'پیام' : 'Message'}</span>
                <textarea rows={5} placeholder={local === "fa" ? 'متن پیام خود را وارد کنید' : 'Enter your Message'} title='Name' className='bg-d-100 border resize-none border-d-60 rounded-xl p-3 text-w-80' ></textarea>
            </label>
            <Button type='submit' className='bg-d-60/60 mx-auto rounded-full text-w-100 px-4 py-3 flex items-center justify-between'>
                {local === "fa" ? 'درخواست خود را ارسال کنید' : 'Send your Inquiry'}
                {local === "fa" ?
                    <FaArrowLeftLong className="text-w-100" />
                    :
                    <FaArrowRightLong className="text-w-100" />
                }
            </Button>
        </form >
    )
}