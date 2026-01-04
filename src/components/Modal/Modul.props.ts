import type { HTMLAttributes} from "react";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    onClose: () => void,
    account_id: number,
    mode: 'create' | 'edit'
}