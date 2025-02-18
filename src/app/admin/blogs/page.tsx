"use client"
import { getBlogs } from '@/action/admin';
import { BlogType, OptionsGetAllLinks, OptionsGetAllMeta } from '@/app/type';
import PaginationAdmin from '@/components/Admin/PaginationAdmin/PaginationAdmin';
import SearchAdmin from '@/components/Admin/SearchAdmin/SearchAdmin';
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { FaCalendar } from 'react-icons/fa6';
import { IoCreateOutline } from 'react-icons/io5';
import { MdOutlineAccessTime } from 'react-icons/md';

export default function page() {
  const [searchQuery, setSearchQuery] = useState<any>();
  const { data } = useInfiniteQuery<{
    data: BlogType[],
    links: OptionsGetAllLinks,
    meta: OptionsGetAllMeta
  }>({
    queryKey: ["GetAllBlogs", searchQuery],
    queryFn: () => getBlogs(searchQuery),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    getNextPageParam: (lastPage) => lastPage.links.next || undefined,
    initialPageParam: "",
  });
  console.log(data?.pages[0]);

  return (
    <div className='flex flex-col gap-5'>
      <SearchAdmin name={["en_title", "categories"]} setSearch={setSearchQuery} />
      <div className='flex justify-between items-center p-3 rounded-xl bg-white shadow-md'>
        <span>Create Blogs</span>
        <Link href={"/admin/blogs/create-blog"} className='flex items-center gap-2'>
          New Blogs
          <i className='border mx-2 border-d-60 p-3 rounded-full text-w-100 bg-gradient-to-b to-d-100 from-gray-700/90'>
            <IoCreateOutline />
          </i>
        </Link>
      </div>
      {data?.pages[0]?.data?.length ?
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-3 rounded-xl bg-white shadow-md'>
            {data?.pages[0]?.data?.map((row, index: number) => (
              <section key={index} className='flex p-3 justify-between flex-col gap-6'>
                <div className='p-4 rounded-xl border border-d-60' style={{ backgroundImage: "url(/dot-top.png)" }}>
                  <ImageCustom className='w-full h-[250px]' alt={"work"} src={row.picture} height={250} width={250} />
                </div>
                <div className='flex flex-col md:flex-row items-start gap-4 md:gap-0 md:items-center justify-between'>
                  <div className='flex gap-2 items-center'>
                    <Image src={"/profile-auth.jpg"} alt='profile' className='rounded-full' width={40} height={40} />
                    <span>{row.author?.username}</span>
                  </div>
                  <div className='flex gap-2 text-w-50'>
                    <span className='py-2 px-3 border rounded-full flex items-center gap-1 text-xs border-d-60'><MdOutlineAccessTime />{row?.read_time} min read</span>
                    <span className='py-2 px-3 border rounded-full flex items-center gap-1 text-xs border-d-60'><FaCalendar />{new Date(row.updated_at).toLocaleDateString("en")}</span>
                  </div>
                </div>
                <div>
                  <h3 className='text-lg'>{row.en_title}</h3>
                  <p className='text-w-50 mt-2'>{row.en_description}</p>
                </div>
                <div className='flex justify-center'>
                  <Link className='text-w-100 bg-d-60 text-xs md:text-base px-5 py-2 rounded-full border border-d-50' href={`/admin/blogs/${row.id}`}>
                    Read More
                  </Link>
                </div>
              </section>
            ))}
          </div>
          <PaginationAdmin search={searchQuery} setSearch={setSearchQuery} meta={data?.pages[0].meta} />
        </> : "No data available"}
    </div>
  )
}
