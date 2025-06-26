import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Clock, BookOpen, ExternalLink } from 'lucide-react';

export function PlaylistSection() {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const features = [
    {
      icon: BookOpen,
      title: "Theory & Fundamentals",
      description: "Learn the mathematical foundations of regular expressions and finite automata"
    },
    {
      icon: Play,
      title: "Step-by-Step Tutorials",
      description: "Follow along with detailed explanations of conversion algorithms"
    },
    {
      icon: Users,
      title: "Expert Instruction",
      description: "Learn from experienced computer science educators"
    },
    {
      icon: Clock,
      title: "Self-Paced Learning",
      description: "Watch at your own speed with pause, rewind, and replay"
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center justify-center space-x-3">
          <span className="text-3xl md:text-4xl">🎥</span>
          <span>Learn Regex & Automata - Video Guide</span>
        </h2>
        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
          Watch curated videos on regex theory, automata conversion, and visual simulation.
        </p>
      </motion.div>

      {/* Video Player Section */}
      <motion.div
        className="relative rounded-xl md:rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Loading Animation */}
        {isLoading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900/90 to-purple-900/90 z-10"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <motion.div
                className="w-12 h-12 md:w-16 md:h-16 border-4 border-red-500/30 border-t-red-500 rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.p
                className="text-white font-medium text-sm md:text-base"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              >
                Loading video playlist...
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* YouTube Playlist Embed */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl md:rounded-2xl"
            src="https://www.youtube.com/embed/videoseries?list=PLbRMhDVUMngcwWkzVTm_kFH6JW4JCtAUM&si=zTmC_ooWSNzpaPHs"
            title="Regex & Automata Video Playlist"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={handleIframeLoad}
          />
        </div>

        {/* Video Controls Overlay */}
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 md:px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white text-xs md:text-sm font-medium">Live Playlist</span>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2 text-xs text-slate-300">
              <Play className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Multiple Videos Available</span>
              <span className="sm:hidden">Videos</span>
            </div>
          </div>
        </motion.div>

        {/* External Link Button */}
        <motion.div
          className="absolute top-4 right-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.8 : 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.a
            href="https://youtube.com/playlist?list=PLbRMhDVUMngcwWkzVTm_kFH6JW4JCtAUM&si=zTmC_ooWSNzpaPHs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-2 bg-red-600/80 hover:bg-red-600 text-white text-xs md:text-sm font-medium rounded-lg backdrop-blur-sm transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Open in YouTube</span>
            <span className="sm:hidden">YouTube</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              className="p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20 p-2 md:p-3 mb-3 md:mb-4">
                <Icon className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Learning Path */}
      <motion.div
        className="p-6 md:p-8 rounded-xl bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">📚 Recommended Learning Path</h3>
          <p className="text-slate-300">Follow this sequence for the best learning experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              step: "1",
              title: "Regex Basics",
              description: "Start with fundamental regex patterns and syntax",
              color: "from-green-500 to-emerald-500"
            },
            {
              step: "2", 
              title: "Automata Theory",
              description: "Learn about NFAs, DFAs, and state machines",
              color: "from-blue-500 to-cyan-500"
            },
            {
              step: "3",
              title: "Conversion Algorithms", 
              description: "Master Thompson's construction and subset method",
              color: "from-purple-500 to-pink-500"
            }
          ].map((item, index) => (
            <motion.div
              key={item.step}
              className="relative p-4 md:p-6 rounded-lg bg-white/5 border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <div className={`absolute -top-2 -left-2 md:-top-3 md:-left-3 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                <span className="text-white font-bold text-xs md:text-sm">{item.step}</span>
              </div>
              <h4 className="text-base md:text-lg font-semibold text-white mb-2 ml-2">{item.title}</h4>
              <p className="text-slate-300 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="text-center p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Ready to Practice?</h3>
        <p className="text-slate-300 mb-4 text-sm md:text-base">
          After watching the videos, try building your own automata using the other sections of this tool!
        </p>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {['Build', 'Simulate', 'Optimize'].map((section, index) => (
            <motion.span
              key={section}
              className="px-3 md:px-4 py-1 md:py-2 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 text-xs md:text-sm font-medium border border-red-500/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              {section} Section
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}