import React from 'react'

function Container({ children }) {
    return (
        <div className='px-6 w-full h-full'>
            <div className='container max-w-[1620px] w-full mx-auto h-full'>
                {children}
            </div>
        </div>
    )
}

export default Container