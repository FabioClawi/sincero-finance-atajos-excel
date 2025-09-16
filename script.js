document.addEventListener('DOMContentLoaded', function () {
    // Search functionality
    const searchInput = document.getElementById('searchBar');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const term = this.value.toLowerCase();
            const items = document.querySelectorAll('.shortcut-list li');
            items.forEach((item) => {
                // Each shortcut list item may have text and code.
                if (item.textContent.toLowerCase().includes(term)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Intersection Observer to highlight active navigation links
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.navbar .nav-list a');
    const observerOptions = {
        rootMargin: '0px 0px -50% 0px',
        threshold: 0.25,
    };
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach((link) => link.classList.remove('active'));
                const activeLink = document.querySelector(`.navbar .nav-list a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

    // Back to top button functionality
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Toggle between atajo sections and formulas section
    const formulasLink = document.getElementById('formulas-link');
    const allNavLinks = document.querySelectorAll('.navbar .nav-list a');
    const atajoLinks = document.querySelectorAll('.atajo-link');
    const formulasSection = document.getElementById('excel-formulas');
    const atajoSections = document.querySelectorAll('.atajo-section');
    const searchContainer = document.querySelector('.search-container');

    function showFormulas() {
        // Hide all atajo sections and show formulas
        atajoSections.forEach((section) => section.classList.add('hidden'));
        formulasSection.classList.remove('hidden');
        // Hide search bar for formulas
        if (searchContainer) {
            searchContainer.style.display = 'none';
        }
        // Set active nav link styling manually
        allNavLinks.forEach((link) => link.classList.remove('active'));
        if (formulasLink) {
            formulasLink.classList.add('active');
        }
    }

    function showAtajos() {
        // Show all atajo sections and hide formulas
        atajoSections.forEach((section) => section.classList.remove('hidden'));
        formulasSection.classList.add('hidden');
        // Show search bar again
        if (searchContainer) {
            searchContainer.style.display = 'block';
        }
    }

    if (formulasLink) {
        formulasLink.addEventListener('click', function (e) {
            e.preventDefault();
            showFormulas();
            // Scroll to formulas section
            formulasSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    atajoLinks.forEach((link) => {
        link.addEventListener('click', function () {
            // Ensure atajo sections are visible when any atajo link is clicked
            showAtajos();
        });
    });
});