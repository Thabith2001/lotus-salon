import React from 'react';
import Link from "next/link";


const Button = ({label, theme, onClick}) => {
    return (
        <button
            className={theme}
            onClick={onClick}
        >
            <span className="relative z-10">{label}</span>
        </button>
    );
};
export default Button;