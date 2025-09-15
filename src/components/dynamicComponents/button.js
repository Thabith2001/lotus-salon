import React from 'react';
import Link from "next/link";


const Button = ({href, label, theme, onClick}) => {
    return (
        <Link
            href={href}
            className={theme}
            onClick={onClick}
        >
            <span className="relative z-10">{label}</span>
        </Link>
    );
};
export default Button;
