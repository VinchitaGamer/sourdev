export const pricingPlans = [
    {
        id: 1,
        name: 'Starter',
        price: '$19',
        description: 'Ideal para pequeños negocios.',
        features_json: ['1 número', '1,000 mensajes / mes', 'Soporte por email'],
        extended_description: 'El plan Starter es perfecto si estás empezando.',
        comparison_data: { 'Números': '1', 'Mensajes': '1,000', 'Soporte': 'Email' },
        image_url: '',
        is_active: 1
    },
    {
        id: 2,
        name: 'Pro',
        price: '$49',
        description: 'Para negocios en crecimiento.',
        features_json: ['3 números', '10,000 mensajes / mes', 'Reportes Avanzados', 'Soporte Prioritario'],
        extended_description: 'Lleva tu negocio al siguiente nivel con el plan Pro.',
        comparison_data: { 'Números': '3', 'Mensajes': '10,000', 'Soporte': 'Chat' },
        image_url: '',
        is_active: 1
    },
    {
        id: 3,
        name: 'Enterprise',
        price: 'Custom',
        description: 'Soluciones a medida.',
        features_json: ['Números ilimitados', 'Volumen masivo', 'API Dedicada'],
        extended_description: 'Para grandes volúmenes y requerimientos específicos.',
        comparison_data: { 'Números': 'Ilimitados', 'Mensajes': 'A medida', 'Soporte': 'Dedicado' },
        image_url: '',
        is_active: 1
    }
];
