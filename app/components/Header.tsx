'use client'

import { useState } from 'react'
import GitHubIcon from './icons/GitHubIcon'
import FacebookIcon from './icons/FaceBookIcon'
import LinkedInIcon from './icons/LinkedInIcon'

interface HeaderProps {
    activeIndex: number;
    onNavClick: (index: number) => void;
}

export default function Header({ activeIndex, onNavClick }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

    const handleNavClick = (index: number) => {
        onNavClick(index)
        setMobileMenuOpen(false)
    }

    return (
        <header className='flex flex-col lg:justify-between lg:py-24 lg:h-screen lg:w-[48%] lg:sticky top-0'>
            <div>
                <div className='flex justify-between items-center lg:hidden mb-6'>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-base-1">
                            Trần Lâm <span className="text-base-3">Huy</span>
                        </h1>
                        <p className='text-sm font-mono text-base-2'>Flutter Developer</p>
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className='p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-base-1 hover:border-teal-500/50 transition-colors'
                        aria-label='Toggle menu'
                    >
                        <svg
                            className='w-6 h-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            ) : (
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M4 6h16M4 12h16M4 18h16'
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className='lg:hidden mb-8 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-md'>
                        <ul className='flex flex-col gap-4'>
                            {navItems.map((item, index) => (
                                <li
                                    key={item}
                                    onClick={() => handleNavClick(index)}
                                    className='cursor-pointer flex items-center justify-between group py-2'
                                >
                                    <div className='flex items-center'>
                                        <span className={`font-mono text-xs font-semibold tracking-wider transition-colors duration-300 ${activeIndex === index ? "text-base-1" : "text-base-2 opacity-50 group-hover:opacity-100 group-hover:text-base-1"}`}>
                                            0{index + 1}
                                        </span>
                                        <span
                                            className={`ml-4 text-sm font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${activeIndex === index ? "text-base-1" : "text-base-2 opacity-50 group-hover:opacity-100 group-hover:text-base-1"}`}
                                        >
                                            {item}
                                        </span>
                                    </div>
                                    {activeIndex === index && (
                                        <div className='w-2 h-2 rounded-full bg-teal-400' />
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className='mt-6 pt-4 border-t border-slate-700/50'>
                            <div className="flex gap-4">
                                {socialLinks.map(({ href, title, icon }) => (
                                    <a
                                        key={title}
                                        href={href}
                                        className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-base-2 hover:border-teal-500/50 hover:text-base-1 transition-all"
                                        title={title}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <section id='infomation' className='hidden lg:block'>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-base-1">
                        Trần Lâm <span className="text-base-3">Huy</span>
                    </h1>
                    <h2 className='text-lg md:text-xl mt-4 font-mono text-base-1 font-medium'>
                        Flutter Developer
                    </h2>
                    <p className='mt-4 text-base-2 max-w-[420px] text-base md:text-lg leading-relaxed'>
                        I build real-world applications powered by AI, focusing on performance, elegant problem-solving, and complete end-to-end systems.
                    </p>
                </section>

                <section id='navigation' className='hidden lg:block mt-16'>
                    <ul className='flex flex-col gap-6 w-max'>
                        {navItems.map((item, index) => (
                            <li
                                key={item}
                                onClick={() => onNavClick(index)}
                                className='cursor-pointer flex items-center group'
                            >
                                <span className={`font-mono text-xs font-semibold tracking-wider transition-colors duration-300 ${activeIndex === index ? "text-base-1" : "text-base-2 opacity-50 group-hover:opacity-100 group-hover:text-base-1"}`}>
                                    0{index + 1}
                                </span>
                                <div
                                    className={`h-[1px] mx-4 transition-all duration-300 ease-out ${activeIndex === index ? "w-16 bg-base-1" : "w-8 bg-base-2 opacity-50 group-hover:w-16 group-hover:opacity-100 group-hover:bg-base-1"
                                        }`}
                                ></div>
                                <span
                                    className={`text-[13px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${activeIndex === index ? "text-base-1" : "text-base-2 opacity-50 group-hover:opacity-100 group-hover:text-base-1"
                                        }`}
                                >
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            <section id="socials" className='hidden lg:block mt-8 lg:mt-0'>
                <div className="flex gap-6">
                    {socialLinks.map(({ href, title, icon }) => (
                        <a
                            key={title}
                            href={href}
                            className="hover:text-slate-200 transition-colors"
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
