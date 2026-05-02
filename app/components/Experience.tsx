import React, { useEffect, useState } from "react";
import { ExperiencePost } from "../utils/MarkdownUtils";
const renderBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="text-slate-200 font-medium">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

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

    if (!experiences) return <p className="text-slate-500 animate-pulse mt-8">Loading experience...</p>;

    return (
        <div className="relative border-l border-slate-700/40 ml-4 md:ml-28 mt-12 w-full max-w-4xl">
            {experiences.map((item, index) => {
                const dates = item.metadata.date.split('-');
                return (
                    <div key={index} className="relative mb-16 pl-6 md:pl-10 group">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-700 ring-[6px] ring-[#0d1117] group-hover:bg-cyan-400 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.6)] transition-all duration-300"></div>

                        {/* Left Column (Desktop Absolute Positioned) */}
                        <div className="md:absolute md:-left-[180px] md:top-0 md:w-[130px] md:text-right flex flex-col items-start md:items-end mb-4 md:mb-0 mt-1 md:mt-0">
                            {dates.length > 1 ? (
                                <div className="text-slate-500 font-mono text-[13px] leading-snug flex flex-col items-start md:items-end mb-2">
                                    <span className="text-slate-400 group-hover:text-cyan-400 transition-colors">{dates[0].trim()}</span>
                                    <span>— {dates[1].trim()}</span>
                                </div>
                            ) : (
                                <div className="text-slate-400 group-hover:text-cyan-400 transition-colors font-mono text-[13px] mb-2">
                                    {item.metadata.date}
                                </div>
                            )}
                            
                            {item.metadata.jobType && (
                                <div className="border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-mono tracking-widest px-2.5 py-1 rounded uppercase">
                                    {item.metadata.jobType}
                                </div>
                            )}
                        </div>

                        {/* Right Column Content */}
                        <div className="flex flex-col gap-3">
                            {/* Header */}
                            <div className="flex flex-col">
                                <h2 className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors flex items-center gap-2 tracking-wide mb-1">
                                    {item.metadata.title}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </h2>
                                
                                {(item.metadata.company || item.metadata.companyType) && (
                                    <div className="text-[13px] font-mono flex flex-wrap items-center gap-2">
                                        {item.metadata.company && <span className="text-cyan-400 font-semibold">{item.metadata.company}</span>}
                                        {item.metadata.company && item.metadata.companyType && <span className="text-slate-700">·</span>}
                                        {item.metadata.companyType && <span className="text-slate-500">{item.metadata.companyType}</span>}
                                    </div>
                                )}
                            </div>

                            {/* Stats Box */}
                            {item.metadata.stats && item.metadata.stats.length > 0 && (
                                <div className="my-3 p-4 rounded-xl border border-slate-800/80 bg-[#161b22]/30 backdrop-blur-sm grid grid-cols-3 divide-x divide-slate-800/80">
                                    {item.metadata.stats.map((stat: { value?: string; label?: string }, i: number) => (
                                        <div key={i} className="flex flex-col items-center justify-center text-center px-2">
                                            <div className="text-2xl font-bold text-cyan-400 mb-1 tracking-tight">{stat.value}</div>
                                            <div className="text-[10px] font-mono text-slate-500 tracking-[0.15em] uppercase whitespace-nowrap overflow-hidden text-ellipsis w-full">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Bullets */}
                            {item.metadata.bullets && item.metadata.bullets.length > 0 && (
                                <ul className="space-y-4 mt-2">
                                    {item.metadata.bullets.map((bullet: string, i: number) => (
                                        <li key={i} className="flex gap-4 items-start text-[14px] text-slate-400 leading-relaxed font-sans">
                                            <span className="text-slate-600 mt-1.5 opacity-80 text-xs shrink-0">→</span>
                                            <span>{renderBoldText(bullet)}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            
                            {/* Fallback to normal content if no bullets */}
                            {(!item.metadata.bullets || item.metadata.bullets.length === 0) && item.content && (
                                <p className="text-[14px] text-slate-400 leading-relaxed font-sans mt-2">
                                    {item.content}
                                </p>
                            )}

                            {/* Tech Stack */}
                            <ul className="flex flex-wrap gap-2 mt-4">
                                {item.metadata.tech.map((tech: string, i: number) => (
                                    <li key={i}>
                                        <div className="rounded-md px-3 py-1.5 text-[10px] font-mono tracking-widest font-semibold bg-slate-800/40 text-slate-400 border border-slate-700/50 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors">
                                            {tech.toUpperCase()}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
