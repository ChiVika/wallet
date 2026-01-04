import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import type { APIResponse } from "../helpers/APIResponse";
import type { Transaction } from "../interfaces/Transaction.interface";
import { PORT } from "../helpers/API";

class TransactionStore{
    loading: boolean = false;
    currentTransactions: Transaction[] = [];

    category_type: 'income' | 'expense' = 'income';
    category_name: string = '';
    amount: number = 0;

    openModal: boolean = false

    constructor(){
        makeAutoObservable(this);
    }

    getCurrentTransactions = async(account_id: number | string) => {
        this.loading = true
        try{
            const res = await axios.get<APIResponse<Transaction[]>>(`${PORT}/transactions/${account_id}`);
            runInAction(() => {
                if(res.data.success){
                    console.log(res.data.data)
                    this.currentTransactions = res.data.data;
                }
            })
            

        }
        catch(error){
            runInAction(() => {
                console.log(error);
            })
        }
        finally{
            runInAction(() => {
                this.loading = false
            })
        }
    }

    functionOpenModal = () => {
        this.openModal = true
    }
    functionCloseModal = () => {
        this.openModal = false
    }
    
}

export default new TransactionStore;