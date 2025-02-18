"use client"
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { Button } from '@heroui/button'
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, useDisclosure } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { RiArticleLine, RiMenu3Fill } from "react-icons/ri";
import NavlinkAdmin from '../NavlinkAdmin/NavlinkAdmin'
import { MdAddChart, MdDashboard, MdDoorBack, MdOutlineEmail } from 'react-icons/md'
import { FaCartPlus, FaFileInvoiceDollar, FaUsers } from 'react-icons/fa6'
import Cookies from "js-cookie"
import { usePathname, useRouter } from 'next/navigation'
import { CgProfile } from 'react-icons/cg'

export default function Navbar() {
    const path = usePathname()
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const route = useRouter()
    const logout = () => {
        Cookies.remove('authToken');
        route.replace("/admin/login")
    }
    useEffect(() => {
        if (isOpen) {
            onClose()
        }
    }, [path])
    if (path === "/admin/login") return null
    return (
        <div className='w-full mb-5 flex justify-between items-center bg-white shadow-md p-3 rounded-xl'>
            <div>
                {new Date().toISOString().split('T')[0]}
            </div>
            <Button isIconOnly variant='light' className='md:hidden' onPress={onOpen}>
                <RiMenu3Fill />
            </Button>
            <Drawer placement='left' isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent className='w-2/3'>
                    {(onClose) => (
                        <>
                            <DrawerHeader>
                                <div className='flex items-center w-full justify-center gap-2 border-b border-d-60/50 pb-5'>
                                    <ImageCustom alt={"logo"} src={"/logo-dark.webp"} width={80} height={50} />
                                    <h1 className='font-semibold text-d-100 text-lg'>Shlabs</h1>
                                </div>
                            </DrawerHeader>
                            <DrawerBody>
                                <div className='pr-2 overflow-y-auto custom-scroll flex flex-col gap-1'>
                                    <NavlinkAdmin href='/admin/blogs' icon={<RiArticleLine />} name='Blogs' />
                                    <NavlinkAdmin href='/admin/profile' icon={<CgProfile />} name='Profile' />
                                    <NavlinkAdmin href='/admin/projects' icon={<MdAddChart />} name='Projects' />
                                    <NavlinkAdmin href='/admin/products' icon={<FaCartPlus />} name='Products' />
                                    <NavlinkAdmin href='/admin/users' icon={<FaUsers />} name='Users' />
                                    <NavlinkAdmin href='/admin/payment' icon={<FaFileInvoiceDollar />} name='Payments' />
                                    <button type='button' onClick={logout} className={`flex items-center p-2 rounded-xl  justify-strat gap-2`}>
                                        <i className={`bg-white text-slate-800 text-lg p-2 shadow-md rounded-lg`}><MdDoorBack /></i>
                                        <span>
                                            Log out
                                        </span>
                                    </button>
                                </div>
                            </DrawerBody>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    )
}
