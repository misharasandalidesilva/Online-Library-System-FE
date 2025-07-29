import React from "react";

interface DialogProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    children: React.ReactNode;
    title?: string;
}

const Dialog = ({ isOpen, onCancel, onConfirm, children, title }: DialogProps) => {
    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] flex flex-col">
                {title && (
                    <div className="mb-6 flex-shrink-0">
                        <h2
                            id="dialog-title"
                            className="text-2xl font-semibold text-gray-900 select-none"
                        >
                            {title}
                        </h2>
                    </div>
                )}
                <div className="mb-8 flex-1 overflow-y-auto max-h-96 min-h-0 text-gray-700 leading-relaxed">
                    {children}
                </div>
                <div className="flex justify-end space-x-6 flex-shrink-0">
                    <button
                        onClick={onCancel}
                        className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 transition duration-200"
                    >
                        {/* Cancel Icon (X) */}
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        <span>Cancel</span>
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 transition duration-200"
                    >
                        {/* Confirm Icon (Check) */}
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Confirm</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
