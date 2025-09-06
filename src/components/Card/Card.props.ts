import type { ReactNode } from "react";

export interface CardProps{
    balance: number,
    card: string,
    children?: ReactNode
}