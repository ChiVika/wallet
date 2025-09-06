import { useEffect } from "react";
import AccountStore from "../../store/Account.store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";


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
        <div>{currentAccount?.card_number}</div>
        
        </>
    )
})
export default MainPage;