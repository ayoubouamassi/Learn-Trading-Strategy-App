/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Mail, Lock, LogIn, UserPlus, LogOut, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInAnonymously,
  signOut,
  User 
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { authTranslations } from "../data/authTranslations";
import { LanguageCode } from "../data/translations";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  currentUser: User | null;
  onSyncCompleted: (completedLessons: string[]) => void;
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  currentLanguage, 
  currentUser,
  onSyncCompleted 
}: AuthModalProps) {
  const t = authTranslations[currentLanguage] || authTranslations.en;
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess(t.progressSynced);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess(t.progressSynced);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError(t.invalidEmailOrPassword);
      } else {
        setError(err.message || "Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAuth = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await signInAnonymously(auth);
      setSuccess(t.progressSynced);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error("Guest Auth error:", err);
      setError(err.message || "Guest log in failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await signOut(auth);
      onClose();
    } catch (err: any) {
      console.error("Sign out error:", err);
      setError("Sign out failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="auth-modal-overlay">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
        id="auth-modal-backdrop"
      />

      {/* Content Card */}
      <div 
        className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-5 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        id="auth-modal-card"
      >
        {/* Decorative ambient light */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition"
          id="btn-close-auth-modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-1.5" id="auth-modal-header">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>{t.account}</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight" id="auth-modal-title">
            {currentUser ? t.account : t.authTitle}
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed" id="auth-modal-description">
            {currentUser ? `${t.loggedAs} ${currentUser.email || `Guest (${currentUser.uid.slice(0, 6)})`}` : t.authSubtitle}
          </p>
        </div>

        {/* If user is logged in, show account info and Sign Out option */}
        {currentUser ? (
          <div className="flex flex-col gap-4 mt-2" id="auth-logged-in-view">
            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{t.email}</span>
                  <span className="text-xs font-medium text-slate-200 truncate">
                    {currentUser.email || `Anonymous Guest (ID: ${currentUser.uid.slice(0, 8)}...)`}
                  </span>
                </div>
              </div>
              
              {currentUser.isAnonymous && (
                <div className="text-[11px] text-amber-400 bg-amber-500/5 border border-amber-500/20 p-2.5 rounded-lg flex gap-2">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{t.guestWarning}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-rose-950/40 hover:bg-rose-900/40 border border-rose-800/50 hover:border-rose-700/60 text-rose-300 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition disabled:opacity-50"
              id="btn-sign-out"
            >
              <LogOut size={14} />
              <span>{loading ? t.loading : t.signOut}</span>
            </button>
          </div>
        ) : (
          /* Sign In or Sign Up Form */
          <form onSubmit={handleEmailAuth} className="flex flex-col gap-4" id="auth-form">
            {/* Input fields */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider pl-1">{t.email}</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500/50 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition"
                    id="auth-input-email"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 relative">
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider pl-1">{t.password}</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500/50 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition"
                    id="auth-input-password"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-[11px] leading-normal" id="auth-error-msg">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-start gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl text-[11px] leading-normal" id="auth-success-msg">
                <CheckCircle size={14} className="shrink-0 mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-blue-500/15 transition disabled:opacity-50"
              id="btn-auth-submit"
            >
              {isSignUp ? <UserPlus size={14} /> : <LogIn size={14} />}
              <span>
                {loading ? t.loading : isSignUp ? t.signUp : t.signIn}
              </span>
            </button>

            {/* Toggle form type */}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="text-center text-[11px] text-gray-400 hover:text-white transition py-1"
              id="btn-toggle-auth-type"
            >
              {isSignUp ? t.alreadyHaveAccount : t.dontHaveAccount}
            </button>

            {/* OR Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="h-px flex-1 bg-slate-800" />
              <span className="text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest">{t.or}</span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            {/* Guest Login */}
            <button
              type="button"
              onClick={handleGuestAuth}
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition disabled:opacity-50"
              id="btn-auth-guest"
            >
              {t.guestSignIn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
