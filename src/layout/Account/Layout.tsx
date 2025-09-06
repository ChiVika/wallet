import { NavLink, Outlet } from 'react-router-dom';
import Headling from '../../components/Headling/Headling';
import styles from './Layout.module.css';
import cn from 'classnames';
import Button from '../../components/Button/Button';
import { useEffect } from 'react';
import AccountStore from '../../store/Account.store';
import { observer } from 'mobx-react-lite';

const Layout = observer(() => {


    const {accounts, loading, getAllAccount} = AccountStore;
    useEffect(() => {
        getAllAccount();
    }, [getAllAccount])



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
                    {!loading && accounts.map(item => (
                        <NavLink 
                            to={`/account/${item.id}`} key={item.id} 
                            className={({isActive}) => cn(styles['account'],{
                                [styles['active']]: isActive
                        })}>{maskAccount(item.card_number)}</NavLink>
                    ))}
                    {loading && <>Загрузка...</>}
                </div>
                <Button>
                    <img src="/add.svg" alt="add" className={styles['add']} />
                    Добавить счет
                </Button>
                
            </div>
            <div className={styles['body']}>
                <Outlet/>
            </div>
        </div>
        </>
        
    )

})
export default Layout;