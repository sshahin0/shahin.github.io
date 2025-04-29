document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const ball = document.querySelector('.ball');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    let ballX = 0;
    let ballY = 0;

    // Set initial positions
    cursor.style.transform = 'translate(-50%, -50%)';
    cursorFollower.style.transform = 'translate(-50%, -50%)';
    ball.style.transform = 'translate(-50%, -50%)';

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

        // Ball movement with more delay
        ballX += (mouseX - ballX) * 0.01;
        ballY += (mouseY - ballY) * 0.01;
        ball.style.transform = `translate(${ballX}px, ${ballY}px)`;

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
            ball.style.opacity = '0.5';
        });

        link.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
            cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1)`;
            ball.style.opacity = '0.3';
        });
    });
}); 