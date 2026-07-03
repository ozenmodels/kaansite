document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Hamburger morph to X
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
        });

        // Close menu when clicking nav links on mobile
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // 3. Product Page: Search and Filter Functionality
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const noResults = document.getElementById('noResults');

    if (productCards.length > 0) {
        let currentFilter = 'all';
        let searchQuery = '';

        const filterProducts = () => {
            let visibleCount = 0;

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const name = card.querySelector('.product-name').textContent.toLowerCase();
                const desc = card.querySelector('.product-desc').textContent.toLowerCase();
                
                // Get all variations texts as well
                const varTexts = Array.from(card.querySelectorAll('.var-desc'))
                    .map(el => el.textContent.toLowerCase())
                    .join(' ');

                const matchesFilter = currentFilter === 'all' || category === currentFilter;
                const matchesSearch = name.includes(searchQuery) || desc.includes(searchQuery) || varTexts.includes(searchQuery);

                if (matchesFilter && matchesSearch) {
                    card.style.display = 'grid';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        };

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.toLowerCase().trim();
                filterProducts();
            });
        }

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.getAttribute('data-filter');
                filterProducts();
            });
        });
    }

    // 4. Product Card: Variation Tabs Switcher
    const productList = document.querySelector('.products-grid');
    if (productList) {
        productList.addEventListener('click', (e) => {
            const tab = e.target.closest('.var-tab');
            if (!tab) return;

            const card = tab.closest('.product-card');
            if (!card) return;

            // Deactivate other tabs in this card
            const tabs = card.querySelectorAll('.var-tab');
            tabs.forEach(t => t.classList.remove('active'));

            // Activate current tab
            tab.classList.add('active');

            // Switch variation descriptions
            const targetId = tab.getAttribute('data-target');
            const descs = card.querySelectorAll('.var-desc');
            
            descs.forEach(d => {
                d.classList.remove('active');
                if (d.id === targetId) {
                    d.classList.add('active');
                }
            });
        });
    }

    // 5. FAQ Accordion Toggle
    const faqGrid = document.querySelector('.faq-grid');
    if (faqGrid) {
        faqGrid.addEventListener('click', (e) => {
            const header = e.target.closest('.faq-header');
            if (!header) return;

            const item = header.parentElement;
            const content = item.querySelector('.faq-content');
            const isActive = item.classList.contains('active');

            // Close all items
            const allItems = faqGrid.querySelectorAll('.faq-item');
            allItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-content').style.maxHeight = null;
            });

            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    }

    // 6. Contact and Order Form Validation
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMsg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation
            const name = document.getElementById('formName').value.trim();
            const phone = document.getElementById('formPhone').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const message = document.getElementById('formMsg').value.trim();

            if (!name || !phone || !email || !message) {
                alert('Lütfen tüm zorunlu alanları doldurunuz.');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Gönderiliyor...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                if (successMsg) {
                    successMsg.style.display = 'block';
                    // Scroll to message
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Hide after 5 seconds
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 6000);
                }
            }, 1500);
        });
    }

    // 7. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
