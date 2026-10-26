const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.querySelector(".back-to-top");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const filterButtons = document.querySelectorAll(".filter-btn");
const taskCards = document.querySelectorAll(".task-card");
const visibleCount = document.getElementById("visibleCount");
const year = document.getElementById("year");
const modal = document.getElementById("taskModal");
const modalPanel = modal.querySelector(".modal-panel");
const modalClose = modal.querySelector(".modal-close");
const modalKicker = document.getElementById("modalKicker");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalCategory = document.getElementById("modalCategory");
const modalStatus = document.getElementById("modalStatus");
const modalTools = document.getElementById("modalTools");
const modalFileList = document.getElementById("modalFileList");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const taskDetails = {
  "01": {
    title: "Nirmana Komposisi",
    kicker: "Proyek 01 — Desain",
    category: "Desain",
    status: "Selesai",
    tools: "Kertas, Pensil, Pensil Warna",
    description:
      "Latihan nirmana dengan penerapan garis, bidang, ritme, dan keseimbangan. Fokus pada eksplorasi komposisi tanpa objek figuratif untuk melatih kepekaan visual.",
    files: ["nirmana-garis.jpg", "nirmana-bidang.jpg", "sketsa-latihan.jpg", "foto-hasil.jpg", "catatan.pdf", "refensi.jpg"]
  },
  "02": {
    title: "Poster Edukasi",
    kicker: "Proyek 02 — Desain",
    category: "Desain",
    status: "Selesai",
    tools: "Adobe Photoshop / Canva",
    description:
      "Pembuatan poster edukasi dengan penekanan pada tipografi, hierarchy, ruang kosong, dan pemilihan warna agar pesan mudah terbaca.",
    files: ["poster-edukasi.ai", "poster-edukasi.psd", "poster-final.jpg", "poster-final.png", "moodboard.jpg", "sketsa.jpg", "proses.pdf", "deskripsi.pdf"]
  },
  "03": {
    title: "Desain Layout Majalah",
    kicker: "Proyek 03 — Desain",
    category: "Desain",
    status: "Selesai",
    tools: "Adobe InDesign / Figma",
    description:
      "Latihan layout majalah 2 halaman dengan penerapan grid system, kolom, jarak antar elemen, pull quote, dan penataan foto agar terbaca enak.",
    files: ["layout-majalah.indd", "layout-majalah.pdf", "halaman1.jpg", "halaman2.jpg", "grid-guides.png", "typography-sheet.pdf", "proses.pdf"]
  },
  "04": {
    title: "Logo & Identitas Visual",
    kicker: "Proyek 04 — Desain",
    category: "Desain",
    status: "Selesai",
    tools: "Adobe Illustrator / Figma",
    description:
      "Perancangan logomark dan logotype untuk brand fiktif. Meliputi eksplorasi bentuk, konstruksi grid logo, pemilihan warna, dan aplikasi dasar brand.",
    files: ["logo-explorasi.ai", "logo-final.svg", "logo-final.png", "logomark-jpg.jpg", "color-palette.pdf", "logo-construction.pdf", "stationery-sketch.jpg", "aplikasi-logo.jpg", "brand-sheet.pdf"]
  },
  "05": {
    title: "Presentasi Desain",
    kicker: "Proyek 05 — Presentasi",
    category: "Presentasi",
    status: "Selesai",
    tools: "Canva / PowerPoint",
    description:
      "Slide presentasi untuk memaparkan konsep desain, moodboard, proses kreatif, dan hasil akhir karya di depan kelas.",
    files: ["presentasi-desain.pptx", "presentasi-desain.pdf", "slide-moodboard.jpg", "slide-proses.jpg", "catatan-sidang.pdf"]
  },
  "06": {
    title: "Laporan Tugas DKV",
    kicker: "Proyek 06 — Presentasi",
    category: "Presentasi",
    status: "Selesai",
    tools: "Microsoft Word / PDF",
    description:
      "Laporan proses kreatif berisi latar belakang, konsep, alat/bahan, tahapan kerja, kendala, solusi, serta dokumentasi hasil akhir karya.",
    files: ["laporan-tugas-dkv.docx", "laporan-tugas-dkv.pdf", "dokumentasi-foto.zip", "moodboard.pdf", "refleksi.pdf"]
  }
};

let lastFocusedElement = null;
let previousBodyOverflow = "";

function closeMenu() {
  if (!navLinks.classList.contains("open")) return;
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu navigasi");
  body.classList.remove("menu-open");
}

function toggleMenu() {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
  body.classList.toggle("menu-open", isOpen);
}

function updateScrollUI() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
  header.classList.toggle("scrolled", window.scrollY > 12);
  if (backToTop) {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  }
}

function setActiveNav(id) {
  navItems.forEach((item) => {
    item.classList.toggle("active", item.getAttribute("href") === `#${id}`);
  });
}

function openModal(taskId) {
  const detail = taskDetails[taskId];
  if (!detail) return;

  lastFocusedElement = document.activeElement;
  modalKicker.textContent = detail.kicker;
  modalTitle.textContent = detail.title;
  modalDescription.textContent = detail.description;
  modalCategory.textContent = detail.category;
  modalStatus.textContent = detail.status;
  modalTools.textContent = detail.tools;
  modalFileList.replaceChildren();

  detail.files.forEach((file) => {
    const item = document.createElement("li");
    item.textContent = file;
    modalFileList.appendChild(item);
  });

  previousBodyOverflow = body.style.overflow;
  body.style.overflow = "hidden";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  window.setTimeout(() => modalClose.focus(), 60);
}

function closeModal() {
  if (!modal.classList.contains("open")) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  body.style.overflow = previousBodyOverflow;

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function trapModalFocus(event) {
  if (event.key !== "Tab" || !modal.classList.contains("open")) return;

  const focusable = modalPanel.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

menuToggle.addEventListener("click", toggleMenu);

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
  if (
    navLinks.classList.contains("open") &&
    !navLinks.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeModal();
  }
  trapModalFocus(event);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) closeMenu();
});

document.querySelectorAll('[data-scroll-top]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
});

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    },
    { rootMargin: "-34% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => {
    if (["tentang", "sekolah", "tugas"].includes(section.id)) {
      sectionObserver.observe(section);
    }
  });
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    let shown = 0;

    taskCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !matches);

      if (matches) {
        shown += 1;
        if (!reducedMotion) {
          card.animate(
            [
              { opacity: 0, transform: "translateY(10px)" },
              { opacity: 1, transform: "translateY(0)" }
            ],
            { duration: 320, easing: "ease-out" }
          );
        }
      }
    });

    visibleCount.textContent = String(shown);
  });
});

document.querySelectorAll(".task-open").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".task-card");
    openModal(card.dataset.task);
  });
});

modal.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeModal);
});



if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
}

year.textContent = String(new Date().getFullYear());
