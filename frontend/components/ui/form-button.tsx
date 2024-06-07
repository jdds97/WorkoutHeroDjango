'use client';

import {useFormStatus} from 'react-dom';

interface FormButtonProps {
    message: string;
    className: string;
    action?: () => void;
}

const FormButton: React.FC<FormButtonProps> = ({message, className, action}) => {
    const {pending} = useFormStatus();

    return (
        <button className={className} type="submit" aria-disabled={pending} onClick={action}>
            {pending ? 'Loading...' : message}
        </button>
    );
};

export default FormButton;
