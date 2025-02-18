'use client';
import { usePathname, useRouter } from 'next/navigation';

export default function SwitchLang() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = pathname.startsWith('/fa') ? 'fa' : 'en';
    const newLocale = currentLocale === 'fa' ? 'en' : 'fa';

    const switchLanguage = () => {
        router.push(pathname.replace(`/${currentLocale}`, `/${newLocale}`));
    };

    return (
        <button onClick={switchLanguage} className="p-2 border rounded">
            {currentLocale === 'fa' ? 'English' : 'فارسی'}
        </button>
    );
}
