document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        // Close all dropdowns
        navItems.forEach(item => item.classList.remove('active'));
    });

    // Handle dropdown menus on mobile
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown');

        if (dropdown) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const isActive = item.classList.contains('active');
                    
                    // Close other dropdowns
                    navItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });

                    // Toggle current dropdown
                    item.classList.toggle('active');
                }
            });
        }
    });

    // Close menu on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
                navItems.forEach(item => item.classList.remove('active'));
            }
        }, 250);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const isClickInsideNav = navLinks.contains(e.target);
            const isClickOnToggle = menuToggle.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnToggle) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
                navItems.forEach(item => item.classList.remove('active'));
            }
        }
    });

    // Handle dropdown hover on desktop
    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
            item.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    this.classList.add('active');
                }
            });

            item.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    this.classList.remove('active');
                }
            });
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        menuToggle.classList.remove('active');
                        navLinks.classList.remove('active');
                        overlay.classList.remove('active');
                        body.classList.remove('menu-open');
                    }
                    
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Sticky header
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    
    function updateHeader() {
        if (window.scrollY > 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    window.addEventListener('scroll', updateHeader);
    updateHeader();

    // News carousel
    let currentSlide = 0;
    const newsCards = document.querySelectorAll('.news-card');
    
    function showSlide(index) {
        newsCards.forEach((card, i) => {
            if (i === index) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % newsCards.length;
        showSlide(currentSlide);
    }

    // Auto-advance news carousel every 5 seconds
    if (newsCards.length > 1) {
        setInterval(nextSlide, 5000);
    }

    // Form validation for contact forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Form submitted successfully!');
                form.reset();
            }
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    console.log('Slides found:', slides.length);
    console.log('Prev button:', prevBtn);
    console.log('Next button:', nextBtn);

    if (!slides.length || !prevBtn || !nextBtn || !dotsContainer) {
        console.error('Slider elements not found');
        return;
    }

    let testimonialSlide = 0;
    const totalSlides = slides.length;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function updateSlider() {
        // Remove active class from all slides and dots
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            dots[index].classList.remove('active');
        });

        // Add active class to current slide and dot
        slides[testimonialSlide].classList.add('active');
        dots[testimonialSlide].classList.add('active');

        console.log('Current testimonial slide:', testimonialSlide);
    }

    function goToSlide(index) {
        testimonialSlide = index;
        updateSlider();
    }

    function nextSlide(e) {
        if (e) e.preventDefault();
        testimonialSlide = (testimonialSlide + 1) % totalSlides;
        console.log('Next clicked, moving to testimonial slide:', testimonialSlide);
        updateSlider();
    }

    function prevSlide(e) {
        if (e) e.preventDefault();
        testimonialSlide = (testimonialSlide - 1 + totalSlides) % totalSlides;
        console.log('Prev clicked, moving to testimonial slide:', testimonialSlide);
        updateSlider();
    }

    // Event listeners
    nextBtn.onclick = nextSlide;
    prevBtn.onclick = prevSlide;

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Auto-advance slides
    let slideInterval = setInterval(() => nextSlide(), 5000);

    // Pause auto-advance on hover
    const slider = document.querySelector('.hero-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => nextSlide(), 5000);
    });

    // Initialize first slide
    updateSlider();
    console.log('Slider initialized');

    // Dark mode functionality
    const darkModeToggle = document.querySelector('.dark-mode-toggle');

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.setAttribute('data-theme', 'dark');
        darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    });

    // Chatbot functionality
    const chatbot = document.getElementById('chatbot');
    const chatIcon = document.getElementById('chatIcon');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotClose = document.querySelector('.chatbot-close');

    let isChatbotOpen = false;
    let isChatbotMinimized = false;

    // Show chat interface when clicking the icon
    chatIcon.addEventListener('click', () => {
        chatIcon.style.display = 'none';
        chatbot.style.display = 'block';
        setTimeout(() => {
            chatbot.classList.remove('hidden');
        }, 50);
        isChatbotOpen = true;
        isChatbotMinimized = false;
    });

    // Toggle chatbot minimize/maximize
    chatbotToggle.addEventListener('click', () => {
        isChatbotMinimized = !isChatbotMinimized;
        if (isChatbotMinimized) {
            chatbot.style.transform = 'translateY(calc(100% - 60px))';
            chatbotToggle.querySelector('i').classList.replace('fa-minus', 'fa-plus');
        } else {
            chatbot.style.transform = 'translateY(0)';
            chatbotToggle.querySelector('i').classList.replace('fa-plus', 'fa-minus');
        }
    });

    // Close chatbot and show icon
    chatbotClose.addEventListener('click', () => {
        chatbot.classList.add('hidden');
        setTimeout(() => {
            chatbot.style.display = 'none';
            chatIcon.style.display = 'flex';
        }, 300);
        isChatbotOpen = false;
        isChatbotMinimized = false;
    });

    // Initialize chatbot state
    window.addEventListener('load', () => {
        chatIcon.style.display = 'flex';
        chatbot.classList.add('hidden');
    });

    // Simple responses for the chatbot
    const botResponses = {
        'hello': 'Hello! How can I assist you today?',
        'hi': 'Hi there! How can I help you?',
        'admission': 'For admission inquiries, please visit our Admissions page or contact our admissions office at admissions@mvsrec.edu.in',
        'courses': 'We offer various engineering courses including Computer Science, Electronics, Mechanical, and Civil Engineering. Which course are you interested in?',
        'contact': 'You can reach us at info@mvsrec.edu.in or visit our campus at Nadergul, Hyderabad - 501510',
        'fees': 'For detailed fee structure, please visit our Admissions page or contact our finance office.',
        'placements': 'Our college has excellent placement records with top companies. Visit our Placements page for more details.',
        'facilities': 'We have state-of-the-art labs, library, sports facilities, and more. Would you like specific information about any facility?',
        'default': 'I apologize, but I\'m not sure about that. Please contact our office for more detailed information.'
    };

    // Send message function
    function sendChatMessage() {
        const message = userInput.value.trim().toLowerCase();
        if (message) {
            // Add user message
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'message user';
            userMessageDiv.textContent = userInput.value;
            chatMessages.appendChild(userMessageDiv);

            // Add bot response
            setTimeout(() => {
                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'message bot';
                let response = botResponses.default;
                
                // Check for keywords in the message
                Object.keys(botResponses).forEach(key => {
                    if (message.includes(key)) {
                        response = botResponses[key];
                    }
                });
                
                botMessageDiv.textContent = response;
                chatMessages.appendChild(botMessageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 500);

            userInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Send message on button click or Enter key
    sendMessage.addEventListener('click', sendChatMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
});