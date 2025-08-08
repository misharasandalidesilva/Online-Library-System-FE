import { Save, UserPlus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { Reader } from "../../types/Reader";

interface ReaderFormProps {
    reader: Reader | null;
    onSubmit: (readerData: Omit<Reader, "_id">) => void;
    onClose: () => void;
}

interface FormErrors {
    first_name?: string;
    last_name?: string;
    email?: string;
    age?: string;
    address?: string;
    phone?: string;
    join_date?: string;
}

const ReaderForm: React.FC<ReaderFormProps> = ({ reader, onSubmit, onClose }) => {
    const [formData, setFormData] = useState<Omit<Reader, "_id">>({
        first_name: "",
        last_name: "",
        email: "",
        age: 0,
        address: "",
        phone: "",
        join_date: "",
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (reader) {
            setFormData({
                first_name: reader.first_name,
                last_name: reader.last_name,
                email: reader.email,
                age: reader.age,
                address: reader.address,
                phone: reader.phone,
                join_date: reader.join_date,
            });
        } else {
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                age: 0,
                address: "",
                phone: "",
                join_date: "",
            });
        }
    }, [reader]);

    const validateForm = () => {
        const errors: FormErrors = {};
        if (!formData.first_name.trim()) errors.first_name = "Required";
        if (!formData.last_name.trim()) errors.last_name = "Required";
        if (!formData.email.trim()) errors.email = "Required";
        if (formData.age <= 0) errors.age = "Must be a valid age";
        if (!formData.phone.trim()) errors.phone = "Required";
        if (!formData.address.trim()) errors.address = "Required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "age" ? parseInt(value) || 0 : value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="fixed inset-0 bg-green-300 bg-opacity-40 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-green-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-t-2xl px-6 py-5 flex items-center justify-between text-white shadow-md">
                        <h3 className="text-xl font-bold flex items-center">
                            {/*<UserPlus className="w-6 h-6 mr-2" />*/}
                            {reader ? "Edit Reader" : "Add Reader"}
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="hover:bg-white hover:text-green-700 p-1 rounded-full transition duration-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-8 py-6 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                                {formErrors.first_name && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.first_name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                                {formErrors.last_name && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.last_name}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            {formErrors.email && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                                {formErrors.age && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.age}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                                {formErrors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={2}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            {formErrors.address && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Join Date</label>
                            <input
                                type="date"
                                name="join_date"
                                value={formData.join_date}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
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
                            {/*<Save className="w-4 h-4" />*/}
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ReaderForm;
