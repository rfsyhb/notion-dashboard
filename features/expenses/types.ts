export type Expense = {
  id: string;
  Product: string;
  Date: string;
  IDR: number;
};

export type GetExpensesPayload = {
  data: Expense[];
  nextCursor: string;
  hasMore: string;
};

export type InputExpensePayload = Omit<Expense, 'id'> & {
  imageFileUploadId?: string;
  imageName?: string;
};
