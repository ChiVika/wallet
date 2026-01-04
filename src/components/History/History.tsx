
import { useEffect, useState} from 'react';
import styles from './History.module.css';
import type { HistoryProps } from './History.props';
import { observer } from 'mobx-react-lite';
import TransactionStore from '../../store/Transaction.store';
import ButtonInfo from '../ButtonInfo/ButtonInfo';
import ModalInfo from '../ModalInfo/ModalInfo';
import axios from 'axios';
import { PORT } from '../../helpers/API';
import Modal from '../Modal/Modal';
const History = observer(({account_id}: HistoryProps) =>{
    const {loading, currentTransactions, getCurrentTransactions} = TransactionStore;
    const [activeModalId, setActiveModalId] = useState<number | null>(null);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);

    const openModal = () => {
        setOpenEditModal(true);
    }

    const closeModal = () => {
        setOpenEditModal(false);
    }
    useEffect(() => {
        getCurrentTransactions(account_id);
    },[account_id])

    const category_type_russion = (data: string) => {
        switch(data){
            case 'income':
                return 'поплнения'
            case 'expense':
                return 'расходы'
            default: 
                return data;
                
        }
    }

    const openModalId = (id: number) => {
        console.log(`клик по ${id}`)
        setActiveModalId(id);
    }



    const deleteTransaction = async(id: number) => {
        try{
            await axios.delete(`${PORT}/transactions/delete/${id}`);
            console.log('Удаление прошло успешно');
            getCurrentTransactions(account_id);
        }
        catch{
            console.log('Неудача');
        }
    }

    const editTransactions = (id: number) => {
        console.log("Открываем форму для редактирования id", id)
        openModal();
    }


    

    return(
        <>
            <div className={styles['content']}>
                <div className={styles['list']}>
                {!loading && currentTransactions.map((item) => (
                    <div key={item.id} className={styles['container']}>
                        <div className={styles['transaction']}>
                                <div className={styles['text']}>{category_type_russion(item.category_type)}:</div>
                                <div className={styles['text-2']}>{item.amount}р - {item.category_name} </div>
                        </div>
                        <ButtonInfo color='#92CCE0' onClick={() => openModalId(item.id)}/>
                        {activeModalId === item.id && 
                            <ModalInfo 
                                idElement={item.id} 
                                visible={activeModalId === item.id} 
                                deleteElement={deleteTransaction}
                                editElement={editTransactions}
                                />}
                        
                    </div>
                ))}
                </div>
                {openEditModal && <Modal onClose={closeModal} account_id={account_id} mode='edit'/>}
                {loading && <>Загрузка...</>}
            </div>
            
        </>
    )
    

})

export default History;