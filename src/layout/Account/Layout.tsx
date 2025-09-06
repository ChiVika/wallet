import { NavLink, Outlet } from 'react-router-dom';
import Headling from '../../components/Headling/Headling';
import styles from './Layout.module.css';
import cn from 'classnames';
import Button from '../../components/Button/Button';
import { useEffect, useState } from 'react';

import { PORT } from '../../helpers/API';
import axios from 'axios';
import type { APIResponse } from '../../helpers/APIResponse';
import type { Account } from '../../interfaces/Account.interface';

function Layout(){

    const [accounts, setAccounts] = useState<Account[]>([]);

    const getAccounts = async() => {
        const res = await axios.get<APIResponse<Account[]>>(`${PORT}/accounts`)
        if(res.data.success){
            setAccounts(res.data.data);
        }
        else {
            console.log('Ошибка сервера');
        }
    }
    useEffect(() => {
        getAccounts();
    }, [])

    const maskAccount = (cardNumber: string) => {

        const firstNumber = cardNumber.slice(0,4);
        const lastNumber = cardNumber.slice(-4);

        const mask = '*'.repeat(4);

        return `${firstNumber} ${mask} ${mask} ${lastNumber}`
    }

    return(
        <>
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <Headling className={styles['headling']}>Мои счета</Headling>
                <div className={styles['container']}>
                    {accounts.map(item => (
                        <NavLink 
                            to={`/account/${item.id}`} key={item.id} 
                            className={({isActive}) => cn(styles['account'],{
                                [styles['active']]: isActive
                        })}>{maskAccount(item.card_number)}</NavLink>
                    ))}
                </div>
                <Button>
                    <img src="/add.svg" alt="add" className={styles['add']}/>
                    Добавить счет
                </Button>
                
            </div>
            <div className={styles['body']}>
                <Outlet/>
            </div>
        </div>
        </>
        
    )

}
export default Layout;