"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from 'react'
import { MinusIcon, PlusIcon } from "./icons"
import Image from "next/image"

function CustomizedServiceAccordion({ data }) {
    const [activeItem, setActiveItem] = useState(0)
    useEffect(() => {
        console.log(activeItem, 'activeItemactiveItem')
    }, [activeItem])
    return (
        <div className="w-full">
            {data.map((a, i) => (
                // h-[67px] overflow-hidden
                <div style={{ transition: '1s' }} className={`flex justify-between border-b max-lg:flex-wrap max-lg:items-start border-[#FFFFFF1A] py-5 ${i === activeItem ? "lg:h-[197px] md:h-[261px] h-[450px]" : "h-[87px]"} overflow-hidden`} key={i}    >
                    <div className="text-white max-lg:order-1 max-w-[38px] max-lg:mt-[22px] max-md:mt-0 flex items-center lg:text-base text-sm font-medium leading-[22.4px] font-inter opacity-60">
                        00{i + 1}
                    </div>
                    <div className="flex items-start max-lg:order-2 max-md:order-4 max-w-[558px] w-full 2xl:gap-11 gap-5">
                        {/* hidden */}
                        <Image alt="serviceImage" width={156} height={80} className={`2xl:min-w-[156px] lg:min-w-[120px] min-w-[80px] aspect-[1.95] ${i === activeItem ? "block" : 'hidden'}`} src={'/assets/images/ServiceImage.png'} />
                        <div className="mt-[19.7px]">
                            <h5 className={`text-white ${i === activeItem ? 'lg:text-[30px] text-[24px] leading-[36px]' : 'lg:text-[22px] text-lg leading-[26.4px]'}  text-left font-medium font-inter line-clamp-2`} >{a.name} </h5>
                            <p className="font-medium lg:text-base text-sm text-white leading-[22px] opacity-60 mt-5 line-clamp-2">{a.desc}</p>
                        </div>
                    </div>
                    {/* opacity-0 */}
                    <div className={`max-w-[350px] max-lg:order-4 max-md:order-5 relative w-full ${i === activeItem ? 'opacity-100' : "opacity-0"}`}>
                        <p className="font-inter text-white opacity-60 font-medium leading-[15px] lg:text-xs text-xs">Categories</p>

                        <div className=" mt-[18px]">
                            <div
                                className="flex w-full flex-wrap gap-[7.25px] overflow-hidden"
                            // style={{
                            //     maxHeight: 'calc(2 * (30px + 7.25px) - 7.25px)', // 2 rows max (item height + gap)
                            // }}
                            >
                                {a.categories.map((cat, j) => (
                                    <div
                                        key={j}
                                        className="bg-white rounded-full text-[#0A0A0A] text-xs py-[9px] px-3 font-inter leading-[100%] text-center font-semibold"
                                    >
                                        {cat}
                                    </div>
                                ))}
                                <div className=" flex items-center justify-center  bg-[#272727] rounded-full px-2 py-1 text-xs text-white font-inter font-medium">
                                    More
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className={`text-white lg:text-[22px] max-w-[calc(100%-180px)] md:text-lg text-sm leading-[26.4px] md:hidden ${i === activeItem ? 'max-md:hidden' : ''} max-md:order-2 text-left font-medium font-inter line-clamp-2`}>
                        {a.name}
                    </div>
                    <div className="w-[100px] max-lg:order-3 max-md:order-3 flex justify-end">
                        <button onClick={() => setActiveItem(i)} className="w-[46px] text-white h-[46px] rounded-full border border-[#313131] flex items-center justify-center cursor-pointer">
                            {i === activeItem ?
                                <MinusIcon />
                                :
                                <PlusIcon />
                            }
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CustomizedServiceAccordion





//  <AccordionItem value={i} key={i}>
//                     <div className='flex justify-between'>
//                         <AccordionTrigger className={"text-white"}>
//                             <div className='w-full'>
//                                 <p>(002)</p>
//                             </div>
//                         </AccordionTrigger>
//                         {activeItem === i ? null :
//                             <AccordionTrigger className={"text-white"}>
//                                 <div className='w-full'>
//                                     <p>Social media marketing</p>
//                                 </div>
//                             </AccordionTrigger>
//                         }
//                         <AccordionContent className={"text-white"}>
//                             Yes. It adheres to the WAI-ARIA design pattern.
//                         </AccordionContent>
//                         <AccordionTrigger className={"text-white"}>
//                             <div className='w-full'>
//                                 <p>(002)</p>
//                                 <div className=''>

//                                 </div>
//                             </div>
//                         </AccordionTrigger>
//                     </div>
//                 </AccordionItem>