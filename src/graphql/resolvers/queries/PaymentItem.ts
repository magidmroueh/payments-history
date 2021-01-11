import { DB, QueryConfig, APIResponse } from '../../../types';
import { PaymentItem } from '../../../models';

export async function PaymentItem(db: DB, args: any) {
  let query: QueryConfig = { text: 'SELECT * FROM payments WHERE is_deleted = False' };

  if (args && args.contractId && args.startDate && args.endDate) {
    query = {
      text: `SELECT * FROM payments WHERE contract_id = $1 AND time >= $2 AND time <= $3 AND is_deleted = False`,
      values: [args.contractId, args.startDate, args.endDate],
    };
  }

  const result = await db.query(query);

  const response: APIResponse<PaymentItem[]> = {
    status: 'fetching',
  };

  try {
    if (result.rowCount > 0) {
      const data = result.rows.map((item: PaymentItem) => {
        const {
          id,
          contract_id: contractId,
          description,
          value,
          time,
          is_imported: isImported,
          created_at: createdAt,
          updated_at: updatedAt,
          is_deleted: isDeleted
        } = item;
        return {
          id, contractId, description, value, time, isImported, createdAt, updatedAt, isDeleted
        }
      });

      let sum = 0;
      result.rows.map((item: PaymentItem) => { sum += item.value });
      response.status = 'success';
      response.message = 'success';
      response.items = data;
      response.sum = sum;
    }
  } catch (e) {
    response.status = 'error';
  }

  return response;
}
