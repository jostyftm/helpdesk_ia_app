"use client";

import Link from "next/link";
import { useLogin } from "./hooks/useLogin";

export default function LoginPage() {
    const { form, isLoading, globalError, onSubmit } = useLogin();
    const { register, formState: { errors } } = form;

    return (
        <div className="min-h-screen bg-white flex">
            {/* Left side - Login Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">H</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">HelpDesk IA</span>
                        </div>
                        <h2 className="mt-8 text-3xl font-extrabold text-gray-900 tracking-tight">
                            Bienvenido de nuevo
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Por favor ingresa tus datos para iniciar sesión
                        </p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={onSubmit} className="space-y-6">
                            {globalError && (
                                <div className="bg-red-50 p-3 rounded-md">
                                    <p className="text-sm text-red-600">{globalError}</p>
                                </div>
                            )}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Correo electrónico
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        {...register("email")}
                                        className={`appearance-none block w-full px-3 py-2.5 border ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent sm:text-sm transition-all duration-200`}
                                        placeholder="admin@helpdesk.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Contraseña
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        {...register("password")}
                                        className={`appearance-none block w-full px-3 py-2.5 border ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent sm:text-sm transition-all duration-200`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer transition-colors"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-2 block text-sm text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
                                    >
                                        Recordarme
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link
                                        href="/recovery"
                                        className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right side - Decorative background */}
            <div className="hidden lg:block relative w-0 flex-1 bg-gray-900">
                <div className="absolute inset-0 h-full w-full overflow-hidden">
                    {/* Abstract background graphics */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-gray-900 opacity-90" />
                    <svg className="absolute inset-0 h-full w-full opacity-20 transform -translate-x-1/4 scale-150" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
                </div>

                {/* Content on background */}
                <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-center">
                    <div className="space-y-6 max-w-lg">
                        <div className="inline-flex p-3 rounded-2xl bg-white/10 backdrop-blur-sm shadow-xl ring-1 ring-white/20 mb-4">
                            <svg className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            Potencia a tu equipo de soporte
                        </h1>
                        <p className="text-lg leading-8 text-gray-300">
                            Optimiza tu flujo de trabajo con resolución de tickets mediante IA, categorización inteligente y análisis detallados.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
