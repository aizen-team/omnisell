-- =============================================
-- MULTICHANNEL E-COMMERCE PLATFORM DATABASE SCHEMA
-- Version: 1.0
-- Database: PostgreSQL
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- SECTION 1: USER MANAGEMENT & AUTHORIZATION
-- =============================================

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles table
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User roles junction table
CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id)
);

-- Subscription plans table (defined early for foreign key reference)
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    price_monthly DECIMAL(12,2) NOT NULL DEFAULT 0,
    price_yearly DECIMAL(12,2) NOT NULL DEFAULT 0,
    features JSONB DEFAULT '{}',
    limits JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shops table
CREATE TABLE shops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES users(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    subscription_plan_id UUID REFERENCES subscription_plans(id),
    subscription_expires_at TIMESTAMP,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SECTION 2: PRODUCT MANAGEMENT
-- =============================================

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    sku VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(12,2),
    cost_price DECIMAL(12,2),
    weight DECIMAL(10,3),
    dimensions JSONB DEFAULT '{}',
    attributes JSONB DEFAULT '{}',
    tags TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(shop_id, sku)
);

-- Product variants table
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    sku_variant VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255),
    attributes JSONB DEFAULT '{}',
    price DECIMAL(12,2),
    compare_price DECIMAL(12,2),
    barcode VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product images table
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text VARCHAR(255),
    position INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SECTION 3: SALES CHANNELS & INTEGRATION
-- =============================================

-- Sales channels table
CREATE TABLE sales_channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    icon_url TEXT,
    is_active BOOLEAN DEFAULT true,
    api_config JSONB DEFAULT '{}'
);

-- Shop channel connections table
CREATE TABLE shop_channel_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    channel_id UUID REFERENCES sales_channels(id) ON DELETE CASCADE,
    external_shop_id VARCHAR(255),
    external_shop_name VARCHAR(255),
    credentials JSONB DEFAULT '{}', -- Should be encrypted in production
    webhook_secret VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    last_sync_at TIMESTAMP,
    sync_settings JSONB DEFAULT '{}',
    connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(shop_id, channel_id)
);

-- Channel products table
CREATE TABLE channel_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
    connection_id UUID REFERENCES shop_channel_connections(id) ON DELETE CASCADE,
    external_product_id VARCHAR(255),
    external_variant_id VARCHAR(255),
    channel_price DECIMAL(12,2),
    channel_stock INTEGER,
    channel_data JSONB DEFAULT '{}',
    sync_status VARCHAR(20) CHECK (sync_status IN ('synced', 'pending', 'error')),
    last_sync_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(connection_id, external_product_id)
);

-- =============================================
-- SECTION 4: ORDER MANAGEMENT
-- =============================================

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    connection_id UUID REFERENCES shop_channel_connections(id),
    external_order_id VARCHAR(255),
    order_number VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
    payment_status VARCHAR(20) CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
    shipping_fee DECIMAL(12,2) NOT NULL DEFAULT 0,
    discount_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'VND',
    customer_info JSONB DEFAULT '{}',
    shipping_info JSONB DEFAULT '{}',
    channel_data JSONB DEFAULT '{}',
    notes TEXT,
    ordered_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    external_product_id VARCHAR(255),
    product_name VARCHAR(255) NOT NULL,
    variant_name VARCHAR(255),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    total_price DECIMAL(12,2) NOT NULL,
    attributes JSONB DEFAULT '{}'
);

-- Order status history table
CREATE TABLE order_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    from_status VARCHAR(50),
    to_status VARCHAR(50) NOT NULL,
    changed_by UUID REFERENCES users(id),
    reason TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SECTION 5: INVENTORY MANAGEMENT
-- =============================================

-- Warehouses table
CREATE TABLE warehouses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    address TEXT,
    is_default BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory table
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    warehouse_id UUID REFERENCES warehouses(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity_on_hand INTEGER DEFAULT 0,
    quantity_available INTEGER DEFAULT 0,
    quantity_reserved INTEGER DEFAULT 0,
    reorder_point INTEGER,
    reorder_quantity INTEGER,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(warehouse_id, product_id, variant_id)
);

-- Inventory transactions table
CREATE TABLE inventory_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    warehouse_id UUID REFERENCES warehouses(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
    type VARCHAR(20) CHECK (type IN ('in', 'out', 'adjust', 'transfer')),
    reason VARCHAR(100),
    reference_type VARCHAR(50),
    reference_id UUID,
    quantity INTEGER NOT NULL,
    unit_cost DECIMAL(12,2),
    balance_after INTEGER,
    notes TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SECTION 6: MESSAGING & CHAT
-- =============================================

-- Conversations table
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    connection_id UUID REFERENCES shop_channel_connections(id),
    external_conversation_id VARCHAR(255),
    customer_external_id VARCHAR(255),
    customer_name VARCHAR(255),
    customer_avatar TEXT,
    customer_info JSONB DEFAULT '{}',
    status VARCHAR(20) CHECK (status IN ('active', 'closed', 'spam')),
    unread_count INTEGER DEFAULT 0,
    last_message_at TIMESTAMP,
    assigned_to UUID REFERENCES users(id),
    tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(connection_id, external_conversation_id)
);

-- Messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    external_message_id VARCHAR(255),
    sender_type VARCHAR(20) CHECK (sender_type IN ('customer', 'shop', 'system', 'ai')),
    sender_id VARCHAR(255),
    content TEXT,
    attachments JSONB DEFAULT '[]',
    is_read BOOLEAN DEFAULT false,
    ai_suggested BOOLEAN DEFAULT false,
    ai_confidence DECIMAL(3,2),
    channel_data JSONB DEFAULT '{}',
    sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Message templates table
CREATE TABLE message_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    content TEXT NOT NULL,
    variables TEXT[],
    usage_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SECTION 7: AI & ANALYTICS
-- =============================================

-- AI agents table
CREATE TABLE ai_agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('chat', 'product_recommendation', 'inventory_analysis')),
    model_config JSONB DEFAULT '{}',
    knowledge_base JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI interactions table
CREATE TABLE ai_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID REFERENCES ai_agents(id) ON DELETE CASCADE,
    reference_type VARCHAR(50),
    reference_id UUID,
    input_data JSONB DEFAULT '{}',
    output_data JSONB DEFAULT '{}',
    confidence_score DECIMAL(3,2),
    tokens_used INTEGER,
    response_time_ms INTEGER,
    feedback VARCHAR(20) CHECK (feedback IN ('positive', 'negative', 'neutral') OR feedback IS NULL),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics events table
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB DEFAULT '{}',
    user_id UUID REFERENCES users(id),
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SECTION 8: SUBSCRIPTION & BILLING
-- =============================================

-- Shop subscriptions table
CREATE TABLE shop_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    status VARCHAR(20) CHECK (status IN ('trial', 'active', 'cancelled', 'expired')),
    billing_cycle VARCHAR(20) CHECK (billing_cycle IN ('monthly', 'yearly')),
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    cancel_at_period_end BOOLEAN DEFAULT false,
    trial_ends_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Usage tracking table
CREATE TABLE usage_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    metric_type VARCHAR(50) NOT NULL,
    usage_value BIGINT NOT NULL DEFAULT 0,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(shop_id, metric_type, period_start)
);

-- =============================================
-- SECTION 9: SYSTEM & INTEGRATION
-- =============================================

-- Webhooks table
CREATE TABLE webhooks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    events TEXT[],
    secret_key VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    last_triggered_at TIMESTAMP,
    failure_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Webhook logs table
CREATE TABLE webhook_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    webhook_id UUID REFERENCES webhooks(id) ON DELETE CASCADE,
    event_type VARCHAR(100),
    payload JSONB DEFAULT '{}',
    response_status INTEGER,
    response_body TEXT,
    duration_ms INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System logs table
CREATE TABLE system_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    level VARCHAR(20) CHECK (level IN ('debug', 'info', 'warning', 'error', 'critical')),
    category VARCHAR(100),
    message TEXT,
    context JSONB DEFAULT '{}',
    stack_trace TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active) WHERE is_active = true;

-- Shop indexes
CREATE INDEX idx_shops_owner ON shops(owner_id);
CREATE INDEX idx_shops_slug ON shops(slug);

-- Product indexes
CREATE INDEX idx_products_shop_sku ON products(shop_id, sku);
CREATE INDEX idx_products_shop_active ON products(shop_id, is_active);
CREATE INDEX idx_products_tags ON products USING GIN(tags);

-- Order indexes
CREATE INDEX idx_orders_shop_status ON orders(shop_id, status);
CREATE INDEX idx_orders_external ON orders(connection_id, external_order_id);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- Inventory indexes
CREATE INDEX idx_inventory_product ON inventory(product_id);
CREATE INDEX idx_inventory_warehouse ON inventory(warehouse_id);
CREATE INDEX idx_inv_trans_product_created ON inventory_transactions(product_id, created_at DESC);

-- Message indexes
CREATE INDEX idx_conversations_shop ON conversations(shop_id);
CREATE INDEX idx_conversations_connection ON conversations(connection_id);
CREATE INDEX idx_messages_conversation_sent ON messages(conversation_id, sent_at DESC);

-- Analytics indexes
CREATE INDEX idx_analytics_shop_type_created ON analytics_events(shop_id, event_type, created_at DESC);
CREATE INDEX idx_ai_interactions_agent_created ON ai_interactions(agent_id, created_at DESC);

-- System indexes
CREATE INDEX idx_system_logs_level_created ON system_logs(level, created_at DESC);
CREATE INDEX idx_system_logs_category_created ON system_logs(category, created_at DESC);
CREATE INDEX idx_webhook_logs_webhook_created ON webhook_logs(webhook_id, created_at DESC);

-- =============================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shops_updated_at BEFORE UPDATE ON shops
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shop_subscriptions_updated_at BEFORE UPDATE ON shop_subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SAMPLE DATA FOR ESSENTIAL TABLES
-- =============================================

-- Insert default roles
INSERT INTO roles (name, description, permissions) VALUES
('admin', 'Full system access', '{"*": ["*"]}'),
('shop_owner', 'Shop owner with full shop access', '{"shop": ["*"], "products": ["*"], "orders": ["*"], "inventory": ["*"], "chat": ["*"]}'),
('staff', 'Staff member with limited access', '{"products": ["read"], "orders": ["read", "update"], "chat": ["read", "write"]}');

-- Insert sales channels
INSERT INTO sales_channels (code, name, icon_url, is_active, api_config) VALUES
('shopee', 'Shopee', '/icons/shopee.png', true, '{"api_url": "https://partner.shopeemobile.com", "version": "v2"}'),
('tiktok', 'TikTok Shop', '/icons/tiktok.png', true, '{"api_url": "https://open-api.tiktokglobalshop.com", "version": "v1"}'),
('facebook', 'Facebook Shop', '/icons/facebook.png', true, '{"api_url": "https://graph.facebook.com", "version": "v15.0"}');

-- Insert subscription plans
INSERT INTO subscription_plans (name, code, price_monthly, price_yearly, features, limits) VALUES
('Free', 'free', 0, 0, 
 '{"channels": 1, "products": 50, "orders": 100, "ai_messages": 100}',
 '{"api_calls": 1000, "storage_gb": 1}'),
('Pro', 'pro', 299000, 2990000,
 '{"channels": 3, "products": 500, "orders": 1000, "ai_messages": 1000, "analytics": true}',
 '{"api_calls": 10000, "storage_gb": 10}'),
('Premium', 'premium', 999000, 9990000,
 '{"channels": -1, "products": -1, "orders": -1, "ai_messages": -1, "analytics": true, "custom_ai": true}',
 '{"api_calls": -1, "storage_gb": 100}');

-- =============================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================

COMMENT ON TABLE users IS 'User accounts for platform access';
COMMENT ON TABLE shops IS 'Shop/merchant accounts';
COMMENT ON TABLE products IS 'Master product catalog';
COMMENT ON TABLE orders IS 'Orders from all channels';
COMMENT ON TABLE inventory IS 'Real-time inventory tracking';
COMMENT ON TABLE conversations IS 'Customer chat conversations from all channels';
COMMENT ON TABLE ai_agents IS 'AI assistant configurations';
COMMENT ON TABLE analytics_events IS 'Event tracking for analytics';

COMMENT ON COLUMN shops.settings IS 'JSON settings: timezone, currency, language, etc';
COMMENT ON COLUMN products.attributes IS 'Dynamic product attributes: color, size, material, etc';
COMMENT ON COLUMN orders.customer_info IS 'Customer details: name, phone, email, address';
COMMENT ON COLUMN shop_channel_connections.credentials IS 'Encrypted API credentials for channel';
COMMENT ON COLUMN ai_interactions.reference_type IS 'Type of entity: order, conversation, product, etc';