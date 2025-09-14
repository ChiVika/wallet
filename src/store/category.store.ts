import { makeAutoObservable, runInAction } from "mobx";
import type { Category } from "../interfaces/Category.interface";
import axios from "axios";
import { PORT } from "../helpers/API";


class CategoryStore{
    category: Category | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    getCategory = async (id_category: number) => {
        try {
            const res = await axios.get(`${PORT}/category/${id_category}`);
            
            runInAction(() => {
                if (res.data.success) {
                    this.category = res.data.data;
                }
            });
        } catch (error) {
            runInAction(() => {
                this.category = null;
                console.error('Error fetching category:', error);
            });
        }
    }

    get name(): string {
        return this.category?.name || '';
    }

    get type(): "income" | "expense" | "" {
        return (this.category?.type as "income" | "expense") || '';
    }

}

export default new CategoryStore;