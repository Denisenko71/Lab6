import { Theme } from '../Calculator/types';

type ThemeSwitcherProps = {
    theme: Theme;
    toggleTheme: () => void;
};

export const ThemeSwitcher = ({ theme, toggleTheme }: ThemeSwitcherProps) => {
    return (
        <button onClick={toggleTheme} className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`} > {theme === 'dark' ? '☀️' : '🌙'}</button>
    );
};