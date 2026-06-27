/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BookOpen, CheckCircle, HelpCircle, GraduationCap, PlayCircle, ArrowLeft, Trophy, AlertCircle, Sparkles, Brain } from "lucide-react";
import { Lesson, QuizQuestion } from "../types";
import { TranslationSet, LanguageCode } from "../data/translations";
import MathEquation from "./MathEquation";
import ProbabilityTrainer from "./ProbabilityTrainer";

interface AcademyProps {
  lessons: Lesson[];
  onSelectPracticeScenario: (scenarioId: string) => void;
  completedLessons: string[];
  onCompleteLesson: (lessonId: string) => void;
  t: TranslationSet;
  currentLanguage: LanguageCode;
}

export default function Academy({
  lessons,
  onSelectPracticeScenario,
  completedLessons,
  onCompleteLesson,
  t,
  currentLanguage,
}: AcademyProps) {
  const [activeSubTab, setActiveSubTab] = useState<"syllabus" | "quant-trainer">("syllabus");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setQuizAnswers({});
    setQuizSubmitted({});
    setQuizScore(null);
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted[questionId]) return; // locked once submitted
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    if (!selectedLesson) return;
    const nextSubmitted = { ...quizSubmitted };
    let score = 0;

    selectedLesson.quizzes.forEach((q) => {
      nextSubmitted[q.id] = true;
      if (quizAnswers[q.id] === q.correctAnswerIndex) {
        score++;
      }
    });

    setQuizSubmitted(nextSubmitted);
    setQuizScore(score);

    // If score is perfect or passing, mark the lesson as completed!
    if (score === selectedLesson.quizzes.length) {
      onCompleteLesson(selectedLesson.id);
    }
  };

  const formatMarkdown = (md: string) => {
    // Split markdown by lines
    return md.split("\n").map((line, idx) => {
      const trimmed = line.trim();
      
      // 1. Math block equations wrapped in $$
      if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
        return (
          <div key={idx} className="my-4">
            <MathEquation equation={trimmed} block={true} />
          </div>
        );
      }
      
      if (trimmed.startsWith("###")) {
        return <h3 key={idx} className="text-base font-bold text-blue-300 mt-6 mb-3 border-b border-gray-900 pb-1">{trimmed.replace(/^###\s*/, "")}</h3>;
      }
      if (trimmed.startsWith("####")) {
        return <h4 key={idx} className="text-sm font-bold text-gray-200 mt-4 mb-2">{trimmed.replace(/^####\s*/, "")}</h4>;
      }
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        return (
          <li key={idx} className="ml-5 list-disc text-gray-300 text-xs my-1.5 leading-relaxed">
            {parseMathAndBold(trimmed.replace(/^[-*]\s*/, ""))}
          </li>
        );
      }
      if (trimmed.startsWith("> ")) {
        return (
          <div key={idx} className="bg-blue-950/40 border-l-4 border-blue-500 rounded-r-lg p-3 my-4 italic text-gray-300 text-xs leading-relaxed">
            {parseMathAndBold(trimmed.replace(/^>\s*/, ""))}
          </div>
        );
      }
      if (trimmed === "---") {
        return <hr key={idx} className="border-gray-800 my-5" />;
      }
      if (trimmed === "") {
        return <div key={idx} className="h-2" />;
      }
      return <p key={idx} className="text-gray-300 text-xs leading-relaxed my-2">{parseMathAndBold(trimmed)}</p>;
    });
  };

  const parseMathAndBold = (text: string) => {
    // 1. Split by bold text **bold**
    const boldParts = text.split(/\*\*([^*]+)\*\*/g);
    
    return boldParts.map((part, i) => {
      if (i % 2 === 1) {
        return (
          <strong key={i} className="font-semibold text-white">
            {parseInlineMath(part)}
          </strong>
        );
      }
      return <React.Fragment key={i}>{parseInlineMath(part)}</React.Fragment>;
    });
  };

  const parseInlineMath = (text: string) => {
    // Split by inline math: $...$ where the content contains letters/operators and is not a pure dollar value
    const mathRegex = /\$([a-zA-Z\\*_{}\^+\-\/=\s%]+)\$/g;
    const parts = text.split(mathRegex);
    if (parts.length === 1) return text;

    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        // Double check it's not a plain number price like "100" or "3.00"
        if (/^\d+(\.\d+)?$/.test(part)) {
          return `$${part}`;
        }
        return (
          <span key={idx}>
            <MathEquation equation={part} block={false} />
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full" id="academy-root-panel">
      {selectedLesson ? (
        /* --- LESSON DETAIL VIEW --- */
        <div className="flex flex-col gap-6" id="lesson-detail-container">
          {/* Header toolbar */}
          <div className="flex justify-between items-center bg-[#0F172A] border border-gray-800 p-4 rounded-xl">
            <button
              onClick={() => setSelectedLesson(null)}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
              id="btn-back-to-lessons"
            >
              <ArrowLeft size={14} />
              <span>{t.backToAcademy}</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded">
                {selectedLesson.category}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-gray-400 bg-gray-800 px-2.5 py-1 rounded">
                {selectedLesson.difficulty}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="lesson-grid">
            {/* Left Col: Masterclass material text */}
            <div className="lg:col-span-2 bg-[#0F172A] border border-gray-800 rounded-xl p-6" id="lesson-text-panel">
              <h1 className="text-lg font-bold text-white mb-2">{selectedLesson.title}</h1>
              <p className="text-xs text-gray-400 leading-relaxed mb-6 italic border-b border-gray-900 pb-3">
                {selectedLesson.summary}
              </p>

              <div className="space-y-1" id="markdown-body">
                {formatMarkdown(selectedLesson.contentMarkdown)}
              </div>

              {/* PRACTICE CALLOUT */}
              {selectedLesson.recommendedScenarioId && (
                <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-xl p-5 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex gap-3 items-start text-left">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 mt-1">
                      <GraduationCap size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{t.interactiveChallenge}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                        {t.practiceChallengeDesc}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectPracticeScenario(selectedLesson.recommendedScenarioId!)}
                    className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-xs transition shadow-lg shadow-blue-900/20 shrink-0"
                  >
                    <PlayCircle size={14} />
                    <span>{t.launchSimulator}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Col: Interactive Quiz panel */}
            <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-5 flex flex-col gap-4 self-start" id="lesson-quiz-panel">
              <div className="flex items-center gap-2 border-b border-gray-800 pb-3 mb-1">
                <HelpCircle size={16} className="text-blue-400" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                  {t.interactiveQuiz}
                </h4>
              </div>

              <div className="flex flex-col gap-6" id="quiz-questions-list">
                {selectedLesson.quizzes.map((q, idx) => {
                  const selectedOpt = quizAnswers[q.id];
                  const submitted = quizSubmitted[q.id];
                  const isCorrect = selectedOpt === q.correctAnswerIndex;

                  return (
                    <div key={q.id} className="flex flex-col gap-2.5 border-b border-gray-900 pb-4 last:border-0 last:pb-0" id={`quiz-q-${q.id}`}>
                      <span className="text-[10px] text-blue-400 font-mono font-bold uppercase tracking-wider">
                        Question {idx + 1}
                      </span>
                      <p className="text-xs text-gray-200 font-medium leading-relaxed">
                        {q.question}
                      </p>

                      <div className="flex flex-col gap-2 mt-1">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = selectedOpt === oIdx;
                          const showCorrect = submitted && oIdx === q.correctAnswerIndex;
                          const showIncorrect = submitted && isSelected && !isCorrect;

                          return (
                            <button
                              key={oIdx}
                              disabled={submitted}
                              onClick={() => handleSelectOption(q.id, oIdx)}
                              className={`text-left p-2.5 rounded-lg text-xs transition border font-medium ${
                                showCorrect
                                  ? "bg-emerald-500/10 border-emerald-500 text-emerald-300"
                                  : showIncorrect
                                  ? "bg-rose-500/10 border-rose-500 text-rose-300"
                                  : isSelected
                                  ? "bg-blue-600/10 border-blue-500 text-blue-200"
                                  : "bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                              } ${submitted ? "cursor-default" : "cursor-pointer"}`}
                            >
                              <div className="flex items-start gap-2">
                                <span className="font-mono font-bold text-[10px] bg-gray-950 px-1.5 py-0.5 rounded text-gray-400">
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span className="leading-relaxed">{opt}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Callout */}
                      {submitted && (
                        <div
                          className={`mt-2 p-3 rounded-lg text-[11px] leading-relaxed border ${
                            isCorrect
                              ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-400"
                              : "bg-rose-500/5 border-rose-500/10 text-rose-400"
                          }`}
                        >
                          <div className="flex gap-1.5 items-start">
                            {isCorrect ? <CheckCircle size={12} className="shrink-0 mt-0.5" /> : <AlertCircle size={12} className="shrink-0 mt-0.5" />}
                            <span className="font-semibold">{isCorrect ? t.correctLabel : t.incorrectLabel}</span>
                          </div>
                          <p className="text-gray-400 mt-1">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit / Score summary */}
              <div className="border-t border-gray-800 pt-4 mt-2 flex flex-col gap-3">
                {quizScore !== null ? (
                  <div className="bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border border-blue-500/15 rounded-xl p-4 text-center flex flex-col gap-1">
                    <Trophy className="text-amber-400 mx-auto mb-1.5" size={24} />
                    <span className="text-xs font-bold text-white">{t.quizCompleted}</span>
                    <span className="text-lg font-extrabold text-blue-400 font-mono">
                      {quizScore} / {selectedLesson.quizzes.length}
                    </span>
                    <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                      {quizScore === selectedLesson.quizzes.length
                        ? t.perfectScoreDesc
                        : t.keepPracticingDesc}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(quizAnswers).length < selectedLesson.quizzes.length}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-xs transition disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blue-950/20"
                  >
                    {t.submitAnswers}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* --- ACADEMY CURRICULUM LIST / QUANT LAB TRAINER --- */
        <div className="flex flex-col gap-6" id="academy-syllabus">
          {/* Main header banner */}
          <div className="bg-gradient-to-r from-blue-900/10 to-indigo-900/10 border border-gray-800 p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-left flex gap-3 items-center">
              <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400">
                <GraduationCap size={24} />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">{t.academyTitle}</h2>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                  {t.academySubtitle}
                </p>
              </div>
            </div>
            {/* Progress counter */}
            <div className="bg-[#0B0F19]/80 border border-gray-800 p-3 rounded-lg flex items-center gap-3 font-mono text-xs shrink-0">
              <span className="text-gray-500">{t.masteryProgress}:</span>
              <span className="font-bold text-emerald-400">
                {completedLessons.length} / {lessons.length} {t.completedStatus}
              </span>
            </div>
          </div>

          {/* Sub-tab switcher */}
          <div className="flex border-b border-gray-800 gap-6 mt-1" id="academy-subtabs">
            <button
              onClick={() => setActiveSubTab("syllabus")}
              className={`flex items-center gap-1.5 pb-3 text-xs font-bold tracking-wider transition relative ${
                activeSubTab === "syllabus"
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <BookOpen size={13} />
              <span>{t.interactiveSyllabus}</span>
              {activeSubTab === "syllabus" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
            <button
              onClick={() => setActiveSubTab("quant-trainer")}
              className={`flex items-center gap-1.5 pb-3 text-xs font-bold tracking-wider transition relative ${
                activeSubTab === "quant-trainer"
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Brain size={13} className="text-amber-400" />
              <span className="flex items-center gap-1.5">
                <span>{t.quantLab}</span>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full select-none">
                  {t.newBadge}
                </span>
              </span>
              {activeSubTab === "quant-trainer" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
          </div>

          {activeSubTab === "syllabus" ? (
            /* Traditional Lessons Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200" id="lessons-curriculum-list">
              {lessons.map((lesson) => {
                const isCompleted = completedLessons.includes(lesson.id);

                return (
                  <div
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson)}
                    className="bg-[#0F172A] border border-gray-800 hover:border-blue-500/50 rounded-xl p-5 cursor-pointer transition flex flex-col justify-between group"
                    id={`lesson-card-${lesson.id}`}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                        <span className="bg-gray-900 px-2 py-0.5 rounded text-blue-400 font-bold border border-blue-500/10 uppercase">
                          {lesson.category}
                        </span>
                        <span className="bg-gray-900 px-2 py-0.5 rounded uppercase font-bold">
                          {lesson.difficulty}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white mt-1 group-hover:text-blue-400 transition">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed mt-1">
                        {lesson.summary}
                      </p>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-900 pt-4 mt-4 text-[10px] font-semibold text-gray-400">
                      <span className="flex items-center gap-1 group-hover:text-white transition">
                        <BookOpen size={12} />
                        <span>{t.startLesson}</span>
                      </span>

                      {isCompleted ? (
                        <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-mono text-[9px] uppercase font-bold">
                          <CheckCircle size={10} />
                          <span>{t.masteredStatus}</span>
                        </span>
                      ) : (
                        <span className="text-gray-600 font-mono">0/1 {t.completedStatus}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Probability Trainer Quant Lab */
            <div className="animate-in fade-in duration-200">
              <ProbabilityTrainer t={t} currentLanguage={currentLanguage} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
