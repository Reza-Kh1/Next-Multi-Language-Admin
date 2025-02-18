"use client"
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, useDisclosure } from '@nextui-org/react'
import React, { useEffect } from 'react'
import ImageCustom from '../ImageCustom/ImageCustom';
import { HiMenuAlt3 } from 'react-icons/hi';
import Navlink from '../Navlink/Navlink';
import { Button } from '@heroui/button';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LanguageBtn from './LanguageBtn';
import { Link } from '@/i18n/routing';
export default function HeaderMobile() {
    const t = useTranslations("Menu")
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const path = usePathname()
    useEffect(() => {
        if (isOpen) {
            onClose()
        }
    }, [path])
    return (
        <div className='md:hidden' dir='ltr'>
            <div className={`flex ${isOpen ? "!z-0" : "!z-[51]"} justify-between items-center pb-4 mb-4 border-b border-d-60 px-0 pt-4`}>
                <div className='flex justify-between gap-1 items-center'>
                    <Link href={"/"}>
                        <ImageCustom figureClass="w-auto" alt='logo' src={"/logo.png"} width={100} height={37} />
                    </Link>
                    <LanguageBtn />
                </div>
                <Button isIconOnly onPress={() => onOpen()} className='bg-d-80 border border-d-60 p-3 rounded-full text-white'>
                    <HiMenuAlt3 size={23} />
                </Button>
            </div>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent className='w-1/2'>
                    <DrawerHeader className="flex flex-col gap-1">
                    </DrawerHeader>
                    <DrawerBody>
                        <div className='flex items-center flex-col justify-end gap-2'>
                            {t.raw("menuArray").map((i: any, index: number) => (
                                <Navlink key={index} name={i.name} url={i.url} />
                            ))}
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div >
    )
}
