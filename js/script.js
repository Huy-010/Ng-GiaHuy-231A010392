
const products = [
    { 
        id: 1, 
        name: 'Laptop Dell XPS 15', 
        price: 35000000, 
        category: 'Electronics',
        image: '💻',
        
    },
    { 
        id: 2, 
        name: 'iPhone 15 Pro Max', 
        price: 28000000, 
        category: 'Electronics',
        image: '📱'
    },
    { 
        id: 3, 
        name: 'Sony WH-1000XM5', 
        price: 8500000, 
        category: 'Audio',
        image: '🎧'
    },
    { 
        id: 4, 
        name: 'MacBook Pro M3', 
        price: 45000000, 
        category: 'Electronics',
        image: '💻'
    },
    { 
        id: 5, 
        name: 'Samsung Galaxy Tab S9', 
        price: 18000000, 
        category: 'Electronics',
        image: '📱'
    },
    { 
        id: 6, 
        name: 'AirPods Pro 2', 
        price: 6500000, 
        category: 'Audio',
        image: '🎧'
    }
];

function initBaiTap01() {
    const searchInput = document.getElementById('searchInput');
    const productsGrid = document.getElementById('productsGrid');
    const searchError = document.getElementById('searchError');

    if (!searchInput || !productsGrid) return;

    
    displayProducts(products);

    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value;
        
        
        const sanitizedTerm = searchTerm.replace(/[<>\/\\]/g, '').trim();
        
        if (sanitizedTerm === '') {
            displayProducts(products);
            searchError.style.display = 'none';
            return;
        }

        
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(sanitizedTerm.toLowerCase())
        );

        if (filteredProducts.length === 0) {
            
            productsGrid.innerHTML = '';
            searchError.textContent = `Không tìm thấy sản phẩm nào với từ khóa "${sanitizedTerm}"`;
            searchError.style.display = 'block';
        } else {
            
            displayProducts(filteredProducts);
            searchError.style.display = 'none';
        }
    });

    function displayProducts(productList) {
        productsGrid.innerHTML = '';
        
        productList.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-image">${product.image}</div>
                <h3 class="product-name">${escapeHtml(product.name)}</h3>
                <p class="product-category">${escapeHtml(product.category)}</p>
                <p class="product-price">${formatPrice(product.price)} đ</p>
            `;
            
            productsGrid.appendChild(productCard);
        });
    }

 
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    
    function formatPrice(price) {
        return price.toLocaleString('vi-VN');
    }
}



function initBaiTap02() {
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const agreeTerms = document.getElementById('agreeTerms');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    if (!fullNameInput || !emailInput || !passwordInput || !agreeTerms || !submitBtn) return;

    
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
      
        clearErrors();
        successMessage.style.display = 'none';

        
        let isValid = true;

        
        if (fullNameInput.value.trim() === '') {
            showError('nameError', 'Vui lòng nhập họ và tên');
            fullNameInput.classList.add('error');
            isValid = false;
        } else {
            fullNameInput.classList.remove('error');
        }

        
        if (emailInput.value.trim() === '') {
            showError('emailError', 'Vui lòng nhập email');
            emailInput.classList.add('error');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError('emailError', 'Email không hợp lệ');
            emailInput.classList.add('error');
            isValid = false;
        } else {
            emailInput.classList.remove('error');
        }

        
        if (passwordInput.value === '') {
            showError('passwordError', 'Vui lòng nhập mật khẩu');
            passwordInput.classList.add('error');
            isValid = false;
        } else if (!validatePassword(passwordInput.value)) {
            showError('passwordError', 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số');
            passwordInput.classList.add('error');
            isValid = false;
        } else {
            passwordInput.classList.remove('error');
        }

      
        if (!agreeTerms.checked) {
            showError('agreeError', 'Bạn phải đồng ý với điều khoản');
            isValid = false;
        }

        
        if (isValid) {
            const userData = {
                name: fullNameInput.value.trim(),
                email: emailInput.value.trim(),
                password: btoa(passwordInput.value), 
                registeredAt: new Date().toISOString()
            };

            
            localStorage.setItem('userData', JSON.stringify(userData));
            
         
            successMessage.style.display = 'block';
            
        
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        
            setTimeout(() => {
                fullNameInput.value = '';
                emailInput.value = '';
                passwordInput.value = '';
                agreeTerms.checked = false;
                successMessage.style.display = 'none';
            }, 3000);
        }
    });

  
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

 
    function validatePassword(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const isLongEnough = password.length >= 8;
        
        return hasUpperCase && hasLowerCase && hasNumber && isLongEnough;
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearErrors() {
        const errorElements = ['nameError', 'emailError', 'passwordError', 'agreeError'];
        errorElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = '';
                element.style.display = 'none';
            }
        });
    }
}



let timerInterval = null;
let timeRemaining = 600; 
let isTimerRunning = false;

function initBaiTap03() {
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const timeText = document.getElementById('timeText');
    const timerDisplay = document.getElementById('timerDisplay');
    const timerStatus = document.getElementById('timerStatus');
    const timerModal = document.getElementById('timerModal');
    const closeModal = document.getElementById('closeModal');

    if (!startBtn || !pauseBtn || !resetBtn || !timeText) return;

 
    updateTimeDisplay();

    
    startBtn.addEventListener('click', function() {
        if (!isTimerRunning) {
            isTimerRunning = true;
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';
            
            
            if (timerInterval) {
                clearInterval(timerInterval);
            }
            
            timerInterval = setInterval(function() {
                timeRemaining--;
                updateTimeDisplay();

                if (timeRemaining < 60) {
                    timerDisplay.classList.add('warning');
                    timerStatus.textContent = 'Cảnh báo: Dưới 1 phút!';
                }

                // Hết giờ
                if (timeRemaining <= 0) {
                    clearInterval(timerInterval);
                    isTimerRunning = false;
                    timerModal.style.display = 'flex';
                    startBtn.style.display = 'inline-block';
                    pauseBtn.style.display = 'none';
                }
            }, 1000);
        }
    });

  
    pauseBtn.addEventListener('click', function() {
        if (isTimerRunning) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            startBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'none';
        }
    });

  
    resetBtn.addEventListener('click', function() {
        clearInterval(timerInterval);
        isTimerRunning = false;
        timeRemaining = 600;
        updateTimeDisplay();
        timerDisplay.classList.remove('warning');
        timerStatus.textContent = 'Thời gian còn lại';
        startBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
        timerModal.style.display = 'none';
    });

    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            timerModal.style.display = 'none';
            timeRemaining = 600;
            updateTimeDisplay();
            timerDisplay.classList.remove('warning');
            timerStatus.textContent = 'Thời gian còn lại';
        });
    }

    
    if (timerModal) {
        timerModal.addEventListener('click', function(e) {
            if (e.target === timerModal) {
                timerModal.style.display = 'none';
                timeRemaining = 600;
                updateTimeDisplay();
                timerDisplay.classList.remove('warning');
                timerStatus.textContent = 'Thời gian còn lại';
            }
        });
    }

    function updateTimeDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        timeText.textContent = formattedTime;
    }
}


window.addEventListener('beforeunload', function() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
});


document.addEventListener('visibilitychange', function() {
    if (document.hidden && isTimerRunning) {
        console.log('Tab is hidden, timer continues in background');
    }
});


console.log('Script loaded successfully');
console.log('Các function khả dụng: initBaiTap01(), initBaiTap02(), initBaiTap03()');

