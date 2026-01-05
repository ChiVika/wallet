
import styles from './Modal.module.css';
import Headling from '../Headling/Headling';
import {  useEffect, useRef, useState} from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { PORT } from '../../helpers/API';
import axios from 'axios';
import type { ModalProps } from './Modul.props';
import TransactionStore from '../../store/Transaction.store';
import { observer } from 'mobx-react-lite';
import AccountStore from '../../store/Account.store';


const Modal = observer(({onClose, account_id, mode = 'create'}: ModalProps) =>{
    const [moreAmount, setMoreAmount] = useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(true);
    const [formData, setFormData] = useState({
        account_id: account_id,
        category_type: 'income',
        category_name: '',
        amount: 0
    });

    const {getCurrentTransactions} = TransactionStore;
    const {getAccountById} = AccountStore;
    
    
    const InputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
    };

    const submit = async(e: React.FormEvent) => {
        e.preventDefault()
        try{
            const postData = {
                account_id: account_id,
                category_type: formData.category_type,
                category_name: formData.category_name,
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
            console.log('Транзакция создана');
            setFormData({
                account_id: account_id,
                category_type: '',
                category_name: '',
                amount: 0
            });
            setMoreAmount(false)
            getCurrentTransactions(account_id);
            getAccountById(account_id);
            onClose();
            setVisible(false);

        }
        catch{
            console.log('Транзакция не создана');
            setMoreAmount(true);
        }
         
    }
    const ModalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ModalRef.current && !ModalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        
        if (visible) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [visible, onClose]);
    

    

    return(
        <div className={styles['container-modal']} ref={ModalRef}>
            <div className={styles['body']}>
                <div className={styles['modal-overlay']}>
                    <div>
                        <button onClick={onClose} className={styles['close']}>
                            <img src="/add.svg" alt="close" className={styles['img-close']}/>
                        </button>
                         <form className={styles['content']} onSubmit={submit}>
                            {mode === 'create' && 
                                <>
                                    <Headling style={{fontSize: '28px', marginBottom: '100px'}}>Добавить транзакцию</Headling>
                                    <label htmlFor="type" className={styles['labal']}>Тип операции</label>
                                    <select 
                                        name='category_type' 
                                        value={formData.category_type}
                                        onChange={(e) => InputChange('category_type', e.target.value)}>
                                            <option value={'income'}>Пополнение</option>
                                            <option value={'expense'}>Расход</option>
                                    </select>
                                    <label htmlFor="payment" className={styles['labal']}>Назначение</label>
                                    <Input 
                                        name="payment" 
                                        value={formData.category_name}
                                        onChange={(e) => InputChange('category_name', e.target.value)}
                                        required/>
                                    <label htmlFor="summa" className={styles['labal']}>Сумма</label>
                                    <Input 
                                        name="summa"
                                        value={formData.amount}
                                        onChange={(e) => InputChange('amount', e.target.value)}
                                        style={{marginBottom: '70px'}}
                                        required/>
                                    {moreAmount && <div className={styles['error']}>Не хваетает средств на счете</div>}

                                    <Button>Добавить</Button>
                                </>}
                                {/* {mode === 'edit' && 
                                    <>
                                        <Headling style={{fontSize: '28px', marginBottom: '100px'}}>Изменение транзакции</Headling>
                                    </>
                                } */}
                        </form>
                    </div>
                </div>
                        
                 
            </div>
        </div>
        
    )
    
})
export default Modal