import React from 'react';

// On définit les props classiques d'un input
type InputErrorProps = {
    error?: string | string[] | any
    tips?: string
    style?: string
    mt?: boolean
}


export const InputError: React.FC<InputErrorProps> = ({
    error,
    tips,
    style,
    mt,
}) => {


    if (error || tips) return (
        <div className={`flex flex-col pt-0.5   ${style} ${mt ? '!mt-0.5' : '-mt-3 '}`}>
            {(tips && !error) &&
                <span className="text-xs !-mb-2">
                    {tips}
                </span>}
            {error && <span className="md3-text-error text-xs ">{Array.isArray(error) ? error.join(', ') : error}</span>}
        </div>
    );
};