
import styles from './ModalInfo.module.css';
import type { ModalInfoProps } from './ModalInfo.props';
import cn from 'classnames';


const ModalInfo = ({idElement, visible = false, className, deleteElement, editElement}: ModalInfoProps) => {


    return(
        <div className={cn(styles['container'],{[styles['visible']]: visible}, className)}>
            <button className={styles['button']} onClick={() => editElement(idElement)}>Редактировать</button>
            <button className={styles['button']} onClick={() => deleteElement(idElement)}>Удалить</button>
        </div>
    )
}

export default ModalInfo;