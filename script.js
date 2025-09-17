//
// Funciones de interacción para el sitio “Recursos para Excel” de Sincero Finance.
// Este script controla el cambio de pestañas entre los atajos y las fórmulas,
// actualiza la barra de búsqueda en función de la vista activa, filtra los
// elementos de cada lista y gestiona el botón flotante para volver al inicio.

document.addEventListener('DOMContentLoaded', () => {
    // Obtiene referencias a las pestañas y vistas
    const tabs = document.querySelectorAll('.tab');
    const views = {
        atajos: document.getElementById('view-atajos'),
        formulas: document.getElementById('view-formulas')
    };
    const searchInput = document.getElementById('searchBar');
    const backToTopBtn = document.getElementById('backToTop');
    // Referencias a elementos del menú flotante y tabla de contenidos de fórmulas
    const menuItems = document.querySelectorAll('.floating-menu .menu-item');
    const tocLinks = document.querySelectorAll('.toc a');

    /**
     * Filtra grupos de fórmulas por categoría.
     * Si se pasa 'all' se muestran todas las categorías.
     * @param {string} cat Identificador de la categoría (ej. f-texto) o 'all'.
     */
    function setCategory(cat) {
        // Actualizar clase activa en el menú de la tabla de contenidos
        tocLinks.forEach(link => {
            const match = link.dataset.category === cat || (cat === 'all' && link.dataset.category === 'all');
            link.classList.toggle('active', match);
        });
        // Mostrar u ocultar grupos de fórmulas
        const groups = document.querySelectorAll('#view-formulas .formula-group');
        groups.forEach(group => {
            if (cat === 'all') {
                group.style.display = '';
            } else {
                group.style.display = group.id === cat ? '' : 'none';
            }
        });
        // Desplaza al inicio del área de fórmulas para mejorar la navegación
        const formulasView = document.getElementById('view-formulas');
        formulasView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Activa la pestaña indicada y actualiza la interfaz de búsqueda.
     * @param {string} name Nombre de la vista a mostrar (atajos|formulas)
     */
    function setTab(name) {
        // Resaltar pestaña activa
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === name);
        });
        // Resaltar también el botón en el menú flotante
        menuItems.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === name);
        });
        // Mostrar vista correspondiente
        Object.entries(views).forEach(([key, el]) => {
            if (key === name) {
                el.classList.add('view--active');
            } else {
                el.classList.remove('view--active');
            }
        });
        // Actualizar placeholder y limpiar filtro
        if (name === 'atajos') {
            searchInput.placeholder = 'Buscar atajo…';
        } else {
            searchInput.placeholder = 'Buscar fórmula…';
            // Restablecer las categorías cuando se cambia a la vista de fórmulas
            setCategory('all');
        }
        searchInput.value = '';
        filterList();
        // Desplazarse al inicio de la página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Asigna manejadores de evento a las pestañas
    tabs.forEach(tab => {
        tab.addEventListener('click', () => setTab(tab.dataset.tab));
    });

    /**
     * Filtra los elementos visibles de la lista según el término de búsqueda.
     */
    function filterList() {
        const term = searchInput.value.toLowerCase().trim();
        const activeView = document.querySelector('.view--active');
        if (!activeView) return;
        const items = activeView.querySelectorAll('li');
        items.forEach(li => {
            const text = li.textContent.toLowerCase();
            li.style.display = text.includes(term) ? '' : 'none';
        });
    }

    // Filtra en cada entrada del usuario
    searchInput.addEventListener('input', filterList);

    // Mostrar u ocultar elementos y animar el fondo en función del desplazamiento
    window.addEventListener('scroll', () => {
        // Botón volver arriba
        if (window.scrollY > 600) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
        // Animación del fondo: ajustar la posición vertical del gradiente
        const pos = window.scrollY * 0.02;
        document.body.style.backgroundPosition = `0 ${pos}px`;
        // Cambiar la visibilidad del menú flotante según el desplazamiento
        if (window.scrollY > 200) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });

    // Manejador del botón para volver arriba
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Asigna manejadores al menú flotante de cambio de vista
    menuItems.forEach(btn => {
        btn.addEventListener('click', () => setTab(btn.dataset.tab));
    });

    // Asigna manejadores al menú de categorías de fórmulas
    tocLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const cat = link.dataset.category;
            setCategory(cat);
        });
    });

    // Establece la pestaña predeterminada al cargar
    setTab('atajos');
});