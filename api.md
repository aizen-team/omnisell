# Thiết kế API chính
✅ 1. Product API
GET    /api/products
POST   /api/products
GET    /api/products/{id}
PUT    /api/products/{id}
DELETE /api/products/{id}

🔄 2. Sync Channel API
POST /api/channels/connect (Kết nối kênh Shopee/TikTok/Facebook)
GET  /api/channels/{id}/products/sync
GET  /api/channels/{id}/orders/sync

📦 3. Inventory API
GET  /api/inventories
POST /api/inventories/update (Batch update khi có đơn)

📥 4. Order API
GET  /api/orders
GET  /api/orders/{id}
POST /api/orders/webhook (Shopee/TikTok webhook endpoint)

💬 5. Message/Chat API
GET  /api/messages
POST /api/messages/send
POST /api/messages/webhook

🧠 6. AI Assistant API
POST /api/ai/reply (Tự động trả lời chat)
POST /api/ai/order-reminder
POST /api/ai/recommend-products
