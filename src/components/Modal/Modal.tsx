
import styles from './Modal.module.css';
import Headling from '../Headling/Headling';
import { useRef, useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { PORT } from '../../helpers/API';
import axios from 'axios';
import type { ModalProps } from './Modul.props';

function Modal({onClose, account_id}: ModalProps){

    const [formData, setFormData] = useState({
        category_id: 0,
        amount: 0
    });

    const InputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
    };

    const submit = async() => {
        const postData = {
            account_id: account_id,
            category_id: formData.category_id,
            amount: formData.amount
        }
        await axios.post(`${PORT}/transactions/add`,
            postData,
            {
                headers: { 
                'Content-Type': 'application/json'
                }
            }
        );
        setFormData({
            category_id: 0,
            amount: 0
        });
        onClose();
        
    }

    
    const ModalRef = useRef<HTMLDivElement>(null);
    return(
        <div className={styles['container-modal']} >
            <div className={styles['body']}>
                <div className={styles['modal-overlay']}>
                    <div ref={ModalRef}>
                        <button onClick={onClose} className={styles['close']}>
                            <img src="/add.svg" alt="close" className={styles['img-close']}/>
                        </button>
                        <form className={styles['content']} onSubmit={submit}>
                            <Headling style={{fontSize: '28px', marginBottom: '100px'}}>Добавить транзакцию</Headling>
                            <label htmlFor="type" className={styles['labal']}>Тип операции</label>
                            <Input name="type"/>
                            <label htmlFor="payment" className={styles['labal']}>Назначение</label>
                            <Input 
                                name="payment" 
                                value={formData.category_id}
                                onChange={(e) => InputChange('category_id', e.target.value)}/>
                            <label htmlFor="summa" className={styles['labal']}>Сумма</label>
                            <Input 
                                name="summa"
                                value={formData.amount}
                                onChange={(e) => InputChange('amount', e.target.value)}/>
                            <Button>Добавить</Button>
                        </form>
                    </div>
                </div>
                        
                 
            </div>
        </div>
        
    )
}
export default Modal