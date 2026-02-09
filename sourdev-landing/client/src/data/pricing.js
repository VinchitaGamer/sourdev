export const pricingPlans = [
    {
        id: 1,
        name: 'Chatbot FAQ',
        price: 'Start',
        description: 'Responde dudas frecuentes 24/7.',
        features_json: ['Respuestas Automáticas', 'Menú Interactivo', 'Horario 24/7', 'Soporte Básico'],
        extended_description: 'Ideal para negocios que reciben las mismas preguntas constantemente. Automatiza la atención al cliente inicial.',
        comparison_data: { 'Automatización': 'Básica', 'Integraciones': 'No', 'Soporte': 'Email' },
        image_url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=1920',
        is_active: 1
    },
    {
        id: 2,
        name: 'Bot Agendador',
        price: 'Pro',
        description: 'Tu secretaria virtual.',
        features_json: ['Agendamiento de Citas', 'Conexión Google Calendar', 'Registro en Google Sheets', 'Recordatorios'],
        extended_description: 'Gestiona tu agenda y base de datos de clientes automáticamente. Cero errores humanos, cero inasistencias.',
        comparison_data: { 'Automatización': 'Intermedia', 'Integraciones': 'Calendar + Sheets', 'Soporte': 'Prioritario' },
        image_url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1920',
        is_active: 1
    },
    {
        id: 3,
        name: 'Ecosistema',
        price: 'Custom',
        description: 'Automatización Total.',
        features_json: ['Lógica Compleja', 'Conexión CRM/ERP', 'IA Avanzada', 'Dashboard a Medida'],
        extended_description: 'La solución definitiva para empresas que quieren automatizar procesos operativos complejos vía WhatsApp.',
        comparison_data: { 'Automatización': 'Total', 'Integraciones': 'API Full', 'Soporte': 'Dedicado 24/7' },
        image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920',
        is_active: 1
    }
];
