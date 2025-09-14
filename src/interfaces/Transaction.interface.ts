export interface Transaction{
    id: number,
    account_id: number
    amount: string,
    category_name: string
    category_type: "income" | "expense"
}