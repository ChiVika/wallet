import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement>{
    balance: number,
    card: string,
    children?: ReactNode
}