import { useState } from "react";
import CyclicService from "../../services/CyclicService";

export default function CyclicView() {
    const [cyclic, setCyclic] = useState(null);
    const [formData, setFormData] = useState({ firstNumber: 5, secondNumber: 5 });
    const [submittedSecondNumber, setSubmittedNumber] = useState();

    async function getCyclic() {
        try {
            const response = await CyclicService.get(formData.firstNumber, formData.secondNumber);
            setCyclic(response);
        } catch (e) {
            console.error(e);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedNumber(formData.secondNumber);
        getCyclic();
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: Number(value) }));
    };

    return (
        <div className="container mx-auto py-4 grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-row items-center justify-center">
                <span className="text-4xl font-bold rotate-90 text-gray-800">INPUT</span>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {["firstNumber", "secondNumber"].map((field, index) => (
                        <div key={index} className="grid text-2xl">
                            <label className="font-bold" htmlFor={field}>
                                {field === "firstNumber" ? "ROWS" : "COLUMNS"}
                            </label>
                            <input
                                type="number"
                                id={field}
                                value={formData[field]}
                                max={10}
                                onChange={handleInputChange}
                                className="mt-2 h-[40px] w-[200px] rounded-md border-2 text-center font-semibold focus:ring-0"
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
                        <div className="grid justify-center mt-2" style={{ gridTemplateColumns: `repeat(${submittedSecondNumber}, 105px)` }}>
                            {cyclic.data.map((row, rowIndex) =>
                                row.map(({ cellNumber, cellBgColor, cellUp, cellDown, cellLeft, cellRight }, cellIndex) => (
                                    <div
                                        key={`${rowIndex}-${cellIndex}`}
                                        className="relative border-2 border-gray-400 rounded flex items-center justify-center"
                                        style={{ backgroundColor: cellBgColor, width: "100px", height: "100px", margin: "1.5px" }}
                                    >
                                        <span className={`text-4xl font-semibold ${cellNumber === 1 ? "text-gray-800" : "text-gray-200"}`}>{cellNumber}</span>
                                        {cellUp && <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-green-700" />}
                                        {cellDown && <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-green-700" />}
                                        {cellLeft && <div className="absolute -left-1.5 top-1/2 transform -translate-y-1/2 w-4 h-3 bg-green-700" />}
                                        {cellRight && <div className="absolute -right-1.5 top-1/2 transform -translate-y-1/2 w-4 h-3 bg-green-700" />}
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
