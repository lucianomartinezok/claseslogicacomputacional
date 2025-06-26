// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    // Estado del sidebar
    let sidebarCollapsed = false;
    
    // Función para alternar el sidebar
    function toggleSidebar() {
        sidebarCollapsed = !sidebarCollapsed;
        
        if (sidebarCollapsed) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
            sidebarToggle.innerHTML = '<i class="fas fa-chevron-right"></i>';
            // Mover la pestañita a la izquierda cuando el sidebar está oculto
            sidebarToggle.style.left = '0';
        } else {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
            sidebarToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
            // Mover la pestañita a la derecha del sidebar cuando está visible
            sidebarToggle.style.left = 'var(--sidebar-width)';
        }
    }
    
    // Event listener para el botón de alternar sidebar
    sidebarToggle.addEventListener('click', toggleSidebar);
    
    // Función para scroll suave a una sección
    function scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 20; // 20px de margen
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Función para actualizar el enlace activo en el sidebar
    function updateActiveLink() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + 100; // Offset para mejor detección
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover clase activa de todos los enlaces
                sidebarLinks.forEach(link => link.classList.remove('active'));
                
                // Agregar clase activa al enlace correspondiente
                const activeLink = document.querySelector(`[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Event listeners para los enlaces del sidebar
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // En dispositivos móviles, cerrar el sidebar después de hacer clic
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    if (!sidebarCollapsed) {
                        toggleSidebar();
                    }
                }, 300);
            }
        });
    });
    
    // Event listener para el scroll de la ventana
    window.addEventListener('scroll', updateActiveLink);
    
    // Función para manejar el responsive del sidebar en móviles
    function handleMobileSidebar() {
        if (window.innerWidth <= 768) {
            // En móviles, el sidebar debe estar oculto por defecto
            if (!sidebarCollapsed) {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
                sidebarToggle.innerHTML = '<i class="fas fa-chevron-right"></i>';
                sidebarToggle.style.left = '0';
                sidebarCollapsed = true;
            }
        } else {
            // En desktop, el sidebar debe estar visible por defecto
            if (sidebarCollapsed) {
                sidebar.classList.remove('collapsed');
                mainContent.classList.remove('expanded');
                sidebarToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
                sidebarToggle.style.left = 'var(--sidebar-width)';
                sidebarCollapsed = false;
            }
        }
    }
    
    // Event listener para el cambio de tamaño de ventana
    window.addEventListener('resize', handleMobileSidebar);
    
    // Inicializar el estado del sidebar según el tamaño de pantalla
    handleMobileSidebar();
    
    // Función para resaltar la sección actual en el scroll
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Event listener para el scroll con throttling para mejor rendimiento
    let ticking = false;
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveLink();
                highlightCurrentSection();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll);
    
    // Función para agregar efectos de hover a las cajas de ejemplo
    function addHoverEffects() {
        const exampleBoxes = document.querySelectorAll('.example-box');
        
        exampleBoxes.forEach(box => {
            box.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            });
            
            box.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            });
        });
    }
    
    // Agregar efectos de hover después de un pequeño delay
    setTimeout(addHoverEffects, 500);
    
    // Función para mejorar la accesibilidad del teclado
    function handleKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + B para alternar sidebar
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                toggleSidebar();
            }
            
            // Escape para cerrar sidebar en móviles
            if (e.key === 'Escape' && window.innerWidth <= 768 && !sidebarCollapsed) {
                toggleSidebar();
            }
        });
    }
    
    handleKeyboardNavigation();
    
    // Función para agregar tooltips a los operadores en las tablas
    function addOperatorTooltips() {
        const operatorCells = document.querySelectorAll('.operator-table td:first-child');
        
        operatorCells.forEach(cell => {
            const operator = cell.textContent.trim();
            if (operator) {
                cell.title = `Operador: ${operator}`;
                cell.style.cursor = 'help';
            }
        });
    }
    
    // Agregar tooltips después de que se cargue todo
    setTimeout(addOperatorTooltips, 1000);
    
    // Función para animar las tablas al hacer scroll
    function animateTablesOnScroll() {
        const tables = document.querySelectorAll('.operator-table');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        tables.forEach(table => {
            table.style.opacity = '0';
            table.style.transform = 'translateY(20px)';
            table.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(table);
        });
    }
    
    // Inicializar animaciones de tablas
    setTimeout(animateTablesOnScroll, 500);
    
    // Función para agregar contador de secciones
    function addSectionCounter() {
        const sections = document.querySelectorAll('.section');
        let counter = 1;
        
        sections.forEach(section => {
            const heading = section.querySelector('h1, h2');
            if (heading && !heading.querySelector('.section-counter')) {
                const counterSpan = document.createElement('span');
                counterSpan.className = 'section-counter';
                counterSpan.textContent = `${counter}. `;
                counterSpan.style.color = 'var(--primary-color)';
                counterSpan.style.fontWeight = 'bold';
                heading.insertBefore(counterSpan, heading.firstChild);
                counter++;
            }
        });
    }
    
    // Agregar contador de secciones
    setTimeout(addSectionCounter, 300);
    
    // Función para mejorar la experiencia de carga
    function improveLoadingExperience() {
        // Mostrar un indicador de carga sutil
        const loadingIndicator = document.createElement('div');
        loadingIndicator.id = 'loading-indicator';
        loadingIndicator.innerHTML = '<div class="loading-spinner"></div>';
        loadingIndicator.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
            background: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        `;
        
        document.body.appendChild(loadingIndicator);
        
        // Ocultar el indicador después de que todo esté cargado
        setTimeout(() => {
            loadingIndicator.style.opacity = '0';
            setTimeout(() => {
                loadingIndicator.remove();
            }, 300);
        }, 1000);
    }
    
    // Mejorar experiencia de carga
    improveLoadingExperience();
    
    // Función para agregar efecto de pulso a la pestañita cuando el sidebar está oculto
    function addTabPulseEffect() {
        if (sidebarCollapsed) {
            sidebarToggle.style.animation = 'pulse 2s infinite';
        } else {
            sidebarToggle.style.animation = 'none';
        }
    }
    
    // Agregar estilos CSS para el efecto de pulso
    const pulseStyles = document.createElement('style');
    pulseStyles.textContent = `
        @keyframes pulse {
            0% { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            50% { box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4); }
            100% { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        }
    `;
    document.head.appendChild(pulseStyles);
    
    // Aplicar efecto de pulso inicial
    addTabPulseEffect();
    
    // Actualizar efecto de pulso cuando cambie el estado del sidebar
    const originalToggleSidebar = toggleSidebar;
    toggleSidebar = function() {
        originalToggleSidebar();
        setTimeout(addTabPulseEffect, 300);
    };
});

// Agregar estilos CSS adicionales para el spinner de carga
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    #loading-indicator {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(loadingStyles); 