"use client"
import React, { useEffect, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight } from './icons'
import { Rotate3D } from 'lucide-react'

function ArrowAnimation({ activeColor = "#000", inActiveColor = "#aaa", dir = 'left', number = 6, width, height }) {
    const [activeArrow, setActiveArrow] = useState((dir === 'left' || dir === 'up') ? 5 : 0)
    const arr = new Array(number).fill(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveArrow(prev => {
                if (dir === 'left' || dir === 'up') {
                    return prev === 0 ? 5 : prev - 1
                } else if (dir === 'right' || dir === 'down') {
                    return prev === 5 ? 0 : prev + 1
                }
            })
        }, 500)

        return () => clearInterval(interval)
    }, [dir])

    return (
        <>
            {arr.map((_, i) => (
                <div
                    key={i}
                    style={{
                        width: 'fit-content',
                        color: (dir === 'right' ? activeArrow >= i : dir === 'left' ? activeArrow <= i : dir === 'down' ? activeArrow >= i : dir === 'up' ? activeArrow <= i : activeArrow <= i) ? activeColor : inActiveColor,
                        transform: dir === 'right' ? 'rotate(180deg)' : dir === 'down' ? 'rotate(270deg)' : dir === 'up' ? 'rotate(90deg)' : 'rotate(0deg)',
                        // transition: 'color 0.3s',
                    }}
                >
                    {dir === 'right' ?
                        <ArrowRight className="max-2xl:w-[16px]" width={width} height={height} />
                        : dir === 'left' ?
                            <ArrowLeft className="max-2xl:w-[16px]" width={width} height={height}/>
                            : dir === 'down' ?
                                <ArrowDown className="" width={width} height={height}/>
                                : 'rotate(0deg)'}
                </div>
            ))}
        </>
    )
}

export default ArrowAnimation
