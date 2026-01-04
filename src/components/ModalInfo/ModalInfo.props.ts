import type { HTMLAttributes } from "react";



export interface ModalInfoProps extends HTMLAttributes<HTMLDivElement>{
    idElement: number,
    visible?: boolean,
    deleteElement: (idElement: number) => void,
    editElement: (idElement: number) => void
}