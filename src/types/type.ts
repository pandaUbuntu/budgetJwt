export type Category = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}
  
  
export type User = {
    id: number;
    name?: string;
    email: string;
    password: string;
    categories?: Category[];
}

export type Transaction = {
    id: number;
    type: TransactionType;
    category: Category;
    value: number;
    date: string;
    createdAt: string;
    updatedAt: string;
}
  
export type TransactionType = {
    id: number;
    name: 'income' | 'expense';
}
  
export type FilterType = {
    type?: string;
    categoryId?: number;
    startDate?: string;
    endDate?: string;
}
