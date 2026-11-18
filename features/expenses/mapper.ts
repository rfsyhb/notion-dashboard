import type { PageObjectResponse } from '@notionhq/client';
import { Expense } from './types';
import { isExpenseCategory } from './utils';

export function mapExpenseItem(page: PageObjectResponse): Expense {
  const productName = page.properties['Product'];
  const productPrice = page.properties['IDR'];
  const productCreatedAt = page.properties['Date'];
  const productCategory = page.properties['Category'];
  const category =
    productCategory?.type === 'select'
      ? productCategory.select?.name
      : undefined;

  return {
    id: page.id,
    Product:
      productName?.type === 'title'
        ? (productName.title[0]?.plain_text ?? '')
        : '',
    IDR: productPrice?.type === 'number' ? (productPrice.number ?? 0) : 0,
    Date:
      productCreatedAt?.type === 'date'
        ? (productCreatedAt.date?.start ?? '')
        : '',
    Category: category && isExpenseCategory(category) ? category : 'Other',
  };
}
