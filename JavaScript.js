document.addEventListener('DOMContentLoaded', () => {
    // --- Audio on Click ---
    const clickSound = document.getElementById('clickSound');
    document.body.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play().catch(error => {
            // This error is expected if the user hasn't interacted with the page yet.
            // It is not a malfunction.
        });
    });

    // --- Dropdown Menu Logic ---
    const dropdownButton = document.getElementById('dropdown-button');
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownButton.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownMenu.classList.toggle('active');
    });
    // Hide dropdown if clicking outside
    document.addEventListener('click', (event) => {
        if (!dropdownMenu.contains(event.target) && !dropdownButton.contains(event.target)) {
            dropdownMenu.classList.remove('active');
        }
    });

    // --- Timed Event (5 Minutes) ---
    const notificationSound = document.getElementById('notificationSound');
    const fiveMinutesInMillis = 5 * 60 * 1000;
    setTimeout(() => {
        document.body.classList.add('event-active');
        notificationSound.play().catch(error => {
            console.error("Notification sound failed to play:", error);
        });
    }, fiveMinutesInMillis);

    // --- Tag Filtering System ---
    const filterButtons = document.querySelectorAll('.tag-filter .tag');
    const cards = document.querySelectorAll('.card-grid .card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Manage active state for buttons
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
    // Set 'ALL' as active by default
    document.querySelector('.tag-filter .tag[data-tag="all"]').classList.add('active');
});