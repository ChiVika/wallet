import { useEffect } from "react";
import AccountStore from "../../store/Account.store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Card from "../../components/Card/Card";
import styles from './MainPage.module.css';
import Headling from "../../components/Headling/Headling";
import History from "../../components/History/History";


const MainPage = observer(() =>{
    const {currentAccount, getAccountById} = AccountStore;
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            getAccountById(id); 
        }
    }, [id, getAccountById]); 
    return(
        <>
        <div className={styles['container']}>
            <Card balance={currentAccount?.balance || 0} card={currentAccount?.card_number || ''}>
                <img src="/more.svg" alt="more" className={styles['more']} 
                    style={{width: '5px', height: '18px'}}
                />
            </Card>
            <div className={styles['datas']}>
                <div className={styles['block']}>
                    <p className={styles['text']}>Пополнения</p>
                    {0} р
                </div>
                <div className={styles['block']}>
                    <p className={styles['text']}>Затраты</p>
                    {0} р
                </div>
            </div>
            
        </div>
        <div className={styles['history-block']}>
            <Headling className={styles['history']}>История</Headling>
            <History/>
        </div>
        
        </>
    )
})
export default MainPage;