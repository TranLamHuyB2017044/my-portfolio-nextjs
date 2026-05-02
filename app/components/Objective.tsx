import React from 'react'

export default function Objective() {
    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Card 1: What I do */}
            <div className="relative flex items-start gap-5 p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-md transition-all duration-400 ease-out hover:translate-x-2 hover:border-teal-500/30 hover:bg-slate-800/80 hover:shadow-2xl hover:shadow-teal-900/10 group before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-teal-400 before:scale-y-0 before:origin-center hover:before:scale-y-100 before:transition-transform before:duration-400 before:ease-out overflow-hidden">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 font-mono text-lg font-semibold mt-0.5 group-hover:bg-teal-500/20 transition-colors">
                    ◇
                </div>
                <div>
                    <h3 className="text-base-1 font-semibold text-[1.1rem] mb-3 tracking-wide">What I do</h3>
                    <ul className="text-base-2 text-[0.95rem] space-y-2.5">
                        <li className="flex gap-3 items-start"><span className="text-teal-400 mt-0.5">▹</span><span className="leading-relaxed">Build Flutter apps with complex UI & gestures</span></li>
                        <li className="flex gap-3 items-start"><span className="text-teal-400 mt-0.5">▹</span><span className="leading-relaxed">Develop <strong className="text-base-1 font-semibold">OCR systems</strong> for real-world image data (ID cards, licenses, documents)</span></li>
                        <li className="flex gap-3 items-start"><span className="text-teal-400 mt-0.5">▹</span><span className="leading-relaxed">Implement <strong className="text-base-1 font-semibold">RAG pipelines</strong> for intelligent data retrieval</span></li>
                        <li className="flex gap-3 items-start"><span className="text-teal-400 mt-0.5">▹</span><span className="leading-relaxed">Build <strong className="text-base-1 font-semibold">Face AI systems</strong> for identity verification</span></li>
                    </ul>
                </div>
            </div>

            {/* Card 2: Experience */}
            <div className="relative flex items-start gap-5 p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-md transition-all duration-400 ease-out hover:translate-x-2 hover:border-sky-500/30 hover:bg-slate-800/80 hover:shadow-2xl hover:shadow-sky-900/10 group before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-sky-400 before:scale-y-0 before:origin-center hover:before:scale-y-100 before:transition-transform before:duration-400 before:ease-out overflow-hidden">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 font-mono text-lg font-semibold mt-0.5 group-hover:bg-sky-500/20 transition-colors">
                    △
                </div>
                <div>
                    <h3 className="text-base-1 font-semibold text-[1.1rem] mb-3 tracking-wide">Experience</h3>
                    <ul className="text-base-2 text-[0.95rem] space-y-2.5">
                        <li className="flex gap-3 items-start"><span className="text-sky-400 mt-0.5">▹</span><span className="leading-relaxed">2+ years building mobile apps</span></li>
                        <li className="flex gap-3 items-start"><span className="text-sky-400 mt-0.5">▹</span><span className="leading-relaxed">Delivered 5+ real products (chat app, OCR, AI systems)</span></li>
                        <li className="flex gap-3 items-start"><span className="text-sky-400 mt-0.5">▹</span><span className="leading-relaxed">Fullstack: Flutter + FastAPI + AI</span></li>
                        <li className="flex gap-3 items-start"><span className="text-sky-400 mt-0.5">▹</span><span className="leading-relaxed">End-to-end: deploy, API, database, CI/CD, Docker</span></li>
                    </ul>
                </div>
            </div>

            {/* Card 3: Focus */}
            <div className="relative flex items-start gap-5 p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-md transition-all duration-400 ease-out hover:translate-x-2 hover:border-indigo-500/30 hover:bg-slate-800/80 hover:shadow-2xl hover:shadow-indigo-900/10 group before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-indigo-400 before:scale-y-0 before:origin-center hover:before:scale-y-100 before:transition-transform before:duration-400 before:ease-out overflow-hidden">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-mono text-lg font-semibold mt-0.5 group-hover:bg-indigo-500/20 transition-colors">
                    ○
                </div>
                <div>
                    <h3 className="text-base-1 font-semibold text-[1.1rem] mb-3 tracking-wide">Focus</h3>
                    <ul className="text-base-2 text-[0.95rem] space-y-2.5">
                        <li className="flex gap-3 items-start"><span className="text-indigo-400 mt-0.5">▹</span><span className="leading-relaxed">Performance-first development</span></li>
                        <li className="flex gap-3 items-start"><span className="text-indigo-400 mt-0.5">▹</span><span className="leading-relaxed">Solving real-world problems</span></li>
                        <li className="flex gap-3 items-start"><span className="text-indigo-400 mt-0.5">▹</span><span className="leading-relaxed">Building systems, not just features</span></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
