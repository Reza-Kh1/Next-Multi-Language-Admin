import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import SideBar from "@/components/Admin/SideBar/SideBar";
import Navbar from "@/components/Admin/Navbar/Navbar";
import LoadingFetch from "@/components/Admin/LoadingFetch/LoadingFetch";
import { Josefin_Sans } from 'next/font/google'
import LayoutProvider from "@/components/Admin/LayoutProvider/LayoutProvider";
const josefinSans = Josefin_Sans({ subsets: ['latin'], display: 'swap' })
import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" dir="ltr">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
                />
            </head>
            <body className={`w-full p-3 md:p-5 min-h-screen bg-[#f4f4f5] ${josefinSans.className}`}>
                <LayoutProvider>
                    <NextUIProvider>
                        <main className="flex gap-10">
                            <SideBar />
                            <div className={"w-full"}>
                                <Navbar />
                                {children}
                            </div>
                            <LoadingFetch />
                            <Toaster />
                        </main>
                    </NextUIProvider>
                </LayoutProvider>
            </body>
        </html>
    );
}