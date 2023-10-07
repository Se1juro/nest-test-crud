CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name varchar(80) NOT NULL,
  category varchar(50) NOT NULL,
  price decimal(10,2) NOT NULL,
  quantity int NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
INSERT INTO public.products (id, "name", category, price, quantity, created_at, updated_at) VALUES(1, 'Cuchilla de afeitar', 'Aseo personal', 3.99, 30, '2023-10-05 15:50:32.217', '2023-10-05 15:50:32.217');
INSERT INTO public.products (id, "name", category, price, quantity, created_at, updated_at) VALUES(2, 'Desodorante', 'Aseo personal', 10.99, 15, '2023-10-05 16:05:12.370', '2023-10-05 16:05:12.370');
INSERT INTO public.products (id, "name", category, price, quantity, created_at, updated_at) VALUES(3, '1LB Carne', 'Comida', 12.00, 50, '2023-10-05 16:07:50.474', '2023-10-05 16:07:50.474');
INSERT INTO public.products (id, "name", category, price, quantity, created_at, updated_at) VALUES(4, 'Papas colombia', 'Dulceria', 8.35, 12, '2023-10-05 16:08:07.681', '2023-10-05 16:08:07.681');
INSERT INTO public.products (id, "name", category, price, quantity, created_at, updated_at) VALUES(5, 'Televisor 50" Samsung', 'Electrodomesticos', 399.00, 5, '2023-10-05 16:09:13.532', '2023-10-05 16:09:13.532');
INSERT INTO public.products (id, "name", category, price, quantity, created_at, updated_at) VALUES(6, 'AirFryer Imusa', 'Electrodomesticos', 120.00, 5, '2023-10-05 16:09:33.044', '2023-10-05 16:09:33.044');
INSERT INTO public.products (id, "name", category, price, quantity, created_at, updated_at) VALUES(7, 'PS5', 'Consolas y videojuegos', 500.00, 20, '2023-10-05 16:09:50.417', '2023-10-05 16:09:50.417');
INSERT INTO public.products (id, "name", category, price, quantity, created_at, updated_at) VALUES(8, 'Juego de cocina', 'Muebles, Decoracion y Cocina', 40.99, 20, '2023-10-05 16:10:10.391', '2023-10-05 16:10:10.391');
INSERT INTO public.products (id, "name", category, price, quantity, created_at, updated_at) VALUES(9, 'Altavoz JBL', 'Audio y video', 60.00, 15, '2023-10-05 16:10:33.438', '2023-10-05 16:10:33.438');
INSERT INTO public.products (id, "name", category, price, quantity, created_at, updated_at) VALUES(10, 'Cuadro decorativo', 'Muebles y hogar', 12.35, 3, '2023-10-05 16:10:54.847', '2023-10-05 16:10:54.847');
INSERT INTO public.products (id, "name", category, price, quantity, created_at, updated_at) VALUES(11, 'Nevera', 'Electrodomesticos', 120.00, 1, '2023-10-05 16:11:10.224', '2023-10-05 16:11:10.224');


CREATE TABLE IF NOT EXISTS "users" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  money decimal(10,2) NOT NULL DEFAULT 0.0,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

  CREATE TABLE IF NOT EXISTS purchase (
    id SERIAL PRIMARY KEY,
    purchase_date TIMESTAMP,
    total NUMERIC,
    user_id INT REFERENCES "users"(id)
  );

CREATE TABLE IF NOT EXISTS product_purchase (
  id SERIAL PRIMARY KEY,
  purchase_id int REFERENCES purchase(id),
  product_id int REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS shopping_kart (
  id SERIAL PRIMARY KEY,
  user_id int REFERENCES users(id),
  status int,
  total NUMERIC
);

CREATE TABLE IF NOT EXISTS shopping_kart_products (
  id SERIAL PRIMARY KEY,
  shopping_kart_id int REFERENCES shopping_kart(id),
  product_id int REFERENCES products(id),
  quantity int
);


CREATE INDEX index_product_purchase_on_purchase_id ON product_purchase (purchase_id);
CREATE INDEX index_product_purchase_on_product_id ON product_purchase (product_id);
CREATE INDEX purchase_product_pkey ON product_purchase (id);

CREATE INDEX user_pkey ON "users"(id);

CREATE INDEX purchase_pkey ON purchase (id);
CREATE INDEX index_purchase_on_user_id ON purchase (user_id);

CREATE INDEX product_pkey ON product (id);

CREATE INDEX index_kart_on_user_id ON  shopping_kart (user_id);
CREATE INDEX index_kart_product_on_kart_id ON  shopping_kart_products (shopping_kart_id);
CREATE INDEX index_kart_product_on_product_id ON  shopping_kart_products (product_id);
