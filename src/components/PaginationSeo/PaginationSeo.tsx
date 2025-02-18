import { OptionsGetAllMeta } from '@/app/type';
import { Link } from '@/i18n/routing';
import React from 'react'

export default function PaginationSeo({ meta }: { meta: OptionsGetAllMeta }) {
    if (!meta) return
    const pages = meta.last_page
    const current = meta.current_page
    const startPage = Math.max(1, Number(current) - 1);
    const endPage = Math.min(pages, Number(current) + 1);
    return (
        <div className="w-full mx-auto md:w-7/12 flex gap-2 sm:gap-2 items-center justify-center mt-12 md:mt-14">
            {Number(current) > 3 && (
                <>
                    <Link aria-label={"1"} href={`?page=${1}`}>
                        <button title={'1'} type="button" className={"w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-md bg-d-80 border border-d-60"}>
                            <span className="text-gray-50 pt-1">
                                1
                            </span>
                        </button>
                    </Link>
                    <span className='text-white'>...</span>
                </>
            )}
            {pages
                ? Array.from(
                    { length: Math.min(11, endPage - startPage + 1) },
                    (_, i) => startPage + i
                ).map((i) => {
                    return i === Number(current) ?
                        <button aria-label={`${i}`} title={`${i}`} type="button" key={i} disabled={Number(current) === i} className={`w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-md ${i === Number(current) ? "bg-d-50" : "bg-d-80"}  border border-d-60`}>
                            <span className="text-gray-50 pt-1">
                                {i}
                            </span>
                        </button>
                        :
                        <Link aria-label={`${i}`} href={`?page=${i}`} key={i}>
                            <button title={`${i}`} type="button" className={"w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-md bg-d-80 border border-d-60"}>
                                <span className="text-gray-50 pt-1">
                                    {i}
                                </span>
                            </button>
                        </Link>
                })
                : null}
            {pages - Number(current) > 2 && (
                <>
                    <span className='text-white'>...</span>
                    <Link aria-label={`${pages}`} href={`?page=${pages}`}>
                        <button title={`${pages}`} type="button" className={"w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-md bg-d-80 border border-d-60"}>
                            <span className="text-gray-50 pt-1">
                                {pages}
                            </span>
                        </button>
                    </Link>
                </>
            )}
        </div>
    )
}
