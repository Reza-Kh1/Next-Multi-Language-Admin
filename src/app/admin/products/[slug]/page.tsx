"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React from 'react'
import FormProduct from '../FormProduct';
import toast from 'react-hot-toast';
import Cookies from "js-cookie"
import { getSingleProduct } from '@/action/admin';
import pageCache from '@/data/cache';
import deleteCache from '@/action/deleteCache';
export default function page() {
    const { slug } = useParams()
    const query = useQueryClient();
    const { data } = useQuery({
        queryKey: ["singleProduct", slug],
        queryFn: () => getSingleProduct(slug as string),
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
    });
    const { mutate } = useMutation({
        mutationFn: (body: any) => {
            const token = Cookies.get('authToken')
            return axios.put(`products/${slug}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        },
        onSuccess: () => {
            toast.success("product has been updated");
            query.invalidateQueries({ queryKey: ["singleProduct", slug] });
            query.invalidateQueries({ queryKey: ['getProducts'] });
            deleteCache({ tag: pageCache.products.tag })
            deleteCache({ tag: `${[pageCache.products.tag, data.data.id]}` })
        },
        onError: (err) => {
            console.log(err);
            toast.error("Update in Error");
        },
    });
    return (
        <div className='p-3 rounded-xl bg-white shadow-md '>
            <FormProduct data={data?.data} submitHandler={mutate} />
        </div>
    )
}
