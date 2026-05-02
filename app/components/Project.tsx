"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectPost } from '../utils/MarkdownUtils';

export default function Project() {
  const [projects, setProjects] = useState<ProjectPost[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data: ProjectPost[] = await res.json();
        // Ignore template files
        setProjects(data.filter(p => !p.slug.startsWith('_')));
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="w-full">
      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start"
      >
        <AnimatePresence mode="popLayout">
          {projects.map((item, index) => (
            <ProjectCard 
              key={item.slug} 
              project={item} 
              index={index}
              isExpanded={expandedId === item.slug}
              onToggleExpand={() => setExpandedId(expandedId === item.slug ? null : item.slug)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index, isExpanded, onToggleExpand }: { project: ProjectPost, index: number, isExpanded: boolean, onToggleExpand: () => void }) {
  const meta = project.metadata;
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedImgIdx, setSelectedImgIdx] = useState<number | null>(null);
  
  const typeColors: Record<string, string> = {
    mobile: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    ai: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    web: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    '': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };
  const badgeClass = typeColors[meta.typeClass || ''] || typeColors[''];

  const rawCover = meta.thumbnail || (meta.images && meta.images.length > 0 ? meta.images[0] : null);
  
  const getImageUrl = (path: string | null) => {
    if (!path) return '';
    return path.startsWith('/') || path.startsWith('http') ? path : `/images/${path}`;
  };

  const coverImage = getImageUrl(rawCover);

  const handlePrevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImgIdx === null || !meta.images) return;
    setSelectedImgIdx((selectedImgIdx - 1 + meta.images.length) % meta.images.length);
  };

  const handleNextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImgIdx === null || !meta.images) return;
    setSelectedImgIdx((selectedImgIdx + 1) % meta.images.length);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={`relative group flex flex-col rounded-xl overflow-hidden bg-[#0c1525] border border-[#1a2840] hover:border-[#00b4d8] transition-all duration-300 ${!isExpanded ? 'hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,180,216,0.12)]' : ''}`}
    >
      {/* Thumbnail Area */}
      <div 
        className="relative h-[180px] w-full bg-[#080e1e] cursor-pointer overflow-hidden"
        onClick={onToggleExpand}
      >
        {coverImage ? (
          <Image 
            src={coverImage} 
            alt={meta.title || 'Project thumbnail'} 
            fill 
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <span className="text-4xl font-black tracking-tighter text-[#1a2840]">{meta.thumb || 'PROJ'}</span>
          </div>
        )}
        
        {/* Overlay hint */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1525] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="text-[#00b4d8] text-xs font-mono uppercase tracking-widest translate-y-2 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-md">
            {isExpanded ? 'Collapse panel' : 'View details'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-[#f0f4ff] tracking-tight line-clamp-1">{meta.title}</h3>
          {meta.type && (
            <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded border ${badgeClass} whitespace-nowrap ml-2`}>
              {meta.type}
            </span>
          )}
        </div>
        
        <p className="text-[#4a6880] text-sm mb-4 leading-relaxed line-clamp-2 min-h-[40px]">
          {meta.desc}
        </p>
        
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto mb-4">
          {meta.tags?.map(tag => {
            const isCore = meta.coreTags?.includes(tag);
            return (
              <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-sm font-mono ${isCore ? 'bg-[#1a2840] text-[#00b4d8]' : 'bg-[#080e1e] text-[#2a5070]'}`}>
                {tag}
              </span>
            );
          })}
        </div>
        
        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#1a2840]">
          <button 
            onClick={onToggleExpand}
            className="text-[#4a6880] hover:text-[#00b4d8] transition-colors text-sm font-medium flex items-center gap-1"
          >
            {isExpanded ? 'Less info' : 'More info'}
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className="flex gap-3">
            {meta.githubUrl && (
              <a href={meta.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub Repository" className="text-[#4a6880] hover:text-[#f0f4ff] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            )}
            {meta.demoUrl && (
              <a href={meta.demoUrl} target="_blank" rel="noreferrer" aria-label="Live Demo" className="text-[#4a6880] hover:text-[#00b4d8] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Expand Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden bg-[#080e1e] border-t border-[#1a2840]"
          >
            <div className="p-5 pt-4">
              {/* Image Strip */}
              {meta.images && meta.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-3 mb-3 scrollbar-thin scrollbar-thumb-[#1a2840] scrollbar-track-transparent">
                  {meta.images.slice(1).map((img, i) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedImgIdx(i + 1)}
                      className="flex-shrink-0 relative w-32 h-20 rounded border border-[#1a2840] overflow-hidden cursor-pointer hover:border-[#00b4d8] transition-colors group/img"
                    >
                      <Image src={getImageUrl(img)} alt={`${meta.title} screenshot ${i}`} fill className="object-cover group-hover/img:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white opacity-0 group-hover/img:opacity-100 transition-opacity drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Stats Row */}
              {meta.stats && meta.stats.length > 0 && (
                <div className="flex justify-between border-b border-[#1a2840] pb-3 mb-4">
                  {meta.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[#00b4d8] font-bold text-lg">{stat.n}</span>
                      <span className="text-[#2a5070] text-[10px] font-mono uppercase tracking-wider">{stat.l}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlights */}
              {meta.highlights && meta.highlights.length > 0 && (
                <ul className="space-y-2.5 mb-5">
                  {meta.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#4a6880] leading-relaxed items-start">
                      <span className="text-[#00b4d8] mt-0.5 opacity-70">→</span>
                      <span dangerouslySetInnerHTML={{ __html: h.replace(/<b>/g, '<b class="text-[#f0f4ff] font-medium">').replace(/<\/b>/g, '</b>') }} />
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA Buttons */}
              <div className="flex gap-2 w-full mt-2">
                {meta.demoUrl && (
                  <a href={meta.demoUrl} target="_blank" rel="noreferrer" className="flex-1 py-2 px-1 flex items-center justify-center gap-1.5 rounded border border-[#1a2840] bg-transparent text-[#4a6880] hover:text-[#f0f4ff] hover:border-[#4a6880] transition-colors text-[11px] font-medium whitespace-nowrap uppercase tracking-wider">
                    Landing page
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                )}
                {meta.videoUrl && (
                  <button onClick={() => setIsVideoOpen(true)} className="flex-1 py-2 px-1 flex items-center justify-center gap-1.5 rounded bg-cyan-500/10 text-[#00b4d8] border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors text-[11px] font-medium whitespace-nowrap uppercase tracking-wider">
                    View live demo
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isVideoOpen && meta.videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-[#080e1e]/95 backdrop-blur-sm"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video bg-[#0c1525] rounded-xl overflow-hidden border border-[#1a2840] shadow-2xl"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[#080e1e]/60 text-[#f0f4ff] hover:bg-[#00b4d8] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
              <video 
                src={getImageUrl(meta.videoUrl)} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal Overlay */}
      <AnimatePresence>
        {selectedImgIdx !== null && meta.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10 bg-[#080e1e]/95 backdrop-blur-sm"
            onClick={() => setSelectedImgIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-[85vh] bg-transparent rounded-xl flex items-center justify-center group/modal"
            >
              <button 
                onClick={() => setSelectedImgIdx(null)}
                className="absolute top-0 right-0 md:-top-6 md:-right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#0c1525] border border-[#1a2840] text-[#f0f4ff] hover:bg-[#00b4d8] transition-colors shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>

              {/* Navigation Arrows */}
              {meta.images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImg}
                    className="absolute left-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-[#0c1525]/60 text-[#f0f4ff] border border-[#1a2840] hover:bg-[#00b4d8] hover:border-[#00b4d8] transition-all opacity-0 group-hover/modal:opacity-100 -translate-x-4 group-hover/modal:translate-x-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button 
                    onClick={handleNextImg}
                    className="absolute right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-[#0c1525]/60 text-[#f0f4ff] border border-[#1a2840] hover:bg-[#00b4d8] hover:border-[#00b4d8] transition-all opacity-0 group-hover/modal:opacity-100 translate-x-4 group-hover/modal:translate-x-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}

              <div className="relative w-full h-full">
                <Image src={getImageUrl(meta.images[selectedImgIdx])} alt="Expanded screenshot" fill className="object-contain drop-shadow-2xl" />
              </div>

              {/* Pagination Info */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0c1525]/80 border border-[#1a2840] text-[#4a6880] text-xs font-mono">
                {selectedImgIdx + 1} / {meta.images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
