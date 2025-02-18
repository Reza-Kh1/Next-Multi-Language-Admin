"use client"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PiArrowsCounterClockwiseLight } from "react-icons/pi";
import axios from 'axios';
import React, { useState } from 'react'
import { BiSupport } from "react-icons/bi";
import toast from 'react-hot-toast';
import { Pagination } from '@nextui-org/react';
import { Button } from '@heroui/button';
import { FaAngleDown, FaAngleUp, FaDollarSign } from 'react-icons/fa6';
import ImageCustom from '@/components/ImageCustom/ImageCustom';
import FormProduct from './FormProduct';
import Link from 'next/link';
import { getProducts } from '@/action/admin';
import { OptionsGetAllLinks, OptionsGetAllMeta, ProducrtType } from '@/app/type';
import PaginationAdmin from '@/components/Admin/PaginationAdmin/PaginationAdmin';
import SearchAdmin from '@/components/Admin/SearchAdmin/SearchAdmin';
import deleteCache from '@/action/deleteCache';
import pageCache from '@/data/cache';
export default function page() {
  const [create, setCreate] = useState<boolean>(false)
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState<any>();
  const { data } = useInfiniteQuery<{
    data: ProducrtType[],
    links: OptionsGetAllLinks,
    meta: OptionsGetAllMeta
  }>({
    queryKey: ["getProducts", searchQuery],
    queryFn: () => getProducts(searchQuery),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    getNextPageParam: (lastPage) => lastPage.links.next || undefined,
    initialPageParam: "",
  });
  const { mutate } = useMutation({
    mutationFn: (body: any) => {
      return axios.post("products", body);
    },
    onSuccess: () => {
      toast.success("Product was Created");
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
      deleteCache({ tag: pageCache.products.tag })
    },
    onError: ({ response }: any) => {
      console.log(response);
      toast.error(response?.data?.message);
    },
  });
  return (
    <div className='flex flex-col gap-5'>
      <SearchAdmin name={["en_name", "en_description"]} setSearch={setSearchQuery} />
      <div className='flex flex-col gap-5 p-3 rounded-xl bg-white shadow-md'>
        <div className='flex justify-between items-center'>
          <span>Create Product</span>
          <Button onPress={() => setCreate(prev => !prev)} variant='bordered' className='bg-d-btn rounded-md shadow-md text-white'>
            {create ?
              <>
                Show Less
                <FaAngleDown />
              </>
              :
              <>
                Show More
                <FaAngleUp />
              </>
            }
          </Button>
        </div>
        {create && (
          <FormProduct submitHandler={(value) => mutate(value)} />
        )}
      </div>
      {data?.pages[0]?.data?.length ?
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-3 rounded-xl bg-white shadow-md'>
            {data?.pages[0]?.data?.map((row: ProducrtType, index: number) => (
              <Link key={index} href={`/admin/products/${row.id}`} className='border rounded-xl shadow-md p-4 flex flex-col gap-2 cursor-pointer'>
                <ImageCustom src={row.picture} alt={"image"} className='w-full' height={180} width={200} />
                <div className='flex justify-between items-center'>
                  <span className='text-xl font-semibold text-b-70'>
                    {row.en_name}
                  </span>
                  <span className='text-sm text-gray-700'>
                    {new Date(row.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='flex items-center gap-2'><FaDollarSign /> Price :{Number(row?.price).toLocaleString()} T</span>
                  <span className='flex items-center gap-2'><PiArrowsCounterClockwiseLight /> Download :{row.download_count}</span>
                  <span className='flex items-center gap-2'><BiSupport /> Support duration :{row.support_time}</span>
                </div>
                <p className='cutline cutline-3'>{row.en_description}</p>
              </Link>
            ))}
          </div>
          <PaginationAdmin search={searchQuery} setSearch={setSearchQuery} meta={data?.pages[0].meta} />
        </> :
        "No data available."}
    </div>
  )
}
