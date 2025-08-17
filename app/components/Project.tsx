import React, { useEffect, useState } from 'react'
import ArrowIcon from './icons/ArrowIcon'
import Image from 'next/image'
import { ProjectPost } from '../utils/MarkdownUtils';
import { imageLocalPath } from '../utils/constant';

export default function Project() {


    const [projects, setProjects] = useState<ProjectPost[] | null>(null);



    useEffect(() => {
        async function fetchExperiences() {
            const res = await fetch("/api/projects");
            if (res.ok) {
                const data: ProjectPost[] = await res.json();

                setProjects(data);
            }
        }
        fetchExperiences();
    }, []);

    if (!projects) return <p>Loading...</p>;


    return (
        <div>
            {projects.map((item, index) => (
                <div key={index} className=" py-4 lg:px-6 rounded-md mb-8 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]
            lg:hover:drop-shadow-lg lg:hover:bg-slate-800/50">

                    <a href={item.link} className='flex items-start gap-4  curs group' target="_blank"
                        rel="noopener noreferrer"
                    >
                        {item.metadata.thumbnail && (

                            <Image className='rounded-md' alt={item.metadata.title || 'Thumbnail'} width={100} height={50} src={`${imageLocalPath}${item.metadata.thumbnail}`} />
                        )}

                        <div className='flex flex-col gap-4 justify-start'>
                            <div className="flex items-center">
                                <h2 className='text-base-1 group-hover:text-base-3 duration-200 font-medium'>
                                    {item.metadata.title}
                                </h2>
                                <div className="mb-0.5 group-hover:-translate-y-1 group-hover:translate-x-1 duration-200 group-hover:text-base-3 text-base-1">

                                    <ArrowIcon />
                                </div>
                            </div>
                            <p className='text-base-2'>
                                {item.content}

                            </p>
                            <ul id='technologies' className='flex flex-wrap gap-2 mt-2'>
                                {item.metadata.tech.map((tech, index) => (
                                    <li key={index} className='mr-1.5 mt-2'>
                                        <div className='rounded-full text-base-3 bg-base-4 text-xs px-3 py-2 font-bold'>
                                            {tech}
                                        </div>

                                    </li>))}

                            </ul>
                        </div>
                    </a>
                </div>
            )).reverse()}
        </div>

    )
}
