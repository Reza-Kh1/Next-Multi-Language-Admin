import { Button } from '@heroui/button'
import React from 'react'
import ImageCustom from '../ImageCustom/ImageCustom'
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6'
import { Link } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
const iconData = [
  { icon: <FaTwitter />, name: "twitter" },
  { icon: <FaLinkedin className='text-w-100' />, name: "linkedin" },
  { icon: <FaInstagram className='text-w-100' />, name: "instagram" },
]
export default function Footer() {
  const t = useTranslations("Footer")
  const local = useLocale()
  return (
    <footer className='main-class mt-8 md:mt-12 xl:mt-20'>
      <div className='relative flex justify-center items-center flex-col gap-4 p-6 md:p-32 text-center shadow-lg border border-d-60 rounded-xl'>
        <h2 className='text-w-100 text-2xl md:text-4xl font-semibold'>{t("container.name")}</h2>
        <p className='text-w-50 text-sm md:text-base'>{t("container.text")}</p>
        <p className='text-w-100 mt-4 md:mt-10'>{t("container.span")}</p>
        <div className='text-w-100 flex items-center gap-4 z-10'>
          <Button className='rounded-full p-5 !bg-w-90 !text-d-100'>
            {t("container.btnLight")}
          </Button>
          <Button className='rounded-full bg-d-80 text-w-100 border border-d-60 p-5'>
            {t("container.btnDark")}
          </Button>
        </div>
        <ImageCustom figureClass='w-full flex justify-center mt-8' src={"/big-logo.png"} alt={"logo footer"} width={600} height={370} />
        <span className='absolute left-0 top-0 w-[56%] h-[400px]' style={{ backgroundImage: `url(/dot-left-low.png)` }}></span>
        <span className='absolute right-0 top-0 w-[56%] h-[400px]' style={{ backgroundImage: `url(/dot-right-low.png)` }}></span>
      </div>
      <div className='mt-10 flex justify-between items-center pb-6 border-d-60 border-b'>
        <div>
          <Link href={"/"}>
            <ImageCustom src={"/logo.png"} alt={"logo"} width={100} height={37} />
          </Link>
        </div>
        <div className='flex flex-col md:flex-row items-center justify-end gap-5'>
          <span className='text-w-100 text-sm md:text-base'>{local === "fa" ? "ما را در شبکه های اجتماعی دنبال کنید" : "Follow Us On Social Media"}</span>
          <div className='flex gap-5 justify-center'>
            {iconData.map((row, index) => (
              <Link href={"#"} aria-label={row.name} title={row.name} key={index} className='border text-sm md:text-base border-d-60 p-3 rounded-full text-w-100 bg-gradient-to-b to-d-100 from-gray-700/90'>
                {row.icon}
                <span className='screen-reader-text'>
                  {row.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* <div className='mt-12 grid grid-cols-2 md:grid-cols-6 justify-between gap-5'>
        {t.raw("linkMenu").map((i: any, index: number) => (
          <section key={index}>
            <h3 className='text-w-100 mb-5 font-semibold'>{i.title}</h3>
            <ul className='flex flex-col text-w-80 gap-4'>
              {i.link.map((item: any, ind: number) => (
                <li key={ind}><Link className='hover:text-w-90 text-sm md:text-base' href={"#"}>{item?.name}</Link></li>
              ))}
            </ul>
          </section>
        ))}
      </div> */}
      <div className='flex flex-col md:flex-row gap-4 justify-between items-center text-sm md:text-xs xl:text-base py-5 md:py-8 text-w-50  mt-5 border-d-60'>
        <span>{t("menuBot.val-1")}</span>
        <span className='hidden md:block'>{t("menuBot.val-2")}</span>
        <div className='grid grid-cols-2 md:grid-cols-3 text-center gap-3'>
          <span>{t("menuBot.val-3")}</span>
          <span>{t("menuBot.val-4")}</span>
          <span className='md:hidden'>{t("menuBot.val-2")}</span>
          <span>{t("menuBot.val-5")}</span>
        </div>
      </div>
    </footer>
  )
}
