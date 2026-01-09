import { useEffect, useState } from "react";
import AccountStore from "../../store/Account.store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Card from "../../components/Card/Card";
import styles from './MainPage.module.css';
import Headling from "../../components/Headling/Headling";
import History from "../../components/History/History";
import TransactionStore from "../../store/Transaction.store";
import ButtonInfo from "../../components/ButtonInfo/ButtonInfo";
import Modal2 from "../../components/Modal2/Modal2";
import axios from "axios";
import { PORT } from "../../helpers/API";
import type { formField } from "../../components/Modal2/Modal2.props";

const MainPage = observer(() => {
    const {currentAccount, getAccountById} = AccountStore;
    const {currentTransactions, getCurrentTransactions} = TransactionStore;
    const { id } = useParams();
    const account_id = id ? parseInt(id) : 0;

    const [visible, setVisible] = useState<boolean>(false);
    const [categories, setCategories] = useState<{name: string}[]>([]);

    const openModal = () => {
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
    }

    useEffect(() => {
        if (id) {
            getAccountById(id); 
        }
    }, [id, getAccountById]); 

    const getCategories = async() => {
        try{
            const res = await axios.get(`${PORT}/category`);
            const result = res.data.data;
            const arr = result.map((item: {name: string}) => ({
                name: item.name
            }));
            console.log(arr);
            setCategories(arr);
        }
        catch{
            console.log('не удалось загрузить категории')
        }
    }
    useEffect(() => {
        getCategories();
        
    }, [])
    const categoryOptions = categories.map(cat => ({
        value: cat.name,
        label: cat.name
    }));

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
            type: 'datalist',
            label: 'Назначение',
            placeholder: 'Введите назначение',
            required: true,
            options: categoryOptions
        },
        {
            name: 'amount',
            type: 'number',
            label: 'Сумма',
            placeholder: '0',
            required: true
        }
    ];
    const submitCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const postData = {
                account_id: account_id,
                category_type: formData.get('category_type') as string,
                category_name: formData.get('category_name') as string,
                amount: parseFloat(formData.get('amount') as string)
            };

            console.log('Отправляем данные:', postData);

            await axios.post(`${PORT}/transactions/add`, postData, {
                headers: { 
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Транзакция создана');
            
            getCurrentTransactions(account_id);
            getAccountById(account_id.toString());
            closeModal();
        }
        catch{
            console.log('Ошибка создания транзакции:');
        }
    };

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
                <History account_id={account_id}/>
            </div>
            <Modal2 
                account_id={account_id}
                children='Добавить транзакцию'
                visible={visible}
                onClose={closeModal}
                submit={submitCreate}
                fields={transactionFields}
                initialData={{ account_id: account_id }}
                submitText="Добавить"
            />
        </>
    )
})

export default MainPage;