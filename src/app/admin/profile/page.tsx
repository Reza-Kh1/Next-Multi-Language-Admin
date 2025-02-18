"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import FormUsers from '../users/FormUsers'
import toast from 'react-hot-toast'

export default function page() {
    const [local, setLocal] = useState<string | null>(null)
    useEffect(() => {
        const localData = localStorage.getItem("shlabs")
        setLocal(localData)
    }, [])

    if (!local) return null

    const jsonLocal = JSON.parse(local)

    const updateUSer = (body: any) => {
        axios.post("updateUser", body).then(() => {
            if (local) {
                const newBody = {
                    ...jsonLocal,
                    name: body.name,
                    username: body.username,
                    profile: body.profile,
                }
                localStorage.setItem("shlabs", JSON.stringify(newBody))
            }
            toast.success("Profile was Updated")
        }).catch((err) => console.log(err))
    }

    return (
        <div className='p-3 rounded-xl bg-white shadow-md'>
            <FormUsers onSubmit={(value) => updateUSer(value)} data={jsonLocal} />
        </div>
    )
}
