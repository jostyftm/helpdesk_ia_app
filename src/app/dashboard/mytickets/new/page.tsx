"use client";

import Link from "next/link";
import { ArrowLeft, Paperclip, X, File as FileIcon, Image as ImageIcon, AlertCircle } from "lucide-react";
import { useTicketForm } from "../hooks/useTicketForm";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useState, useRef } from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false, loading: () => <div className="h-48 bg-slate-50 animate-pulse rounded-md border border-slate-200"></div> });

export default function NewTicketPage() {
    const { form, onSubmit, isSubmitting, globalError } = useTicketForm();
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const formatBytes = (bytes: number, decimals = 2) => {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            addFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            addFiles(Array.from(e.target.files));
        }
    };

    const addFiles = (newFiles: File[]) => {
        const currentFiles = form.getValues("files") || [];
        form.setValue("files", [...currentFiles, ...newFiles], { shouldValidate: true });
    };

    const removeFile = (index: number) => {
        const currentFiles = form.getValues("files") || [];
        const newFiles = [...currentFiles];
        newFiles.splice(index, 1);
        form.setValue("files", newFiles, { shouldValidate: true });
        // Reset input value to allow selecting same file again if removed
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) return <ImageIcon className="h-5 w-5 text-indigo-500" />;
        return <FileIcon className="h-5 w-5 text-slate-500" />;
    };

    const files = form.watch("files");

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="mb-6 flex items-center">
                <Link href="/dashboard/tickets" className="text-slate-400 hover:text-slate-600 mr-4 transition-colors p-2 hover:bg-slate-100 rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Crear Nuevo Ticket</h2>
                    <p className="mt-1 text-sm text-slate-500">Proporciona los detalles del caso para que podamos ayudarte.</p>
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-2xl border border-slate-200/60 p-6 md:p-8">
                {globalError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-600">
                        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div className="text-sm font-medium">{globalError}</div>
                    </div>
                )}

                <form className="space-y-6" onSubmit={onSubmit}>
                    {/* Subject Field */}
                    <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-1">
                            Asunto <span className="text-rose-500">*</span>
                        </label>
                        <p className="text-xs text-slate-500 mb-2">Describe brevemente el problema o solicitud.</p>
                        <input
                            {...form.register("subject")}
                            type="text"
                            className={`block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border outline-none transition-colors ${form.formState.errors.subject ? 'border-rose-300 bg-rose-50' : 'bg-slate-50/50 hover:bg-slate-50'}`}
                            placeholder="Ej. Error al procesar pago en la plataforma"
                        />
                        {form.formState.errors.subject && (
                            <p className="mt-1.5 text-xs font-medium text-rose-500">{form.formState.errors.subject.message}</p>
                        )}
                    </div>

                    {/* Description Field (WYSIWYG) */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Descripción <span className="text-rose-500">*</span>
                        </label>
                        <p className="text-xs text-slate-500 mb-2">Incluye pasos para reproducir, detalles, y contexto necesario.</p>
                        <div className={`rounded-xl overflow-hidden border transition-colors ${form.formState.errors.description ? 'border-rose-300' : 'border-slate-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'}`}>
                            <ReactQuill
                                theme="snow"
                                value={form.watch("description")}
                                onChange={(content) => form.setValue("description", content, { shouldValidate: true })}
                                className="bg-white min-h-[200px]"
                                placeholder="Detalles de la incidencia..."
                                modules={{
                                    toolbar: [
                                        [{ 'header': [1, 2, false] }],
                                        ['bold', 'italic', 'underline', 'strike'],
                                        [{'list': 'ordered'}, {'list': 'bullet'}],
                                        ['link', 'clean']
                                    ],
                                }}
                            />
                        </div>
                        {form.formState.errors.description && (
                            <p className="mt-1.5 text-xs font-medium text-rose-500">{form.formState.errors.description.message}</p>
                        )}
                    </div>

                    {/* File Attachments Drag & Drop */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Archivos Adjuntos</label>
                        <p className="text-xs text-slate-500 mb-2">Puedes adjuntar capturas de pantalla, pdfs o logs. Opcional.</p>
                        
                        <div 
                            className={`mt-2 flex justify-center rounded-xl border-2 border-dashed px-6 pt-5 pb-6 transition-all duration-200 ${dragActive ? 'border-indigo-500 bg-indigo-50 scale-[1.01]' : 'border-slate-300 hover:bg-slate-50 bg-slate-50/50'} ${form.formState.errors.files ? 'border-rose-300 bg-rose-50' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <div className="space-y-2 text-center pointer-events-none">
                                <div className={`mx-auto h-12 w-12 rounded-full flex items-center justify-center ${dragActive ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                                    <Paperclip className="h-6 w-6" />
                                </div>
                                <div className="flex text-sm text-slate-600 justify-center">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500 pointer-events-auto"
                                    >
                                        <span>Sube un archivo</span>
                                        <input 
                                            id="file-upload" 
                                            name="file-upload" 
                                            type="file" 
                                            className="sr-only" 
                                            multiple 
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                        />
                                    </label>
                                    <p className="pl-1">o arrástralo y suelta aquí</p>
                                </div>
                                <p className="text-xs text-slate-400 font-medium">Cualquier tipo de archivo válido. Máximo 5MB por archivo.</p>
                            </div>
                        </div>
                        {form.formState.errors.files && (
                            <p className="mt-1.5 text-xs font-medium text-rose-500">{form.formState.errors.files.message}</p>
                        )}

                        {/* Files Preview List */}
                        {files && files.length > 0 && (
                            <ul className="mt-4 space-y-2">
                                {files.map((file: File, index: number) => (
                                    <li key={index} className="flex items-center justify-between py-2 px-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            {getFileIcon(file.type)}
                                            <div className="flex flex-col overflow-hidden">
                                                <span className="text-sm font-medium text-slate-700 truncate">{file.name}</span>
                                                <span className={`text-[10px] font-semibold ${file.size > 5242880 ? 'text-rose-500' : 'text-slate-400'}`}>{formatBytes(file.size)}</span>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
                                            title="Eliminar archivo"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t border-slate-100">
                        <Link
                            href="/dashboard/tickets"
                            className="rounded-xl border border-slate-200 bg-white py-2.5 px-6 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`inline-flex justify-center rounded-xl bg-indigo-600 py-2.5 px-6 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creando Ticket...
                                </>
                            ) : (
                                "Crear Ticket"
                            )}
                        </button>
                    </div>
                </form>
            </div>
            
            {/* Override react-quill default weird borders */}
            <style jsx global>{`
                .ql-toolbar.ql-snow {
                    border: none !important;
                    border-bottom: 1px solid #e2e8f0 !important;
                    background-color: #f8fafc;
                    border-top-left-radius: 0.75rem;
                    border-top-right-radius: 0.75rem;
                    padding: 12px 16px !important;
                }
                .ql-container.ql-snow {
                    border: none !important;
                    font-family: inherit !important;
                    font-size: 0.875rem !important;
                }
                .ql-editor {
                    min-height: 200px;
                    padding: 16px !important;
                }
                .ql-editor p {
                    color: #334155;
                }
            `}</style>
        </div>
    );
}
