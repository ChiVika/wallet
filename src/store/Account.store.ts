import { makeAutoObservable, runInAction } from "mobx";
import type { Account } from "../interfaces/Account.interface";
import axios from "axios";
import type { APIResponse } from "../helpers/APIResponse";
import { PORT } from "../helpers/API";

class AccountStore{
    account: Account[] = [];
    loading = false;
    error: string | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    getAllAccount = async() => {
        this.loading = true;
        this.error = null;

        try{
            const res = await axios.get<APIResponse<Account[]>>(`${PORT}/accounts`);
            if(res.data.success){
                this.account = res.data.data;
            }
            else {
                this.error = 'Ошибка сервера: неуспешный ответ!';
                console.log('Ошибка сервера');
            }

        }
        catch(error){
            runInAction(() => {
                this.error = axios.isAxiosError(error) ? error.message : 'Неизвестная ошибка';
                console.log('Ошибка при получении счетов:', error);
                
            })
        }
        finally{
            this.loading = false;
        }
    }
}
export default new AccountStore;