import React from 'react'
import ArrowIcon from './icons/ArrowIcon'

export default function ResumeButton() {
    return (
        <div className='mb-16 flex items-center justify-center group '>
            <a href="https://drive.google.com/file/d/1YG-kWLl8Z0RBgpLuN2dqd21-oPu1GVGF/view?usp=sharing" className='text-base-1 group-hover:text-base-3 duration-200 font-semibold' target="_blank"
                rel="noopener noreferrer">View Full Résumé</a>
            <div className="group-hover:-translate-y-1 group-hover:translate-x-1 duration-200 group-hover:text-base-3">

                <ArrowIcon />
            </div>
        </div>
    )
}
