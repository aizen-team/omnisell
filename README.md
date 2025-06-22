# OmniSell - Nền Tảng Bán Hàng Đa Kênh Tích Hợp AI Assistant

**OmniSell** Nền tảng hỗ trợ chủ shop online bán hàng hiệu quả hơn trên nhiều kênh như **Shopee, TikTok Shop, Facebook**, thông qua tính năng **đồng bộ đơn hàng, sản phẩm, kho hàng** và **trợ lý AI thông minh** giúp chăm sóc khách hàng và quản lý vận hành tự động.

## 🚀 Tính năng chính

- 🔗 Kết nối tài khoản Shopee, TikTok Shop, Facebook Shop
- 📦 Đồng bộ sản phẩm, đơn hàng và tồn kho
- 💬 Hộp thư tin nhắn hợp nhất (Omni Inbox)
- 🤖 AI Assistant gợi ý phản hồi tin nhắn, đánh giá
- 📊 Thống kê doanh thu, hiệu suất sản phẩm
- 🔔 Cảnh báo đơn hủy, hàng sắp hết tồn
- 🧠 Chatbot AI chăm sóc khách hàng theo kịch bản (sắp triển khai)
- 📱 App mobile (đang phát triển)

## 🧩 Kiến trúc hệ thống

- **Frontend**: [Next.js](https://nextjs.org/) + Tailwind CSS
- **Backend**: [NestJS](https://nestjs.com/) (Node.js)
- **AI Assistant**: OpenAI GPT API hoặc mô hình AI tùy chỉnh
- **Database**: PostgreSQL, Redis (cache, queue)
- **Cloud**: AWS (EC2, RDS, S3, CloudFront, Route53)
- **DevOps**: Docker, GitHub Actions CI/CD

## 🛠️ Cài đặt & Chạy dự án

```bash
# Clone repo
git clone https://github.com/your-org/omnisell.git
cd omnisell

# Cài backend
cd backend
npm install
npm run start:dev

# Cài frontend
cd ../frontend
npm install
npm run dev

## Database ERD
https://dbdocs.io/trieunb/OmniSell-ERD