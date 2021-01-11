var fs = require('fs');
var { db } = require('../../../scripts/seed/db/index.ts');
const data = require('../../../scripts/seed/payments/data.json');

const PaymentsListItems = [];

const query = 'INSERT INTO payments(contract_id, description, value, time, is_imported, created_at, updated_at, is_deleted) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

data.map(function (item) {
  const contractId = item.contract_id;
  const description = item.description;
  const value = item.value;
  const time = item.time;
  const isImported = item.is_imported;
  const createdAt = item.created_at;
  const updatedAt = item.updated_at;
  const isDeleted = item.is_deleted;

  db.query(query, [contractId, description, value, time, isImported, createdAt, updatedAt, isDeleted], function (err, result) {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(result.rows[0]);
    }
  });
});
