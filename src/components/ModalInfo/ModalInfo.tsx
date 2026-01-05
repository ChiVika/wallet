
import { useRef } from 'react';
import styles from './ModalInfo.module.css';
import type { ModalInfoProps } from './ModalInfo.props';
import cn from 'classnames';
import { useClickOutside } from '../../hooks/useClickOutside';


const ModalInfo = ({idElement, visible = false, className, deleteElement, editElement, onClose}: ModalInfoProps) => {
    const ModalRef = useRef<HTMLDivElement>(null);
    useClickOutside(ModalRef, onClose, visible);

    const editAndCloseElement = (id: number) => {
        onClose();
        editElement(id);

        
    }


    return(
        <div ref={ModalRef} className={cn(styles['container'],{[styles['visible']]: visible}, className)}>
            <button className={styles['button']} onClick={() => editAndCloseElement(idElement)}>Редактировать</button>
            <button className={styles['button']} onClick={() => deleteElement(idElement)}>Удалить</button>
        </div>
    )
}

export default ModalInfo;