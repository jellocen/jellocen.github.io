// DOM 요소들
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scroll-top');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const navTabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');

// 모바일 네비게이션 토글
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 메뉴 닫기
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// 스크롤 이벤트
window.addEventListener('scroll', () => {
    // 스크롤 투 탑 버튼 표시/숨김
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
    
    // 네비게이션 배경 투명도 조절
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
    }
});

// 스크롤 투 탑 기능
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 부드러운 스크롤 (네비게이션 링크)
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // 네비게이션 높이 고려
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


// 탭 기능 (Experience 섹션)
navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 모든 탭에서 active 클래스 제거
        navTabs.forEach(t => t.classList.remove('active'));
        // 모든 탭 콘텐츠 숨기기
        tabContents.forEach(content => content.classList.remove('active'));
        
        // 클릭된 탭에 active 클래스 추가
        tab.classList.add('active');
        
        // 해당하는 탭 콘텐츠 표시
        const targetTab = tab.getAttribute('data-tab');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// 히어로 섹션 컨트롤 버튼 (데모용)
playBtn.addEventListener('click', () => {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    // 여기에 실제 재생 로직 추가 가능
});

pauseBtn.addEventListener('click', () => {
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'inline-block';
    // 여기에 실제 일시정지 로직 추가 가능
});

// 스크롤 애니메이션 (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션을 적용할 요소들
const animateElements = document.querySelectorAll('.about-text, .skill-item, .project-item, .philosophy-quote, .contact-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 초기 스크롤 위치 설정
    window.scrollTo(0, 0);
    
    // 히어로 섹션 컨트롤 버튼 초기 상태
    pauseBtn.style.display = 'none';
    
    // 탭 콘텐츠 초기 상태 (첫 번째 탭만 활성화)
    if (tabContents.length > 0) {
        tabContents[0].classList.add('active');
    }
});

// 키보드 네비게이션 지원
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // ESC 키로 모바일 메뉴 닫기
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// 윈도우 리사이즈 이벤트
window.addEventListener('resize', () => {
    // 모바일 메뉴가 열려있을 때 데스크톱으로 전환되면 메뉴 닫기
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// 스크롤 진행률 표시 (선택사항)
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // 스크롤 진행률을 시각적으로 표시하고 싶다면 여기에 코드 추가
    // 예: 프로그레스 바 업데이트
}

window.addEventListener('scroll', updateScrollProgress);
