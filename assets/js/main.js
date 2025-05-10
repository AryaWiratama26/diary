class Component {
    constructor() {
        this.elements = {};
    }

    createDiaryEntry(date, title, paragraphs) {
        const entry = document.createElement('div');
        entry.className = 'diary-entry';

        const dateEl = document.createElement('div');
        dateEl.className = 'entry-date';
        dateEl.textContent = date;
        entry.appendChild(dateEl);

        const titleEl = document.createElement('h3');
        titleEl.textContent = title;
        entry.appendChild(titleEl);

        paragraphs.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            entry.appendChild(p);
        });

        return entry;
    }

    createSongItem(title, artist, note) {
        const songItem = document.createElement('div');
        songItem.className = 'song-item';

        songItem.innerHTML = `
            <div class="song-icon"><i class="fa-solid fa-music"></i></div>
            <div class="song-details">
                <h3>${title}</h3>
                <p>${artist}</p>
                <div class="song-note">${note}</div>
            </div>
        `;

        return songItem;
    }

    createTechItem(title, tags, description) {
        const techItem = document.createElement('div');
        techItem.className = 'tech-item';

        const titleEl = document.createElement('h3');
        titleEl.textContent = title;
        techItem.appendChild(titleEl);

        const tagsEl = document.createElement('div');
        tagsEl.className = 'tech-tags';
        
        tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'tag';
            tagEl.textContent = tag;
            tagsEl.appendChild(tagEl);
        });
        
        techItem.appendChild(tagsEl);

        const descEl = document.createElement('p');
        descEl.textContent = description;
        techItem.appendChild(descEl);

        return techItem;
    }

    createGalleryItem(imgSrc, caption) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = caption;
        galleryItem.appendChild(img);

        const captionEl = document.createElement('div');
        captionEl.className = 'gallery-caption';
        captionEl.textContent = caption;
        galleryItem.appendChild(captionEl);

        return galleryItem;
    }
}

class PageManager {
    constructor() {
        this.currentPage = 0;
        this.pages = Array.from(document.querySelectorAll('.page'));
        this.navItems = Array.from(document.querySelectorAll('.nav-item'));
        this.pageCount = this.pages.length;
        this.currentNavSelection = 'book'; 
    }

    showPage(index) {
        if (index < 0 || index >= this.pageCount) return;

        this.pages.forEach((page, i) => {
            if (i === index) {
                page.classList.remove('hidden');
            } else {
                page.classList.add('hidden');
            }
        });

        this.navItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
                this.currentNavSelection = item.getAttribute('data-page');
            } else {
                item.classList.remove('active');
            }
        });

        this.currentPage = index;
        this.updatePageNumbers();
    }

    nextPage() {
        let newIndex = this.currentPage + 1;
        if (newIndex >= this.pageCount) {
            newIndex = 0; 
        }
        this.showPage(newIndex);
    }

    prevPage() {
        let newIndex = this.currentPage - 1;
        if (newIndex < 0) {
            newIndex = this.pageCount - 1; 
        }
        this.showPage(newIndex);
    }

    updatePageNumbers() {
        this.pages.forEach((page, i) => {
            const pageNumber = page.querySelector('.page-number');
            if (pageNumber) {
                pageNumber.textContent = (i + 1);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // DOMM
    const book = document.querySelector('.book');
    const openBookBtn = document.querySelector('.open-book');
    const closeBookBtn = document.querySelector('.book-close');
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const prevPageBtn = document.querySelector('.prev-page');
    const nextPageBtn = document.querySelector('.next-page');

    const component = new Component();
    const pageManager = new PageManager();

    openBookBtn.addEventListener('click', () => {
        book.classList.add('open');
    });

    closeBookBtn.addEventListener('click', () => {
        book.classList.remove('open');
    });

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            pageManager.showPage(index);
        });
    });

    prevPageBtn.addEventListener('click', () => {
        pageManager.prevPage();
    });

    nextPageBtn.addEventListener('click', () => {
        pageManager.nextPage();
    });

    document.addEventListener('keydown', (e) => {
        if (book.classList.contains('open')) {
            if (e.key === 'ArrowRight') {
                pageManager.nextPage();
            } else if (e.key === 'ArrowLeft') {
                pageManager.prevPage();
            } else if (e.key === 'Escape') {
                book.classList.remove('open');
            }
        }
    });

    function loadDynamicContent() {
        console.log('Loading dynamic content...');
    }

    function initApp() {
        pageManager.showPage(0);
        
        loadDynamicContent();
        
        console.log('Diary application initialized');
    }
    
    initApp();
});