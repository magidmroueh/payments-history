import { DB, QueryConfig, APIResponse } from '../../../types';
import { PaymentItem } from '../../../models';

export async function deletePaymentItem(db: DB, args: any) {
  const { id } = args;

  const query: QueryConfig = {
    text: `UPDATE payments SET is_deleted = True WHERE id = $1 `,
    values: [id],
  };

  const result = await db.query(query);
  const response: APIResponse<PaymentItem> = {
    status: 'fetching',
  };

  try {
    if (result.rowCount > 0) {
      const data = result.rows.map((item: PaymentItem) => {
        const { id, value, created_at: createdAt, updated_at: updatedAt } = item;
        return { id, value, createdAt, updatedAt }
      });
      response.status = 'success';
      response.items = data;
    } else {
      response.status = 'error';
      response.message = 'Record is not found';
    }
  } catch (e) {
    response.status = 'error';
  }

  return response;
}
