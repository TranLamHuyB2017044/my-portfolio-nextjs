import ArrowIcon from './icons/ArrowIcon'
import React, { useEffect, useState } from "react";
import type { ExperiencePost } from "@/app/utils/MarkdownUtils";
export default function Experience() {

    const [experiences, setExperiences] = useState<ExperiencePost[] | null>(null);

    useEffect(() => {
        async function fetchExperiences() {
            const res = await fetch("/api/experiences");
            if (res.ok) {
                const data: ExperiencePost[] = await res.json();
                setExperiences(data);
            }
        }
        fetchExperiences();
    }, []);

    if (!experiences) return <p>Loading...</p>;

    return (
        <div>

            {experiences.sort((a, b) => {
                if (
                    new Date(a.metadata.date) > new Date(b.metadata.date)
                ) {
                    return -1
                }
                return 1
            }).map((item, index) => (
                <div key={index} className="py-4 lg:px-6 rounded-md mb-8 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]
        lg:hover:drop-shadow-lg lg:hover:bg-slate-800/50">

                    <a href='' className='flex items-start gap-4  curs group' target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className='text-base-2 min-w-32'>
                            {item.metadata.date}
                        </p>
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

            ))}
        </div>


    )
}
