import { makeAutoObservable, runInAction } from "mobx";
import type { Account } from "../interfaces/Account.interface";
import axios from "axios";
import type { APIResponse } from "../helpers/APIResponse";
import { PORT } from "../helpers/API";

class AccountStore{
    accounts: Account[] = [];
    currentAccount: Account | null = null;
    loading = false;
    error: string | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    

    getAllAccount = async() => {
        runInAction(() => {
            this.loading = true;
            this.error = null;
        })

        try{
            const res = await axios.get<APIResponse<Account[]>>(`${PORT}/accounts`);
            runInAction(() => {
                if(res.data.success){
                    this.accounts = res.data.data;
                }
                else {
                    this.error = 'Ошибка сервера: неуспешный ответ!';
                    console.log('Ошибка сервера');
                }
            })
            

        }
        catch(error){
            runInAction(() => {
                this.error = axios.isAxiosError(error) ? error.message : 'Неизвестная ошибка';
                console.log('Ошибка при получении счетов:', error);
                
            })
        }
        finally{
            runInAction(() => {
                this.loading = false;
            })
            
        }
    }

    getAccountById = async(id: number | string) => {
        runInAction(() => {
            this.loading = true;
            this.error = null;
        })
        
        try{
            const res = await axios.get<APIResponse<Account>>(`${PORT}/accounts/${id}`)
            runInAction(() => {
                if(res.data.success){
                    this.currentAccount = res.data.data;
                }
                else{
                    this.error = 'Ошибка сервера: неуспешный ответ!';
                    console.log('Ошибка сервера');
                }
            })
        }
        catch(error){
            runInAction(() => {
                this.error = axios.isAxiosError(error) ? error.message : 'Неизвестная ошибка';
                console.log('Ошибка при получении счета:', error);
            })
        }
        finally{
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}
export default new AccountStore;