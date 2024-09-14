import { useState } from "react";
import CyclicService from "../../services/CyclicService";

export default function CyclicView() {
    const [cyclic, setCyclic] = useState(null);
    const [formData, setFormData] = useState({ rows: 5, columns: 5 });
    const [submittedColumns, setSubmittedColumns] = useState();

    async function getCyclic() {
        try {
            const response = await CyclicService.get(formData.rows, formData.columns);
            setCyclic(response);
        } catch (e) {
            console.error(e);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedColumns(formData.columns);
        getCyclic();
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: Number(value) }));
    };

    return (
        <div className="container mx-auto py-4 grid grid-cols-1 2xl:grid-cols-2">
            <div className="grid grid-flow-col items-center justify-center">
                <span className="text-4xl font-bold rotate-90 text-gray-800">INPUT</span>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {["rows", "columns"].map((field, index) => (
                        <div key={index} className="grid text-2xl">
                            <label className="font-bold" htmlFor={field}>
                                {field === "rows" ? "ROWS" : "COLUMNS"}
                            </label>
                            <input
                                type="number"
                                id={field}
                                value={formData[field]}
                                max={10}
                                onChange={handleInputChange}
                                className="mt-2 h-[40px] w-[200px] rounded-md border-2 border-gray-800 text-center font-bold focus:ring-0"
                            />
                        </div>
                    ))}
                    <button type="submit" className="bg-green-700 text-white text-2xl font-bold rounded-md px-4 py-2">
                        CREATE TABLE
                    </button>
                </form>
            </div>

            <div className="flex flex-row items-center justify-center">
                {cyclic && (
                    <>
                        <span className="text-4xl font-bold rotate-90 text-gray-800">OUTPUT</span>
                        <div className="grid overflow-x-auto mt-2" style={{ gridTemplateColumns: `repeat(${submittedColumns}, 85px)` }}>
                            {cyclic.data.map((row, index) =>
                                row.map(({ cellNumber, cellBgColor, cellUp, cellDown, cellLeft, cellRight }, cellIndex) => (
                                    <div
                                        key={`${index}-${cellIndex}`}
                                        className="relative border-2 border-gray-400 rounded flex items-center justify-center"
                                        style={{ backgroundColor: cellBgColor, width: "80px", height: "80px", margin: "2px" }}
                                    >
                                        <span className={`text-3xl font-bold ${cellNumber === 1 ? "text-gray-800" : "text-gray-300"}`}>{cellNumber}</span>
                                        {cellUp && <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-green-700" />}
                                        {cellDown && <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-green-700" />}
                                        {cellLeft && <div className="absolute -left-1.5 top-1/2 transform -translate-y-1/2 w-4 h-2 bg-green-700" />}
                                        {cellRight && <div className="absolute -right-1.5 top-1/2 transform -translate-y-1/2 w-4 h-2 bg-green-700" />}
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
