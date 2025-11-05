import db from "#db/client";

import { createOrder } from "#db/queries/orders";
import { createUser } from "#db/queries/users";
import { createProduct } from "#db/queries/products";
import { createOrderProductRow } from "#db/queries/orders_products";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const user = await createUser("turtle", "fish");
  for (let i = 1; i <= 10; i++) {
    await createProduct(`Product ${i}`, "description", i);
  }
  const order = await createOrder("1984-01-01", "note", user.id);
  for (let i = 1; i <= 5; i++) {
    const newProduct = await createOrderProductRow(
      order.id,
      i,
      Math.floor(Math.random() * 10) + 1
    );
    console.log(newProduct);
  }
}
