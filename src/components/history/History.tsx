import { CalculationHistory, Theme } from '../Calculator/types';

type HistoryProps = {
    history: CalculationHistory[];
    theme: Theme;
    clearHistory: () => void;
};

export const History = ({
    history,
    theme,
    clearHistory,
}: HistoryProps) => {
    return (
        <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">История</h3>
                <button onClick={clearHistory} className={`px-2 py-1 rounded ${theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-400 hover:bg-red-500'} text-white text-sm`}>Очистить</button>
            </div>
            {history.length === 0 ? (
                <p className="text-sm italic">Нет истории вычислений</p>
            ) : (
                <ul className="space-y-1">
                    {history.map((item, index) => (
                        <li key={index} className="text-sm font-mono">{item.expression} = {item.result}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};