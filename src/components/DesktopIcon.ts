export class DesktopIcon {
    private element: HTMLElement;
    private lastTap = 0;

    constructor(
        private id: string,
        private name: string,
        private icon: string, // Path to icon image
        private onOpen: () => void
    ) {
        this.element = document.createElement('div');
        this.element.className = 'desktop-icon';
        this.element.dataset.iconId = this.id;

        const iconImage = document.createElement('img');
        iconImage.className = 'icon-image';
        iconImage.src = this.icon;
        this.element.appendChild(iconImage);

        const iconLabel = document.createElement('div');
        iconLabel.className = 'icon-label';
        iconLabel.textContent = this.name;
        this.element.appendChild(iconLabel);

        document.querySelector('.desktop')?.appendChild(this.element);

        this.setupEventListeners();
    }

    public getElement(): HTMLElement {
        return this.element;
    }

    private setupEventListeners(): void {
        // For Desktop
        this.element.addEventListener('dblclick', () => {
            this.onOpen();
        });

        // For Mobile
        this.element.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - this.lastTap;
            if (tapLength < 300 && tapLength > 0) {
                // Double tap
                this.onOpen();
                e.preventDefault();
            }
            this.lastTap = currentTime;
        });
        
        // A simple single tap implementation
        let touchTimeout: number;
        this.element.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) return;
            touchTimeout = window.setTimeout(() => {
                 // Long press, do nothing for now
            }, 300);
        });
        this.element.addEventListener('touchend', (e) => {
            clearTimeout(touchTimeout);
            // It's a tap if touchend is fired quickly
            if (e.changedTouches.length === 1 && (new Date().getTime() - this.lastTap) > 300) {
                 // This is a single tap, we can open it here.
                 // To avoid conflict with double tap, we will use a delay
                 setTimeout(() => {
                    const now = new Date().getTime();
                    if ((now - this.lastTap) > 300) { // if no double tap detected
                        this.onOpen();
                    }
                 }, 310);
            }
        });


    }
}