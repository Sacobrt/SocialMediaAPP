import { useState, useEffect } from "react";
import CyclicService from "../../services/CyclicService";

export default function CyclicView() {
    const [cyclic, setCyclic] = useState(null);
    const [formData, setFormData] = useState({ rows: 5, columns: 5 });
    const [submittedColumns, setSubmittedColumns] = useState();
    const [error, setError] = useState(null);
    const [currentNumber, setCurrentNumber] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    async function getCyclic() {
        try {
            const response = await CyclicService.get(formData.rows, formData.columns);
            if (response.data.message) {
                setError(response.data.message);
            } else {
                setError(null);
                setCyclic(response.data);
                setCurrentNumber(0);
                setIsAnimating(true);
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (isAnimating && cyclic) {
            const totalNumbers = formData.rows * formData.columns;
            const interval = setInterval(() => {
                setCurrentNumber((prevNumber) => (prevNumber < totalNumbers ? prevNumber + 1 : prevNumber));
            }, 500);
            return () => clearInterval(interval);
        }
    }, [isAnimating, cyclic, formData]);

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
        <div className="min-h-screen bg-[#333]">
            <div className="flex flex-col md:flex-row items-start justify-center ml-10">
                {/* INPUT SECTION */}
                <div className="relative grid grid-flow-row items-start justify-center ml-10 mt-10">
                    <span className="absolute -left-40 ml-10 top-[50px] text-5xl font-bold -rotate-90 text-[#525252]">INPUT</span>
                    <form onSubmit={handleSubmit} className="-mr-5 space-y-5">
                        {["rows", "columns"].map((field, index) => (
                            <div key={index} className="grid text-xl text-[#c8c8c8]">
                                <label className="font-semibold" htmlFor={field}>
                                    {field === "rows" ? "Number of rows" : "Number of columns"}
                                </label>
                                <input
                                    type="number"
                                    id={field}
                                    value={formData[field]}
                                    onChange={handleInputChange}
                                    className="mt-5 h-[60px] w-[220px] text-4xl outline-0 rounded-lg border-[4px] bg-[#525252] border-[#c8c8c8] text-center font-semibold focus:ring-0"
                                />
                            </div>
                        ))}
                        <button
                            type="submit"
                            style={{ marginTop: "80px" }}
                            className="bg-[#48ac47] text-[#c8c8c8] text-2xl font-semibold rounded-lg py-4 w-[260px]"
                        >
                            CREATE TABLE
                        </button>
                    </form>
                </div>

                {/* OUTPUT SECTION */}
                <div className="flex flex-col md:flex-row items-start justify-center ml-10 mt-10 md:ml-40">
                    <div className="relative grid grid-flow-row">
                        {error && (
                            <div className="mt-2 mr-10 font-bold text-[#c8c8c8]">
                                <div className="flex animate-bounce items-center gap-1 rounded-lg bg-red-600 bg-opacity-70 p-3">
                                    <p>{error}</p>
                                </div>
                            </div>
                        )}
                        {cyclic && !error && (
                            <>
                                <span className="absolute -left-40 ml-5 top-[80px] text-5xl font-bold -rotate-90 text-[#525252]">OUTPUT</span>
                                <div className="grid overflow-x-auto mt-2" style={{ gridTemplateColumns: `repeat(${submittedColumns}, 123px)` }}>
                                    {cyclic.map((row, rowIndex) =>
                                        row.map(({ cellNumber, cellBgColor, cellUp, cellDown, cellLeft, cellRight }, cellIndex) => {
                                            const isVisible = cellNumber <= currentNumber;

                                            return (
                                                <div
                                                    key={`${rowIndex}-${cellIndex}`}
                                                    className={`relative border-[3px] border-[#c7c7c7] rounded-lg flex items-center justify-center cursor-pointer transition-all duration-500 ease-in-out ${
                                                        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
                                                    }`}
                                                    style={{
                                                        backgroundColor: isVisible ? cellBgColor : "transparent",
                                                        width: "120px",
                                                        height: "120px",
                                                        margin: "1.5px",
                                                    }}
                                                    onMouseEnter={(e) => isVisible && (e.currentTarget.style.backgroundColor = "#525252")}
                                                    onMouseLeave={(e) => isVisible && (e.currentTarget.style.backgroundColor = cellBgColor)}
                                                >
                                                    {isVisible && <span className="text-5xl font-semibold text-[#c7c7c7]">{cellNumber}</span>}
                                                    {cellUp && isVisible && (
                                                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-[#48ac47]" />
                                                    )}
                                                    {cellDown && isVisible && (
                                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-[#48ac47]" />
                                                    )}
                                                    {cellLeft && isVisible && (
                                                        <div className="absolute -left-1.5 top-1/2 transform -translate-y-1/2 w-3.5 h-2 bg-[#48ac47]" />
                                                    )}
                                                    {cellRight && isVisible && (
                                                        <div className="absolute -right-1.5 top-1/2 transform -translate-y-1/2 w-3.5 h-2 bg-[#48ac47]" />
                                                    )}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
