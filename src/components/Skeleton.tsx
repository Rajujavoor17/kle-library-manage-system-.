import React from 'react';
import { motion } from 'motion/react';

export const BookSkeleton = () => {
  return (
    <div className="bg-surface border border-border-main rounded-[2.5rem] overflow-hidden p-3 animate-pulse">
      <div className="relative aspect-[3/4] rounded-[2rem] bg-white/5 overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent"></div>
      </div>
      <div className="px-6 pb-8 space-y-4">
        <div className="h-4 bg-white/5 rounded-full w-3/4"></div>
        <div className="h-3 bg-white/5 rounded-full w-1/2 opacity-60"></div>
        <div className="pt-4 flex gap-2">
          <div className="h-2 bg-white/5 rounded-full w-1/4"></div>
          <div className="h-2 bg-white/5 rounded-full w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export const DetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-20 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
        <div className="lg:col-span-4 aspect-[3/4] bg-white/5 rounded-[3rem] border border-white/10 shadow-2xl"></div>
        <div className="lg:col-span-8 space-y-8">
          <div className="h-4 bg-primary/10 rounded-full w-32"></div>
          <div className="space-y-4">
            <div className="h-24 bg-white/5 rounded-3xl w-full"></div>
            <div className="h-12 bg-white/5 rounded-full w-2/3"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-16 bg-white/5 rounded-3xl w-32"></div>
            <div className="h-16 bg-white/5 rounded-3xl w-32"></div>
            <div className="h-16 bg-white/5 rounded-3xl w-32"></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-40 bg-white/5 rounded-[2.5rem] border border-white/5"></div>
        ))}
      </div>
    </div>
  );
};

export const ClusterSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="h-64 bg-surface border border-border-main rounded-[3rem]"></div>
      ))}
    </div>
  );
};
