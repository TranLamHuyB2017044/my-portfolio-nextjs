import React from 'react'
import ArrowIcon from './icons/ArrowIcon'

export default function ResumeButton() {
    return (
        <div className='mb-16 flex items-center justify-center group'>
            <a href="" className='text-base-1 group-hover:text-base-3 duration-200 font-semibold '>View Full Résumé</a>
            <div className="group-hover:-translate-y-1 group-hover:translate-x-1 duration-200 group-hover:text-base-3">

                <ArrowIcon />
            </div>
        </div>
    )
}
