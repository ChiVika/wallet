import type { ReactNode } from "react";


export interface Modal2Props {
    children: ReactNode,
    account_id: number,
    visible: boolean,
    fields: formField[],
    initialData?: Record<string, unknown>;
    submitText?: string;
    onChange?: (name: string, value: string | number) => void;
    onClose: () => void,
    submit: (e: React.FormEvent) => void,
}

export interface formField{
    name: string,
    type: 'text'| 'number' | 'select' | 'datalist',
    label: string,
    placeholder: string | null,
    value?: string | number | null,
    required?: boolean,
    options?: Array<{ value: string; label: string }>, 
}