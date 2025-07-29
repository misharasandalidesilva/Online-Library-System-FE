import React from "react";
import type { Reader } from "../../types/Reader";

type ReaderTableProps = {
    readers: Reader[];
    onEdit: (reader: Reader) => void;
    onDelete: (reader: Reader) => void;
    isLoading?: boolean;
};

const ReaderTable: React.FC<ReaderTableProps> = ({
                                                     readers,
                                                     onEdit,
                                                     onDelete,
                                                     isLoading,
                                                 }) => {
    if (isLoading) return <p>Loading readers...</p>;

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-green-200">
                <thead className="bg-green-100">
                <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-green-700">First Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-green-700">Last Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-green-700">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-green-700">Age</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-green-700">Address</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-green-700">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-green-700">Join Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-green-700">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-green-100">
                {readers.length > 0 ? (
                    readers.map((reader) => (
                        <tr key={reader._id} className="hover:bg-green-50 transition">
                            <td className="px-6 py-4 text-sm text-green-900 font-medium">{reader.first_name}</td>
                            <td className="px-6 py-4 text-sm text-green-900 font-medium">{reader.last_name}</td>
                            <td className="px-6 py-4 text-sm text-green-800">{reader.email}</td>
                            <td className="px-6 py-4 text-sm text-green-800">{reader.age}</td>
                            <td className="px-6 py-4 text-sm text-green-800">{reader.address}</td>
                            <td className="px-6 py-4 text-sm text-green-800">{reader.phone}</td>
                            <td className="px-6 py-4 text-sm text-green-800">
                                {new Date(reader.join_date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-sm text-green-800 space-x-2">
                                <button
                                    onClick={() => onEdit(reader)}
                                    className="text-green-600 hover:text-green-800"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(reader)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={8} className="px-6 py-4 text-center text-green-500">
                            No readers found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ReaderTable;
