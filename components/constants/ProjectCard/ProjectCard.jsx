import Image from 'next/image'
import React from 'react'
import { Dot } from '../icons'
import Link from 'next/link'

function ProjectCard({ data }) {
    return (
        <div className='ProjectCard md:basis-[calc(50%-2px)] max-md:w-full' data-aos="fade-zoom-in" >
            <Link href={`/case-studies/${data.id}`}>
                <div className='header flex justify-between items-center bg-white md:px-6 md:py-[18px] p-3  rounded-[18px]'>
                    <div className='projectNameYear flex items-end'>
                        <p className='name font-inter font-semibold md:text-lg text-base     leading-[21px]'>{data.title}</p>
                        <p className='year font-inter font-medium text-xs leading-[15px] opacity-60 md:ml-[18px] ml-2'>/2025</p>
                    </div>
                    <button className='flex bg-transparent outline-none text-[#E9E9E9] gap-[3px] cursor-pointer flex-row'>
                        <Dot className={"max-md:w-[6px] max-md:h-[6px]"} />
                        <Dot className={"max-md:w-[6px] max-md:h-[6px]"} />
                        <Dot className={"max-md:w-[6px] max-md:h-[6px]"} />
                    </button>
                </div>
                <div className='p-1 relative flex items-center justify-center'>
                    <Image src={data.image || '/assets/images/projectImage.png'} width={750} height={546} alt='projectImage' className='w-full aspect-[1.3717] rounded-2xl object-cover' />
                    {/* <Image src={'/assets/images/boltShift.png'} width={189} height={59} alt='projectImage' className='absolute max-md:w-[100px] max-md:h-auto' /> */}

                </div>
            </Link>
        </div>
    )
}

export default ProjectCard