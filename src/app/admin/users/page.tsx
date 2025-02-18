"use client"
import { Button } from '@heroui/button'
import { Modal, ModalBody, ModalContent, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaAngleDown, FaAngleUp, FaPen } from 'react-icons/fa6'
import FormUsers from './FormUsers'
import { OptionsGetAllLinks, OptionsGetAllMeta, UserType } from '@/app/type'
import DeleteModal from '@/components/DeleteModal/DeleteModal'
import { getAllUsers } from '@/action/admin'
import PaginationAdmin from '@/components/Admin/PaginationAdmin/PaginationAdmin'
export default function page() {
  const [create, setCreate] = useState<boolean>(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [editData, setEditData] = useState<UserType>()
  const [searchQuery, setSearchQuery] = useState<any>();
  const query = useQueryClient();
  const { data } = useInfiniteQuery<{
    data: UserType[],
    links: OptionsGetAllLinks,
    meta: OptionsGetAllMeta
  }>({
    queryKey: ["GetAllUsers", searchQuery],
    queryFn: () => getAllUsers(searchQuery),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    getNextPageParam: (lastPage) => lastPage.links.next || undefined,
    initialPageParam: "",
  });
  const { mutate: updateUser } = useMutation({
    mutationFn: (value: any) => {
      const body = {
        ...value,
        user_id: editData?.id
      }
      return axios.post("updateAnotherUser", body);
    },
    onSuccess: () => {
      toast.success("User was Updated")
      query.invalidateQueries({ queryKey: ['GetAllUsers'] });
      onClose()
    },
    onError: ({ response }: any) => {
      toast.error(response?.data?.message);
    },
  });
  const { mutate: createUser } = useMutation({
    mutationFn: (body) => {
      return axios.post("login", body);
    },
    onSuccess: ({ data }) => {
      query.invalidateQueries({ queryKey: ['GetAllUsers'] });
      toast.success("User was created")
    },
    onError: ({ response }: any) => {
      console.log(response);
      
      toast.error(response?.data?.message);
    },
  });
  const { mutate: deleteUser } = useMutation({
    mutationFn: (id: number) => {
      return axios.post(`deleteUserWithId`, {
        user_id: id
      });
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ['GetAllUsers'] });
      toast.success("User was Deleted")
    },
    onError: ({ response }: any) => {
      toast.error(response?.data?.message);
    },
  });
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-5 p-3 rounded-xl bg-white shadow-md'>
        <div className='flex justify-between items-center'>
          <span>Create User</span>
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
          <FormUsers onSubmit={(value) => createUser(value)} />
        )}
      </div>
      {data?.pages[0]?.data?.length ?
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>Created At</TableColumn>
            <TableColumn>EDit</TableColumn>
          </TableHeader>
          <TableBody>
            {data?.pages[0].data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{Number(index) + 1}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.user_type}</TableCell>
                <TableCell>{new Date(item.created_at).toLocaleDateString("en")}</TableCell>
                <TableCell>
                  <Button onPress={() => { setEditData(item), onOpen() }} variant='bordered' className='bg-d-btn rounded-md text-white'>
                    <FaPen />
                    Edit
                  </Button>
                  <DeleteModal id={item.id} onSubmit={(id) => deleteUser(id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        : null}
      <PaginationAdmin meta={data?.pages[0].meta} search={searchQuery} setSearch={setSearchQuery} />
      <Modal size='lg' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Modal Update</ModalHeader>
          <ModalBody>
            {editData &&
              <FormUsers isUpdate data={editData} onSubmit={(value) => updateUser(value)} />
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </div >
  )
}
