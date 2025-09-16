import React from 'react';


const Button = ({label, theme, onClick}) => {
    console.log(theme);
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
