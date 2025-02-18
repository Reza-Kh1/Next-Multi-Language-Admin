"use client"
import React from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { Button } from "@heroui/button";
import { useLocale } from 'next-intl';
import { usePathname, useRouter, routing } from '@/i18n/routing';
import ImageCustom from '../ImageCustom/ImageCustom';

export default function LanguageBtn() {
  const local = useLocale()
  const pathName = usePathname()
  const router = useRouter()
  const btnLanguage = (val: string) => {
    router.replace(pathName, { locale: val })
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="ghost" className="text-white rounded-full px-6">{local === "fa" ? "فارسی" : "English"}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="fa" className='text-white p-0 mb-1' textValue='fa'>
          <Button variant={local === "fa" ? "faded" : "light"} onPress={() => btnLanguage("fa")} className="text-white rounded-md flex items-center w-full justify-between" disabled={local === "fa"}>
            Persian(Fa)
            <ImageCustom alt={"iran flag"} figureClass='w-auto' src={"/iran-flag.png"} width={30} height={20} />
          </Button>
        </DropdownItem>
        <DropdownItem key="en" className='text-white p-0' textValue='en'>
          <Button variant={local === "en" ? "faded" : "light"} onPress={() => btnLanguage("en")} className="text-white rounded-md flex items-center w-full justify-between" disabled={local === "en"}>
            English(En)
            <ImageCustom figureClass='w-auto' alt={"english flag"} src={"/england-flag.jpg"} width={30} height={20} />
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
