"use client";

import Link from "next/link";
import { useRecovery } from "./hooks/useRecovery";

export default function PasswordRecoveryPage() {
    const { form, isLoading, globalError, isSent, onSubmit, resetSentState } = useRecovery();
    const { register, formState: { errors }, getValues } = form;
    const emailStr = getValues('email');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-2xl">H</span>
                    </div>
                </div>
                <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                    Reset your password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enter your email address and we will send you a link to reset your
                    password.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
                    {isSent ? (
                        <div className="rounded-md bg-green-50 p-4 border border-green-200 shadow-sm animate-in fade-in zoom-in duration-300">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-green-800">Email sent successfully</h3>
                                    <div className="mt-2 text-sm text-green-700">
                                        <p>We've sent a password reset link to <strong>{emailStr || "your email address"}</strong>. Please check your inbox.</p>
                                    </div>
                                    <div className="mt-4">
                                        <div className="-mx-2 -my-1.5 flex">
                                            <button
                                                type="button"
                                                onClick={resetSentState}
                                                className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 transition-colors"
                                            >
                                                Send another link
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={onSubmit}>
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
                                    Email address
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
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "Sending..." : "Send reset link"}
                                </button>
                            </div>
                        </form>
                    )}

                    {!isSent && (
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        Remembered your password?
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-6">
                        <Link
                            href="/login"
                            className="w-full flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                        >
                            Return to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
