"use client"
import { Button } from '@heroui/button'
import { Checkbox, Input, Spinner } from '@nextui-org/react'
import Cookies from "js-cookie"
import axios from "axios"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
export default function Page() {
    const route = useRouter()
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [isRemember, setIsRemember] = useState<boolean>(false)
    const navigate = useRouter()
    const submitHandler = (form: FormData) => {
        setLoading(true)
        const body = {
            password: form.get("password"),
            username: form.get("name"),
        }
        axios.post("login", body).then(({ data }) => {
            if (isRemember) {
                Cookies.set('authToken', data, { expires: 15, secure: true });
            } else {
                Cookies.set('authToken', data, { expires: 1, secure: true });
            }
            axios.get("https://shlabs.ir/api/user").then(({ data }) => {
                localStorage.setItem("shlabs", JSON.stringify(data))
                navigate.replace("/admin/blogs")
            }).catch((err) => console.log(err)).finally(() => setLoading(false))
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }
    const token = Cookies.get('authToken')
    useEffect(() => {
        if (token) {
            route.replace("/admin/blogs")
        }
    }, [])
    return (
        <div className='w-full items-start mb-80 flex justify-center h-[500px] bg-slate-400 bg-no-repeat bg-center bg-cover rounded-xl shadow-md before:bg-black/40 before:w-full before:h-full relative before:absolute before:top-0 before:left-0 before:rounded-xl' style={{ backgroundImage: "url(/admin-image/login-admin.jpg)" }}>
            <div className='w-2/3 md:w-1/2 z-10 text-center mt-16'>
                {isLogin ?
                    <>
                        <h1 className='font-semibold text-5xl text-w-100'>Welcome back</h1>
                        <span className='text-w-90'>Enter your email and password to sign in.</span>
                    </> :
                    <>
                        <h1 className='font-semibold text-5xl text-w-100'>Welcome!</h1>
                        <span className='text-w-90'>Use these awesome forms to login or create new account in your project for free.</span>
                    </>
                }
            </div>
            <form action={submitHandler} className='text-center flex flex-col gap-4 md:gap-7 z-10 w-11/12 md:w-1/3 p-4 md:p-8 bg-slate-50 shadow-md border rounded-xl absolute bottom-10 left-1/2 transform -translate-x-1/2 translate-y-1/2'>
                <span className='font-semibold text-3xl '>
                    {isLogin ? "Register" : "Log in"}
                </span>
                <Input
                    required
                    name='name'
                    label="Name"
                    type="text"
                    variant="bordered"
                    labelPlacement='outside'
                    placeholder='Name'
                />
                <Input
                    required
                    name='password'
                    label="Password"
                    type="password"
                    labelPlacement='outside'
                    placeholder='password'
                    variant="bordered"
                />
                {isLogin ?
                    <Checkbox onClick={() => setIsRemember(prev => !prev)} color="default" name='save'>
                        Remember me
                    </Checkbox>
                    :
                    <Checkbox onClick={() => setIsRemember(prev => !prev)} color="default" name='save'>
                        I agree the Terms and Conditions
                    </Checkbox>
                }
                {
                    !isLogin ?
                        <>
                            <Button type='submit' disabled={loading} className={`${loading ? "bg-d-btn/70" : "bg-d-btn"} text-w-100 w-full rounded-md font-semibold p-5`}>
                                Sign in
                                {loading && <Spinner size='sm' color="default" labelColor="foreground" />}
                            </Button>
                            <span>Don't have an account?
                                <button type='button' className='font-semibold text-b-btn ml-2' onClick={() => setIsLogin(prev => !prev)}>Sign up</button>
                            </span>
                        </>
                        :
                        <>
                            <Button type='submit' disabled={loading} className={`${loading ? "bg-d-btn/70" : "bg-d-btn"} text-w-100 w-full rounded-md font-semibold p-5`}>
                                Sign up
                                {loading && <Spinner size='sm' color="default" labelColor="foreground" />}
                            </Button>
                            <span>Already have an account?
                                <button type='button' className='font-semibold text-b-btn ml-2' onClick={() => setIsLogin(prev => !prev)}>Sign in</button>
                            </span>
                        </>
                }
            </form>
        </div>
    )
}

