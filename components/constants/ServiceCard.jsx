import Link from 'next/link'
import React from 'react'
import { RedirectArrowIcon, RedirectIcon } from './icons'

function ServiceCard({ bg, textColor = 'text-white', title,desc }) {
    return (
        <div className={`ServiceCard ${bg} 2xl:p-[30px] p-[24px] rounded-[18px]`}>
            <div className='2xl:w-20 w-10 2xl:h-20 h-10 2xl:rounded-2xl rounded-xl bg-white 2xl:mb-5 mb-2'>
            </div>
            <h5 className={`font-inter 2xl:text-[30px] text-[24px] 2xl:leading-[36px] tracking-[-1.2px] font-medium ${textColor}`}>{title}</h5>
            <p className={`font-inter ${textColor} opacity-60 2xl:text-[22px] text-base 2xl:leading-[26.4px] tracking-[-0.88px] 2xl:mt-[58px] mt-[40px]`}>{desc}</p>
            <Link href={"/contact-us"} className={`font-inter text-white font-switzer underline flex items-center mt-[15px] gap-[5px]`}>Contact us <RedirectArrowIcon /></Link>
        </div>
    )
}

export default ServiceCard