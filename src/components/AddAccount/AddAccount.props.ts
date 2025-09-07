import type { HTMLAttributes } from "react";

export interface AddAccountProps extends HTMLAttributes<HTMLDivElement> {
    onClose: () => void;
}