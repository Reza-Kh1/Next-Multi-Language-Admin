"use client";
import { getSingleBlog } from '@/action/admin';
import { BlogType } from '@/app/type';
import JoditForm from '@/components/Admin/JoditEditor/JoditEditor';
import UploadImage from '@/components/UploadImage/UploadImage';
import { Button } from '@heroui/button';
import { Input } from '@nextui-org/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { MdClose, MdOutlineDataSaverOn } from 'react-icons/md';
import toast from 'react-hot-toast';
import DeleteModal from '@/components/DeleteModal/DeleteModal';
import deleteCache from '@/action/deleteCache';
import pageCache from '@/data/cache';

export default function page() {
  const { slug } = useParams()
  const { data } = useQuery<{ data: BlogType }>({
    queryKey: ["SingleBlog", slug],
    queryFn: () => getSingleBlog(slug as string),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: slug === "create-blog" ? false : true,
    gcTime: 1000 * 60 * 60 * 24,
  });
  const [listEn, setListEn] = useState<string[]>([])
  const [listFa, setListFa] = useState<string[]>([])
  const [editor, setEditor] = useState<string>("")
  const [editorFa, setEditorFa] = useState<string>("")
  const [tags, setTags] = useState<string[]>([])
  const [textTag, setTextTag] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const queryClient = useQueryClient();
  const route = useRouter()
  const [dataBlogs, setDataBlogs] = useState({
    name: "",
    nameFa: "",
    category: "",
    time: "",
    fa_description: "",
    en_description: "",
    author: "",
    en_list: "",
    fa_list: ""
  })
  const createTags = () => {
    if (!textTag) return
    setTags([...tags, textTag])
    setTextTag("")
  }
  const deleteBlog = () => {
    axios.delete(`blogs/${data?.data.id}`).then(() => {
      queryClient.invalidateQueries({ queryKey: ["GetAllBlogs"] });
      route.replace("/admin/blogs")
      deleteCache({ tag: pageCache.blogs.tag })
    }).catch((err) => console.log(err))
  }
  const action = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const local = localStorage.getItem("shlabs")
    if (!local) return null
    const dataLocal = JSON.parse(local)
    const body = {
      picture: image || "",
      fa_title: dataBlogs.nameFa || "",
      en_title: dataBlogs.name || "",
      fa_content: editorFa,
      en_content: editor,
      categories: dataBlogs.category,
      read_time: dataBlogs.time,
      author_id: dataLocal?.id,
      en_description: dataBlogs.en_description,
      fa_description: dataBlogs.fa_description,
      tags: JSON.stringify(tags),
      fa_list_content: JSON.stringify(listFa),
      en_list_content: JSON.stringify(listEn)
    }    
    if (data?.data) {
      axios.patch(`blogs/${data?.data?.id}`, body).then(() => {
        toast.success("Blog is Updated")
        queryClient.invalidateQueries({ queryKey: ["SingleBlog", slug], });
        deleteCache({ tag: pageCache.blogs.tag })
        deleteCache({ tag: `${[pageCache.blogs.tag, data.data.id]}` })
      }).catch((err) => {
        console.log(err);
        toast.error("Error in DataBase")
      })
    } else {
      axios.post("blogs", body).then(() => {
        toast.success("Blog is Created")
        deleteCache({ tag: pageCache.blogs.tag })
      }).catch((err) => {
        console.log(err);
        toast.error("Error in DataBase")
      })
    }
  }
  const syncData = () => {
    setDataBlogs({
      name: data?.data.en_title || "",
      nameFa: data?.data.fa_title || "",
      category: data?.data.categories || "",
      time: data?.data.read_time || "",
      author: data?.data.author_id || "",
      en_description: data?.data.en_description || "",
      fa_description: data?.data.fa_description || "",
      en_list: "",
      fa_list: ""
    });
    if (data?.data.en_list_content) {
      setListEn(JSON.parse(data?.data.en_list_content))
    }
    if (data?.data.fa_list_content) {
      setListFa(JSON.parse(data?.data.fa_list_content))
    }
    setEditor(data?.data.en_content || "");
    setEditorFa(data?.data.fa_content || "");
    if (data?.data.tags) {
      setTags(JSON.parse(data?.data.tags as string));
    }
    setImage(data?.data.picture || "");
  }
  useEffect(() => {
    if (data?.data) {
      syncData()
    }
  }, [data])  
  return (
    <div className='flex flex-col p-3 rounded-xl bg-white shadow-md'>
      <form onSubmit={action} className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-10'>
        <Input
          label="Name(En)"
          type="text"
          value={dataBlogs.name}
          onChange={({ target }) => setDataBlogs({ ...dataBlogs, name: target.value })}
          labelPlacement='outside'
          isRequired
          placeholder='name(En)'
          variant="bordered"
        />
        <Input
          label="Name(Fa)"
          type="text"
          value={dataBlogs.nameFa}
          onChange={({ target }) => setDataBlogs({ ...dataBlogs, nameFa: target.value })}
          labelPlacement='outside'
          isRequired
          placeholder='name(Fa)'
          variant="bordered"
        />
        <Input
          label="Category"
          type="text"
          value={dataBlogs.category}
          onChange={({ target }) => setDataBlogs({ ...dataBlogs, category: target.value })}
          labelPlacement='outside'
          isRequired
          placeholder='Category'
          variant="bordered"
        />
        <Input
          label="Read Time"
          type="number"
          value={dataBlogs.time}
          onChange={({ target }) => setDataBlogs({ ...dataBlogs, time: target.value })}
          labelPlacement='outside'
          isRequired
          placeholder='in minutes'
          variant="bordered"
        />
        <Input
          label="Description (fa)"
          value={dataBlogs.fa_description}
          onChange={({ target }) => setDataBlogs({ ...dataBlogs, fa_description: target.value })}
          labelPlacement='outside'
          isRequired
          placeholder='Description (fa)'
          variant="bordered"
        />
        <Input
          label="Description (en)"
          value={dataBlogs.en_description}
          onChange={({ target }) => setDataBlogs({ ...dataBlogs, en_description: target.value })}
          labelPlacement='outside'
          isRequired
          placeholder='Description (en)'
          variant="bordered"
        />
        <div className='md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 justify-evenly items-center'>
          <Input
            label="Tags"
            labelPlacement='outside'
            placeholder='Tags'
            variant="bordered"
            value={textTag}
            onChange={({ target }) => setTextTag(target.value)}
            endContent={
              <i className='cursor-pointer' onClick={createTags}>
                <FaPlus />
              </i>
            }
          />
          <div className='flex flex-wrap gap-2'>
            {tags.length ? tags?.map((row, index) => (
              <span className='flex items-center gap-1 p-1 px-5 rounded-full border border-d-60' key={index}>
                <span>{row}</span>
                <i className='cursor-pointer' onClick={() => setTags(tags.filter((item) => item !== row))}>
                  <MdClose />
                </i>
              </span>
            )) : null}
          </div>
        </div>
        <div className='flex md:col-span-2 items-start gap-5'>
          <div className='w-1/2 gap-5 flex flex-col'>
            <Input
              label="List Title (En)"
              labelPlacement='outside'
              placeholder='List Title'
              variant="bordered"
              value={dataBlogs.en_list}
              onChange={({ target }) => setDataBlogs({ ...dataBlogs, en_list: target.value })}
              endContent={
                <i className='cursor-pointer' onClick={() => {
                  if (!dataBlogs.en_list) return
                  setListEn([...listEn, dataBlogs.en_list])
                  setDataBlogs({ ...dataBlogs, en_list: "" })
                }}>
                  <FaPlus />
                </i>
              }
            />
            <div className='flex flex-col gap-2'>
              {listEn.length ? listEn?.map((row, index) => (
                <span className='flex justify-between items-center gap-1 p-2 shdaow-md rounded-md border border-d-60' key={index}>
                  <div>
                    <span>{index + 1}_</span>
                    <span>{row}</span>
                  </div>
                  <i className='cursor-pointer' onClick={() => setListEn(listEn.filter((item) => item !== row))}>
                    <MdClose />
                  </i>
                </span>
              )) : null}
            </div>
          </div>
          <div className='w-1/2 gap-5 flex flex-col'>
            <Input
              label="List Title (Fa)"
              labelPlacement='outside'
              placeholder='List Title'
              variant="bordered"
              value={dataBlogs.fa_list}
              onChange={({ target }) => setDataBlogs({ ...dataBlogs, fa_list: target.value })}
              endContent={
                <i className='cursor-pointer' onClick={() => {
                  if (!dataBlogs.fa_list) return
                  setListFa([...listFa, dataBlogs.fa_list])
                  setDataBlogs({ ...dataBlogs, fa_list: "" })
                }}>
                  <FaPlus />
                </i>
              }
            />
            <div className='flex flex-col gap-2'>
              {listFa.length ? listFa?.map((row, index) => (
                <span className='flex justify-between items-center gap-1 p-2 shdaow-md rounded-md border border-d-60' key={index}>
                  <div>
                    <span>{index + 1}_</span>
                    <span>{row}</span>
                  </div>
                  <i className='cursor-pointer' onClick={() => setListFa(listFa.filter((item) => item !== row))}>
                    <MdClose />
                  </i>
                </span>
              )) : null}
            </div>
          </div>
        </div>

        <div>
          <UploadImage imageUrl={image} setImageUrl={setImage} />
        </div>
        <div className='md:col-span-2 flex flex-col gap-2'>
          <h1 className='block w-full border-t pt-8 mt-8 border-d-50'>English Contact</h1>
          <JoditForm editor={editor} setEditor={setEditor} />
          <h1 className='block w-full border-t pt-8 mt-8 border-d-50'>Persian Contact</h1>
          <JoditForm editor={editorFa} setEditor={setEditorFa} />
          <div className='flex justify-between'>
            <Button type='submit' className='bg-white rounded-md shadow-md text-b-70 border border-b-70'>
              Save Blog
              <MdOutlineDataSaverOn />
            </Button>
            {data?.data?.id ?
              <DeleteModal id={data.data?.id} onSubmit={deleteBlog} />
              : null}
          </div>
        </div>
      </form>
    </div>
  )
}
