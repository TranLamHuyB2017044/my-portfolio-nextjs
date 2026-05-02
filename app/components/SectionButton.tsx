import React from 'react'

interface SectionButtonProps {
    text: string;
    number: string;
}

export default function SectionButton({ text, number }: SectionButtonProps) {
    return (
        <div className="flex items-center gap-6 mb-10 w-full">
            <span className="text-slate-600 font-mono text-sm tracking-widest">{number}</span>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">{text}</h2>
            <div className="flex-grow h-[1px] bg-slate-800/80"></div>
        </div>
    )
}
