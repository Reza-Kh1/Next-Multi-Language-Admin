"use client"
import { ProducrtType } from '@/app/type'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { Button } from '@heroui/button'
import axios from 'axios'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useState } from 'react'
import toast from 'react-hot-toast'
import { FaDollarSign } from 'react-icons/fa6'
import { MdClose } from 'react-icons/md'
export default function Products({ children, row }: { children: ReactNode, row: ProducrtType }) {
    const [haveCode, setHaveCode] = useState<boolean>(false)
    const [valueCode, setValueCode] = useState<string>("")
    const route = useRouter()
    const locale = useLocale()
    const payment = (item: ProducrtType) => {
        localStorage.setItem("product-shlabs", JSON.stringify(item))
        route.push(`/${locale}/payment`)
    }
    const getFile = () => {
        if (!valueCode) return toast.error(locale === "fa" ? "کد خرید خود را وارد کنید" : "Enter your referral code")
        axios.post(`${process.env.NEXT_PUBLIC_URL_API}transactions/getTransactionByRefCode`, {
            ref_code: valueCode
        }).then(async ({ data }) => {
            window.open(data.data.product.download_url, '_blank', 'noopener,noreferrer');
        }).catch((err) => {
            if (err.status === 404) {
                toast.error(locale === "fa" ? "کد صحیح وارد کنید" : "Enter the correct code")
            }
            if (err.status === 403) {
                toast.error(locale === "fa" ? "شما مجاز به دانلود نیستید" : "You are not allowed to download")
            }
        })
    }
    return <div className='p-4 gap-3 md:p-8 flex justify-between flex-col rounded-xl border border-d-60' style={{ backgroundImage: 'linear-gradient(204deg, #ffffff0d, #0202028f)' }}>
        {children}
        {haveCode ?
            <div>
                <label htmlFor="" className='flex flex-col mb-3 gap-2 mt-5 w-full mx-auto'>
                    <input value={valueCode} onChange={({ target }) => setValueCode(target.value)} type="text" name='phone' placeholder={locale === "fa" ? "کد خرید خود را وارد کنید" : "Enter your referral code"} title='ref' className='bg-d-100 border border-d-60 rounded-full p-3 text-w-80 w-full' />
                </label>
                <div className='w-full flex justify-between items-center'>
                    <Button onPress={getFile} className='rounded-full border border-d-60 p-3 bg-d-100'>
                        <span className='text-xs'>
                            {locale === "fa" ? "دانلود" : "Download"}
                        </span>
                        <ImageCustom figureClass='w-auto' src={"/download.png"} width={20} height={20} alt={"logo download"} />
                    </Button>
                    <Button onPress={() => { setHaveCode(false), setValueCode("") }} className='rounded-full border border-d-60 p-3 bg-d-100'>
                        <span className='text-xs'>
                            {locale === "fa" ? "بستن" : "Close"}
                        </span>
                        <MdClose />
                    </Button>
                </div>
            </div>
            :
            <div className='w-full flex justify-between items-center mt-4 text-xs'>
                <Button onPress={() => payment(row)} className='rounded-full border border-d-60 p-3 bg-d-100'>
                    <span className='text-xs'>
                        {locale === "fa" ? "خرید" : "Payment"}
                    </span>
                    <FaDollarSign />
                </Button>
                <Button onPress={() => setHaveCode(true)} className='rounded-full border border-d-60 p-3 bg-d-100'>
                    <span className='text-xs'>
                        {locale === "fa" ? "دانلود با کد" : "Download with code"}
                    </span>
                    <ImageCustom figureClass='w-auto' src={"/download.png"} width={20} height={20} alt={"logo download"} />
                </Button>
            </div>
        }
    </div>
}
