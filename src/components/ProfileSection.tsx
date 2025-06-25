import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, MapPin, Calendar, Code, Heart } from 'lucide-react';

export function ProfileSection() {
  const skills = [
    'React', 'TypeScript', 'Python', 'Machine Learning', 
    'Computer Vision', 'Web Development', 'Data Science', 'Algorithms'
  ];

  const achievements = [
    {
      title: "Regex Automata Visualizer",
      description: "Interactive tool for learning finite automata theory",
      icon: Code,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Open Source Contributor",
      description: "Contributing to various educational projects",
      icon: Github,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "CS Student & Educator",
      description: "Passionate about making complex concepts accessible",
      icon: Heart,
      color: "from-red-500 to-pink-500"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-white mb-3 flex items-center justify-center space-x-3">
          <span className="text-4xl">👤</span>
          <span>Developer Profile</span>
        </h2>
        <p className="text-slate-300 text-lg">
          Meet the creator behind this educational tool
        </p>
      </motion.div>

      {/* Main Profile Card */}
      <motion.div
        className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Profile Picture */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <img
                  src="https://github.com/Debayan-Ghosh2005/Debayan-Ghosh2005/blob/main/photo_2023-09-24_02-08-31.jpg?raw=true"
                  alt="Debayan Ghosh"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDE2MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjgwIiB5PSI4NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQ4IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ERzwvdGV4dD4KPC9zdmc+';
                  }}
                />
              </div>
              <motion.div
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </motion.div>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <motion.h3
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Debayan Ghosh
              </motion.h3>
              
              <motion.p
                className="text-xl text-blue-400 mb-4 font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                Full Stack Developer & CS Student
              </motion.p>

              <motion.p
                className="text-slate-300 mb-6 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                Passionate about creating educational tools that make complex computer science concepts 
                accessible and engaging. I believe in the power of visualization to enhance learning 
                and understanding of theoretical concepts.
              </motion.p>

              {/* Social Links */}
              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.a
                  href="https://github.com/Debayan-Ghosh2005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-lg transition-all duration-200 border border-gray-600/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5" />
                  <span className="font-medium">GitHub</span>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/feed/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600/50 hover:bg-blue-500/50 text-white rounded-lg transition-all duration-200 border border-blue-500/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="font-medium">LinkedIn</span>
                </motion.a>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center space-x-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <span>India</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>Student & Developer</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <Code className="w-4 h-4 text-purple-400" />
                  <span>Open Source Enthusiast</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Code className="w-6 h-6 text-blue-400" />
          <span>Technical Skills</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              className="px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <motion.div
              key={achievement.title}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${achievement.color} p-3 mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{achievement.title}</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{achievement.description}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-white mb-3">Let's Connect!</h3>
        <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
          Interested in collaborating on educational projects or discussing computer science concepts? 
          Feel free to reach out through GitHub or LinkedIn!
        </p>
        <motion.div
          className="flex justify-center space-x-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
        >
          <motion.a
            href="https://github.com/Debayan-Ghosh2005"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View GitHub Profile
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}