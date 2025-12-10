import { pool } from './db.js';

async function seedPricing() {
    console.log('Seeding Pricing Plans with Extended Details...');

    try {
        const plans = [
            {
                name: 'Starter',
                price: '$19',
                description: 'Ideal para pequeños negocios.',
                features_json: JSON.stringify(['1 número', '1,000 mensajes / mes', 'Soporte por email']),
                extended_description: 'El plan Starter es perfecto si estás empezando. Incluye todo lo necesario para automatizar tu primer número de WhatsApp y gestionar hasta 1,000 conversaciones mensuales.',
                comparison_data: JSON.stringify({
                    'Números Conectados': '1',
                    'Mensajes Mensuales': '1,000',
                    'Usuarios del Dashboard': '1',
                    'Soporte': 'Email (24h)',
                    'API de Integración': 'No',
                    'Reportes': 'Básicos'
                }),
                image_url: ''
            },
            {
                name: 'Pro',
                price: '$49',
                description: 'Para negocios en crecimiento.',
                features_json: JSON.stringify(['3 números', '10,000 mensajes / mes', 'Reportes Avanzados', 'Soporte Prioritario']),
                extended_description: 'Lleva tu negocio al siguiente nivel con el plan Pro. Conecta múltiples números, accede a reportes detallados y obtén soporte prioritario para asegurar que tu operación nunca se detenga.',
                comparison_data: JSON.stringify({
                    'Números Conectados': '3',
                    'Mensajes Mensuales': '10,000',
                    'Usuarios del Dashboard': '5',
                    'Soporte': 'Chat en vivo + Email',
                    'API de Integración': 'Sí',
                    'Reportes': 'Avanzados (Exportable)'
                }),
                image_url: ''
            },
            {
                name: 'Enterprise',
                price: 'Custom',
                description: 'Soluciones a medida.',
                features_json: JSON.stringify(['Números ilimitados', 'Volumen masivo', 'API Dedicada', 'SLA 99.9%']),
                extended_description: 'Para grandes volúmenes y requerimientos específicos. Diseñamos una infraestructura dedicada para tu empresa con SLA garantizado y gestor de cuenta personal.',
                comparison_data: JSON.stringify({
                    'Números Conectados': 'Ilimitados',
                    'Mensajes Mensuales': 'A medida',
                    'Usuarios del Dashboard': 'Ilimitados',
                    'Soporte': 'Gestor Dedicado 24/7',
                    'API de Integración': 'Full Access + Webhooks',
                    'Reportes': 'Custom Dashboard'
                }),
                image_url: ''
            }
        ];

        for (const plan of plans) {
            // Update existing plans or insert
            await pool.query(
                `INSERT INTO pricing_plans 
        (name, price, description, features_json, extended_description, comparison_data, image_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
        extended_description = VALUES(extended_description),
        comparison_data = VALUES(comparison_data),
        features_json = VALUES(features_json)`,
                [plan.name, plan.price, plan.description, plan.features_json, plan.extended_description, plan.comparison_data, plan.image_url]
            );
        }
        console.log('Pricing plans updated with extended details.');

    } catch (error) {
        console.error('Error seeding pricing:', error);
    } finally {
        await pool.end();
    }
}

seedPricing();
