
import axios from 'axios';
import Button from '../Button/Button';
import Card from '../Card/Card';
import Headling from '../Headling/Headling';
import Input from '../Input/Input';
import styles from './AddAccount.module.css';
import type { AddAccountProps } from './AddAccount.props';
import { PORT } from '../../helpers/API';
import { useState } from 'react';
function AddAccount({onClose} : AddAccountProps){
    const [formData, setFormData] = useState({
        number: '',
        name: '',
        balance: 0
    });
    const mask = (card_number: string) => {
        return card_number.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();
    };
    const card_number_output = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = mask(e.target.value);
        e.target.value = formatted;
    };

    const InputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const submit = async() => {
        const postData = {
            card_number: formData.number,
            name: formData.name,
            balance: formData.balance
        }
        await axios.post(`${PORT}/accounts/add`,
            postData,
            {
                headers: { 
                'Content-Type': 'application/json'
                }
            }
        );
        setFormData({
            number: '',
            name: '', 
            balance: 0
        });
        onClose();
        
    }
    return(
        <>
            <div className={styles['container']} >
                <button onClick={onClose} className={styles['close']}>
                    <img src="/add.svg" alt="close" className={styles['img-close']}/>
                </button>

                <form className={styles['content']} onSubmit={submit}>
                    <Headling>Добавление счета</Headling>
                    <Card balance={0} card={'1234 9067 6741 4531'} className={styles['card']} />
                    <label htmlFor="number" className={styles['labal']}>Номер счета</label>
                    <Input name='number' 
                        maxLength={19} 
                        value={formData.number}
                        onInput={card_number_output} 
                        onChange={(e) => InputChange('number', e.target.value)}/>
                    <label htmlFor="name" className={styles['labal']}>Назначение</label>
                    <Input name='name'
                        value={formData.name}
                        onChange={(e) => InputChange('name', e.target.value)}
                    />
                    <label htmlFor="balance" className={styles['labal']}>Текущий баланс</label>
                    <Input name='balance' 
                        style={{marginBottom: '30px'}}
                        value={formData.balance}
                        onChange={(e) => InputChange('balance', e.target.value)}
                    />
                    <Button type='submit'>Добавить</Button>
                </form>
       
            </div>
        </>
    )

}

export default AddAccount;