import React from 'react'
import Container from './Container'

function TitleBanner({image, title}) {
    return (
        <div className='TitleBanner md:h-[80vh] bg-cover bg-no-repeat flex items-center justify-center max-2xl:py-[90px] md:py-[50px] max-md:pb-[50px] max-md:relative overflow-hidden' style={{ backgroundImage: `url('/assets/images/${image}')` }}>
            <Container>
                <div className='mx-auto max-w-[1373px] py-10 w-full h-full flex flex-col items-start justify-end md:relative'>
                    <div className='heading'>
                        <h1 className='font-bold !lg:text-6xl md:text-5xl text-5xl  mb-4 text-balance text-white'>
                            {title}
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default TitleBanner