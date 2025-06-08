import React from 'react';

type Props = {
    errors?: string;
};

const ErrorMessage = React.memo(({ errors }: Props) => {
    if (!errors) return null;

    return <p className="text-red-500 text-sm mt-1">{errors}</p>;
});

export default ErrorMessage;