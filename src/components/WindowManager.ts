import { AppWindow } from './AppWindow';

export class WindowManager {
    private static instance: WindowManager;
    private windows: AppWindow[] = [];
    private topZIndex = 100;
    private taskbarElement: HTMLElement;

    private constructor() {
        this.taskbarElement = document.querySelector('.taskbar-apps') as HTMLElement;
    }

    public static getInstance(): WindowManager {
        if (!WindowManager.instance) {
            WindowManager.instance = new WindowManager();
        }
        return WindowManager.instance;
    }

    public register(window: AppWindow): void {
        this.windows.push(window);
        this.bringToFront(window.getElement());
        this.createTaskbarButton(window);
    }

    public unregister(window: AppWindow): void {
        const index = this.windows.indexOf(window);
        if (index > -1) {
            this.windows.splice(index, 1);
        }
        this.removeTaskbarButton(window);
    }

    public bringToFront(windowElement: HTMLElement): void {
        this.windows.forEach(win => win.getElement().classList.remove('active'));
        windowElement.classList.add('active');
        windowElement.style.zIndex = (this.topZIndex++).toString();
    }

    private createTaskbarButton(window: AppWindow): void {
        const button = document.createElement('button');
        button.className = 'taskbar-button';
        button.textContent = window.getTitle();
        button.dataset.windowId = window.getId();

        button.addEventListener('click', () => {
            window.toggleMinimize();
            this.bringToFront(window.getElement());
        });

        this.taskbarElement.appendChild(button);
    }

    private removeTaskbarButton(window: AppWindow): void {
        const button = this.taskbarElement.querySelector(`[data-window-id="${window.getId()}"]`);
        if (button) {
            button.remove();
        }
    }
}
