import Link from "next/link";
import { ArrowLeft, Paperclip } from "lucide-react";

export default function NewTicketPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8">
            <div className="mb-6 flex items-center">
                <Link href="/dashboard" className="text-gray-400 hover:text-gray-500 mr-4 transition-colors">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Create New Ticket</h2>
                    <p className="mt-1 text-sm text-gray-500">Please provide detailed information about your issue.</p>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg border border-gray-100 p-6">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                            Subject
                        </label>
                        <p className="text-xs text-gray-500 mb-2">Briefly describe the issue.</p>
                        <input
                            type="text"
                            name="subject"
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 border"
                            placeholder="e.g. Cannot connect to VPN"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <p className="text-xs text-gray-500 mb-2">Include steps to reproduce, error messages, and what you've tried so far.</p>
                        <textarea
                            name="description"
                            rows={6}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 border"
                            placeholder="Detailed description here..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Attachments</label>
                        <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 hover:bg-gray-50 transition-colors">
                            <div className="space-y-1 text-center">
                                <Paperclip className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600 justify-center">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                        <Link
                            href="/dashboard"
                            className="rounded-md border border-gray-300 bg-white py-2 px-6 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            Submit Ticket
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
