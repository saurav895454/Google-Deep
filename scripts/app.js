// Main application controller
class BugBountyApp {
    constructor() {
        this.currentTheme = 'dark';
        this.activeTab = 'all';
        this.currentDomain = '';
        this.filteredDorks = [];
        this.allDorks = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTheme();
        this.loadDorks();
        this.setupKeyboardShortcuts();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Domain input
        const domainInput = document.getElementById('domainInput');
        domainInput.addEventListener('input', (e) => {
            this.currentDomain = e.target.value;
            this.updateDomainInDorks();
        });

        // Filter input
        const filterInput = document.getElementById('filterInput');
        filterInput.addEventListener('input', (e) => {
            this.filterDorks(e.target.value);
        });

        // Clear filter
        document.getElementById('clearFilter').addEventListener('click', () => {
            document.getElementById('filterInput').value = '';
            this.filterDorks('');
        });

        // Tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Quick action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.quickAction(e.target.dataset.category);
            });
        });

        // Modal close
        document.getElementById('closeShortcuts').addEventListener('click', () => {
            this.closeShortcutsModal();
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+/ - Focus search filter
            if (e.ctrlKey && e.key === '/') {
                e.preventDefault();
                document.getElementById('filterInput').focus();
            }
            
            // Ctrl+W - Toggle workspace
            if (e.ctrlKey && e.key === 'w') {
                e.preventDefault();
                if (window.workspace) {
                    window.workspace.toggle();
                }
            }
            
            // Ctrl+T - Toggle theme
            if (e.ctrlKey && e.key === 't') {
                e.preventDefault();
                this.toggleTheme();
            }
            
            // F1 - Show shortcuts
            if (e.key === 'F1') {
                e.preventDefault();
                this.showShortcutsModal();
            }
            
            // Escape - Close modals
            if (e.key === 'Escape') {
                this.closeShortcutsModal();
            }
        });
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        const themeBtn = document.getElementById('themeToggle');
        if (theme === 'dark') {
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        localStorage.setItem('theme', theme);
    }

    loadDorks() {
        document.getElementById('loading').style.display = 'flex';
        
        // Simulate loading time for better UX
        setTimeout(() => {
            this.processDorks();
            this.renderDorks();
            document.getElementById('loading').style.display = 'none';
        }, 500);
    }

    processDorks() {
        this.allDorks = [];
        
        Object.entries(window.GOOGLE_DORKS).forEach(([category, data]) => {
            data.dorks.forEach(dork => {
                this.allDorks.push({
                    ...dork,
                    category,
                    categoryTitle: data.title,
                    categoryIcon: data.icon
                });
            });
        });

        this.filteredDorks = [...this.allDorks];
        this.updateResultCount();
    }

    renderDorks() {
        const container = document.getElementById('dorksList');
        container.innerHTML = '';

        if (this.filteredDorks.length === 0) {
            document.getElementById('emptyState').style.display = 'block';
            return;
        }

        document.getElementById('emptyState').style.display = 'none';

        // Group dorks by category
        const groupedDorks = this.groupDorksByCategory();

        Object.entries(groupedDorks).forEach(([category, dorks]) => {
            if (this.activeTab === 'all' || this.activeTab === category) {
                const categoryElement = this.createCategoryElement(category, dorks);
                container.appendChild(categoryElement);
            }
        });
    }

    groupDorksByCategory() {
        const grouped = {};
        
        this.filteredDorks.forEach(dork => {
            if (!grouped[dork.category]) {
                grouped[dork.category] = [];
            }
            grouped[dork.category].push(dork);
        });

        return grouped;
    }

    createCategoryElement(category, dorks) {
        const categoryData = window.GOOGLE_DORKS[category];
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'dork-category';

        categoryDiv.innerHTML = `
            <div class="category-header" onclick="app.toggleCategory('${category}')">
                <div class="category-title">
                    <i class="${categoryData.icon}"></i>
                    <h3>${categoryData.title}</h3>
                    <span class="category-count">${dorks.length}</span>
                </div>
                <i class="fas fa-chevron-down category-toggle"></i>
            </div>
            <div class="dork-items" id="category-${category}">
                ${dorks.map(dork => this.createDorkElement(dork)).join('')}
            </div>
        `;

        return categoryDiv;
    }

    createDorkElement(dork) {
        const processedQuery = this.processDorkQuery(dork.query);
        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(processedQuery)}`;

        return `
            <div class="dork-item" onclick="window.open('${googleUrl}', '_blank')">
                <div class="dork-content">
                    <div class="dork-query">${this.escapeHtml(processedQuery)}</div>
                    <p class="dork-description">${this.escapeHtml(dork.description)}</p>
                </div>
                <div class="dork-actions" onclick="event.stopPropagation()">
                    <button class="btn-icon" onclick="app.copyToClipboard('${this.escapeForJs(processedQuery)}')" title="Copy Query">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="btn-icon" onclick="window.open('${googleUrl}', '_blank')" title="Search Google">
                        <i class="fab fa-google"></i>
                    </button>
                    <button class="btn-icon" onclick="app.saveDork('${this.escapeForJs(processedQuery)}', '${this.escapeForJs(dork.description)}')" title="Save to Workspace">
                        <i class="fas fa-bookmark"></i>
                    </button>
                </div>
            </div>
        `;
    }

    processDorkQuery(query) {
        if (!this.currentDomain) return query;

        const domains = this.currentDomain.split(',').map(d => d.trim()).filter(d => d);
        if (domains.length === 0) return query;

        let processedQuery = query;

        // Handle site: operator
        if (/site:"?example\[?\.\]?com"?/i.test(query)) {
            const siteQueries = domains.map(domain => {
                // Handle wildcard subdomains
                if (domain.startsWith('*.')) {
                    return `site:${domain}`;
                }
                return `site:${domain}`;
            });
            processedQuery = processedQuery.replace(/site:"?example\[?\.\]?com"?/gi, siteQueries.join(' OR '));
        }

        // Handle quoted domain references
        if (/["']example\[?\.\]?com["']/i.test(query)) {
            const quotedDomains = domains.map(d => `"${d}"`).join(' OR ');
            processedQuery = processedQuery.replace(/["']example\[?\.\]?com["']/gi, quotedDomains);
        }

        // Handle plain domain references
        processedQuery = processedQuery.replace(/example\[?\.\]?com/gi, domains[0]);

        return processedQuery;
    }

    toggleCategory(category) {
        const header = document.querySelector(`#category-${category}`).previousElementSibling;
        const items = document.querySelector(`#category-${category}`);
        
        header.classList.toggle('collapsed');
        
        if (header.classList.contains('collapsed')) {
            items.style.maxHeight = '0';
        } else {
            items.style.maxHeight = '1000px';
        }
    }

    switchTab(tab) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        this.activeTab = tab;
        this.renderDorks();
    }

    quickAction(category) {
        this.switchTab(category);
        document.getElementById('filterInput').value = '';
        this.filterDorks('');
    }

    filterDorks(query) {
        const searchTerm = query.toLowerCase();
        
        if (!searchTerm) {
            this.filteredDorks = [...this.allDorks];
        } else {
            this.filteredDorks = this.allDorks.filter(dork => 
                dork.query.toLowerCase().includes(searchTerm) ||
                dork.description.toLowerCase().includes(searchTerm) ||
                dork.categoryTitle.toLowerCase().includes(searchTerm)
            );
        }

        this.updateResultCount();
        this.renderDorks();
    }

    updateDomainInDorks() {
        this.renderDorks();
    }

    updateResultCount() {
        const count = this.filteredDorks.length;
        document.getElementById('resultCount').textContent = `${count} dork${count !== 1 ? 's' : ''} available`;
        
        // Update statistics
        const totalDorks = this.allDorks.length;
        const totalCategories = Object.keys(window.GOOGLE_DORKS).length;
        document.getElementById('totalDorks').textContent = totalDorks;
        document.getElementById('totalCategories').textContent = totalCategories;
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification('Copied to clipboard!', 'success');
        } catch (err) {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.showNotification('Copied to clipboard!', 'success');
        }
    }

    saveDork(query, description) {
        const savedDorks = JSON.parse(localStorage.getItem('saved_dorks') || '[]');
        
        const dork = {
            query,
            description,
            domain: this.currentDomain,
            timestamp: new Date().toISOString()
        };

        // Check if already saved
        if (savedDorks.some(saved => saved.query === query && saved.domain === this.currentDomain)) {
            this.showNotification('Dork already saved', 'warning');
            return;
        }

        savedDorks.push(dork);
        localStorage.setItem('saved_dorks', JSON.stringify(savedDorks));
        this.showNotification('Dork saved to workspace', 'success');
    }

    showShortcutsModal() {
        document.getElementById('shortcutsModal').classList.add('show');
    }

    closeShortcutsModal() {
        document.getElementById('shortcutsModal').classList.remove('show');
    }

    showNotification(message, type = 'info') {
        if (window.workspace) {
            window.workspace.showNotification(message, type);
        }
    }

    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    escapeForJs(text) {
        return text.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\\/g, '\\\\');
    }
}

// Global functions for onclick handlers
window.updateDomain = function() {
    if (window.app) {
        window.app.updateDomainInDorks();
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BugBountyApp();
    
    // Show help on first visit
    if (!localStorage.getItem('first_visit_done')) {
        setTimeout(() => {
            window.app.showNotification('Press F1 to see keyboard shortcuts', 'info');
            localStorage.setItem('first_visit_done', 'true');
        }, 2000);
    }
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
