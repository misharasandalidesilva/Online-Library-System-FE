import React from "react";
import type { Lending } from "../../types/Lending";

type Props = {
    records: Lending[];
};

const LendingTable: React.FC<Props> = ({ records }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-green-900 rounded-lg shadow-sm">
                <thead>
                <tr className="bg-green-600 text-white uppercase text-sm font-semibold tracking-wide">
                    <th className="p-3 text-left">Book ID</th>
                    <th className="p-3 text-left">Reader ID</th>
                    <th className="p-3 text-left">Lend Date</th>
                    <th className="p-3 text-left">Due Date</th>
                    <th className="p-3 text-left">Return Date</th>
                    <th className="p-3 text-left">Status</th>
                </tr>
                </thead>
                <tbody>
                {records.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="text-center p-6 text-gray-500 italic">
                            No lending records found.
                        </td>
                    </tr>
                ) : (
                    records.map((record) => (
                        <tr
                            key={record._id}
                            className="border-b border-gray-200 hover:bg-green-50 transition-colors"
                        >
                            <td className="p-3 text-gray-700 font-medium">{record.bookId}</td>
                            <td className="p-3 text-gray-700">{record.readerId}</td>
                            <td className="p-3 text-gray-700">{record.lendDate?.slice(0, 10)}</td>
                            <td className="p-3 text-gray-700">{record.dueDate?.slice(0, 10)}</td>
                            <td className="p-3 text-gray-700">{record.returnDate ? record.returnDate.slice(0, 10) : "-"}</td>
                            <td className={`p-3 font-semibold ${
                                record.status.toLowerCase() === 'returned' ? 'text-green-600' :
                                    record.status.toLowerCase() === 'overdue' ? 'text-red-600' : 'text-yellow-600'
                            }`}>
                                {record.status}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default LendingTable;
