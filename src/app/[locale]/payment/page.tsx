"use client"
import { ProducrtType } from '@/app/type'
import ContainerHeader from '@/components/ContainerHeader/ContainerHeader'
import { Button } from '@heroui/button'
import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import Image from 'next/image'
import { Checkbox, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import axios from 'axios'
import { FaRegCopy } from 'react-icons/fa6'
export default function page() {
    const t = useTranslations("Payment")
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const local = useLocale()
    const [payment, setPayment] = useState<string>("")
    const [step, setStep] = useState<number>(0)
    const [data, setData] = useState<ProducrtType>()
    const [approvalRule, setApprovalRule] = useState<boolean>(false)
    const [phone, setPhone] = useState<string>("")
    const [valueCode, setValueCode] = useState<string>("")
    const [refCode, setRefCode] = useState<string>("")
    const route = useRouter()
    const search = useSearchParams()
    const paymentHandler = () => {
        if (!payment) return toast.error(local === "fa" ? "درگاه پرداخت را انتخاب کنید" : "Select the payment gateway")
        const body = {
            phone: phone,
            site: local
        }
        localStorage.setItem("setting", JSON.stringify(body))
        axios.post(`${process.env.NEXT_PUBLIC_URL_API}getPaymentLink`, {
            product_id: data?.id,
            phone: phone
        }).then(({ data }) => {
            window.open(data, '_blank', 'noopener,noreferrer');
        }).catch((err) => console.log(err)
        )
    }
    const phoneHandler = () => {
        if (approvalRule && phone) {
            setStep(1)
        } else {
            const err = local === "fa" ? "قوانین وبسایت را مطالعه و تایید کنید" : "You must accept the Terms and Conditions before proceeding."
            toast.error(err)
        }
    }
    const cancelHandler = () => {
        localStorage.setItem("product-shlabs", "")
        route.replace("/en/scripts-hub")
    }
    const copyToClipboard = async () => {
        if (!refCode) return
        try {
            await navigator.clipboard.writeText(refCode);
            toast.success(local === "fa" ? "متن در در کلیپبورد ذخیره شد" : "Copy in Clipboard")
        } catch (err) {
            toast.error(local === "fa" ? "ارور در کپی متن" : "Error in Clipboard")
        }
    }
    const getFile = () => {
        axios.post(`${process.env.NEXT_PUBLIC_URL_API}transactions/getTransactionByRefCode`, {
            ref_code: valueCode
        }).then(async ({ data }) => {
            window.open(data.data.product.download_url, '_blank', 'noopener,noreferrer');
            // const url = data.data.product.download_url;
            // const response = await fetch(url);
            // const blob = await response.blob();
            // const link = document.createElement('a');
            // link.href = window.URL.createObjectURL(blob);
            // link.download = 'downloaded-file.pdf';
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
        }).catch((err) => {
            if (err.status === 403) {
                toast.error(local === "fa" ? "شما مجاز به دانلود نیستید" : "You are not allowed to download")
            }
        })
    }
    useEffect(() => {
        const localProduct = localStorage.getItem("product-shlabs")
        if (localProduct) {
            const json = JSON.parse(localProduct as string) as ProducrtType
            setData(json)
        }
        const step = search.get("step")
        if (step) {
            const localStro = localStorage.getItem("setting")
            if (localStro) {
                const json = JSON.parse(localStro)
                if (json.site === local) {
                    setStep(2)
                    setPhone(json.phone)
                } else {
                    route.push(`/${json.site}/payment?step=${step}`)
                }
            }
        }
    }, [])
    return (
        <>
            <ContainerHeader firstDark dark={"shlabs"} light={"payments"} text={""} />
            <main className='main-class'>
                <div className='p-4 gap-3 mt-12 md:p-8 flex flex-col md:flex-row justify-between rounded-xl border border-d-60' style={{ backgroundImage: 'linear-gradient(204deg, #ffffff0d, #0202028f)' }}>
                    <div className='w-full md:w-4/12 pb-5 md:pr-5 border-b md:border-b-0 md:border-r border-d-60 flex flex-col items-center justify-center text-center gap-6'>
                        <h1 className='text-white text-3xl font-semibold'>{local === "fa" ? "خلاصه سفارش" : "Order Summery"}</h1>
                        <div className='border p-6 w-full bg-d-80 rounded-xl flex justify-between text-white items-center relative border-d-60'>
                            <span className='font-semibold'>{local === "fa" ? data?.fa_name : data?.en_name}</span>
                            <span onClick={cancelHandler} className='absolute cursor-pointer top-1 right-1 text-white'>
                                <MdClose size={20} />
                            </span>
                        </div>
                        <div className='w-full flex flex-col gap-6'>
                            <div className='flex justify-between w-full items-center text-white'>
                                <span>{local === "fa" ? "هزینه محصول" : "Subtotal"}</span>
                                <span>{Number(data?.price)?.toLocaleString()} T</span>
                            </div>
                            {/* <div className='flex justify-between w-full items-center text-white'>
                                <span>{local === "fa" ? "حمل و نقل" : "Shipping"}</span>
                                <span>5.25 T</span>
                            </div> */}
                            <div className='flex justify-between w-full items-center text-red-500 text-2xl font-semibold'>
                                <span>{local === "fa" ? "جمع کل" : "Total"}</span>
                                <span>{(Number(data?.price)).toLocaleString()} T</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-8/12 pt-5 md:pl-5 flex flex-col justify-evenly'>
                        <div className='flex items-center mb-8'>
                            <figure className='bg-w-90 p-3 rounded-full'>
                                <Image src={"/icons/phone-call.png"} alt='phone' width={50} height={50} />
                            </figure>
                            <span className={`${step > 0 ? ' bg-w-90' : 'bg-d-50'} block w-full h-1`}></span>
                            <figure className={`${step > 0 ? ' bg-w-90' : 'bg-d-50'} p-3 rounded-full`}>
                                <Image src={"/icons/cvv-card.png"} alt='phone' width={50} height={50} />
                            </figure>
                            <span className={`${step > 1 ? ' bg-w-90' : 'bg-d-50'} block w-full h-1`}></span>
                            <figure className={`${step > 1 ? ' bg-w-90' : 'bg-d-50'} p-3 rounded-full`}>
                                <Image src={"/icons/download.png"} alt='phone' width={50} height={50} />
                            </figure>
                        </div>
                        {step === 0 ?
                            <div className=' flex flex-col justify-evenly items-center'>
                                <label htmlFor="" className='flex flex-col gap-2 w-full md:w-2/3 mx-auto'>
                                    <span className='font-semibold text-w-100'>{local === "fa" ? "شماره تلفن" : "Phone Number"}</span>
                                    <input value={phone} onChange={({ target }) => setPhone(target.value)} type="text" name='phone' placeholder={local === "fa" ? "شماره تلفن خود را وارد کنید" : "Enter your Phone Number"} title='Name' className='bg-d-100 border border-d-60 rounded-full p-3 text-w-80' />
                                    <button type='button' className='text-white flex justify-start mt-8' onClick={onOpen}>
                                        <Checkbox color='default' onChange={() => onOpen()} isSelected={approvalRule} />
                                        <span>{t("terms")}</span>
                                    </button>
                                </label>
                                <div className='flex justify-end mt-6 w-full md:w-2/3 mx-auto'>
                                    <Button onPress={phoneHandler} className='px-5 py-3 bg-d-100 rounded-full border border-d-60'>
                                        {
                                            local === "fa" ? <>
                                                درگاه پرداخت
                                                <i>
                                                    <GrFormPreviousLink size={25} />
                                                </i>
                                            </> : <>
                                                Next
                                                <i>
                                                    <GrFormNextLink size={25} />
                                                </i>
                                            </>
                                        }
                                    </Button>
                                </div>
                            </div> :
                            step === 1 ?
                                <div className='flex flex-col gap-4 justify-evenly'>
                                    <div className='w-full'>
                                        <div className='flex flex-col md:flex-row gap-4 items-center'>
                                            <ImageCustom src={data?.picture || "/service2.png"} className='w-80 h-52 rounded-md shadow-md' alt={data?.en_name || ""} width={300} height={200} figureClass='w-auto' />
                                            <div>
                                                <span className='text-white font-semibold mb-5 block text-lg'>
                                                    {local === "fa" ? data?.fa_name : data?.en_name}
                                                </span>
                                                {data?.technologies ?
                                                    <div className='flex gap-4'>
                                                        {JSON.parse(data?.technologies || "")?.map((icon: any) => (
                                                            <i key={icon.name} className={`p-2 rounded-full  bg-gradient-to-b to-d-100 from-gray-700/90 border border-d-60 text-w-100 devicon-${icon.name}-${icon.icon}`}></i>
                                                        ))}
                                                    </div>
                                                    : null}
                                            </div>
                                        </div>
                                        <div className='flex gap-3 flex-col text-white mt-4'>
                                            <span>
                                                {local === "fa" ? "مدت زمان پشتیبانی : " + data?.support_time + " روز " : "Support duration : " + data?.support_time + " days"}
                                            </span>
                                            <span>
                                                {local === "fa" ? "تعداد بارگیری های مجاز : " : "Number of downloads allowed : "}{data?.download_count}
                                            </span>
                                            <span> {local === "fa" ? "درگاه پرداخت خود را انتخاب کنید :" : "Select your payment gateway : "}</span>
                                            <div className='flex items-center gap-5'>
                                                <div onClick={() => setPayment("zarinpal")} className={`${payment === "zarinpal" ? "bg-d-60" : ""} flex w-1/2 md:w-1/4 gap-3 border border-d-60 rounded-md p-3 cursor-pointer items-center`}>
                                                    <ImageCustom figureClass='w-auto' className='rounded-xl shadow-md' src={"/zarinpal.png"} alt={"logo"} width={60} height={40} />
                                                    <span className='text-xs md:text-base'>Zarin pal</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-between w-full mt-6'>
                                        <Button onPress={() => setStep(0)} className='px-5 py-3 bg-d-100 rounded-full border border-d-60'>
                                            {local === "fa" ?
                                                <>
                                                    <i>
                                                        <GrFormNextLink size={25} />
                                                    </i>
                                                    بازگشت
                                                </>
                                                :
                                                <><i>
                                                    <GrFormPreviousLink size={25} />
                                                </i>
                                                    Back
                                                </>}
                                        </Button>
                                        <Button type='submit' onPress={paymentHandler} className='px-5 py-3 bg-d-100 rounded-full border border-d-60'>
                                            {local === "fa" ?
                                                <>
                                                    پرداخت
                                                    <i>
                                                        <GrFormPreviousLink size={25} />
                                                    </i>
                                                </>
                                                :
                                                <> Purchase
                                                    <i>
                                                        <GrFormNextLink size={25} />
                                                    </i>
                                                </>}
                                        </Button>
                                    </div>
                                </div>
                                :
                                <div className='text-center flex flex-col justify-evenly mx-auto w-full md:w-3/4'>
                                    <span className='text-2xl text-white font-semibold'>{local === "fa" ? "پرداخت انجام شد!" : "Payment Success!"}</span>
                                    <span className='text-w-80 font-semibold block mb-4 pb-4 border-b border-d-60'>{local === "fa" ? "پرداخت شما با موفقیت انجام شد." : "Your payment has been successfully done."}</span>
                                    {/* <div className='flex flex-col gap-3 text-white my-5 text-start'>
                                        {local === "fa" ?
                                            <p>لطفا کد مرجع خود را ذخیره کنید برای دانلود محصولات به آن نیاز خواهید داشت.</p>
                                            :
                                            <p>Please save your reference code, you will need it to download the products.</p>
                                        }
                                        <span>{local === "fa" ? "کد مرجع" : "Ref Code"} :</span>
                                        <span onClick={copyToClipboard} className='cursor-pointer flex justify-between items-center w-full p-2 bg-d rounded-md bg-d-80 border-d-60'>
                                            {refCode}
                                            <FaRegCopy />
                                        </span>
                                    </div> */}
                                    {/* <span className='text-w-80 text-2xl font-semibold mb-8'>IDR 1,000,000</span> */}
                                    <div className='grid grid-cols-2 gap-5'>
                                        <div className='p-3 flex flex-col gap-3 border rounded-xl border-d-60'>
                                            <span className='text-sm text-w-80'>{local === "fa" ? "وبسایت" : "Website"}</span>
                                            <span className='text-w-100'>Shlabz</span>
                                        </div>
                                        <div className='p-3 flex flex-col gap-3 border rounded-xl border-d-60'>
                                            <span className='text-sm text-w-80'>{local === "fa" ? "زمان پرداخت" : "Payment Time"}</span>
                                            <span className='text-w-100'>{new Date().toLocaleDateString()}</span>
                                        </div>
                                        <div className='p-3 flex flex-col gap-3 border rounded-xl border-d-60'>
                                            <span className='text-sm text-w-80'>{local === "fa" ? "درگاه پرداخت" : "Payment gateway"}</span>
                                            <span className='text-w-100'>Zarin Pal</span>
                                        </div>
                                        <div className='p-3 flex flex-col gap-3 border rounded-xl border-d-60'>
                                            <span className='text-sm text-w-80'>{local === "fa" ? "شماره تلفن" : "Phone Number"}</span>
                                            <span className='text-w-100'>{phone}</span>
                                        </div>
                                    </div>
                                    <label htmlFor="" className='flex flex-col gap-2 mt-5 w-full mx-auto'>
                                        <input value={valueCode} onChange={({ target }) => setValueCode(target.value)} type="text" name='phone' placeholder={local === "fa" ? "کد خرید خود را وارد کنید" : "Enter your referral code"} title='ref' className='bg-d-100 border border-d-60 rounded-full p-3 text-w-80 w-full' />
                                    </label>
                                    <div>
                                        <button type='button' onClick={getFile} className='text-w-80 cursor-pointer flex mx-auto gap-2 items-center justify-center mt-5'>
                                            {local === "fa" ?
                                                <>
                                                    <ImageCustom figureClass='w-auto' src={"/download.png"} width={30} height={30} alt={"logo download"} />
                                                    <span className=''>دریافت فایل</span>
                                                </>
                                                :
                                                <>
                                                    <ImageCustom figureClass='w-auto' src={"/download.png"} width={30} height={30} alt={"logo download"} />
                                                    <span className=''>Get Script File</span>
                                                </>
                                            }
                                        </button>
                                    </div>
                                    <div className='flex justify-end mt-6'>
                                        <Link href={`/${local}/scripts-hub`} className='px-4 md:px-5 py-2 md:py-3 text-xs md:text-base flex items-center text-white justify-center gap-2 bg-d-100 rounded-full border border-d-60'>
                                            {local === "fa" ?
                                                <>
                                                    مرکز اسکریپت ها
                                                    <i>
                                                        <GrFormPreviousLink size={25} />
                                                    </i>
                                                </> :
                                                <>
                                                    Scrpits Hub Page
                                                    <i>
                                                        <GrFormNextLink size={25} />
                                                    </i>
                                                </>
                                            }

                                        </Link>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </main>
            <Modal scrollBehavior='inside' size='full' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-white">{t("terms")}</ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col gap-5 '>
                                    <span className='text-w-90'>{t("textTerms.name")}</span>
                                    <p className='text-white text-xl'>{t("textTerms.create")}</p>
                                    <div className='flex flex-col gap-4'>
                                        {t.raw("textTerms.array").map((row: any) => (
                                            <div key={row.name} className='flex flex-col gap-3'>
                                                <span className='text-w-90'>{row.name}</span>
                                                {row.texts.map((item: any, index: number) => (
                                                    <div key={index} className='flex flex-col gap-2'>
                                                        <p className='text-sm ml-2 text-w-80'>{item}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <p className='text-white text-lg'>{t("textTerms.lastText")}</p>
                                    <div className='flex justify-start'>
                                        <Button className='bg-white text-black rounded-full' onPress={() => { onOpenChange(), setApprovalRule(true) }}>
                                            {local === "fa" ? "تایید قوانین" : "confirmation"}
                                        </Button>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className='flex justify-end items-center'>
                                <Button className='rounded-full bg-d-btn text-white border border-d-60' onPress={() => { onClose(), setApprovalRule(false) }}>
                                    {local === "fa" ? "بستن" : "Close"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
