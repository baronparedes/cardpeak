import * as React from 'react';

interface ErrorLabelProps {
    error?: string;
}

export const ErrorLabel: React.StatelessComponent<ErrorLabelProps> = props => {
    return (
        <div>
            {props.error ? (
                <label className="text-danger">{props.error}</label>
            ) : null}
        </div>
    );
};
