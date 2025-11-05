import db from "#db/client";

export async function createOrder(date, note, user_id) {
  const sql = `
    INSERT INTO orders
    (date, note, user_id)
    VALUES
    ($1, $2, $3)
    RETURNING *
    `;
  const {
    rows: [order],
  } = await db.query(sql, [date, note, user_id]);
  return order;
}

export async function getOrdersByUserId(userId) {
  const sql = `
    SELECT *
    FROM orders
    WHERE user_id = $1
    `;
  const { rows: orders } = await db.query(sql, [userId]);
  return orders;
}

export async function getOrderById(id) {
  const sql = `
    SELECT *
    FROM orders
    WHERE id = $1
    `;
  const {
    rows: [order],
  } = await db.query(sql, [id]);
  return order;
}

export async function deleteOrderById(id) {
  const sql = `
    DELETE FROM orders
    WHERE id = $1
    `;
  await db.query(sql, [id]);
}

export async function updateOrderById(id, date, note) {
  const sql = `
    UPDATE orders
    SET
    date = $2
    note = $3
    WHERE id = $1
    RETURNING *
    `;
  const {
    rows: [order],
  } = await db.query(sql, [id, date, note]);
  return order;
}
