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
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
            pane.style.display = 'none';
        });

        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-company="${companyId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Show corresponding pane
        const activePane = document.getElementById(companyId);
        if (activePane) {
            activePane.style.display = 'block';
            // Use setTimeout to ensure display: block is applied before adding active class
            setTimeout(() => {
                activePane.classList.add('active');
            }, 10);
        }
    }

    // Set default tab
    switchTab('braincraft');

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const companyId = button.getAttribute('data-company');
            switchTab(companyId);
        });
    });
}); 