"use client";
import { DateInput, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, useDisclosure } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@heroui/button";
import { MdClose, MdOutlineDataSaverOn } from "react-icons/md";
import UploadImage from "@/components/UploadImage/UploadImage";
import { useParams, useRouter } from "next/navigation";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, getSingleProject } from "@/action/admin";
import { OptionsGetAllLinks, OptionsGetAllMeta, ProjectType, UserType } from "@/app/type";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import PaginationAdmin from "@/components/Admin/PaginationAdmin/PaginationAdmin";
import pageCache from "@/data/cache";
import deleteCache from "@/action/deleteCache";
import { parseDate } from "@internationalized/date";
export default function Page() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const route = useRouter()
    const [searchQuery, setSearchQuery] = useState<any>();
    const { data: dataAllUser } = useInfiniteQuery<{
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
    const { slug } = useParams()
    const queryClient = useQueryClient();
    const { data } = useQuery<{ data: ProjectType }>({
        queryKey: ["SingleProject", slug],
        queryFn: () => getSingleProject(slug as string),
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
        enabled: slug === "create-project" ? false : true
    });
    const [textTeam, setTextTeam] = useState({ id: 0, value: "", name: "" })
    const [icons, setIcons] = useState<{ name: string, icon: string }[]>([])
    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();
    const [image, setImage] = useState<string>("")
    const [selectIcons, setSelectIcons] = useState<string[]>([])
    const [projectTeam, setProjectTeam] = useState<{ id: number, value: string, name: string }[]>([])
    const [dataProject, setDataProject] = useState({
        name: "",
        nameFa: "",
        desc: "",
        descFa: "",
        category: "",
        time: ""
    })
    const deleteProject = () => {
        axios.delete(`projects/${data?.data.id}`).then(() => {
            queryClient.invalidateQueries({ queryKey: ["getProjects"] });
            route.replace("/admin/projects")
        }).catch((err) => console.log(err))
    }
    const addUserTeam = () => {
        setProjectTeam([...projectTeam, textTeam])
        setTextTeam({ id: 0, name: "", value: "" })
        onClose()
    }
    const action = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const iconsArry = icons.filter((row) => selectIcons.includes(row.name))
        const localData = localStorage.getItem("shlabs")
        const newTeam = projectTeam.map(item => ({ [item.id.toString()]: item.value }));
        if (!localData) return
        const jsonData = JSON.parse(localData)
        const body = {
            fa_title: dataProject.nameFa,
            en_title: dataProject.name,
            fa_description: dataProject.descFa,
            en_description: dataProject.desc,
            picture: image,
            categories: dataProject.category,
            time_to_do: dataProject.time,
            technologies: JSON.stringify(iconsArry),
            technology_icons: "test",
            programmer_rules: JSON.stringify(newTeam),
            start_date: startDate?.toString(),
            end_date: endDate?.toString(),
            author_id: jsonData?.id,
        }
        if (data?.data) {
            axios.patch(`projects/${data.data.id}`, body).then(() => {
                toast.success("Projects Was Updated")
                queryClient.invalidateQueries({ queryKey: ["getProjects"] });
                queryClient.invalidateQueries({ queryKey: ["SingleProject", slug] });
                deleteCache({ tag: pageCache.projects.tag })
                deleteCache({ tag: `${[pageCache.projects.tag, data.data.id]}` })
            }).catch((err) => {
                toast.error("Error in DataBase")
            })
        } else {
            axios.post("projects", body
            ).then(() => {
                queryClient.invalidateQueries({ queryKey: ["getProjects"] });
                toast.success("Projects Was Created")
                deleteCache({ tag: pageCache.projects.tag })
            }).catch((err) => {
                console.log(err);
                toast.error("Error in DataBase")
            })
        }
    }
    const syncData = () => {
        if (data?.data) {
            setDataProject({
                category: data.data.categories,
                desc: data.data.en_description,
                descFa: data.data.fa_description,
                name: data.data.en_title,
                nameFa: data.data.fa_title,
                time: data.data.time_to_do
            })
            setEndDate(parseDate(data.data.end_date.split(" ")[0]))
            setStartDate(parseDate(data.data.start_date.split(" ")[0]))
            const iconBox = JSON.parse(data.data.technologies)
            if (iconBox && iconBox?.length) {
                setSelectIcons(iconBox.map((row: any) => row.name))
            }
            setImage(data.data.picture || "");
            if (data.data?.users.length) {
                const newTeam = JSON.parse(data.data.programmer_rules)
                const result = data.data.users.map(item => ({
                    name: item.username,
                    id: item.id,
                    value: newTeam.find((obj: any) => obj[item.id])[item.id]
                }));                
                setProjectTeam(result)
            }
        }
    }
    useEffect(() => {
        syncData()
    }, [data?.data])
    useEffect(() => {
        import("@/data/icons.json")
            .then((module) => {
                const data = module.default;
                setIcons(data)
            })
            .catch((err) => {
                console.error("Error loading JSON", err);
            });
    }, []);
    return (
        <>
            <form onSubmit={action} className="flex flex-col p-3 rounded-xl bg-white shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input
                        label="Name(En)"
                        type="text"
                        value={dataProject.name}
                        onChange={({ target }) => setDataProject({ ...dataProject, name: target.value })}
                        labelPlacement='outside'
                        isRequired
                        placeholder='name(En)'
                        variant="bordered"
                    />
                    <Input
                        label="Name(Fa)"
                        type="text"
                        value={dataProject.nameFa}
                        onChange={({ target }) => setDataProject({ ...dataProject, nameFa: target.value })}
                        labelPlacement='outside'
                        isRequired
                        placeholder='name(Fa)'
                        variant="bordered"
                    />
                    <Input
                        label="Category"
                        type="text"
                        value={dataProject.category}
                        onChange={({ target }) => setDataProject({ ...dataProject, category: target.value })}
                        labelPlacement='outside'
                        isRequired
                        placeholder='Category'
                        variant="bordered"
                    />
                    <Input
                        label="Time Taken"
                        type="text"
                        value={dataProject.time}
                        onChange={({ target }) => setDataProject({ ...dataProject, time: target.value })}
                        labelPlacement='outside'
                        isRequired
                        placeholder='Based on the day'
                        variant="bordered"
                    />
                    <DateInput
                        isRequired
                        value={endDate}
                        onChange={setEndDate}
                        variant="bordered"
                        labelPlacement="outside"
                        label="Completed Date"
                    />
                    <DateInput
                        isRequired
                        value={startDate}
                        onChange={setStartDate}
                        variant="bordered"
                        labelPlacement="outside"
                        label="Start date"
                    />
                    {icons.length ?
                        <Select
                            selectedKeys={selectIcons}
                            onChange={({ target }) => {
                                setSelectIcons(target.value.split(","))
                            }}
                            labelPlacement="outside"
                            variant='bordered'
                            className='md:col-span-2'
                            label="Favorite Technology"
                            placeholder="Select Technology"
                            selectionMode="multiple"
                        >
                            {icons.map((row, index) => (
                                <SelectItem key={row.name} textValue={row.name}>
                                    <div className='flex w-full items-center justify-between'>
                                        <span>{row.name}</span>
                                        <i className={`devicon-${row.name}-${row.icon}`}></i>
                                    </div>
                                </SelectItem>
                            ))}
                        </Select>
                        : null}
                    <Textarea
                        variant='bordered'
                        isRequired
                        label="Description(En)"
                        labelPlacement="outside"
                        value={dataProject.desc}
                        onChange={({ target }) => setDataProject({ ...dataProject, desc: target.value })}
                        placeholder="Full description of the Projects"
                    />
                    <Textarea
                        variant='bordered'
                        isRequired
                        label="Description(Fa)"
                        labelPlacement="outside"
                        value={dataProject.descFa}
                        onChange={({ target }) => setDataProject({ ...dataProject, descFa: target.value })}
                        placeholder="Full description of the Projects"
                    />
                </div>
                <div className='w-full my-4' onClick={(event) => { event.stopPropagation() }}>
                    <UploadImage height={150} width={300} setImageUrl={setImage} imageUrl={image} />
                </div>
                <div className="my-4">
                    <span>Team Members</span>
                    <div className="flex flex-col gap-4 my-4">
                        {projectTeam.map((row, index) => (
                            <div key={index} className="p-3 shadow-md rounded-md text-white justify-between bg-slate-400 items-center flex gap-5">
                                <span>
                                    {index + 1}
                                </span>
                                <span>
                                    {row.name}
                                </span>
                                <span>
                                    {row.value}
                                </span>
                                <Button isIconOnly onPress={() => setProjectTeam(projectTeam.filter((item) => item.id !== row.id))} radius="full">
                                    <MdClose />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-5">
                        {dataAllUser?.pages[0]?.data?.length ?
                            <Table
                                selectionMode="none"
                                aria-label="Example static collection table"
                                selectedKeys={["5"]}
                            >
                                <TableHeader>
                                    <TableColumn>#</TableColumn>
                                    <TableColumn>NAME</TableColumn>
                                    <TableColumn>ROLE</TableColumn>
                                    <TableColumn>Created At</TableColumn>
                                    <TableColumn>Button</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {dataAllUser?.pages[0]?.data.map((row) => (
                                        <TableRow key={row.id} className={projectTeam.some((item) => item.id === row.id) ? "bg-slate-300 shadow-md" : ""}>
                                            < TableCell > {row.id}</TableCell>
                                            < TableCell > {row?.username}</TableCell>
                                            <TableCell>{row.user_type}</TableCell>
                                            <TableCell>{new Date(row.created_at).toLocaleDateString("en")}</TableCell>
                                            <TableCell>
                                                {projectTeam.some((item) => item.id === row.id) ?
                                                    <Button type="button" disabled className='bg-d-btn/60 rounded-md shadow-md text-white'>
                                                        Add User
                                                        <FaUserPlus />
                                                    </Button>
                                                    :
                                                    <Button onPress={() => { setTextTeam({ ...textTeam, id: row.id, name: row.username }), onOpen() }} type="button" className='bg-d-btn rounded-md shadow-md text-white'>
                                                        Add User
                                                        <FaUserPlus />
                                                    </Button>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            : null}
                    </div>
                    <PaginationAdmin search={searchQuery} setSearch={setSearchQuery} meta={dataAllUser?.pages[0].meta} />
                </div >
                <div className="flex justify-between items-center">
                    <Button type='submit' className='bg-white rounded-md shadow-md text-b-70 border border-b-70'>
                        Save Projects
                        <MdOutlineDataSaverOn />
                    </Button>
                    {data?.data.id ?
                        <DeleteModal id={data?.data.id} onSubmit={deleteProject} />
                        : null}
                </div>
            </form >
            <Modal size='lg' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Modal Add User</ModalHeader>
                    <ModalBody>
                        <Input
                            label="job position"
                            type="text"
                            value={textTeam.value}
                            onChange={({ target }) => setTextTeam({ ...textTeam, value: target.value })}
                            labelPlacement='outside'
                            isRequired
                            placeholder='job position'
                            variant="bordered"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={addUserTeam} type="button" className='bg-d-btn rounded-md shadow-md text-white'>
                            Add User
                            <FaUserPlus />
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
