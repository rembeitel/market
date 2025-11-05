import db from "#db/client";

export async function createProduct(title, description, price) {
  const sql = `
    INSERT INTO products
    (title, description, price)
    VALUES
    ($1, $2, $3)
    RETURNING *
    `;
  const {
    rows: [product],
  } = await db.query(sql, [title, description, price]);
  return product;
}

export async function getProductsByUserId(userId) {
  const sql = `
    SELECT *
    FROM products
    WHERE user_id = $1
    `;
  const { rows: products } = await db.query(sql, [userId]);
  return products;
}

export async function getProductById(id) {
  const sql = `
    SELECT *
    FROM products
    WHERE id = $1
    `;
  const {
    rows: [product],
  } = await db.query(sql, [id]);
  return product;
}

export async function deleteProductById(id) {
  const sql = `
    DELETE FROM products
    WHERE id = $1
    `;
  await db.query(sql, [id]);
}

export async function updateProductById(id, title, description, price) {
  const sql = `
    UPDATE products
    SET
    title = $2,
    description = $3,
    price = $4
    WHERE id = $1
    RETURNING *
    `;
  const {
    rows: [product],
  } = await db.query(sql, [id, title, description, price]);
  return product;
}
