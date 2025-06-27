import { WindowManager } from './WindowManager';

let windowIdCounter = 0;

interface AppWindowOptions {
    adjustHeight?: boolean;
}

export class AppWindow {
    private id: string;
    private element: HTMLElement;
    private titleBar: HTMLElement;
    private contentArea: HTMLElement;
    private windowManager: WindowManager;
    private title: string;

    private isDragging = false;
    private dragStartX = 0;
    private dragStartY = 0;
    private isMinimized = false;

    constructor(title: string, content: string | HTMLElement, options: AppWindowOptions = {}) {
        this.id = `window-${windowIdCounter++}`;
        this.title = title;
        this.windowManager = WindowManager.getInstance();
        
        this.element = document.createElement('div');
        this.element.className = 'app-window';
        this.element.dataset.windowId = this.id;

        this.titleBar = this.createTitleBar(title);
        this.contentArea = this.createContentArea(content);

        this.element.appendChild(this.titleBar);
        this.element.appendChild(this.contentArea);

        document.querySelector('.desktop')?.appendChild(this.element);
        this.windowManager.register(this);

        this.setupEventListeners();

        if (options.adjustHeight) {
            this.adjustHeightToContent();
        }
    }
    
    public getId(): string { return this.id; }
    public getTitle(): string { return this.title; }
    public getElement(): HTMLElement { return this.element; }

    private adjustHeightToContent(): void {
        // Use a small timeout to allow the browser to render the content first
        setTimeout(() => {
            const contentHeight = this.contentArea.scrollHeight;
            const titleBarHeight = this.titleBar.offsetHeight;
            this.element.style.height = `${contentHeight + titleBarHeight + 15}px`; // 15px for padding/margins
        }, 0);
    }

    private createTitleBar(title: string): HTMLElement {
        const titleBar = document.createElement('div');
        titleBar.className = 'title-bar';

        const titleText = document.createElement('span');
        titleText.textContent = title;
        titleBar.appendChild(titleText);

        const controls = document.createElement('div');
        controls.className = 'window-controls';

        const minimizeButton = document.createElement('button');
        minimizeButton.className = 'window-button minimize-button';
        minimizeButton.textContent = '_';
        controls.appendChild(minimizeButton);

        const closeButton = document.createElement('button');
        closeButton.className = 'window-button close-button';
        closeButton.textContent = '×';
        controls.appendChild(closeButton);
        
        titleBar.appendChild(controls);

        return titleBar;
    }

    private createContentArea(content: string | HTMLElement): HTMLElement {
        const contentArea = document.createElement('div');
        contentArea.className = 'content-area';
        if (typeof content === 'string') {
            contentArea.innerHTML = `<pre>${content}</pre>`;
        } else {
            contentArea.appendChild(content);
        }
        return contentArea;
    }

    private setupEventListeners(): void {
        this.element.addEventListener('mousedown', () => {
            this.windowManager.bringToFront(this.element);
        });

        this.titleBar.addEventListener('mousedown', (e) => {
            if (e.target instanceof HTMLButtonElement) return;
            
            this.isDragging = true;
            this.dragStartX = e.clientX - this.element.offsetLeft;
            this.dragStartY = e.clientY - this.element.offsetTop;
            this.windowManager.bringToFront(this.element);
        });

        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                this.element.style.left = `${e.clientX - this.dragStartX}px`;
                this.element.style.top = `${e.clientY - this.dragStartY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            this.isDragging = false;
        });

        const minimizeButton = this.titleBar.querySelector('.minimize-button');
        minimizeButton?.addEventListener('click', () => this.minimize());

        const closeButton = this.titleBar.querySelector('.close-button');
        closeButton?.addEventListener('click', () => this.close());
    }

    public minimize(): void {
        this.isMinimized = true;
        this.element.style.display = 'none';
    }

    public restore(): void {
        this.isMinimized = false;
        this.element.style.display = 'flex';
        this.windowManager.bringToFront(this.element);
    }

    public toggleMinimize(): void {
        if (this.isMinimized) {
            this.restore();
        } else {
            if (this.element.classList.contains('active')) {
                this.minimize();
            } else {
                this.windowManager.bringToFront(this.element);
            }
        }
    }

    public close(): void {
        this.windowManager.unregister(this);
        this.element.remove();
    }
}