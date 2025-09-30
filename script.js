document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader Logic ---
    const loader = document.getElementById('loader-wrapper');
    window.addEventListener('load', () => {
        loader.classList.add('hidden');
    });

    // --- Audio on Click ---
    const clickSound = document.getElementById('clickSound');
    document.body.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play().catch(error => {
            // This is not a malfunction. Autoplay policy requires user interaction.
        });
    });

    // --- Dropdown Menu Logic ---
    const dropdownButton = document.getElementById('dropdown-button');
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownButton.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownMenu.classList.toggle('active');
    });
    document.addEventListener('click', () => {
        if (dropdownMenu.classList.contains('active')) {
            dropdownMenu.classList.remove('active');
        }
    });

    // --- Timed Event (5 Minutes) ---
    const notificationSound = document.getElementById('notificationSound');
    const fiveMinutesInMillis = 5 * 60 * 1000;
    setTimeout(() => {
        document.body.classList.add('event-active');
        notificationSound.play().catch(error => {
            console.error("Notification sound could not be played:", error);
        });
    }, fiveMinutesInMillis);

    // --- Tag Filtering System ---
    const filterButtons = document.querySelectorAll('.tag-filter .tag');
    const cards = document.querySelectorAll('.card-grid .card');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterTag = button.dataset.tag;
            
            cards.forEach(card => {
                const cardTags = card.dataset.tags.split(' ');
                if (filterTag === 'all' || cardTags.includes(filterTag)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
    document.querySelector('.tag-filter .tag[data-tag="all"]').classList.add('active');

    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Optional: Stop observing after first animation
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
