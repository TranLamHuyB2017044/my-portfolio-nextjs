import React from 'react'
import GitHubIcon from './icons/GitHubIcon'

export default function Header() {
    return (
        <header className='flex flex-col py-24'>
            <div>
                <section id='infomation'>
                    <h1 className="text-5xl font-bold text-base-1">
                        Tran Lam Huy
                    </h1>
                    <h2 className='text-xl mt-3 text-base-1 '>
                        Frontend Developer
                    </h2>
                    <p className='mt-3 text-base-2 max-w-xs'>
                        I build accessible, pixel-perfect digital experiences for the web.
                    </p>
                </section>

                <section id='navigation'>
                    <ul className='mt-16 text-base-1 w-max uppercase'>
                        <li className='cursor-pointer flex items-center'>
                            <div className='h-[1px] mr-4 w-16 bg-base-1'></div>
                            <p>About</p>
                        </li>
                        <li className='cursor-pointer flex items-center'>
                            <div className='h-[1px] mr-4 w-16 bg-base-1'></div>
                            <p>Experience</p>
                        </li>
                        <li className='cursor-pointer flex items-center'>
                            <div className='h-[1px] mr-4 w-16 bg-base-1'></div>
                            <p>About</p>
                        </li>
                    </ul>

                </section>
            </div>


            <section id='socials'>
                <div className="flex gap-8">
                    <a href="">
                        <GitHubIcon/>
                    </a>
                </div>
            </section>

        </header>
    )
}
