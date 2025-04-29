document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const balls = document.querySelectorAll('.ball');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    let ballX = [0, 0, 0];
    let ballY = [0, 0, 0];

    // Set initial positions
    cursor.style.transform = 'translate(-50%, -50%)';
    cursorFollower.style.transform = 'translate(-50%, -50%)';
    balls.forEach(ball => {
        ball.style.transform = 'translate(-50%, -50%)';
    });

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth animation function
    function animate() {
        // Cursor movement
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

        // Cursor follower movement
        followerX += (mouseX - followerX) * 0.05;
        followerY += (mouseY - followerY) * 0.05;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

        // Ball movement with different delays
        balls.forEach((ball, index) => {
            const delay = 0.02 + (index * 0.01);
            ballX[index] += (mouseX - ballX[index]) * delay;
            ballY[index] += (mouseY - ballY[index]) * delay;
            ball.style.transform = `translate(${ballX[index]}px, ${ballY[index]}px)`;
        });

        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Add hover effects
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1.5)`;
            cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1.5)`;
            balls.forEach(ball => {
                ball.style.opacity = '0.8';
            });
        });

        link.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
            cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1)`;
            balls.forEach(ball => {
                ball.style.opacity = '0.5';
            });
        });
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    function switchTab(companyId) {
        console.log('Switching to tab:', companyId);
        
        // Remove active class from all buttons and panes
        const buttons = document.querySelectorAll('.tab-btn');
        const panes = document.querySelectorAll('.tab-pane');
        const yearMarkers = document.querySelectorAll('.year-marker');
        
        buttons.forEach(button => {
            console.log('Deactivating button:', button.dataset.company);
            button.classList.remove('active');
        });
        
        panes.forEach(pane => {
            console.log('Hiding pane:', pane.id);
            pane.classList.remove('active');
            pane.style.display = 'none';
        });

        yearMarkers.forEach(marker => {
            console.log('Deactivating year marker:', marker.textContent);
            marker.classList.remove('active');
        });
        
        // Activate the selected button and pane
        const activeButton = document.querySelector(`[data-company="${companyId}"]`);
        const activePane = document.getElementById(companyId);
        
        if (activeButton && activePane) {
            console.log('Activating button:', companyId);
            activeButton.classList.add('active');
            
            console.log('Showing pane:', companyId);
            activePane.style.display = 'block';
            
            // Add active class after a short timeout for smoother transition
            setTimeout(() => {
                activePane.classList.add('active');
            }, 50);

            // Activate the corresponding year marker
            const year = getYearForCompany(companyId);
            const activeYearMarker = Array.from(yearMarkers).find(marker => marker.textContent === year);
            if (activeYearMarker) {
                console.log('Activating year marker:', year);
                activeYearMarker.classList.add('active');
            }
        }
    }

    function getYearForCompany(companyId) {
        const yearMap = {
            'braincraft': '2019',
            'bjit-senior': '2015',
            'sony': '2015',
            'bjit-junior': '2012'
        };
        return yearMap[companyId] || '';
    }

    // Set default tab
    switchTab('braincraft');

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const companyId = button.getAttribute('data-company');
            console.log('Button clicked:', companyId); // Debug log
            switchTab(companyId);
        });
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}); 