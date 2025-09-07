import { useEffect } from "react";
import AccountStore from "../../store/Account.store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Card from "../../components/Card/Card";
import styles from './MainPage.module.css';


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
        <div>
            <Card balance={currentAccount?.balance || 0} card={currentAccount?.card_number || ''}>
                <img src="/more.svg" alt="more" className={styles['more']} 
                    style={{width: '5px', height: '18px'}}
                />
            </Card>
        </div>
        
        </>
    )
})
export default MainPage;