import { AllowedInput, Theme } from "../Calculator/types";

type ButtonProps = {
    display: string;
    onClick: (value: AllowedInput) => void;
    className?: string;
    theme: Theme;
    value: AllowedInput;
};

export const Button = ({ display, onClick, className = "", theme, value }: ButtonProps) => {
    const baseClasses = "p-4 text-xl font-bold rounded-lg transition-colors duration-200";
    const getTypeClasses = () => {
        if (["+", "-", "*", "/", "="].includes(value)) {
            return "bg-orange-500 hover:bg-orange-600 text-white";
        }
        if (["C", "⌫"].includes(value)) {
            return "bg-red-500 hover:bg-red-600 text-white";
        }
        return theme === "dark"
            ? "bg-gray-700 hover:bg-gray-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-black";
    };

    return (
        <button onClick={() => onClick(value)} className={`${baseClasses} ${getTypeClasses()} ${className}`}> {display}</button>
    );
};