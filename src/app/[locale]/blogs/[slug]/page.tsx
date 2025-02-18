import { fetchApi } from '@/action/fetchApi';
import { Link } from '@/i18n/routing';
import Image from 'next/image'
import React from 'react'
import { FaCalendar } from 'react-icons/fa6';
import { GoDotFill } from "react-icons/go";
import pageCache from '@/data/cache';
import { MdArrowOutward, MdOutlineAccessTime } from 'react-icons/md';
import { BlogType } from '@/app/type';
import { Metadata } from 'next';
import parse from "html-react-parser";
import { notFound } from 'next/navigation';
import Script from 'next/script';
import ImageCustom from '@/components/ImageCustom/ImageCustom';
const getData = async (slug: string) => {
    const { data }: { data: BlogType } = await fetchApi({ url: `blogs/${slug}`, next: pageCache.singleBlog.cache, tags: [pageCache.singleBlog.tag, slug] })
    if (!data) return notFound()
    const { data: dataCategory }: { data: BlogType[] } = await fetchApi({ url: `blogs?categories%5Blike%5D=%25${data.categories}%25`, next: pageCache.singleBlog.cache, tags: [pageCache.singleBlog.tag, slug] })
    return { data: data, dataCategory }
}
export async function generateMetadata({ params }: any): Promise<Metadata> {
    const { data }: { data: BlogType } = await getData(params.slug);
    if (!data) return notFound()
    const local = await params.locale === "fa" ? true : false
    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
        title: `${local ? data.fa_title : data.en_title} | shlabs`,
        description: local ? data.fa_description : data.en_description,
        keywords: JSON.parse(data.tags),
        robots: "index, follow",
        openGraph: {
            type: "website",
            url: `${local ? "fa" : "en"}/blog/${data.id}`,
            title: `پست‌های ${data.fa_title} | shlabs`,
            description: ``,
            images: [
                {
                    url: data.picture,
                    width: 1200,
                    height: 630,
                    alt: data.en_title,
                },
            ],
            locale: local ? "fa_IR" : "en_EN",
            siteName: "shlabs",
        },
        twitter: {
            card: 'summary_large_image',
            creator: "@buildMasters",
            site: "@buildMasters"
        },
        alternates: {
            canonical: `${local ? "fa" : "en"} /blog/${data.id} `,
        },
    };
}
export default async function page({ params }: any) {
    const { slug, locale } = await params
    const { data, dataCategory } = await getData(slug)
    const jsonld = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: locale === "fa" ? data?.fa_title : data?.en_title || "عنوان مقاله",
        image: data?.picture || "آدرس تصویر",
        description: locale === "fa" ? data?.fa_description : data?.en_description || "توضیحات مقاله",
        author: {
            "@type": "Person",
            name: data?.author?.username || "نام نویسنده",
        },
        datePublished: data?.updated_at || "تاریخ انتشار",
        articleBody: locale === "fa" ? data?.fa_content : data?.en_content || "متن مقاله",
        keywords: JSON.parse(data.tags) || "کلمات کلیدی",
        articleSection: data.categories,
        url:
            `${process.env.NEXTAUTH_URL}/blog/${data.id}` ||
            "آدرس مقاله",
    };
    console.log(data);

    return (
        <>
            <Script
                type="application/ld+json"
                id="jsonld-product"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
            />
            <figure className='relative after:absolute after:w-full after:left-0 after:bottom-0 after:h-24 after:bg-gradient-to-t after:to-transparent after:from-black'>
                <Image alt={data.en_title} src={data.picture} className='w-full h-[400px] md:h-[600px]' width={1200} height={600} />
                <h1 className='text-xl md:text-3xl w-full text-center text-white font-semibold bottom-12 md:bottom-16 absolute left-1/2 transform -translate-x-1/2'>{locale === "fa" ? data.fa_title : data.en_title}</h1>
            </figure>
            <main className="main-class">
                <div className='flex flex-col md:flex-row gap-2 md:gap-0 mt-2'>
                    <div className='w-full md:w-8/12 order-2 md:order-1 border rounded-xl md:rounded-none border-d-60'>
                        <div className='flex flex-col gap-5 p-12 border-b border-d-60'>
                            <h2 className='text-lg text-white'>{locale === "fa" ? "مقدمه" : "Introduction"} </h2>
                            <p className='text-lg text-w-80'>Artificial Intelligence (AI) has emerged as a transformative force in the healthcare industry, reshaping patient care, diagnostics, and research. In this blog post, we explore the profound impact of AI in healthcare, from revolutionizing diagnostic accuracy to enhancing patient outcomes.</p>
                        </div>
                        <div className='p-12 text-blog'>
                            {locale === "fa" ? parse(data.fa_content) : parse(data.en_content)}
                        </div>
                    </div>
                    <div className='w-full md:w-4/12 order-1 md:order-2 p-4 md:p-12 border  rounded-xl md:rounded-none border-d-60'>
                        <div className='grid grid-cols-2 gap-3 md:gap-5'>
                            <section className='flex flex-col gap-2'>
                                <span className='text-w-80 text-sm'>{locale === "fa" ? "تاریخ انتشار" : "Publication Date"}</span>
                                <span className='text-white'>{new Date(data.updated_at).toLocaleDateString(locale === "fa" ? "fa" : "en")}</span>
                            </section>
                            <section className='flex flex-col gap-2'>
                                <span className='text-w-80 text-sm'>{locale === "fa" ? "دسته بندی" : "Category"}</span>
                                <span className='text-white'>{data.categories}</span>
                            </section>
                            <section className='flex flex-col gap-2'>
                                <span className='text-w-80 text-sm'>{locale === "fa" ? "زمان مطالعه" : "Reading Time"}</span>
                                <span className='text-white'>{data.read_time} Min</span>
                            </section>
                            <section className='flex flex-col gap-2'>
                                <span className='text-w-80 text-sm'>{locale === "fa" ? "نام نویسنده" : "Author Name"}</span>
                                <span className='text-white'>{data.author?.username}</span>
                            </section>
                        </div>
                        <div className='flex flex-col gap-2 mt- md:mt-10'>
                            <span className='text-w-80 text-sm'>{locale === "fa" ? "فهرست مطالب" : "Table of Contents"}</span>
                            <div className='flex p-6 bg-d-80 flex-col gap-2 rounded-xl'>
                                {locale === "fa" ?
                                    data.fa_list_content ? JSON.parse(data.fa_list_content).map((row: string, index: number) => (
                                        <div key={index} className='flex items-start gap-1'>
                                            <i><GoDotFill className='text-w-100' /></i>
                                            <span className='text-w-100'>{row}</span>
                                        </div>))
                                        : null
                                    :
                                    data.en_list_content ? JSON.parse(data.en_list_content).map((row: string, index: number) => (
                                        <div key={index} className='flex items-start gap-1'>
                                            <i><GoDotFill className='text-w-100' /></i>
                                            <span className='text-w-100'>{row}</span>
                                        </div>))
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {dataCategory.length ?
                    <div className='my-12 md:my-16'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-w-80 md:text-2xl'>{locale === "fa" ? "مطالب مشابه" : "Similar News"}</h2>
                            <Link href={"/blogs"} className='p-3 px-4 rounded-full border border-d-60 flex items-center gap-2'>
                                <span className='text-w-80 text-xs  md:text-sm'>
                                    {locale === "fa" ? "نمایش تمام مطالب" : "View All News"}
                                </span>
                                <i>
                                    <MdArrowOutward className={`${locale === "fa" ? "-rotate-90" : ""} text-w-80 text-sm md:text-xl`} />
                                </i >
                            </Link >
                        </div >
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-4 md:mt-12'>
                            {dataCategory.map((row, index) => {
                                if (Number(index) > 2 || row.id === data.id) return
                                return <section key={index} className='flex justify-between flex-col gap-6'>
                                    <div className='p-4 rounded-xl border border-d-60' style={{ backgroundImage: "url(/dot-top.png)" }}>
                                        <ImageCustom className='w-full' alt={row.en_title} src={row.picture} height={350} width={500} />
                                    </div>
                                    <div className='flex flex-col md:flex-row items-start gap-4 md:gap-0 md:items-center justify-between'>
                                        <div className='flex gap-2 items-center'>
                                            <Image src={"/profile-auth.jpg"} alt='profile' className='rounded-full' width={40} height={40} />
                                            <span className='text-w-100'>{row?.author?.username}</span>
                                        </div>
                                        <div className='flex gap-2 text-w-80'>
                                            <span className='py-2 px-3 border rounded-full flex items-center gap-1 text-xs border-d-60'><MdOutlineAccessTime /> {row.read_time} {locale === "fa" ? "دقیقه مطالعه" : "min read"}</span>
                                            <span className='py-2 px-3 border rounded-full flex items-center gap-1 text-xs border-d-60'><FaCalendar />{new Date(row.updated_at).toLocaleDateString(locale === "fa" ? "fa" : "en")}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className='text-w-100 text-lg'>{locale === "fa" ? row.fa_title : row.en_title}</h3>
                                        <p className='text-w-50 mt-2'>{locale === "fa" ? row.fa_content : row.en_content}</p>
                                    </div>
                                    <div className='flex justify-center'>
                                        <Link className='text-w-100 bg-d-60 text-xs md:text-base px-5 py-2 rounded-full border border-d-50' href={`/blogs/${row.id}`}>
                                            {locale === "fa" ? "مطالعه بیشتر" : "Read More"}
                                        </Link>
                                    </div>
                                </section>
                            })}
                        </div>
                    </div >
                    : null}
            </main >
        </>
    )
}   