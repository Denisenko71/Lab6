export type BasicOperation = '+' | '-' | '*' | '/';
export type SpecialOperation = '=' | 'C' | '⌫' | '.';
export type CalculatorOperation = BasicOperation | SpecialOperation;
export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type AllowedInput = CalculatorOperation | Digit;
export type Theme = 'light' | 'dark';
export type CalculationHistory = {
    expression: string;
    result: string;
};
export type CalculatorButton = {
    value: AllowedInput;
    display: string;
    type: 'number' | 'operation' | 'function';
    className?: string;
};