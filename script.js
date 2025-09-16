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

    /**
     * Activa la pestaña indicada y actualiza la interfaz de búsqueda.
     * @param {string} name Nombre de la vista a mostrar (atajos|formulas)
     */
    function setTab(name) {
        // Resaltar pestaña activa
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === name);
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

    // Mostrar u ocultar el botón “volver arriba” en función del desplazamiento
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Manejador del botón para volver arriba
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Establece la pestaña predeterminada al cargar
    setTab('atajos');
});