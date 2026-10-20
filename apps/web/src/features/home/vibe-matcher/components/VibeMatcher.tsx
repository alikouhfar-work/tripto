'use client';

import { FC, useState } from 'react';
import { ArrowRight, Compass, Heart, RefreshCw, Sparkles, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Property } from '@/components/shared/PropertyCard';
import { PROPERTIES, QUIZ_QUESTIONS } from '@/features/home/vibe-matcher/data';

export const VibeMatcher: FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedStays, setMatchedStays] = useState<Property[] | null>(null);

  const handleSelectOption = (field: string, value: string) => {
    const updatedAnswers = { ...answers, [field]: value };
    setAnswers(updatedAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step completed - trigger analysis
      triggerAnalysis(updatedAnswers);
    }
  };

  const triggerAnalysis = (finalAnswers: Record<string, string>) => {
    setIsAnalyzing(true);
    setMatchedStays(null);

    setTimeout(() => {
      // Find matching properties from database
      const filtered = PROPERTIES.filter((property) => {
        const matchesVibe = property.tags.some(
          (t) =>
            t.toLowerCase() === finalAnswers.vibe.toLowerCase() ||
            property.amenities.some((a) =>
              a.toLowerCase().includes(finalAnswers.vibe.toLowerCase()),
            ),
        );
        const matchesTravelers = property.tags.some(
          (t) => t.toLowerCase() === finalAnswers.travelers.toLowerCase(),
        );
        const matchesClimate = property.tags.some(
          (t) =>
            t.toLowerCase() === finalAnswers.climate.toLowerCase() ||
            property.description.toLowerCase().includes(finalAnswers.climate.toLowerCase()),
        );

        // Dynamic fuzzy sorting scoring
        let score = 0;
        if (matchesVibe) score += 3;
        if (matchesTravelers) score += 2;
        if (matchesClimate) score += 2;

        // Add default score based on rating to guarantee some high-quality fallbacks
        score += property.rating;
        (property as any).tempScore = score;
        return true;
      });

      // Sort and pick top 3
      const sorted = [...filtered].sort((a: any, b: any) => b.tempScore - a.tempScore).slice(0, 3);
      setMatchedStays(sorted);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setMatchedStays(null);
    setIsAnalyzing(false);
  };

  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  return (
    <section
      id="ai-planner-section"
      className="relative overflow-hidden border-y border-slate-100 bg-gradient-to-b from-slate-50 to-white py-24"
    >
      {/* Visual background accents */}
      <div className="absolute top-1/2 left-0 h-64 w-64 -translate-y-1/2 rounded-full bg-blue-100/30 blur-3xl" />
      <div className="absolute top-1/3 right-0 h-72 w-72 -translate-y-1/2 rounded-full bg-amber-100/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-flex items-center space-x-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold tracking-wider text-amber-800 uppercase">
            <Compass
              className="animate-spin-slow h-3.5 w-3.5 text-amber-600"
              style={{ animationDuration: '6s' }}
            />
            <span>Vibe Matcher</span>
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Find Your Dream Escape
          </h2>
          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Take our quick 3-step interactive travel matchmaking quiz. Our custom curation algorithm
            scans all luxury villas, remote domes, and woodland cabins to find your ideal match.
          </p>
        </div>

        {/* Interactive Sandbox Container */}
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-100 bg-white p-6 shadow-xl sm:p-10">
          <AnimatePresence mode="wait">
            {/* 1. QUIZ ACTIVE STATE */}
            {!isAnalyzing && !matchedStays && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tracking-widest text-blue-600 uppercase">
                    Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <div className="flex space-x-1">
                    {QUIZ_QUESTIONS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === currentStep
                            ? 'w-8 bg-blue-600'
                            : i < currentStep
                              ? 'w-4 bg-blue-300'
                              : 'w-2 bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question */}
                <h3 className="font-display text-xl leading-tight font-bold text-slate-800 sm:text-2xl">
                  {currentQuestion.question}
                </h3>

                {/* Options Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = answers[currentQuestion.field] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectOption(currentQuestion.field, opt.value)}
                        className={`group flex items-start rounded-2xl border-2 p-5 text-left transition-all duration-300 focus:outline-none ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/50 shadow-md'
                            : 'border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50/50 hover:shadow-sm'
                        }`}
                      >
                        <span className="mr-4 text-3xl transition-transform group-hover:scale-110">
                          {opt.icon}
                        </span>
                        <div className="space-y-1">
                          <div
                            className={`text-sm font-bold ${isSelected ? 'text-blue-800' : 'text-slate-800 group-hover:text-blue-600'}`}
                          >
                            {opt.label}
                          </div>
                          <div className="text-xs leading-relaxed font-medium text-slate-400">
                            {opt.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Back button (Only after first step) */}
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex items-center space-x-1 text-xs font-bold text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    <span>← Go Back</span>
                  </button>
                )}
              </motion.div>
            )}

            {/* 2. ANALYZING LOADING STATE */}
            {isAnalyzing && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center space-y-6 py-12 text-center"
              >
                <div className="relative">
                  <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
                  <Sparkles className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-pulse text-amber-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-slate-800">
                    Curating Your Matches...
                  </h3>
                  <p className="max-w-sm text-xs font-medium text-slate-400">
                    Our travel curator engine is mapping your travel vibes ({answers.vibe} +{' '}
                    {answers.climate}) to find the most fitting luxury escapes.
                  </p>
                </div>
              </motion.div>
            )}

            {/* 3. RECOMMENDATIONS REVEALED */}
            {!isAnalyzing && matchedStays && (
              <motion.div
                key="matches"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-display flex items-center space-x-2 text-lg font-bold text-slate-800">
                      <Sparkles className="h-5 w-5 animate-spin fill-amber-500 text-amber-500" />
                      <span>Your Top Matches Found!</span>
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Based on: <span className="font-semibold text-slate-600">{answers.vibe}</span>{' '}
                      • <span className="font-semibold text-slate-600">{answers.travelers}</span> •{' '}
                      <span className="font-semibold text-slate-600">{answers.climate}</span>
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="flex cursor-pointer items-center space-x-1 rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 transition-all hover:scale-105 hover:text-blue-700 focus:outline-none"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Retake Quiz</span>
                  </button>
                </div>

                {/* Custom list of recommendations */}
                <div className="grid grid-cols-1 gap-4">
                  {matchedStays.map((property, idx) => {
                    // const isSaved = savedPropertyIds.includes(property.id);
                    return (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.15 }}
                        key={property.id}
                        // onClick={() => onSelectProperty(property)}
                        className="group relative flex cursor-pointer flex-col rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/30 sm:flex-row"
                      >
                        {/* Image */}
                        <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl sm:w-44">
                          {/*<img*/}
                          {/*  src={property.image}*/}
                          {/*  alt={property.name}*/}
                          {/*  referrerPolicy="no-referrer"*/}
                          {/*  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"*/}
                          {/*/>*/}
                          <div className="absolute top-2 left-2 rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-bold text-white">
                            #{idx + 1} Match
                          </div>
                        </div>

                        {/* Text */}
                        <div className="mt-4 flex flex-grow flex-col justify-between sm:mt-0 sm:ml-5">
                          <div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1.5">
                                <span className="rounded-md bg-blue-100/60 px-2 py-0.5 font-mono text-[10px] font-extrabold text-blue-700 uppercase">
                                  {property.type}
                                </span>
                                <div className="flex items-center font-mono text-xs font-bold text-amber-500">
                                  <Star className="mr-1 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                  <span>{property.rating}</span>
                                </div>
                              </div>

                              {/* Save heart */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // onToggleSaveProperty(property.id);
                                }}
                                className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:outline-none"
                              >
                                {/*<Heart*/}
                                {/*  className={`h-3.5 w-3.5 ${isSaved ? 'animate-heartBeat fill-rose-500 text-rose-500' : 'currentColor'}`}*/}
                                {/*/>*/}
                              </button>
                            </div>

                            <h4 className="font-display mt-2 text-base font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                              {property.title}
                            </h4>
                            <p className="text-xs font-medium text-slate-400">
                              {property.city}, {property.country}
                            </p>
                            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
                              {property.description}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t border-slate-200/50 pt-3">
                            <span className="text-xs font-bold text-slate-700">
                              From{' '}
                              <span className="font-mono text-sm font-black text-blue-600">
                                ${property.price}
                              </span>{' '}
                              / night
                            </span>
                            <span className="flex items-center space-x-0.5 text-xs font-bold text-blue-600 transition-transform group-hover:translate-x-1">
                              <span>Select Stay</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
