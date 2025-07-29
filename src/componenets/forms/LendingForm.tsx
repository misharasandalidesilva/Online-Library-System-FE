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
            className="bg-green-50 p-6 rounded-xl shadow-md space-y-4 max-w-md mx-auto"
            style={{ border: '1px solid #a7f3d0' }} // subtle green border for better style
        >
            <div>
                <label className="block font-semibold mb-1 text-green-800">Select Book</label>
                <select
                    name="bookId"
                    value={formData.bookId}
                    onChange={handleChange}
                    className="w-full border border-green-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                >
                    <option value="">-- Select Book --</option>
                    {books.map((book) => (
                        <option key={book._id} value={book._id}>
                            {book.title}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block font-semibold mb-1 text-green-800">Select Reader</label>
                <select
                    name="readerId"
                    value={formData.readerId}
                    onChange={handleChange}
                    className="w-full border border-green-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                >
                    <option value="">-- Select Reader --</option>
                    {readers.map((reader) => (
                        <option key={reader._id} value={reader._id}>
                            {reader.first_name} {reader.last_name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block font-semibold mb-1 text-green-800">Lend Date</label>
                <input
                    name="lendDate"
                    type="date"
                    value={formData.lendDate}
                    onChange={handleChange}
                    className="w-full border border-green-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                />
            </div>

            <div>
                <label className="block font-semibold mb-1 text-green-800">Due Date</label>
                <input
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full border border-green-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />
            </div>

            <div>
                <label className="block font-semibold mb-1 text-green-800">Return Date</label>
                <input
                    name="returnDate"
                    type="date"
                    value={formData.returnDate || ""}
                    onChange={handleChange}
                    className="w-full border border-green-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                />
            </div>

            <div>
                <label className="block font-semibold mb-1 text-green-800">Status</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-green-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    <option value="borrowed">Borrowed</option>
                    <option value="returned">Returned</option>
                    <option value="late">Late</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-green-700 hover:to-green-600 transition"
            >
                Lend Book
            </button>
        </form>
    );
};

export default LendingForm;
