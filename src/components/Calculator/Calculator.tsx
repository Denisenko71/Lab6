import { useCalculator } from "./useCalculator";
import { Display } from "../Display/Display";
import { Button } from "../Button/Button";
import { History } from "../history/History";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { CalculatorButton } from "./types";

const buttons: CalculatorButton[] = [
    { value: "C", display: "C", type: "function", className: "hover:bg-red-200 text-red-700" },
    { value: "⌫", display: "⌫", type: "function", className: "hover:bg-red-200 text-red-700" },
    { value: "/", display: "/", type: "operation", className: "bg-blue-500 hover:bg-blue-600 text-red-700" },
    { value: "*", display: "×", type: "operation", className: "bg-blue-500 hover:bg-blue-600 text-red-700" },
    { value: "7", display: "7", type: "number" },
    { value: "8", display: "8", type: "number" },
    { value: "9", display: "9", type: "number" },
    { value: "-", display: "-", type: "operation", className: "bg-blue-500 hover:bg-blue-600 text-red-700" },
    { value: "4", display: "4", type: "number" },
    { value: "5", display: "5", type: "number" },
    { value: "6", display: "6", type: "number" },
    { value: "+", display: "+", type: "operation", className: "bg-blue-500 hover:bg-blue-600 text-red-700" },
    { value: "1", display: "1", type: "number" },
    { value: "2", display: "2", type: "number" },
    { value: "3", display: "3", type: "number" },
    { value: "=", display: "=", type: "operation", className: "bg-orange-400 hover:bg-orange-600 row-span-2 text-white" },
    { value: "0", display: "0", type: "number", className: "col-span-2" },
    { value: ".", display: ".", type: "number" },
];

export const Calculator = () => {
    const {
        input,
        result,
        error,
        history,
        theme,
        handleButtonClick,
        clearHistory,
        toggleTheme,
    } = useCalculator();

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
            <div className="w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Калькулятор</h1>
                    <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
                </div>
                <Display value={error || input || result} theme={theme} />
                <div className="grid grid-cols-4 gap-3">
                    {buttons.map((button) => (
                        <Button key={`${button.value}-${button.display}`} display={button.display} onClick={handleButtonClick} className={button.className} theme={theme} value={button.value} />
                    ))}
                </div>
                <History history={history} theme={theme} clearHistory={clearHistory} />
            </div>
        </div>
    );
};