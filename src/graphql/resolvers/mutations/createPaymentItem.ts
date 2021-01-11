import { DB, QueryConfig, APIResponse } from '../../../types';
import { PaymentItem } from '../../../models';

export async function createPaymentItem(db: DB, args: any) {
  const {
    item: { contractId, description, value, time },
  } = args;

  const query: QueryConfig = {
    text: `INSERT INTO payments(contract_id, description, value, time) VALUES($1, $2, $3, $4) RETURNING *`,
    values: [contractId, description, value, time],
  };

  const result = await db.query(query);
  const response: APIResponse<PaymentItem> = {
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
      response.status = 'success';
      response.items = data;
    }
  } catch (e) {
    response.status = 'error';
  }

  return response;
}
