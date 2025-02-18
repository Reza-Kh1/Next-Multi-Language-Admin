import React from 'react'
type HeaderTitleType = {
    light: string
    dark: string
    text: string
    firstLight?: boolean
}
export default function HeaderTitle({ light, dark, text, firstLight }: HeaderTitleType) {
    return (
        <div className="w-full md:w-2/3 mx-auto text-center mt-16">
            {!firstLight ?
                <h2 className='text-w-80 text-2xl md:text-4xl font-semibold inline-block md:ml-3 mb-6'>{dark}{' '}<span className='text-w-100  text-2xl md:text-4xl font-semibold mb-9'>{light}</span></h2>
                :
                <h2 className='text-w-100 text-2xl md:text-4xl font-semibold inline-block md:ml-3 mb-6'>{light}{' '}<span className='text-w-80  text-2xl md:text-4xl font-semibold mb-9'>{dark}</span></h2>
            }
            <p className="text-w-50">{text}</p>
        </div>
    )
}