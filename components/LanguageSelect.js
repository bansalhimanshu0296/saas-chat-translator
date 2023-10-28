'use client'

import { LanguageSupportedMap, useLanguageStore, useSubscriptionStore } from "@/store/store"
import { usePathname } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";

function LanguageSelect() {
  
  const [language, setLanguage, getLanguages, getNotSupportedLanguages] = useLanguageStore(
    (state) =>[
        state.language,
        state.setLanguage,
        state.getLanguages,
        state.getNotSupportedLanguages
    ]);
  const subscription = useSubscriptionStore((state)=>state.subscription)
  const isPro = subscription?.role === "pro" && subscription?.status === "active";

  const pathName = usePathname();

  const isChatPage = pathName.includes("/chat");

  return (
    isChatPage && <div>
        <Select onValueChange={(value) => setLanguage(value)}>
            <SelectTrigger className="w-[150px] text-black dark:text-white">
                <SelectValue placeholder={LanguageSupportedMap[language]} className=''/>
            </SelectTrigger>
            <SelectContent>
                {subscription === undefined ? <LoadingSpinner/>:(
                    <>
                        {getLanguages(isPro).map((Language)=>(
                            <SelectItem key={Language} value={Language}>
                                {LanguageSupportedMap[Language]}
                            </SelectItem>
                        ))}
                        {getNotSupportedLanguages(isPro).map((Language)=>(
                            <Link href={'/register'} key={Language} prefetch={false}>
                                <SelectItem key={Language} value={Language} disabled className="bg-gray-300/50 text-gray-500
                                 dark:text-white py-2 my-1">
                                    {LanguageSupportedMap[Language]} (PRO)
                                </SelectItem>
                            </Link>
                        ))}
                    </>
                )}
            </SelectContent>
        </Select>
    </div>
  )
}

export default LanguageSelect