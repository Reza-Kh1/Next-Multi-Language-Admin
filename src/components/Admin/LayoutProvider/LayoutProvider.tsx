"use client"
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react'
import toast from 'react-hot-toast';
import Cookies from "js-cookie"
const token = Cookies.get('authToken')

axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL_API;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// axios.defaults.withCredentials = true;

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
    const route = useRouter()
    const queryClient = useMemo(
        () =>
            new QueryClient({
                queryCache: new QueryCache({
                    onError: (err: any) => {
                        console.log(err?.response?.status);
                        if (err?.response?.status === 403) {
                            toast.error("You are not allowed to do this");
                            localStorage.setItem("user", "");
                            route.replace("/admin/login")
                        } else {
                            toast.error("We encountered an error in connection with the database");
                        }
                    },
                }),
            }),
        []
    );
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
