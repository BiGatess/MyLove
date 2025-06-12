document.addEventListener('DOMContentLoaded', () => {
    // Lấy các element cần thiết
    const startScreen = document.getElementById('start-screen');
    const revealButton = document.getElementById('reveal-button');
    const mainContent = document.getElementById('main-content');
    const photoContainer = document.getElementById('photo-container');
    const bgMusic = document.getElementById('bg-music');

    // Mảng chứa tên các file ảnh trong thư mục /images
    // Đảm bảo bạn có đủ 10 ảnh từ 1.jpg đến 10.jpg
    const imageUrls = [];
    for (let i = 1; i <= 10; i++) {
        imageUrls.push(`images/${i}.jpg`);
    }

    // Hàm tạo pháo hoa
    function launchConfetti() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    // Hàm tạo và hiển thị ảnh ngẫu nhiên
    function createPhotos() {
        // Xóa các ảnh cũ nếu có
        photoContainer.innerHTML = ''; 

        imageUrls.forEach((url, index) => {
            // Dùng setTimeout để các ảnh xuất hiện lần lượt, tạo hiệu ứng đẹp mắt
            setTimeout(() => {
                const polaroid = document.createElement('div');
                polaroid.className = 'polaroid';
                
                const img = document.createElement('img');
                img.src = url;
                
                polaroid.appendChild(img);

                // Tính toán vị trí và góc xoay ngẫu nhiên
                const containerWidth = photoContainer.clientWidth;
                const containerHeight = photoContainer.clientHeight;
                const polaroidWidth = 200; // Phải khớp với width trong CSS
                const polaroidHeight = 240; // Ước tính chiều cao của polaroid (width + padding)

                const top = Math.random() * (containerHeight - polaroidHeight);
                const left = Math.random() * (containerWidth - polaroidWidth);
                const rotation = (Math.random() - 0.5) * 40; // Xoay từ -20 đến +20 độ

                polaroid.style.top = `${top}px`;
                polaroid.style.left = `${left}px`;
                polaroid.style.transform = `rotate(${rotation}deg)`;
                
                photoContainer.appendChild(polaroid);
            }, index * 400); // Mỗi ảnh xuất hiện cách nhau 400ms
        });
    }

    // Sự kiện khi nhấn nút "Nhấn vào đây nè"
    revealButton.addEventListener('click', () => {
        // 1. Ẩn màn hình chờ
        startScreen.classList.add('hidden');
        
        // 2. Hiện nội dung chính
        mainContent.classList.remove('hidden');
        
        // 3. Bắn pháo hoa
        launchConfetti();
        
        // 4. Phát nhạc nền (trình duyệt có thể chặn, nhưng khi có tương tác của người dùng thì thường sẽ được phép)
        bgMusic.play().catch(error => {
            console.log("Trình duyệt đã chặn tự động phát nhạc. Lỗi: ", error);
        });

        // 5. Tạo ảnh
        createPhotos();
    });
});