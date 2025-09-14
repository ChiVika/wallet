
import { useEffect} from 'react';
import styles from './History.module.css';
import type { HistoryProps } from './History.props';
import { observer } from 'mobx-react-lite';
import TransactionStore from '../../store/Transaction.store';
// import categoryStore from '../../store/category.store';
const History = observer(({account_id}: HistoryProps) =>{
    const {loading, currentTransactions, getCurrentTransactions} = TransactionStore;
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

    return(
        <>
            <div className={styles['content']}>
                <div className={styles['list']}>
                {!loading && currentTransactions.map((item) => (
                    <div key={item.id} className={styles['transaction']}>
                        
                            <div className={styles['text']}>{category_type_russion(item.category_type)}:</div>
                            <div className={styles['text-2']}>{item.amount}р - {item.category_name} </div>
                        
                    </div>
                ))}
                </div>
                {loading && <>Загрузка...</>}
            </div>
        </>
    )
    

})

export default History;