import { NavLink, Outlet } from 'react-router-dom';
import Headling from '../../components/Headling/Headling';
import styles from './Layout.module.css';
import cn from 'classnames';
import Button from '../../components/Button/Button';
import { useEffect, useRef, useState} from 'react';
import AccountStore from '../../store/Account.store';
import { observer } from 'mobx-react-lite';
import AddAccount from '../../components/AddAccount/AddAccount';
import { useClickOutside } from '../../hooks/useClickOutside';

const Layout = observer(() => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ModalRef = useRef<HTMLDivElement>(null);

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

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }
    useClickOutside(ModalRef, closeModal, isOpen);



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
                <Button onClick={openModal}>
                    <img src="/add.svg" alt="add" className={styles['add']} />
                    Добавить счет
                </Button>
                
            </div>
                <div className={styles['body']}>
                    {isOpen && 
                        <div className={styles['modal-overlay']}>
                            <div ref={ModalRef}>
                                <AddAccount onClose={closeModal}/>
                            </div>
                        </div>
                    }
                    <Outlet/>
                </div>
        </div>
        </>
        
    )

})
export default Layout;