import type { ReactNode } from "react";


export interface Modal2Props{
    children: ReactNode,
    account_id: number,
    visible: boolean,
    fields: formField[],
    initialData?: Record<string, unknown>;
    submitText?: string;
    onClose: () => void,
    submit: (e: React.FormEvent) => void,
}

export interface formField{
    name: string,
    type: 'text'| 'number' | 'select',
    label: string,
    placeholder: string | null,
    required?: boolean,
    options?: Array<{ value: string; label: string }>, 
}