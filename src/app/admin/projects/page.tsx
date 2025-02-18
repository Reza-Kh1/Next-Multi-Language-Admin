"use client"
import { getProjects } from '@/action/admin';
import { OptionsGetAllLinks, OptionsGetAllMeta, ProjectType } from '@/app/type';
import PaginationAdmin from '@/components/Admin/PaginationAdmin/PaginationAdmin';
import SearchAdmin from '@/components/Admin/SearchAdmin/SearchAdmin';
import ImageCustom from '@/components/ImageCustom/ImageCustom';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6';
import { IoCreateOutline } from 'react-icons/io5';

export default function page() {
    const [searchQuery, setSearchQuery] = useState<any>();
    const { data } = useInfiniteQuery<{
        data: ProjectType[],
        links: OptionsGetAllLinks,
        meta: OptionsGetAllMeta
    }>({
        queryKey: ["getProjects", searchQuery],
        queryFn: () => getProjects(searchQuery),
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
        getNextPageParam: (lastPage) => lastPage.links.next || undefined,
        initialPageParam: "",
    });
    console.log(data?.pages[0]);
    return (
        <div className='flex flex-col gap-5'>
            <SearchAdmin name={["categories", "en_title"]} setSearch={setSearchQuery} />
            <div className='flex justify-between items-center p-3 rounded-xl bg-white shadow-md'>
                <span>Create Projects</span>
                <Link href={"/admin/projects/create-project"} className='flex items-center gap-2'>
                    New Project
                    <i className='border mx-2 border-d-60 p-3 rounded-full text-w-100 bg-gradient-to-b to-d-100 from-gray-700/90'>
                        <IoCreateOutline />
                    </i>
                </Link>
            </div>
            {data?.pages[0]?.data?.length ?
                <>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-3 rounded-xl bg-white shadow-md'>
                        {data?.pages[0]?.data?.map((row, index: number) => (
                            <section key={index} className='w-full shadow-md flex flex-col gap-2 md:gap-4 mx-auto p-2 md:p-4 border border-w-90 rounded-xl'>
                                <ImageCustom src={row.picture} alt={"project"} width={1000} height={600} />
                                <div className='flex justify-between flex-col gap-3 md:flex-row md:gap-0'>
                                    <h3 className='order-2 md:order-1 font-semibold text-xl'>{row.en_title}</h3>
                                    <div className='order-1 md:order-2 text-center flex justify-start items-center gap-2'>
                                        <span className='text-w-50'>
                                            Show More
                                        </span>
                                        <Link href={`/admin/projects/${row.id}`} className='border mx-2 border-d-60 p-3 rounded-full text-w-100 bg-gradient-to-b to-d-100 from-gray-700/90'>
                                            <FaChevronDown />
                                        </Link>
                                    </div>
                                </div>
                                <div className='flex-col md:flex-row flex gap-3 items-start  md:items-center'>
                                    <div className='p-1 border rounded-full px-2 border-w-90 flex items-center gap-2'>
                                        <span className='text-sm'>
                                            {row.categories}
                                        </span>
                                    </div>
                                </div>
                                <div className='p-1 md:p-2 rounded-xl'>
                                    <span className=' block'>Project Description</span>
                                    <p className='text-w-50'>
                                        {row.en_description}
                                    </p>
                                </div>
                            </section>
                        ))}
                    </div>
                    <PaginationAdmin search={searchQuery} setSearch={setSearchQuery} meta={data?.pages[0].meta} />
                </> : "No data available"}
        </div>
    )
}
