'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { authService } from '@/services/authService'

export default function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        setIsLoggedIn(authService.isAuthenticated())
    }, [])

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>

            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 text-center">
                <div className="max-w-4xl mx-auto animate-fadeIn">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-purple-300 text-xs sm:text-sm mb-6 sm:mb-8">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Hackathon II • Phase 2 Complete
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
                        TaskFlow
                        <span className="block gradient-text mt-2">
                            Full Stack Todo App
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 sm:mb-10 px-4">
                        JWT Authentication • User Data Isolation • PostgreSQL • Next.js + FastAPI
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 animate-fadeIn stagger-2">
                        {isLoggedIn ? (
                            <Link href="/dashboard" className="btn-primary text-center">
                                Go to Dashboard →
                            </Link>
                        ) : (
                            <>
                                <Link href="/signup" className="btn-primary text-center animate-pulse-glow">
                                    Get Started Free
                                </Link>
                                <Link href="/login" className="btn-secondary text-center">
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12 animate-fadeIn">
                        Phase 2 Requirements <span className="text-green-400">✓ Complete</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[
                            { icon: '🔐', title: 'JWT Authentication', desc: 'Secure token-based auth' },
                            { icon: '🛡️', title: 'Data Isolation', desc: 'Users see only their tasks' },
                            { icon: '💾', title: 'PostgreSQL', desc: 'Neon Serverless database' },
                            { icon: '⚡', title: 'Fast API', desc: 'No DB lookup for tokens' },
                            { icon: '📱', title: 'Responsive', desc: 'Works on all devices' },
                            { icon: '✨', title: 'Premium UI', desc: 'Glassmorphism design' },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className={`glass-card p-6 card-hover animate-fadeIn stagger-${i + 1}`}
                            >
                                <div className="text-3xl mb-4">{feature.icon}</div>
                                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-400 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-2xl mx-auto text-center glass-card p-8 sm:p-12 animate-fadeIn">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Start?</h2>
                    <p className="text-slate-300 mb-8">Create an account and manage your tasks securely.</p>
                    {!isLoggedIn && (
                        <Link href="/signup" className="btn-primary inline-block">
                            Create Free Account
                        </Link>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="relative px-4 sm:px-6 lg:px-8 py-8 border-t border-white/10 text-center">
                <p className="text-slate-500 text-sm">
                    Developer: <span className="text-purple-400">Ibrahim Tayyab</span>
                </p>
                <p className="text-slate-600 text-xs mt-2">Hackathon II • Phase 2 • 2026</p>
            </footer>
        </div>
    )
}
