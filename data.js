// data.js - Base de datos local de productos y servicios

export const productos = [
    {
        id: 1,
        categoria: "software",
        nombre: "Sistema de Punto de Venta EasyPOS",
        descripcion: "El motor transaccional que tu retail necesita. Arquitectura robusta, control de inventario en tiempo real, reportería gerencial dinámica y facturación ágil. Optimiza el flujo de caja y audita tus operaciones de manera centralizada. Implementación llave en mano.",
        precio: 0, // 0 = Precio a convenir / cotizar
        imagen: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" // Imagen pública, reemplazar en ImgBB
    },
    {
        id: 2,
        categoria: "laptops",
        nombre: "Lenovo ThinkPad T480 (Semi-nueva)",
        descripcion: "Rendimiento empresarial comprobado. Procesador Intel Core i5 8va Generación, 16GB de RAM para multitarea intensiva y SSD de 250GB para arranques inmediatos. Chasis ultrarresistente ideal para trabajo de campo o entornos administrativos.",
        precio: 280.00, // Precio de ejemplo
        imagen: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80" 
    },
    {
        id: 3,
        categoria: "laptops",
        nombre: "Lenovo ThinkPad T590 (Semi-nueva)",
        descripcion: "Estación de trabajo móvil con pantalla amplia. Intel Core i5 8va Generación, 16GB RAM y SSD 250GB. Teclado numérico integrado, perfecto para análisis de bases de datos, contabilidad y gestión de inventarios en EasyPOS.",
        precio: 320.00, // Precio de ejemplo
        imagen: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80"
    },
    {
        id: 4,
        categoria: "cctv",
        nombre: "Kit CCTV 4 Cámaras 1080p (Básico)",
        descripcion: "Seguridad perimetral esencial. Incluye DVR de 4 canales H.265+, 4 cámaras Bullet/Domo 1080p, cableado estándar y configuración para monitoreo remoto vía App. Disuasión efectiva para pequeños negocios.",
        precio: 180.00,
        imagen: "https://images.unsplash.com/photo-1557324232-b8917d4c3dcb?w=800&q=80"
    },
    {
        id: 5,
        categoria: "cctv",
        nombre: "Kit CCTV ColorVu + Audio Bidireccional",
        descripcion: "Vigilancia forense avanzada. Cámaras de 2MP con tecnología ColorVu (color 24/7 incluso de noche) y micrófono integrado. Personalizable para 4, 8, 16 o 32 canales. Ideal para almacenes y áreas críticas.",
        precio: 0, // 0 = Precio a cotizar según cantidad de cámaras
        imagen: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80"
    }
];
