import PropTypes from "prop-types";
import { MdCancel } from "react-icons/md";

export default function ErrorModal({ show, onHide, errors }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg mx-4">
                <div className="flex items-center justify-between p-5 border-b border-gray-600">
                    <h2 className="text-2xl font-bold text-gray-200">Oops!</h2>
                    <button className="text-gray-200 hover:text-gray-400 transition-colors" onClick={onHide}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    <ul className="list-disc list-inside space-y-3">
                        {errors &&
                            errors.map((error, index) => (
                                <li key={index} className="text-red-500 font-medium">
                                    {error}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="flex justify-end p-4 border-t border-gray-600">
                    <button className="btn-cancel" onClick={onHide}>
                        <MdCancel className="mr-2" />
                        <span>Close</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

ErrorModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    errors: PropTypes.array,
};
