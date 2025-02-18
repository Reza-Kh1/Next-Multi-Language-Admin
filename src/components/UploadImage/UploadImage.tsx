"use client"
import { Progress } from '@nextui-org/react'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { GiCloudUpload } from 'react-icons/gi'
import Cookies from 'js-cookie'
import { FaImage, FaTrash } from 'react-icons/fa6'
type UploadImageType = {
    imageUrl: string
    setImageUrl: (value: string) => void
    height?: number
    width?: number

}
export default function UploadImage({ imageUrl, setImageUrl, height, width }: UploadImageType) {
    const [loading, setLoading] = useState<boolean>(false)
    const [progres, setProgres] = useState<number>(0)
    const uploadFilel = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        const token = Cookies.get('authToken')
        const newFile = event.target.files;
        if (!newFile?.length) return Promise.reject(new Error("select a file"));
        const formData = new FormData();
        for (let file of newFile) {
            formData.append("file", file);
        }
        const { data } = await axios.post("upload-file", formData, {
            onUploadProgress: (event) => {
                if (event.lengthComputable && event.total) {
                    const percentComplete = Math.round((event.loaded * 100) / event.total);
                    setProgres(percentComplete)
                }
            },
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const url = data?.path ? process.env.NEXT_PUBLIC_URL_FILE + data.path : ""
        // const url = "https://shlabs.ir/storage/app/apiFiles/Tb4g8MoFK8ptf9YoyzpSiHkUgti6FXgHxQlLlVDl.jpg"
        setLoading(false)
        setImageUrl(url)
    }
    const style = { height: height ? height + "px" : "224px", width: width ? width + "px" : "300px" }
    return (
        <div onClick={(event) => { event.stopPropagation() }}>
            <span onClick={(event) => { event.stopPropagation() }}>Upload Image</span>
            {
                imageUrl ?
                    <div onClick={(event) => { event.stopPropagation() }} className='flex gap-3 items-center relative'>
                        <Image
                            src={imageUrl}
                            alt='image'
                            className={"rounded-xl shadow-md"}
                            style={style}
                            width={width || 300}
                            height={height || 224}
                        />
                        <i
                            onClick={(event) => {
                                event.stopPropagation();
                                setImageUrl("");
                            }}
                            className='absolute left-1 top-1 bg-black/30 cursor-pointer hover:bg-black text-white p-3 rounded-full'
                        >
                            <FaTrash />
                        </i>
                    </div>
                    :
                    <label
                        onClick={(event) => { event.stopPropagation() }}
                        htmlFor="uploadImage"
                        className={`transition-all group p-3 shadow-md border-black flex items-center justify-center rounded-md border-dashed border ${!loading ? "cursor-pointer" : ""}`}
                        style={style}
                    >
                        <input
                            onClick={(event) => { event.stopPropagation() }}
                            onChange={(event) => uploadFilel(event)}
                            type="file"
                            hidden
                            id='uploadImage'
                            disabled={loading}
                        />
                        {loading ?
                            <Progress
                                classNames={{
                                    base: "max-w-md",
                                    track: "drop-shadow-md border border-default",
                                    indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                                    label: "tracking-wider font-medium text-default-600",
                                    value: "text-foreground/60",
                                }}
                                label="Upload File"
                                radius="sm"
                                showValueLabel={true}
                                size="sm"
                                value={progres}
                            />
                            :
                            <i className='text-3xl text-b-70 '><FaImage /></i>
                        }
                    </label>
            }
        </div>
    )
}

