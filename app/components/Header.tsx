'use client'

import GitHubIcon from './icons/GitHubIcon'
import FacebookIcon from './icons/FaceBookIcon'
import LinkedInIcon from './icons/LinkedInIcon'
import { useState } from 'react';

export default function Header() {

    const socialLinks = [
        {
            href: "https://github.com/TranLamHuyB2017044",
            title: "GitHub",
            icon: <GitHubIcon />,
        },
        {
            href: "https://www.linkedin.com/in/huy-tran-2ba19a253/",
            title: "LinkedIn",
            icon: <LinkedInIcon />,
        },
        {
            href: "https://www.facebook.com/tran.lam.huy.180408/",
            title: "Facebook",
            icon: <FacebookIcon />,
        },
    ];


    const navItems = ['About', 'Experience', 'Projects'];




    return (
        <header className='flex flex-col justify-between py-24 min-h-screen'>
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
                        {navItems.map((item) => (
                            <li
                                key={item}

                                className='cursor-pointer flex items-center my-4 group'
                            >
                                <div className='h-[1px] mr-4  bg-base-1 group-hover:w-16 w-8 transition-all duration-200'
                                ></div>
                                <p
                                    className={`text-xs duration-200 group-hover:text-base-1 text-base-2 font-bold tracking-[1.2px]`}
                                >
                                    {item}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>


            <section id="socials">
                <div className="flex gap-6">
                    {socialLinks.map(({ href, title, icon }) => (
                        <a
                            key={title}
                            href={href}
                            className="hover:text-slate-200"
                            title={title}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </section>


        </header>
    )
}
