import React from 'react'
import Navlink from '../Navlink/Navlink'
import Image from 'next/image'
import { Button } from '@nextui-org/react'
import ImageCustom from '../ImageCustom/ImageCustom'
import HeaderMobile from './HeaderMobile'
import LanguageBtn from './LanguageBtn'
import { useTranslations } from 'next-intl'
export default function HeaderHome() {
    const t = useTranslations('Menu');
    return (
        <header className='flex flex-col md:flex-row md:pt-8 px-6 md:px-10 xl:px-20  flex-wrap bg-no-repeat' style={{ backgroundImage: `url("/dot-home.png")` }}>
            <div dir='ltr' className='hidden md:flex w-full justify-between items-center px-8'>
                <div className="flex gap-3 items-center">
                    <ImageCustom figureClass="w-auto" alt='logo' src={"/logo.png"} width={100} height={37} />
                    <LanguageBtn />
                </div>
                <div className='flex items-center justify-end gap-2'>
                    {t.raw("menuArray").map((i: any, index: number) => (
                        <Navlink key={index} name={i.name} url={i.url} />
                    ))}
                </div>
            </div>
            <HeaderMobile />
            <div className='w-full md:w-1/2 order-2 md:order-1 gap-10 flex flex-col'>
                <div className='flex flex-col gap-4 justify-center mt-6 md:mt-0 md:p-8 pl-0'>
                    <h1 className='text-w-100 text-3xl text-center md:text-start md:text-6xl font-semibold'>
                        {t("home.nameLight")}{" "}
                        <span className='text-w-80'>
                            {t("home.nameDark")}
                        </span>
                    </h1>
                    <p className='text-w-50 text-center md:text-start'>
                        {t("home.text")}
                    </p>
                    <span className='text-w-100 mt-10 text-center md:text-start'>{t("home.span")}</span>
                    <div className='text-w-100 flex items-center justify-center md:justify-start gap-4'>
                        <Button className='rounded-full p-5'>
                            {t("home.btnLight")}
                        </Button>
                        <Button className='rounded-full bg-d-80 text-w-100 border border-d-60 p-5'>
                            {t("home.btnDark")}
                        </Button>
                    </div>
                </div>
            </div>
            <div className='w-full md:w-1/2 order-1 md:order-2 gap-10 justify-center items-center flex flex-col'>
                <figure className='p-8 flex justify-center items-center'>
                    <Image alt='logo' src={"/big-logo.png"} width={430} height={370} />
                </figure>
            </div>
        </header>
    )
}
