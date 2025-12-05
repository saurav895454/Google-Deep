// Workspace functionality
class Workspace {
    constructor() {
        this.isOpen = false;
        this.currentNotes = '';
        this.savedTargets = this.loadSavedTargets();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadWorkspace();
        this.renderSavedTargets();
    }

    setupEventListeners() {
        // Workspace toggle
        document.getElementById('workspaceToggle').addEventListener('click', () => {
            this.toggle();
        });

        document.getElementById('closeWorkspace').addEventListener('click', () => {
            this.close();
        });

        // Save current target
        document.getElementById('saveCurrentTarget').addEventListener('click', () => {
            this.saveCurrentTarget();
        });

        // Save notes
        document.getElementById('saveNotes').addEventListener('click', () => {
            this.saveNotes();
        });

        // Export workspace
        document.getElementById('exportWorkspace').addEventListener('click', () => {
            this.exportWorkspace();
        });

        // Import workspace
        document.getElementById('importButton').addEventListener('click', () => {
            document.getElementById('importWorkspace').click();
        });

        document.getElementById('importWorkspace').addEventListener('change', (e) => {
            this.importWorkspace(e);
        });

        // Auto-save notes
        document.getElementById('workspaceNotes').addEventListener('input', (e) => {
            this.currentNotes = e.target.value;
            this.debouncedSaveNotes();
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        const workspace = document.getElementById('workspace');
        workspace.classList.add('open');
        this.isOpen = true;
        document.getElementById('workspaceToggle').innerHTML = '<i class="fas fa-times"></i>';
    }

    close() {
        const workspace = document.getElementById('workspace');
        workspace.classList.remove('open');
        this.isOpen = false;
        document.getElementById('workspaceToggle').innerHTML = '<i class="fas fa-briefcase"></i>';
    }

    saveCurrentTarget() {
        const domainInput = document.getElementById('domainInput');
        const domain = domainInput.value.trim();
        
        if (!domain) {
            this.showNotification('Please enter a domain first', 'warning');
            return;
        }

        const target = {
            domain: domain,
            timestamp: new Date().toISOString(),
            notes: this.currentNotes
        };

        // Check if domain already exists
        const existingIndex = this.savedTargets.findIndex(t => t.domain === domain);
        if (existingIndex >= 0) {
            this.savedTargets[existingIndex] = target;
            this.showNotification('Target updated successfully', 'success');
        } else {
            this.savedTargets.push(target);
            this.showNotification('Target saved successfully', 'success');
        }

        this.saveToStorage();
        this.renderSavedTargets();
    }

    saveNotes() {
        const notes = document.getElementById('workspaceNotes').value;
        this.currentNotes = notes;
        localStorage.setItem('workspace_notes', notes);
        this.showNotification('Notes saved', 'success');
    }

    // Debounced save notes
    debouncedSaveNotes = this.debounce(() => {
        localStorage.setItem('workspace_notes', this.currentNotes);
    }, 1000);

    loadWorkspace() {
        const savedNotes = localStorage.getItem('workspace_notes');
        if (savedNotes) {
            document.getElementById('workspaceNotes').value = savedNotes;
            this.currentNotes = savedNotes;
        }
    }

    loadSavedTargets() {
        const saved = localStorage.getItem('saved_targets');
        return saved ? JSON.parse(saved) : [];
    }

    saveToStorage() {
        localStorage.setItem('saved_targets', JSON.stringify(this.savedTargets));
    }

    renderSavedTargets() {
        const container = document.getElementById('savedTargets');
        container.innerHTML = '';

        if (this.savedTargets.length === 0) {
            container.innerHTML = '<p class="text-muted">No saved targets</p>';
            return;
        }

        this.savedTargets.forEach((target, index) => {
            const targetElement = document.createElement('div');
            targetElement.className = 'saved-item';
            
            const date = new Date(target.timestamp).toLocaleDateString();
            
            targetElement.innerHTML = `
                <div>
                    <div class="saved-item-name">${target.domain}</div>
                    <div class="saved-item-date">${date}</div>
                </div>
                <div class="saved-item-actions">
                    <button class="btn-icon" onclick="workspace.loadTarget(${index})" title="Load Target">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="btn-icon" onclick="workspace.deleteTarget(${index})" title="Delete Target">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            container.appendChild(targetElement);
        });
    }

    loadTarget(index) {
        const target = this.savedTargets[index];
        if (target) {
            document.getElementById('domainInput').value = target.domain;
            document.getElementById('workspaceNotes').value = target.notes || '';
            this.currentNotes = target.notes || '';
            
            // Trigger domain update
            if (window.updateDomain) {
                window.updateDomain();
            }
            
            this.showNotification(`Loaded target: ${target.domain}`, 'success');
        }
    }

    deleteTarget(index) {
        if (confirm('Are you sure you want to delete this target?')) {
            const domain = this.savedTargets[index].domain;
            this.savedTargets.splice(index, 1);
            this.saveToStorage();
            this.renderSavedTargets();
            this.showNotification(`Deleted target: ${domain}`, 'info');
        }
    }

    exportWorkspace() {
        const workspaceData = {
            targets: this.savedTargets,
            notes: this.currentNotes,
            exportDate: new Date().toISOString(),
            version: '2.0.0'
        };

        const dataStr = JSON.stringify(workspaceData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `bug-bounty-workspace-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        this.showNotification('Workspace exported successfully', 'success');
    }

    importWorkspace(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const workspaceData = JSON.parse(e.target.result);
                
                if (workspaceData.targets) {
                    this.savedTargets = workspaceData.targets;
                    this.saveToStorage();
                    this.renderSavedTargets();
                }

                if (workspaceData.notes) {
                    document.getElementById('workspaceNotes').value = workspaceData.notes;
                    this.currentNotes = workspaceData.notes;
                    this.saveNotes();
                }

                this.showNotification('Workspace imported successfully', 'success');
            } catch (error) {
                this.showNotification('Error importing workspace file', 'error');
                console.error('Import error:', error);
            }
        };
        
        reader.readAsText(file);
        event.target.value = ''; // Reset file input
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'error' ? '#ff6b6b' : 
                       type === 'warning' ? '#ffa726' : 
                       type === 'success' ? '#00ff88' : '#2196f3',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 10000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            success: 'check-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Utility function for debouncing
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize workspace when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.workspace = new Workspace();
});
