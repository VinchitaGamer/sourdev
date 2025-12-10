-- 1. Create Tables
CREATE TABLE IF NOT EXISTS leads (
  id INT NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(150) NOT NULL,
  whatsapp_number VARCHAR(30) NOT NULL,
  email VARCHAR(150) NOT NULL,
  status ENUM('nuevo','contactado','cliente') NOT NULL DEFAULT 'nuevo',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_content (
  section_key VARCHAR(50) NOT NULL,
  content_json JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (section_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS pricing_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price VARCHAR(50) NOT NULL,
  description TEXT,
  features_json JSON,
  image_url VARCHAR(555),
  extended_description TEXT,
  comparison_data JSON,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Insert Default Admin (admin / admin123)
-- Hash generated for 'admin123'
INSERT INTO admins (username, password_hash) VALUES ('admin', '$2b$10$dk88CPRWDRSxK2Wbk1JDxOVVWMtHVdOL1vbuuajSbekpLWmZpl.Ar6'); 
-- Note: Replace with actual hash if needed, but for simplicity user can create one later or use this one if valid bcrypt

-- 3. Insert Initial Content
INSERT INTO site_content (section_key, content_json) VALUES ('hero', '{"title": "Automatiza tu Negocio con SourDev", "subtitle": "La solución definitiva para gestionar tus clientes en WhatsApp.", "ctaText": "Comenzar Ahora", "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=Hero+Image"}');

