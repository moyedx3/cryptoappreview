-- Crypto App Review Database Schema
-- PostgreSQL

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Articles/Reviews table
CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(200),
    description TEXT NOT NULL,
    content TEXT, -- Full review content
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    category_id INTEGER REFERENCES categories(id),
    image_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loved Apps (On the Radar) table
CREATE TABLE IF NOT EXISTS loved_apps (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    description TEXT,
    image_url VARCHAR(500),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default categories
INSERT INTO categories (name, slug) VALUES
    ('Wallet', 'wallet'),
    ('Exchange', 'exchange'),
    ('DeFi', 'defi'),
    ('Security', 'security'),
    ('NFT', 'nft'),
    ('Lending', 'lending'),
    ('Staking', 'staking'),
    ('Bridges', 'bridges'),
    ('Tools', 'tools')
ON CONFLICT (slug) DO NOTHING;
