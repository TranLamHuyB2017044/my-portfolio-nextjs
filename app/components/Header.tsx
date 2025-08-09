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

                <section id='navigation' className='hidden lg:block'>
                    <ul className='mt-16 text-base-1 w-max uppercase'>
                        {navItems.map((item, index) => (
                            <li
                                key={item}
                                onClick={() => onNavClick(index)}

                                className='cursor-pointer flex items-center my-4 group'
                            >
                                <div
                                    className={`h-[1px] mr-4 transition-all duration-200 ${activeIndex === index ? "w-16 bg-base-1" : "w-8 bg-base-1 group-hover:w-16"
                                        }`}
                                ></div>
                                <p
                                    className={`text-xs font-bold tracking-[1.2px] duration-200 ${activeIndex === index ? "text-base-1" : "text-base-2 group-hover:text-base-1"
                                        }`}
                                >{item}
                                </p>
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
