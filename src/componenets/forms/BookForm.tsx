import { Save, BookPlus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { Book } from "../../types/Book";

interface FormErrors {
    title?: string;
    author?: string;
    description?: string;
    quantity?: string;
    category?: string;
    publisher?: string;
    publishedDate?: string;
}

interface BookFormProps {
    book?: Book | null;
    onSubmit: (data: Omit<Book, "_id" | "timeStamp"> & { publishedDate?: Date }) => void;
    onClose: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSubmit, onClose }) => {
    const [formData, setFormData] = useState<Omit<Book, "_id" | "timeStamp"> & { publishedDate?: Date }>({
        title: "",
        author: "",
        description: "",
        category: "",
        publisher: "",
        publishedDate: new Date(),
        quantity: 0,
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title,
                author: book.author,
                description: book.description,
                category: book.category || "",
                publisher: book.publisher || "",
                publishedDate: book.publishedDate ? new Date(book.publishedDate) : new Date(),
                quantity: book.quantity,
            });
        } else {
            setFormData({
                title: "",
                author: "",
                description: "",
                category: "",
                publisher: "",
                publishedDate: new Date(),
                quantity: 0,
            });
        }
    }, [book]);

    const validateForm = () => {
        const errors: FormErrors = {};
        if (!formData.title.trim()) errors.title = "Required";
        if (!formData.author.trim()) errors.author = "Required";
        if (!formData.description.trim()) errors.description = "Required";
        if (formData.quantity <= 0) errors.quantity = "Must be greater than 0";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "quantity"
                    ? parseInt(value) || 0
                    : name === "publishedDate"
                        ? new Date(value)
                        : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="fixed inset-0 bg-green-300 bg-opacity-40 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-green-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-t-2xl px-6 py-5 flex items-center justify-between text-white shadow-md">
                        <h3 className="text-xl font-bold flex items-center">
                            {/*<BookPlus className="w-5 h-5 mr-2 text-green-600" />*/}
                            {book ? "Edit Book" : "Add Book"}
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="hover:bg-white hover:text-green-700 p-1 rounded-full transition duration-200"
                            aria-label="Close form"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-6 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
                                    formErrors.title ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Author </label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
                                    formErrors.author ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {formErrors.author && <p className="text-red-500 text-sm mt-1">{formErrors.author}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className={`w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${
                                    formErrors.description ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {formErrors.description && (
                                <p className="text-red-600 text-sm mt-1">{formErrors.description}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Quantity </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
                                        formErrors.quantity ? "border-red-500" : "border-gray-300"
                                    }`}
                                    min={0}
                                />
                                {formErrors.quantity && (
                                    <p className="text-red-600 text-sm mt-1">{formErrors.quantity}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                                <input
                                    type="text"
                                    name="publisher"
                                    value={formData.publisher}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
                                <input
                                    type="date"
                                    name="publishedDate"
                                    value={
                                        formData.publishedDate
                                            ? new Date(formData.publishedDate).toISOString().split("T")[0]
                                            : ""
                                    }
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end px-8 py-4 bg-gray-50 rounded-b-2xl space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border transition duration-200 bg-red-500 text-white rounded-lg hover:bg-red-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="ml-3 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 transition duration-200"
                        >
                            <span>Save Book</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default BookForm;
