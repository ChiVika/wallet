
import { useEffect, useState} from 'react';
import styles from './History.module.css';
import type { HistoryProps } from './History.props';
import { observer } from 'mobx-react-lite';
import TransactionStore from '../../store/Transaction.store';
import ButtonInfo from '../ButtonInfo/ButtonInfo';
import ModalInfo from '../ModalInfo/ModalInfo';
import axios from 'axios';
import { PORT } from '../../helpers/API';
import type { formField } from '../Modal2/Modal2.props';
import Modal2 from '../Modal2/Modal2';
const History = observer(({account_id}: HistoryProps) =>{
    const {loading, currentTransactions, getCurrentTransactions} = TransactionStore;
    const [activeModalId, setActiveModalId] = useState<number | null>(null);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const closeModalInfo = () => {
        setActiveModalId(null)
    }
    const closeModalEdit = () => {
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
        setOpenEditModal(true);
    }
    const submitEdit = () => {

    }


    const transactionFields: formField[] = [
        {
            name: 'category_type',
            type: 'select',
            label: 'Тип операции',
            placeholder: null,
            required: true,
            options: [
                { value: 'income', label: 'Пополнение' },
                { value: 'expense', label: 'Расход' }
            ]
        },
        {
            name: 'category_name',
            type: 'text',
            label: 'Назначение',
            placeholder: 'Введите назначение',
            required: true
        },
        {
            name: 'amount',
            type: 'number',
            label: 'Сумма',
            placeholder: '0',
            required: true
        }
    ];

    

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
                                onClose={closeModalInfo}
                                />}
                        
                    </div>
                ))}
                </div>
                {openEditModal && 
                <Modal2 
                    account_id={account_id}
                    children='Добавить транзакцию'
                    visible={openEditModal}
                    onClose={closeModalEdit}
                    submit={submitEdit}
                    fields={transactionFields}
                    initialData={{ account_id: account_id }}
                    submitText="Добавить"
                />}
                {loading && <>Загрузка...</>}
            </div>
            
        </>
    )
    

})

export default History;