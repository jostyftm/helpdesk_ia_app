"use client";

import Link from "next/link";
import { Suspense } from "react";

import { useResetPassword } from "./hooks/useResetPassword";

// Form Component
function ResetPasswordForm() {
    const { form, isLoading, globalError, isSuccess, onSubmit } = useResetPassword();
    const { register, formState: { errors } } = form;

    if (isSuccess) {
        return (
            <div className="rounded-md bg-green-50 p-4 border border-green-200 shadow-sm animate-in fade-in zoom-in duration-300">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Restablecimiento de contraseña completo</h3>
                        <div className="mt-2 text-sm text-green-700">
                            <p>Tu contraseña ha sido actualizada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.</p>
                        </div>
                        <div className="mt-4">
                            <Link
                                href="/login"
                                className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 transition-colors"
                            >
                                Continuar a inicio de sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form className="space-y-6" onSubmit={onSubmit}>
            {globalError && (
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{globalError}</p>
                            </div>
                        </div>
                    </div>
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
                        readOnly
                        {...register("email")}
                        className="appearance-none block w-full px-3 py-2.5 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                        placeholder="Cargando correo electrónico..."
                    />
                    <input type="hidden" {...register("token")} />
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                    )}
                    {errors.token && (
                        <p className="mt-2 text-sm text-red-600">{errors.token.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Nueva Contraseña
                </label>
                <div className="mt-1">
                    <input
                        id="password"
                        type="password"
                        {...register("password")}
                        className={`appearance-none block w-full px-3 py-2.5 border ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent sm:text-sm transition-all duration-200`}
                        placeholder="••••••••"
                    />
                </div>
                {errors.password ? (
                    <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                ) : (
                    <p className="mt-2 text-xs text-gray-500">
                        Debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                >
                    Confirmar Contraseña
                </label>
                <div className="mt-1">
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register("password_confirmation")}
                        className={`appearance-none block w-full px-3 py-2.5 border ${errors.password_confirmation ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent sm:text-sm transition-all duration-200`}
                        placeholder="••••••••"
                    />
                </div>
                {errors.password_confirmation && (
                    <p className="mt-2 text-sm text-red-600">{errors.password_confirmation.message}</p>
                )}
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Actualizando..." : "Actualizar Contraseña"}
                </button>
            </div>

            <div className="mt-6 flex justify-center">
                <Link
                    href="/login"
                    className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
                >
                    Cancelar y volver al inicio de sesión
                </Link>
            </div>
        </form>
    );
}

// Main Page Exports
export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-2xl">H</span>
                    </div>
                </div>
                <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                    Actualiza tu contraseña
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Crea una nueva contraseña segura para tu cuenta.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
                    <Suspense fallback={
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    }>
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
