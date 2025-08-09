import React from 'react'


interface SectionButtonProps {
    text: string;
}


export default function SectionButton({ text }: SectionButtonProps) {
    return (
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only mb-8">{text}</h2>
    )
}
