import { useState, useEffect, useCallback } from "react";
import { AllowedInput, CalculationHistory, Theme } from "./types";

export const useCalculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [history, setHistory] = useState<CalculationHistory[]>([]);
    const [theme, setTheme] = useState<Theme>("light");
    const [error, setError] = useState("");

    const safeEvaluate = useCallback((expression: string): number => {
        const expr = expression.replace(/\s+/g, '');
        if (!/^[\d+\-*/.()]+$/.test(expr)) {
            throw new Error("Недопустимые символы в выражении");
        }
        const tokens = tokenize(expr);
        const rpn = shuntingYard(tokens);
        return evaluateRPN(rpn);
    }, []);

    const calculateResult = useCallback(() => {
        if (!input) return;
        try {
            const expression = input.replace(/×/g, "*");
            const calculatedResult = safeEvaluate(expression);
            if (isNaN(calculatedResult) || !isFinite(calculatedResult)) {
                throw new Error("Недопустимая операция");
            }
            setResult(calculatedResult.toString());
            setHistory((prev) => [
                { expression: input, result: calculatedResult.toString() },
                ...prev.slice(0, 9),
            ]);
            setError("");
        } catch (err) {
            setError("Ошибка: Недопустимая операция");
            setResult("");
        }
    }, [input, safeEvaluate]);

    const tokenize = (expression: string): (number | string)[] => {
        const tokens: (number | string)[] = [];
        let current = '';

        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];
            if (/\d|\./.test(char)) {
                current += char;
            } else {
                if (current) {
                    tokens.push(parseFloat(current));
                    current = '';
                }
                tokens.push(char);
            }
        }
        if (current) {
            tokens.push(parseFloat(current));
        }
        return tokens;
    };

    const shuntingYard = (tokens: (number | string)[]): (number | string)[] => {
        const output: (number | string)[] = [];
        const operators: string[] = [];
        const precedence: Record<string, number> = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2
        };
        for (const token of tokens) {
            if (typeof token === 'number') {
                output.push(token);
            } else if (token in precedence) {
                while (
                    operators.length > 0 &&
                    operators[operators.length - 1] !== '(' &&
                    precedence[operators[operators.length - 1]] >= precedence[token]
                ) {
                    output.push(operators.pop()!);
                }
                operators.push(token);
            } else if (token === '(') {
                operators.push(token);
            } else if (token === ')') {
                while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                    output.push(operators.pop()!);
                }
                operators.pop();
            }
        }
        while (operators.length > 0) {
            output.push(operators.pop()!);
        }
        return output;
    };

    const evaluateRPN = (rpn: (number | string)[]): number => {
        const stack: number[] = [];
        for (const token of rpn) {
            if (typeof token === 'number') {
                stack.push(token);
            } else {
                const b = stack.pop()!;
                const a = stack.pop()!;
                switch (token) {
                    case '+': stack.push(a + b); break;
                    case '-': stack.push(a - b); break;
                    case '*': stack.push(a * b); break;
                    case '/':
                        if (b === 0) throw new Error("Деление на ноль");
                        stack.push(a / b);
                        break;
                    default: throw new Error(`Неизвестный оператор: ${token}`);
                }
            }
        }
        if (stack.length !== 1) {
            throw new Error("Неверное выражение");
        }
        return stack[0];
    };

    const handleButtonClick = useCallback(
        (value: AllowedInput) => {
            setError("");
            if (value === "C") {
                setInput("");
                setResult("");
                return;
            }
            if (value === "⌫") {
                setInput((prev) => prev.slice(0, -1));
                return;
            }
            if (value === "=") {
                calculateResult();
                return;
            }
            const lastChar = input.slice(-1);
            if (
                ["+", "-", "*", "/", "×"].includes(lastChar) &&
                ["+", "-", "*", "/"].includes(value)
            ) {
                return;
            }
            if (value === ".") {
                const parts = input.split(/[+\-*/×]/);
                const lastPart = parts[parts.length - 1];
                if (lastPart.includes(".") || lastPart === "") {
                    return;
                }
            }
            const displayValue = value === "*" ? "×" : value;
            setInput((prev) => prev + displayValue);
        },
        [input, calculateResult]
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            const key = e.key;
            const operationMap: Record<string, AllowedInput> = {
                Enter: "=",
                Escape: "C",
                Backspace: "⌫",
                ".": ".",
                "+": "+",
                "-": "-",
                "*": "*",
                "/": "/",
                "0": "0",
                "1": "1",
                "2": "2",
                "3": "3",
                "4": "4",
                "5": "5",
                "6": "6",
                "7": "7",
                "8": "8",
                "9": "9",
            };
            const operation = operationMap[key];
            if (operation !== undefined) {
                handleButtonClick(operation);
            }
        },
        [handleButtonClick]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);
    const clearHistory = () => {
        setHistory([]);
    };
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };
    return {
        input,
        result,
        error,
        history,
        theme,
        handleButtonClick,
        clearHistory,
        toggleTheme,
    };
};