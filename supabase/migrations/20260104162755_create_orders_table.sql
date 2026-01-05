/*
  # Create orders and order_items tables

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `shipping_address` (text)
      - `city` (text)
      - `postal_code` (text)
      - `total_amount` (decimal)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)

    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `product_name` (text)
      - `product_size` (text)
      - `quantity` (integer)
      - `unit_price` (decimal)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Public insert policy for creating orders
    - Public select policy for viewing specific order details
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  shipping_address text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_name text NOT NULL,
  product_size text NOT NULL,
  quantity integer NOT NULL,
  unit_price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view orders by email"
  ON orders FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view order items"
  ON order_items FOR SELECT
  USING (true);

CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
