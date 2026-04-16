const projectsData = [
  {
    id: "elibrary-smada",
    title: "Elibrary SMADA",
    description: "Platform perpustakaan digital untuk SMA Pemuda dengan sistem booking online. Murid bisa browse katalog dan booking buku yang ingin dipinjam, lalu admin perpustakaan akan approve dan menyiapkan bukunya. Pengambilan buku tetap dilakukan secara offline di perpustakaan. Sistem ini memudahkan manajemen peminjaman dengan role-based access untuk murid, admin, dan penjaga perpus.",
    tech: ["Laravel", "Vue.js", "MySQL", "Tailwind CSS"],
    gallery: [
      {
        image: "/projects/elibrary/dashboard.png",
        caption: "Dashboard utama dengan statistik peminjaman dan koleksi buku terbaru"
      },
      {
        image: "/projects/elibrary/mainmenu.png",
        caption: "Main menu dengan navigasi ke berbagai fitur perpustakaan"
      },
      {
        image: "/projects/elibrary/detail buku.png",
        caption: "Halaman detail buku dengan informasi lengkap dan tombol peminjaman"
      },
      {
        image: "/projects/elibrary/bookingbuku.png",
        caption: "Form booking buku untuk peminjaman online"
      }
    ]
  },
  {
    id: "petclinic",
    title: "PetClinic Management System",
    description: "Aplikasi desktop offline untuk manajemen klinik hewan dengan fitur appointment, medical records, dan point of sale",
    tech: ["Go", "Wails", "Vue.js", "SQLite"],
    gallery: [
      {
        image: "/projects/petclinicmanagement/login.png",
        caption: "Halaman login dengan autentikasi user untuk akses sistem"
      },
      {
        image: "/projects/petclinicmanagement/gui.png",
        caption: "Interface utama aplikasi dengan navigasi menu yang intuitif"
      },
      {
        image: "/projects/petclinicmanagement/registration.png",
        caption: "Form registrasi pasien hewan dengan data lengkap owner dan pet"
      },
      {
        image: "/projects/petclinicmanagement/session.png",
        caption: "Manajemen session appointment dan medical records"
      },
      {
        image: "/projects/petclinicmanagement/POS.png",
        caption: "Point of Sale untuk transaksi obat dan layanan klinik"
      }
    ]
  }
];

const base = import.meta.env.BASE_URL;
let currentSlide = 0;
let currentGallery = [];

export function showProjectDetail(button) {
  const projectId = button.getAttribute('data-project-id');
  const project = projectsData.find(p => p.id === projectId);
  
  if (!project) return;

  // Toggle views
  const grid = document.getElementById('projects-grid');
  const detail = document.getElementById('project-detail');
  
  if (grid) grid.style.display = 'none';
  if (detail) detail.style.display = 'block';

  // Set title and description
  const titleEl = document.getElementById('detail-title');
  const descEl = document.getElementById('detail-description');
  
  if (titleEl) titleEl.textContent = project.title;
  if (descEl) descEl.textContent = project.description;

  // Render tech badges
  const techContainer = document.getElementById('detail-tech');
  if (techContainer) {
    techContainer.innerHTML = project.tech.map(tech => 
      `<span>${tech}</span>`
    ).join('');
  }

  // Initialize carousel
  if (project.gallery) {
    currentGallery = project.gallery;
    currentSlide = 0;
    renderCarousel();
  }

  // Scroll to top
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
}

export function hideProjectDetail() {
  const detail = document.getElementById('project-detail');
  const grid = document.getElementById('projects-grid');
  
  if (detail) detail.style.display = 'none';
  if (grid) grid.style.display = 'grid';
  
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
}

function renderCarousel() {
  const track = document.getElementById('carousel-track');
  const dotsContainer = document.getElementById('carousel-dots');
  const captionEl = document.getElementById('carousel-caption');
  
  if (!track || !dotsContainer || !captionEl) return;

  // Render slides
  track.innerHTML = currentGallery.map(item => `
    <div class="carousel-slide">
      <img src="${base}${item.image}" alt="Project screenshot" loading="lazy" />
    </div>
  `).join('');

  // Render dots
  dotsContainer.innerHTML = currentGallery.map((_, index) => `
    <button class="carousel-dot ${index === 0 ? 'active' : ''}" onclick="window.goToSlide(${index})"></button>
  `).join('');

  // Set initial caption
  captionEl.textContent = currentGallery[0].caption;

  // Reset position and ensure proper width
  track.style.transform = 'translateX(0)';
  track.style.transition = 'transform 0.5s ease-in-out';
}

export function nextSlide() {
  if (currentSlide < currentGallery.length - 1) {
    currentSlide++;
    updateCarousel();
  }
}

export function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }
}

export function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

function updateCarousel() {
  const track = document.getElementById('carousel-track');
  const dots = document.querySelectorAll('.carousel-dot');
  const captionEl = document.getElementById('carousel-caption');
  
  if (!track || !captionEl) return;

  // Update track position
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update dots
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  // Update caption
  captionEl.textContent = currentGallery[currentSlide].caption;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const detail = document.getElementById('project-detail');
  if (detail && detail.style.display === 'block') {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'Escape') hideProjectDetail();
  }
});

// Make functions globally available
window.showProjectDetail = showProjectDetail;
window.hideProjectDetail = hideProjectDetail;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
