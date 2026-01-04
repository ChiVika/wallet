import { useEffect, useState } from "react";
import AccountStore from "../../store/Account.store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Card from "../../components/Card/Card";
import styles from './MainPage.module.css';
import Headling from "../../components/Headling/Headling";
import History from "../../components/History/History";
import TransactionStore from "../../store/Transaction.store";

import Modal from "../../components/Modal/Modal";
import ButtonInfo from "../../components/ButtonInfo/ButtonInfo";


const MainPage = observer(() =>{
    const {currentAccount, getAccountById} = AccountStore;
    const {currentTransactions} = TransactionStore;
    const { id } = useParams();


    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        if (id) {
            getAccountById(id); 
        }
    }, [id, getAccountById]); 


    const TotalExpense  = () => {
        let total = 0;
        currentTransactions.map(item => {
            if(item.category_type === 'expense'){
                total += parseInt(item.amount);
                
            }
        })
        return total
    }


    const TotalIncome = () => {
        let total = 0;
        currentTransactions.map(item => {
            if(item.category_type === 'income'){
                total += parseInt(item.amount);
                
            }
        })
        return total
    }
    return(
        <>
        <div className={styles['container']}>
            <Card balance={currentAccount?.balance || 0} card={currentAccount?.card_number || ''}>
                <ButtonInfo color="#ffffff" className={styles["button-card"]}/>
            </Card>
            <div className={styles['datas']}>
                <div className={styles['block']}>
                    <p className={styles['text']}>Пополнения</p>
                    {TotalIncome()} р
                </div>
                <div className={styles['block']}>
                    <p className={styles['text']}>Затраты</p>
                    {TotalExpense()} р
                </div>
            </div>
            
        
        </div>
        <div className={styles['history-block']}>
            <button className={styles['add-transaction']} onClick={openModal}>
                <img src="/add.svg" alt="close" className={styles['img-add']}/>
            </button>
            <Headling className={styles['history']}>История</Headling>
            <History account_id={id ? parseInt(id) : 0}/>
        </div>
        {isOpen && <Modal onClose={closeModal} account_id={id ? parseInt(id) : 0} mode="create"/>}

        
        </>
    )
})
export default MainPage;