-- Migration script to insert sample data
-- Run this after schema.sql to populate the database with initial reviews

-- Insert loved apps (On the Radar)
INSERT INTO loved_apps (name, category, rating, description, display_order) VALUES
    ('Phantom', 'Solana Wallet', 10, 'The best Solana wallet experience', 1),
    ('Aave', 'Lending Protocol', 9, 'DeFi lending made simple', 2),
    ('Jupiter', 'Aggregator', 9, 'Best DEX aggregator on Solana', 3),
    ('Rabby', 'Browser Wallet', 8, 'Smart browser wallet with security features', 4),
    ('Curve', 'Stable Swap', 8, 'Efficient stablecoin trading', 5);

-- Insert sample articles (the ones that were hardcoded)
INSERT INTO articles (title, subtitle, description, content, rating, category_id, is_featured, is_published, published_at) VALUES
    (
        'Coinbase',
        'Advanced Trade',
        'The industry leader remains the gold standard for UI, but are the fees finally becoming too steep for the retail investor?',
        'Full review content here...',
        8,
        (SELECT id FROM categories WHERE slug = 'exchange'),
        true,
        true,
        CURRENT_TIMESTAMP
    ),
    (
        'MetaMask',
        'Portfolio Dapp',
        'The new dashboard integration is a game-changer for tracking assets across multiple chains.',
        'Full review content here...',
        9,
        (SELECT id FROM categories WHERE slug = 'wallet'),
        false,
        true,
        CURRENT_TIMESTAMP - INTERVAL '2 days'
    ),
    (
        'Binance',
        'Global App',
        'Unmatched features and liquidity, but the interface remains cluttered for new users.',
        'Full review content here...',
        7,
        (SELECT id FROM categories WHERE slug = 'exchange'),
        false,
        true,
        CURRENT_TIMESTAMP - INTERVAL '4 days'
    ),
    (
        'Uniswap',
        'V4 Interface',
        'The hooks system is revolutionary, but the gas optimization on mainnet is still a hurdle.',
        'Full review content here...',
        8,
        (SELECT id FROM categories WHERE slug = 'defi'),
        false,
        true,
        CURRENT_TIMESTAMP - INTERVAL '6 days'
    ),
    (
        'Trust Wallet',
        'Extension',
        'Solid performance, but fails to distinguish itself in a crowded market of browser wallets.',
        'Full review content here...',
        6,
        (SELECT id FROM categories WHERE slug = 'wallet'),
        false,
        true,
        CURRENT_TIMESTAMP - INTERVAL '9 days'
    ),
    (
        'Ledger Live',
        'Desktop 2.0',
        'An absolute triumph of hardware/software synergy. The recovery update was controversial but the UX is peak.',
        'Full review content here...',
        10,
        (SELECT id FROM categories WHERE slug = 'security'),
        false,
        true,
        CURRENT_TIMESTAMP - INTERVAL '11 days'
    ),
    (
        'Crypto.com',
        'Mobile App',
        'Heavy, laggy, and filled with aggressive marketing pop-ups. Struggles to find a clean user flow.',
        'Full review content here...',
        4,
        (SELECT id FROM categories WHERE slug = 'exchange'),
        false,
        true,
        CURRENT_TIMESTAMP - INTERVAL '13 days'
    );
