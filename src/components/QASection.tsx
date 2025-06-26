import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Plus, User, GraduationCap, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  correctAnswer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'mcq' | 'short';
  options?: string[];
  createdAt: Date;
}

interface UserAnswer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  timestamp: Date;
}

type UserType = 'setter' | 'student' | null;

export function QASection() {
  const [userType, setUserType] = useState<UserType>(null);
  const [userCode, setUserCode] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ questionId: string; isCorrect: boolean; message: string } | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedQuestions = localStorage.getItem('qa-questions');
    const savedAnswers = localStorage.getItem('qa-answers');
    
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    } else {
      // Default questions
      const defaultQuestions: Question[] = [
        {
          id: '1',
          text: 'What does the regex pattern "a*" match?',
          correctAnswer: 'Zero or more occurrences of the character "a"',
          difficulty: 'Easy',
          type: 'short',
          createdAt: new Date()
        },
        {
          id: '2',
          text: 'Which of the following is true about NFAs?',
          correctAnswer: 'They can have epsilon transitions',
          difficulty: 'Medium',
          type: 'mcq',
          options: [
            'They are always deterministic',
            'They can have epsilon transitions',
            'They cannot be converted to DFAs',
            'They are less powerful than DFAs'
          ],
          createdAt: new Date()
        }
      ];
      setQuestions(defaultQuestions);
      localStorage.setItem('qa-questions', JSON.stringify(defaultQuestions));
    }
    
    if (savedAnswers) {
      setUserAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('qa-questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('qa-answers', JSON.stringify(userAnswers));
  }, [userAnswers]);

  const handleLogin = () => {
    if (userCode === 'TEACHER123') {
      setUserType('setter');
    } else if (userCode === 'STUDENT456' || userCode.startsWith('STU')) {
      setUserType('student');
    } else {
      alert('Invalid code! Use TEACHER123 for Question Setter or STUDENT456 for Student');
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setUserCode('');
    setSelectedQuestion(null);
    setCurrentAnswer('');
    setFeedback(null);
  };

  const addQuestion = (questionData: Omit<Question, 'id' | 'createdAt'>) => {
    const newQuestion: Question = {
      ...questionData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setQuestions([...questions, newQuestion]);
    setShowAddQuestion(false);
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const submitAnswer = (questionId: string, answer: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const isCorrect = answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
    
    const userAnswer: UserAnswer = {
      questionId,
      answer,
      isCorrect,
      timestamp: new Date()
    };

    setUserAnswers([...userAnswers.filter(ua => ua.questionId !== questionId), userAnswer]);
    setFeedback({
      questionId,
      isCorrect,
      message: isCorrect ? 'Correct! Well done!' : 'Try again. Think about the concept more carefully.'
    });
    setCurrentAnswer('');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (!userType) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center justify-center space-x-3">
            <HelpCircle className="w-8 h-8 text-cyan-400" />
            <span>Q&A System</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg">
            Interactive question and answer system for regex and automata learning
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          className="max-w-md mx-auto p-6 md:p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Choose Your Role</h3>
          
          <div className="space-y-4 mb-6">
            <input
              type="text"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              placeholder="Enter access code..."
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            
            <motion.button
              onClick={handleLogin}
              disabled={!userCode.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              whileHover={{ scale: userCode.trim() ? 1.02 : 1 }}
              whileTap={{ scale: userCode.trim() ? 0.98 : 1 }}
            >
              Login
            </motion.button>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-blue-300 font-medium">Question Setter</p>
                <p className="text-slate-400">Code: TEACHER123</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <User className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-green-300 font-medium">Student</p>
                <p className="text-slate-400">Code: STUDENT456</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row md:items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center space-x-3">
            {userType === 'setter' ? <GraduationCap className="w-8 h-8 text-blue-400" /> : <User className="w-8 h-8 text-green-400" />}
            <span>{userType === 'setter' ? 'Question Setter' : 'Student'} Dashboard</span>
          </h2>
          <p className="text-slate-300">
            {userType === 'setter' ? 'Create and manage questions' : 'Answer questions and test your knowledge'}
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          {userType === 'setter' && (
            <motion.button
              onClick={() => setShowAddQuestion(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Question</span>
            </motion.button>
          )}
          
          <motion.button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/10 text-slate-300 hover:bg-white/20 font-medium rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Logout
          </motion.button>
        </div>
      </motion.div>

      {/* Questions List */}
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {questions.map((question, index) => {
          const userAnswer = userAnswers.find(ua => ua.questionId === question.id);
          const questionFeedback = feedback?.questionId === question.id ? feedback : null;
          
          return (
            <motion.div
              key={question.id}
              className="p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                      {question.type.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{question.text}</h3>
                </div>
                
                {userType === 'setter' && (
                  <div className="flex items-center space-x-2 mt-2 md:mt-0">
                    <motion.button
                      onClick={() => deleteQuestion(question.id)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Question Options (for MCQ) */}
              {question.type === 'mcq' && question.options && userType === 'student' && (
                <div className="space-y-2 mb-4">
                  {question.options.map((option, optionIndex) => (
                    <motion.button
                      key={optionIndex}
                      onClick={() => submitAnswer(question.id, option)}
                      className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span className="text-slate-300">{String.fromCharCode(65 + optionIndex)}. {option}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Answer Input (for short answer or setter view) */}
              {((question.type === 'short' && userType === 'student') || userType === 'setter') && (
                <div className="space-y-3">
                  {userType === 'student' && (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        placeholder="Enter your answer..."
                        className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                      <motion.button
                        onClick={() => submitAnswer(question.id, currentAnswer)}
                        disabled={!currentAnswer.trim()}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        whileHover={{ scale: currentAnswer.trim() ? 1.02 : 1 }}
                        whileTap={{ scale: currentAnswer.trim() ? 0.98 : 1 }}
                      >
                        Submit
                      </motion.button>
                    </div>
                  )}
                  
                  {userType === 'setter' && (
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-green-300 font-medium">Correct Answer:</p>
                      <p className="text-white">{question.correctAnswer}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Feedback */}
              {questionFeedback && userType === 'student' && (
                <motion.div
                  className={`mt-4 p-3 rounded-lg border ${
                    questionFeedback.isCorrect 
                      ? 'bg-green-500/10 border-green-500/20' 
                      : 'bg-red-500/10 border-red-500/20'
                  }`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="flex items-center space-x-2">
                    {questionFeedback.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className={`font-medium ${
                      questionFeedback.isCorrect ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {questionFeedback.message}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Previous Answer */}
              {userAnswer && !questionFeedback && userType === 'student' && (
                <div className={`mt-4 p-3 rounded-lg border ${
                  userAnswer.isCorrect 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : 'bg-red-500/10 border-red-500/20'
                }`}>
                  <div className="flex items-center space-x-2">
                    {userAnswer.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className={`font-medium ${
                      userAnswer.isCorrect ? 'text-green-400' : 'text-red-400'
                    }`}>
                      Your answer: {userAnswer.answer}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Add Question Modal */}
      <AnimatePresence>
        {showAddQuestion && (
          <AddQuestionModal
            onClose={() => setShowAddQuestion(false)}
            onAdd={addQuestion}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Add Question Modal Component
interface AddQuestionModalProps {
  onClose: () => void;
  onAdd: (question: Omit<Question, 'id' | 'createdAt'>) => void;
}

function AddQuestionModal({ onClose, onAdd }: AddQuestionModalProps) {
  const [questionText, setQuestionText] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [questionType, setQuestionType] = useState<'mcq' | 'short'>('short');
  const [options, setOptions] = useState(['', '', '', '']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!questionText.trim() || !correctAnswer.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const questionData: Omit<Question, 'id' | 'createdAt'> = {
      text: questionText,
      correctAnswer,
      difficulty,
      type: questionType,
      ...(questionType === 'mcq' && { options: options.filter(opt => opt.trim()) })
    };

    onAdd(questionData);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-slate-900/90 backdrop-blur-sm border border-white/10 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-white mb-6">Add New Question</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Question Text</label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              rows={3}
              placeholder="Enter your question..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Question Type</label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value as 'mcq' | 'short')}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="short">Short Answer</option>
                <option value="mcq">Multiple Choice</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          {questionType === 'mcq' && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Options</label>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Correct Answer</label>
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Enter the correct answer..."
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <motion.button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/10 text-slate-300 hover:bg-white/20 font-medium rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add Question
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}