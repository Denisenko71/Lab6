import { Theme } from "../Calculator/types";

type DisplayProps = {
    value: string;
    theme: Theme;
};

export const Display = ({ value, theme }: DisplayProps) => {
    const textColor = theme === "dark"
        ? "text-emerald-400"
        : "text-blue-800";

    return (
        <div className={`w-full p-4 text-right text-3xl font-mono rounded-lg mb-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} ${textColor}`}> {value || "0"}</div>
    );
};