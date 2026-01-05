import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface OrderItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
}

interface OrderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  items: OrderItem[];
  totalAmount: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const orderData: OrderRequest = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing Supabase configuration");
    }

    const headers = {
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
    };

    const orderResponse = await fetch(`${supabaseUrl}/rest/v1/orders`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        shipping_address: orderData.shippingAddress,
        city: orderData.city,
        postal_code: orderData.postalCode,
        total_amount: orderData.totalAmount,
        status: "pending",
      }),
    });

    if (!orderResponse.ok) {
      throw new Error(`Failed to create order: ${orderResponse.statusText}`);
    }

    const [order] = await orderResponse.json();

    const orderItems = orderData.items.map((item) => ({
      order_id: order.id,
      product_name: item.name,
      product_size: item.size,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    const itemsResponse = await fetch(
      `${supabaseUrl}/rest/v1/order_items`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(orderItems),
      }
    );

    if (!itemsResponse.ok) {
      throw new Error(`Failed to create order items: ${itemsResponse.statusText}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId: order.id,
        message: "Order created successfully",
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
