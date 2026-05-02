'use client'

import GitHubIcon from './icons/GitHubIcon'
import FacebookIcon from './icons/FaceBookIcon'
import LinkedInIcon from './icons/LinkedInIcon'

interface HeaderProps {
    activeIndex: number;
    onNavClick: (index: number) => void;
}

export default function Header({ activeIndex, onNavClick }: HeaderProps) {

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
        <header className='flex flex-col lg:justify-between lg:py-24 lg:h-screen lg:w-[48%] lg:sticky top-0'>
            <div>
                <section id='infomation'>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-base-1">
                        Trần Lâm <span className="text-base-3">Huy</span>
                    </h1>
                    <h2 className='text-xl mt-4 font-mono text-base-1 font-medium'>
                        Flutter Developer
                    </h2>
                    <p className='mt-4 text-base-2 max-w-[420px] text-lg leading-relaxed'>
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


            <section id="socials" className='mt-8 lg:mt-0'>
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
