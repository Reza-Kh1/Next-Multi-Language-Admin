"use client"
import UploadImage from '@/components/UploadImage/UploadImage';
import { Button } from '@heroui/button';
import { Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { MdOutlineDataSaverOn } from 'react-icons/md';
type FormUsersType = {
    data?: {
        name: string
        username: string
        password?: string
        profile?: string|null
        user_type: string
    }
    isUpdate?: boolean
    onSubmit: (value: any) => void
}
export default function FormUsers({ data, onSubmit, isUpdate }: FormUsersType) {
    const [dataForm, setDataForm] = useState({
        name: "",
        username: "",
        password: "",
        profile: "",
        user_type: ""
    })
    const action = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(dataForm)
    }
    const syncData = () => {
        if (!data) return
        setDataForm({
            name: data?.name,
            password: data?.password || "",
            profile: data?.profile || "",
            user_type: data?.user_type,
            username: data?.username
        })
    }
    useEffect(() => {
        syncData()
    }, [])
    return (
        <form onSubmit={action} className='flex flex-col gap-2'>
            <div className={`grid ${isUpdate ? "grid-cols-1" : "md:grid-cols-2"} gap-3`}>
                <Input
                    onChange={({ target }) => setDataForm({ ...dataForm, name: target.value })}
                    value={dataForm.name}
                    label="Name"
                    type="text"
                    labelPlacement='outside'
                    placeholder='name'
                    variant="bordered"
                    required
                />
                <Input
                    onChange={({ target }) => setDataForm({ ...dataForm, username: target.value })}
                    value={dataForm.username}
                    label="User Name (uniq)"
                    type="text"
                    labelPlacement='outside'
                    placeholder='User Name'
                    variant="bordered"
                    required
                />
                {data ? <Input
                    onChange={({ target }) => setDataForm({ ...dataForm, user_type: target.value })}
                    value={dataForm.user_type}
                    label="User Type"
                    type="text"
                    labelPlacement='outside'
                    placeholder='User Type'
                    variant="bordered"
                /> : null
                }
                <Input
                    onChange={({ target }) => setDataForm({ ...dataForm, password: target.value })}
                    value={dataForm.password}
                    label="Password"
                    type="text"
                    labelPlacement='outside'
                    placeholder='password'
                    variant="bordered"
                    required
                />
                <UploadImage imageUrl={dataForm.profile} setImageUrl={(value) => setDataForm({ ...dataForm, profile: value })} height={100} width={100} />
            </div>
            <div>
                <Button type='submit' className='bg-white rounded-md shadow-md text-b-70 border border-b-70'>
                    Save User
                    <MdOutlineDataSaverOn />
                </Button>
            </div>
        </form>
    )
}
