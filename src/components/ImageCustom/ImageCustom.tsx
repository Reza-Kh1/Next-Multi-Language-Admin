"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import LoadingImg from "../LoadingImg/LoadingImg";
import ImageError from "@/../public/errorImage.webp";
type ImageType = {
    src: any;
    alt: string | null;
    className?: string;
    width?: number;
    height?: number;
    classPlus?: string;
    figureClass?: string;
    onClick?: (value: any) => void
    icon?: boolean
};
export default function ImageCustom({
    width,
    height,
    src,
    alt,
    className,
    classPlus,
    figureClass,
    onClick,
    icon
}: ImageType) {
    const [load, setLoad] = useState<boolean>(true);
    const [error, setError] = useState<StaticImageData | null>(null)
    const classImage = className ? className : classPlus ? `${classPlus} rounded-md shadow-md  table mx-auto` : ""
    const iconClass = `bg-icon w-14 p-3 rounded-md ${classPlus}`
    return (
        <figure className={figureClass || "w-full relative"}>
            <Image
                width={width}
                height={height}
                loading="lazy"
                onClick={onClick}
                // placeholder="blur"
                // blurDataURL="data:image/gif;base64,..."
                onLoad={() => setLoad(false)}
                src={error ? error : src || ImageError}
                alt={alt || "error"}
                className={icon ? iconClass : classImage}
                onError={() => setError(ImageError)}
            />
            {load && <LoadingImg />}
        </figure>
    );
}
