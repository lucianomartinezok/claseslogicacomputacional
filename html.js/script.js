// ============================================
// JAVASCRIPT EXTERNO - Archivo script.js
// ============================================
// Este archivo demuestra cómo JavaScript externo puede interactuar con HTML
// para crear funcionalidad dinámica y interactiva.

// ============================================
// VARIABLES GLOBALES
// ============================================

// Array de colores para cambiar el fondo del div
const colores = [
    '#3b82f6', // Azul
    '#10b981', // Verde
    '#f59e0b', // Amarillo
    '#ef4444', // Rojo
    '#8b5cf6', // Púrpura
    '#06b6d4', // Cian
    '#84cc16', // Lima
    '#f97316'  // Naranja
];

// Array de mensajes para cambiar el contenido del div
const mensajes = [
    '¡JavaScript externo funcionando! 🎉',
    'El color cambió dinámicamente 🌈',
    'HTML + CSS + JS = Magia web ✨',
    'Interactividad en acción 🚀',
    'Código modular y organizado 📁',
    'Separación de responsabilidades 🎯',
    'Fácil mantenimiento y escalabilidad 📈',
    '¡Aprendiendo desarrollo web! 📚'
];

// Contador para alternar entre colores y mensajes
let contador = 0;

// ============================================
// FUNCIÓN PRINCIPAL - Esperar a que el DOM esté listo
// ============================================

// Esta función se ejecuta cuando el documento HTML está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 JavaScript externo cargado correctamente');
    
    // Inicializar la funcionalidad
    inicializarFuncionalidad();
});

// ============================================
// FUNCIÓN DE INICIALIZACIÓN
// ============================================

function inicializarFuncionalidad() {
    // Obtener referencia al botón que activará el JavaScript externo
    const botonExterno = document.getElementById('external-js-btn');
    
    // Verificar si el botón existe
    if (botonExterno) {
        console.log('✅ Botón externo encontrado, agregando evento click');
        
        // Agregar evento click al botón
        botonExterno.addEventListener('click', function() {
            // Ejecutar la función que modifica el div
            modificarDiv();
            
            // Agregar efecto visual al botón
            agregarEfectoBoton(this);
        });
    } else {
        console.error('❌ No se encontró el botón con ID "external-js-btn"');
    }
}

// ============================================
// FUNCIÓN PARA MODIFICAR EL DIV
// ============================================

function modificarDiv() {
    // Obtener referencia al div que será modificado
    const divDemo = document.getElementById('demo-div');
    
    // Verificar si el div existe
    if (divDemo) {
        console.log('🎨 Modificando div de demostración...');
        
        // Obtener el color y mensaje actual del contador
        const colorActual = colores[contador % colores.length];
        const mensajeActual = mensajes[contador % mensajes.length];
        
        // Aplicar transición suave
        divDemo.style.transition = 'all 0.5s ease';
        
        // Cambiar el color de fondo del div
        divDemo.style.background = `linear-gradient(135deg, ${colorActual} 0%, ${ajustarBrillo(colorActual, -20)} 100%)`;
        
        // Cambiar el color del texto para que sea legible
        divDemo.style.color = esColorClaro(colorActual) ? '#1f2937' : '#ffffff';
        
        // Cambiar el contenido del div
        divDemo.innerHTML = `
            <p style="font-size: 1.2rem; font-weight: 600; margin: 0;">
                ${mensajeActual}
            </p>
            <p style="font-size: 0.9rem; margin: 8px 0 0 0; opacity: 0.8;">
                Click #${contador + 1} - Color: ${colorActual}
            </p>
        `;
        
        // Agregar efecto de escala temporal
        divDemo.style.transform = 'scale(1.05)';
        setTimeout(() => {
            divDemo.style.transform = 'scale(1)';
        }, 200);
        
        // Incrementar el contador para el siguiente cambio
        contador++;
        
        console.log(`✅ Div modificado - Click #${contador}, Color: ${colorActual}`);
        
    } else {
        console.error('❌ No se encontró el div con ID "demo-div"');
    }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

// Función para agregar efecto visual al botón
function agregarEfectoBoton(boton) {
    // Agregar clase de efecto
    boton.style.transform = 'scale(0.95)';
    
    // Restaurar después de 150ms
    setTimeout(() => {
        boton.style.transform = 'scale(1)';
    }, 150);
}

// Función para ajustar el brillo de un color (para gradientes)
function ajustarBrillo(color, porcentaje) {
    // Convertir color hex a RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Ajustar brillo
    const factor = 1 + (porcentaje / 100);
    const nuevoR = Math.min(255, Math.max(0, Math.round(r * factor)));
    const nuevoG = Math.min(255, Math.max(0, Math.round(g * factor)));
    const nuevoB = Math.min(255, Math.max(0, Math.round(b * factor)));
    
    // Convertir de vuelta a hex
    return `#${nuevoR.toString(16).padStart(2, '0')}${nuevoG.toString(16).padStart(2, '0')}${nuevoB.toString(16).padStart(2, '0')}`;
}

// Función para determinar si un color es claro o oscuro
function esColorClaro(color) {
    // Convertir color hex a RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calcular luminosidad
    const luminosidad = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Retornar true si es claro (luminosidad > 0.5)
    return luminosidad > 0.5;
}

// ============================================
// MENSAJE DE CONFIRMACIÓN
// ============================================

console.log('🚀 Archivo script.js cargado y listo para usar');
console.log('📝 Este archivo demuestra:');
console.log('   - Separación de responsabilidades');
console.log('   - Código modular y reutilizable');
console.log('   - Interacción con elementos HTML');
console.log('   - Manipulación dinámica del DOM');
console.log('   - Efectos visuales y animaciones'); 