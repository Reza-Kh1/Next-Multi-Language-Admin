"use client"
import { getAllTransaction } from '@/action/admin';
import { OptionsGetAllLinks, OptionsGetAllMeta, TransactionType } from '@/app/type';
import PaginationAdmin from '@/components/Admin/PaginationAdmin/PaginationAdmin';
import SearchAdmin from '@/components/Admin/SearchAdmin/SearchAdmin';
import DeleteModal from '@/components/DeleteModal/DeleteModal';
import { Button } from '@heroui/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoEye } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
export default function page() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState<any>();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [dataDetail, setDataDetail] = useState<TransactionType>()
  const { data } = useInfiniteQuery<{
    data: TransactionType[],
    links: OptionsGetAllLinks,
    meta: OptionsGetAllMeta
  }>({
    queryKey: ["GetAllBlogs", searchQuery],
    queryFn: () => getAllTransaction(searchQuery),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    getNextPageParam: (lastPage) => lastPage.links.next || undefined,
    initialPageParam: "",
  });
  const { mutate: deleteTransaction } = useMutation({
    mutationFn: (id: number) => {
      return axios.delete(`transactions/${id}`);
    },
    onSuccess: () => {
      toast.success("transaction was Deleted");
      queryClient.invalidateQueries({ queryKey: ["GetAllBlogs"] });
    },
    onError: ({ response }: any) => {
      console.log(response);
      toast.error(response?.data?.message);
    },
  });
  return (
    <div className='flex flex-col gap-5'>
      <SearchAdmin name={["status", "ref_code"]} setSearch={setSearchQuery} />
      {data?.pages[0]?.data?.length ? <>
        <Table aria-label="Transaction">
          <TableHeader >
            <TableColumn>Id</TableColumn>
            <TableColumn>Product</TableColumn>
            <TableColumn>Phone Number</TableColumn>
            {/* <TableColumn>Detail Transaction</TableColumn> */}
            <TableColumn>Status</TableColumn>
            <TableColumn>Ref Code</TableColumn>
            <TableColumn>Created</TableColumn>
            <TableColumn>Edit</TableColumn>
          </TableHeader>
          <TableBody>
            {data?.pages[0].data.map(((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <Link className='hover:underline' href={`/admin/products/${row.product?.id}`}>
                    {row.product.en_name}
                  </Link>
                </TableCell>
                <TableCell>
                  {row.phone}
                </TableCell>
                {/* <TableCell>
                  <Button onPress={() => {
                    onOpen(), setDataDetail(row)
                  }} className='p-3 rounded-md' variant='bordered'>
                    <span>Show</span>
                    <IoEye />
                  </Button>
                </TableCell> */}
                <TableCell>
                  <span className={`p-3 shadow-md rounded-md ${row.status === "pending" ? "bg-blue-200" : "bg-green-200"}`}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>{row.ref_code}</TableCell>
                <TableCell>{new Date().toLocaleDateString("en")}</TableCell>
                <TableCell className='flex gap-3 items-center'>
                  <DeleteModal id={row.id} onSubmit={(id) => deleteTransaction(id)} />
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
        <PaginationAdmin search={searchQuery} setSearch={setSearchQuery} meta={data.pages[0].meta} />
      </> :
        "No data available."
      }
      <Modal size='3xl' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Detail Transaction</ModalHeader>
          <ModalBody>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
              <div className='text-center rounded-md shadow-md flex flex-col gap-2 pb-3'>
                <span className='bg-slate-100 rounded-t-md block w-full p-3 text-sm'>Phone Number</span>
                <span>092313123</span>
              </div>
              <div className='text-center rounded-md shadow-md flex flex-col gap-2 pb-3'>
                <span className='bg-slate-100 rounded-t-md block w-full p-3 text-sm'>Status</span>
                <span>pending</span>
              </div>
              <div className='text-center rounded-md shadow-md flex flex-col gap-2 pb-3'>
                <span className='bg-slate-100 rounded-t-md block w-full p-3 text-sm'>Price</span>
                <span>240000 T</span>
              </div>
              <div className='text-center rounded-md shadow-md flex flex-col gap-2 pb-3'>
                <span className='bg-slate-100 rounded-t-md block w-full p-3 text-sm'>Product Name</span>
                <span>name fa</span>
              </div>
              <div className='text-center rounded-md shadow-md flex flex-col gap-2 pb-3'>
                <span className='bg-slate-100 rounded-t-md block w-full p-3 text-sm'>Price</span>
                <span>240000 T</span>
              </div>
              <div className='text-center rounded-md shadow-md flex flex-col gap-2 pb-3'>
                <span className='bg-slate-100 rounded-t-md block w-full p-3 text-sm'>Price</span>
                <span>240000 T</span>
              </div>
              <div className='text-center rounded-md shadow-md flex flex-col gap-2 pb-3'>
                <span className='bg-slate-100 rounded-t-md block w-full p-3 text-sm'>Price</span>
                <span>240000 T</span>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>
              Close
              <MdClose />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
