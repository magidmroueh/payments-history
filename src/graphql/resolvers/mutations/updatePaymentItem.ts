import { DB, QueryConfig, APIResponse } from '../../../types';
import { PaymentItem } from '../../../models';

export async function updatePaymentItem(db: DB, args: any) {
  const {
    id,
    item: { contractId, description, value, time },
  } = args;

  const query: QueryConfig = {
    text: `UPDATE payments SET contract_id = $2, description = $3, value = $4, time = $5, is_imported = False WHERE id = $1 RETURNING *`,
    values: [id, contractId, description, value, time],
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
