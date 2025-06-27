import './style.css';
import { AppWindow } from './components/AppWindow';
import SophiaIcon from './assets/33_20250508203520.webp';

const app = document.getElementById('app');

if (app) {
    // Create Desktop
    const desktop = document.createElement('div');
    desktop.className = 'desktop';
    app.appendChild(desktop);

    // Create Desktop Title
    const desktopTitle = document.createElement('h1');
    desktopTitle.className = 'desktop-title';
    desktopTitle.textContent = 'Sophia.exe';
    desktop.appendChild(desktopTitle);

    // Create Taskbar
    const taskbar = document.createElement('div');
    taskbar.className = 'taskbar';
    app.appendChild(taskbar);

    // Create Start Button
    const startButton = document.createElement('button');
    startButton.className = 'start-button';
    startButton.textContent = 'スタート';
    taskbar.appendChild(startButton);

    const taskbarApps = document.createElement('div');
    taskbarApps.className = 'taskbar-apps';
    taskbar.appendChild(taskbarApps);

    // Create Clock
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
    const getRandomPosition = (area: 'left' | 'right' | 'center') => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight - 40; // Exclude taskbar
        let x = 0, y = 0;

        switch(area) {
            case 'left':
                x = 50 + Math.random() * (screenWidth * 0.2);
                y = 50 + Math.random() * (screenHeight * 0.5);
                break;
            case 'right':
                x = (screenWidth * 0.5) + Math.random() * (screenWidth * 0.3);
                y = 50 + Math.random() * (screenHeight * 0.6);
                break;
            case 'center':
            default:
                x = (screenWidth * 0.2) + Math.random() * (screenWidth * 0.4);
                y = (screenHeight * 0.1) + Math.random() * (screenHeight * 0.5);
                break;
        }
        return { top: `${y}px`, left: `${x}px` };
    };


    // --- Feature Windows ---
    const selfIntro = `
やっほー！私の名前はソフィア！
マスターのPCに住んでるアシスタントAIだよ。

音楽を聴いたり、おしゃべりしたり、
簡単なゲームで遊んだりするのが大好き！
    `;
    const introWindow = new AppWindow('Sophiaの自己紹介.txt', selfIntro, { adjustHeight: true });
    const introPos = getRandomPosition('left');
    introWindow.getElement().style.top = introPos.top;
    introWindow.getElement().style.left = introPos.left;


    const chatHelp = `
ねえねえ、マスター！私とおしゃべりしよっ！

  **私とおしゃべり**
  ・私にメンション（@Sophia BOT）したり、
    「ソフィア」って呼んでくれたらお返事するよ！

  ・画像と一緒に話しかけてくれたら、
    その画像についてもお話しちゃう！
    `;
    const chatWindow = new AppWindow('チャット機能.txt', chatHelp, { adjustHeight: true });
    const chatPos = getRandomPosition('center');
    chatWindow.getElement().style.top = chatPos.top;
    chatWindow.getElement().style.left = chatPos.left;


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
    const musicWindow = new AppWindow('音楽コマンド.txt', musicHelp);
    const musicPos = getRandomPosition('right');
    musicWindow.getElement().style.top = musicPos.top;
    musicWindow.getElement().style.left = musicPos.left;

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
    const rpgWindow = new AppWindow('RPGのルール.txt', rpgHelp);
    const rpgPos = getRandomPosition('center');
    rpgWindow.getElement().style.top = rpgPos.top;
    rpgWindow.getElement().style.left = rpgPos.left;


    const otherHelp = `
メッセージを右クリックすると、こんなこともできるよ！

  ・\`このメッセージをAIで要約して\`
  ・\`このメッセージを一番下に表示し続ける\`
  ・\`このメッセージを後で消すね\`
  ・\`メッセージを埋め込みにする\`
  ・\`メッセージの文字数を数える\`
    `;
    const otherWindow = new AppWindow('その他機能.txt', otherHelp, { adjustHeight: true });
    const otherPos = getRandomPosition('left');
    otherWindow.getElement().style.top = otherPos.top;
    otherWindow.getElement().style.left = otherPos.left;
    
    // --- Icon Viewer ---
    const iconWindow = new AppWindow('sophia_icon.png', '');
    const iconElement = iconWindow.getElement();
    const iconContent = iconElement.querySelector('.content-area');
    if (iconContent) {
        iconContent.innerHTML = `<img src="${SophiaIcon}" style="width: 100%; height: 100%; object-fit: contain;">`;
        iconElement.style.width = '250px';
        iconElement.style.height = '250px';
        const iconPos = getRandomPosition('right');
        iconElement.style.top = iconPos.top;
        iconElement.style.left = iconPos.left;
    }


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