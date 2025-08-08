import { useState, type FormEvent } from "react";
import type { Lending } from "../../types/Lending";
import type { Reader } from "../../types/Reader";
import type { Book } from "../../types/Book";

type Props = {
    onSubmit: (data: Lending) => void;
    books: Book[];
    readers: Reader[];
};

const LendingForm: React.FC<Props> = ({ onSubmit, books, readers }) => {
    const [formData, setFormData] = useState<Lending>({
        bookId: "",
        readerId: "",
        lendDate: "",
        dueDate: "",
        returnDate: "",
        status: "borrowed",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            bookId: "",
            readerId: "",
            lendDate: "",
            dueDate: "",
            returnDate: "",
            status: "borrowed",
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="backdrop-blur-sm bg-green/70 border border-green-200 p-8 rounded-2xl shadow-2xl space-y-6 max-w-xl mx-auto mt-10 transition-all duration-300"
        >
            <h2 className="text-2xl font-bold text-green-800 text-center mb-2 tracking-tight">
                 Lend a Book
            </h2>

            {/* Book Selection */}
            <div>
                <label className="block font-medium text-green-700 mb-2"> Select Book</label>
                <select
                    name="bookId"
                    value={formData.bookId}
                    onChange={handleChange}
                    className="w-full p-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    required
                >
                    <option value=""> Select Book </option>
                    {books.map((book) => (
                        <option key={book._id} value={book._id}>
                            {book.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Reader Selection */}
            <div>
                <label className="block font-medium text-green-700 mb-2"> Select Reader</label>
                <select
                    name="readerId"
                    value={formData.readerId}
                    onChange={handleChange}
                    className="w-full p-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    required
                >
                    <option value=""> Select Reader </option>
                    {readers.map((reader) => (
                        <option key={reader._id} value={reader._id}>
                            {reader.first_name} {reader.last_name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium text-green-700 mb-2"> Lend Date</label>
                    <input
                        name="lendDate"
                        type="date"
                        value={formData.lendDate}
                        onChange={handleChange}
                        className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    />
                </div>
                <div>
                    <label className="block font-medium text-green-700 mb-2"> Due Date</label>
                    <input
                        name="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block font-medium text-green-700 mb-2"> Return Date</label>
                <input
                    name="returnDate"
                    type="date"
                    value={formData.returnDate || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
            </div>

            {/* Status */}
            <div>
                <label className="block font-medium text-green-700 mb-2"> Status</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                >
                    <option value="borrowed">Borrowed</option>
                    <option value="returned">Returned</option>
                    <option value="late">Late</option>
                </select>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold shadow-md transition-transform transform hover:scale-105"
            >
                 Lend Book
            </button>
        </form>
    );

};

export default LendingForm;
