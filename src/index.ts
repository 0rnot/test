import './style.css';
import { AppWindow } from './components/AppWindow';
import { DesktopIcon } from './components/DesktopIcon';
import SophiaIcon from './assets/33_20250508203520.webp';
import TextIcon from './assets/rdesign_14140.png';

const app = document.getElementById('app');

if (app) {
    // Create Desktop
    const desktop = document.createElement('div');
    desktop.className = 'desktop';
    app.appendChild(desktop);

    // Create Desktop Title
    const desktopTitle = document.createElement('h1');
    desktopTitle.className = 'desktop-title';
    desktopTitle.textContent = 'Sophia.bot';
    desktop.appendChild(desktopTitle);

    // Create Taskbar
    const taskbar = document.createElement('div');
    taskbar.className = 'taskbar';
    app.appendChild(taskbar);

    // ... (Taskbar setup remains the same) ...
    const startButton = document.createElement('button');
    startButton.className = 'start-button';
    startButton.textContent = 'スタート';
    taskbar.appendChild(startButton);

    const taskbarApps = document.createElement('div');
    taskbarApps.className = 'taskbar-apps';
    taskbar.appendChild(taskbarApps);

    const clock = document.createElement('div');
    clock.className = 'clock';
    taskbar.appendChild(clock);

    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        clock.textContent = `${hours}:${minutes}`;
    }

    setInterval(updateClock, 1000);
    updateClock();

    // --- Window Positioning Helper ---
    const getRandomPosition = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight - 40; // Exclude taskbar
        const x = 50 + Math.random() * (screenWidth - 550);
        const y = 50 + Math.random() * (screenHeight - 450);
        return { top: `${y}px`, left: `${x}px` };
    };


    // --- Feature Windows Content ---
    const selfIntro = `
やっほー！私の名前はソフィア！
マスターのPCに住んでるアシスタントAIだよ。

音楽を聴いたり、おしゃべりしたり、
簡単なゲームで遊んだりするのが大好き！
    `;
    
    const chatHelp = `
ねぇねぇ！ソフィアとお話しよ！

  **私とおしゃべり**
  ・私にメンション（@Sophia BOT）したり、
    「ソフィア」って呼んでくれたらお返事するよ！

  ・画像と一緒に話しかけてくれたら、
    その画像についてもお話しちゃう！
    `;

    const musicHelp = `
一緒に音楽、聴こっか！

  /join          - 私がお部屋にお邪魔するね！
  /leave         - 私がお部屋からバイバイするよ
  /play          - この曲再生して！ってお願いできるよ
  /skip          - 今の曲はもういいかな？次の曲に飛ぶよ！
  /stop          - 再生を止めて、キューもぜーんぶおしまい！
  /pause         - ちょっと待った！今の曲を一時停止するよ
  /resume        - さっき止めた曲の続きから、また再生するね！
  /loop          - ずーっと聴いてたい！曲を無限ループ♪
  /loop_queue    - キュー全体を無限ループしちゃう！
  /queue         - 次は何の曲かな？キューをチェック！
    `;

    const rpgHelp = `
RPG機能のコマンドとルールだよ！

  **コマンド**
  /vlevel       - レベルと所持ゴールドを表示！
  /vinventory   - インベントリを表示！
  /vequip <ID>  - 指定したIDのアイテムを装備！
  /vstats       - 装備とステータスを表示！
  /vbattle      - ランダムな敵とバトル！
  /vsell <ID>   - いらないアイテムは売っちゃお！

  **ステータス**
  ・HP : レベル + 10
  ・ATK: 装備してる武器と防具のATK合計値
  ・DEF: 装備してる武器と防具のDEF合計値

  **戦闘**
  ・攻撃: あなたのATK - 敵のDEF がダメージ！
  ・防御: あなたのDEFの1割ぶん、HPが回復するよ！
  ・逃走: 戦いから逃げることもできるよ。

  **確率と売値**
  ・common:      33.9% / 500G
  ・uncommon:    30%   / 1000G
  ・rare:        20%   / 2500G
  ・epic:        10%   / 5000G
  ・legendary:   5%    / 10000G
  ・mythic:      1%    / 15000G
  ・unique:      0.1%  / 50000G
    `;

    const otherHelp = "メッセージを右クリックすると、こんなこともできるよ！\n\n" +
    "  ・'このメッセージをAIで要約して'\n" +
    "  ・'このメッセージを一番下に表示し続ける'\n" +
    "  ・'このメッセージを後で消すね'\n" +
    "  ・'メッセージを埋め込みにする'\n" +
    "  ・'メッセージの文字数を数える'";


    // --- Desktop Icons ---
    const icons = [
        { id: 'intro', name: 'Sophiaの自己紹介.txt', icon: TextIcon, content: selfIntro, options: { adjustHeight: true } },
        { id: 'chat', name: 'チャット機能.txt', icon: TextIcon, content: chatHelp, options: { adjustHeight: true } },
        { id: 'music', name: '音楽コマンド.txt', icon: TextIcon, content: musicHelp, options: {} },
        { id: 'rpg', name: 'RPGのルール.txt', icon: TextIcon, content: rpgHelp, options: {} },
        { id: 'other', name: 'その他機能.txt', icon: TextIcon, content: otherHelp, options: { adjustHeight: true } },
        { id: 'sophia_icon', name: 'sophia_icon.png', icon: SophiaIcon, content: `<img src="${SophiaIcon}" style="width: 100%; height: 100%; object-fit: contain;">`, options: {width: 250, height: 250} }
    ];

    const openWindows: { [key: string]: AppWindow } = {};

    const iconGrid = {
        x: 20,
        y: 20,
        xGap: 100,
        yGap: 110,
        iconsPerRow: Math.floor((window.innerHeight - 60) / 110)
    };
    
    if (window.innerWidth < 768) {
        iconGrid.xGap = 80;
        iconGrid.yGap = 100;
        iconGrid.iconsPerRow = Math.floor((window.innerHeight - 60) / 100);
    }

    icons.forEach((iconData, index) => {
        const onOpen = () => {
            if (openWindows[iconData.id]) {
                openWindows[iconData.id].show();
            } else {
                const newWindow = new AppWindow(iconData.name, iconData.content, iconData.options);
                const pos = getRandomPosition();
                newWindow.getElement().style.top = pos.top;
                newWindow.getElement().style.left = pos.left;
                openWindows[iconData.id] = newWindow;
            }
        };
        
        const icon = new DesktopIcon(iconData.id, iconData.name, iconData.icon, onOpen);
        const element = icon.getElement();
        
        const row = index % iconGrid.iconsPerRow;
        const col = Math.floor(index / iconGrid.iconsPerRow);

        element.style.top = `${iconGrid.y + row * iconGrid.yGap}px`;
        element.style.left = `${iconGrid.x + col * iconGrid.xGap}px`;
    });


    // --- Start Menu ---
    const startMenu = document.createElement('div');
    startMenu.className = 'start-menu';
    app.appendChild(startMenu);

    const addBotButton = document.createElement('button');
    addBotButton.className = 'start-menu-item';
    addBotButton.textContent = 'Botをサーバーに追加';
    addBotButton.addEventListener('click', () => {
        window.open('https://discord.com/oauth2/authorize?client_id=1367449249700253737&permissions=8&integration_type=0&scope=bot+applications.commands', '_blank');
        startMenu.classList.remove('show');
    });
    startMenu.appendChild(addBotButton);

    const separator = document.createElement('div');
    separator.className = 'start-menu-separator';
    startMenu.appendChild(separator);

    const restartButton = document.createElement('button');
    restartButton.className = 'start-menu-item';
    restartButton.textContent = '再起動';
    restartButton.addEventListener('click', () => {
        startMenu.classList.remove('show');
        const shutdownOverlay = document.createElement('div');
        shutdownOverlay.className = 'shutdown-overlay';
        
        const progressBarContainer = document.createElement('div');
        progressBarContainer.className = 'progress-bar-container';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        
        const shutdownText = document.createElement('p');
        shutdownText.textContent = '再起動しています...';

        progressBarContainer.appendChild(progressBar);
        shutdownOverlay.appendChild(shutdownText);
        shutdownOverlay.appendChild(progressBarContainer);
        document.body.appendChild(shutdownOverlay);

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    location.reload();
                }, 500);
            }
            progressBar.style.width = `${progress}%`;
        }, 150);
    });
    startMenu.appendChild(restartButton);

    startButton.addEventListener('click', (e) => {
        e.stopPropagation();
        startMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        startMenu.classList.remove('show');
    });
}