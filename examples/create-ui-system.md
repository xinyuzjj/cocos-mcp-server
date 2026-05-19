# 示例：创建 UI 系统

本示例展示如何使用 Cocos MCP Server 创建一套完整的游戏 UI 系统。

## UI 组件清单

- 主菜单（开始游戏、设置、退出）
- HUD（分数、生命值、暂停按钮）
- 暂停菜单
- 游戏结束界面
- 设置面板

## 步骤

### 1. 创建 UI 管理器脚本

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_script",
    "arguments": {
      "scriptName": "UIManager",
      "template": "ui-manager",
      "content": `
import { _decorator, Component, Node, director, instantiate, Prefab } from 'cc';
const { ccclass, property } = _decorator;

export enum UIType {
    MAIN_MENU = 'MainMenu',
    HUD = 'HUD',
    PAUSE_MENU = 'PauseMenu',
    GAME_OVER = 'GameOver',
    SETTINGS = 'Settings'
}

@ccclass('UIManager')
export class UIManager extends Component {
    public static instance: UIManager = null;
    
    @property([Prefab])
    uiPrefabs: Prefab[] = [];
    
    private uiCache: Map<string, Node> = new Map();
    private currentUI: Node | null = null;
    
    onLoad() {
        if (UIManager.instance === null) {
            UIManager.instance = this;
            director.addPersistRootNode(this.node);
        } else {
            this.destroy();
        }
    }
    
    showUI(uiType: UIType) {
        // 隐藏当前 UI
        if (this.currentUI) {
            this.currentUI.active = false;
        }
        
        // 获取或创建 UI
        let ui = this.uiCache.get(uiType);
        if (!ui) {
            const prefab = this.uiPrefabs.find(p => p.name === uiType);
            if (prefab) {
                ui = instantiate(prefab);
                ui.parent = this.node;
                this.uiCache.set(uiType, ui);
            }
        }
        
        if (ui) {
            ui.active = true;
            this.currentUI = ui;
        }
    }
    
    hideUI(uiType: UIType) {
        const ui = this.uiCache.get(uiType);
        if (ui) {
            ui.active = false;
        }
        if (this.currentUI === ui) {
            this.currentUI = null;
        }
    }
    
    hideAll() {
        this.uiCache.forEach(ui => ui.active = false);
        this.currentUI = null;
    }
}
`
    }
  }
}
```

### 2. 创建主菜单

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_node",
    "arguments": {
      "nodeName": "MainMenu",
      "parent": "Canvas",
      "components": ["Widget"],
      "properties": {
        "Widget": {
          "isAlignTop": true,
          "isAlignBottom": true,
          "isAlignLeft": true,
          "isAlignRight": true,
          "top": 0,
          "bottom": 0,
          "left": 0,
          "right": 0
        }
      }
    }
  }
}
```

### 3. 添加背景

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_node",
    "arguments": {
      "nodeName": "Background",
      "parent": "MainMenu",
      "components": ["Sprite", "Widget"],
      "properties": {
        "Widget": {
          "isAlignTop": true,
          "isAlignBottom": true,
          "isAlignLeft": true,
          "isAlignRight": true
        }
      }
    }
  }
}
```

### 4. 添加标题

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_node",
    "arguments": {
      "nodeName": "Title",
      "parent": "MainMenu",
      "components": ["Label"],
      "properties": {
        "Label": {
          "string": "我的游戏",
          "fontSize": 72,
          "color": { "r": 255, "g": 255, "b": 255 }
        }
      },
      "position": { "x": 0, "y": 200 }
    }
  }
}
```

### 5. 创建开始按钮

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_node",
    "arguments": {
      "nodeName": "StartButton",
      "parent": "MainMenu",
      "components": ["Button", "Sprite", "Widget"],
      "properties": {
        "Widget": {
          "isAlignHorizontalCenter": true,
          "horizontalCenter": 0
        }
      },
      "position": { "x": 0, "y": 50 }
    }
  }
}
```

### 6. 添加按钮文字

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_node",
    "arguments": {
      "nodeName": "StartButtonLabel",
      "parent": "StartButton",
      "components": ["Label"],
      "properties": {
        "Label": {
          "string": "开始游戏",
          "fontSize": 36
        }
      }
    }
  }
}
```

### 7. 创建设置按钮

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_node",
    "arguments": {
      "nodeName": "SettingsButton",
      "parent": "MainMenu",
      "components": ["Button", "Sprite"],
      "position": { "x": 0, "y": -50 }
    }
  }
}
```

### 8. 创建设置按钮文字

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_node",
    "arguments": {
      "nodeName": "SettingsButtonLabel",
      "parent": "SettingsButton",
      "components": ["Label"],
      "properties": {
        "Label": {
          "string": "设置",
          "fontSize": 36
        }
      }
    }
  }
}
```

### 9. 创建退出按钮

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_node",
    "arguments": {
      "nodeName": "ExitButton",
      "parent": "MainMenu",
      "components": ["Button", "Sprite"],
      "position": { "x": 0, "y": -150 }
    }
  }
}
```

### 10. 创建按钮脚本

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_script",
    "arguments": {
      "scriptName": "MainMenuController",
      "content": `
import { _decorator, Component, Button, director } from 'cc';
import { UIManager, UIType } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('MainMenuController')
export class MainMenuController extends Component {
    @property(Button)
    startButton: Button | null = null;
    
    @property(Button)
    settingsButton: Button | null = null;
    
    @property(Button)
    exitButton: Button | null = null;
    
    onLoad() {
        if (this.startButton) {
            this.startButton.node.on(Button.EventType.CLICK, this.onStartGame, this);
        }
        if (this.settingsButton) {
            this.settingsButton.node.on(Button.EventType.CLICK, this.onSettings, this);
        }
        if (this.exitButton) {
            this.exitButton.node.on(Button.EventType.CLICK, this.onExit, this);
        }
    }
    
    onStartGame() {
        director.loadScene('GameScene');
    }
    
    onSettings() {
        UIManager.instance.showUI(UIType.SETTINGS);
    }
    
    onExit() {
        // 退出游戏
        if (typeof window !== 'undefined' && window.close) {
            window.close();
        }
    }
}
`
    }
  }
}
```

### 11. 挂载主菜单脚本

```json
{
  "method": "tools/call",
  "params": {
    "name": "attach_script",
    "arguments": {
      "nodeName": "MainMenu",
      "scriptName": "MainMenuController"
    }
  }
}
```

### 12. 创建 HUD 界面

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_game_ui",
    "arguments": {
      "uiElements": [
        {
          "type": "score",
          "name": "ScoreLabel",
          "position": { "x": -300, "y": 220 },
          "properties": {
            "fontSize": 32,
            "color": { "r": 255, "g": 255, "b": 255 }
          }
        },
        {
          "type": "lives",
          "name": "LivesContainer",
          "position": { "x": 250, "y": 220 }
        },
        {
          "type": "pauseButton",
          "name": "PauseButton",
          "position": { "x": 350, "y": 220 }
        }
      ]
    }
  }
}
```

### 13. 创建暂停菜单

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_node",
    "arguments": {
      "nodeName": "PauseMenu",
      "parent": "Canvas",
      "components": ["Widget"],
      "properties": {
        "Widget": {
          "isAlignTop": true,
          "isAlignBottom": true,
          "isAlignLeft": true,
          "isAlignRight": true
        }
      },
      "active": false
    }
  }
}
```

### 14. 添加暂停菜单背景

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_node",
    "arguments": {
      "nodeName": "PauseBackground",
      "parent": "PauseMenu",
      "components": ["Sprite"],
      "properties": {
        "Sprite": {
          "color": { "r": 0, "g": 0, "b": 0, "a": 180 }
        }
      }
    }
  }
}
```

### 15. 创建暂停菜单脚本

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_script",
    "arguments": {
      "scriptName": "PauseMenuController",
      "content": `
import { _decorator, Component, Button, director, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PauseMenuController')
export class PauseMenuController extends Component {
    @property(Button)
    resumeButton: Button | null = null;
    
    @property(Button)
    restartButton: Button | null = null;
    
    @property(Button)
    mainMenuButton: Button | null = null;
    
    onLoad() {
        if (this.resumeButton) {
            this.resumeButton.node.on(Button.EventType.CLICK, this.onResume, this);
        }
        if (this.restartButton) {
            this.restartButton.node.on(Button.EventType.CLICK, this.onRestart, this);
        }
        if (this.mainMenuButton) {
            this.mainMenuButton.node.on(Button.EventType.CLICK, this.onMainMenu, this);
        }
    }
    
    onEnable() {
        game.pause();
    }
    
    onDisable() {
        game.resume();
    }
    
    onResume() {
        this.node.active = false;
    }
    
    onRestart() {
        this.node.active = false;
        director.loadScene(director.getScene().name);
    }
    
    onMainMenu() {
        this.node.active = false;
        director.loadScene('MainMenu');
    }
}
`
    }
  }
}
```

### 16. 创建游戏结束界面

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_node",
    "arguments": {
      "nodeName": "GameOverPanel",
      "parent": "Canvas",
      "components": ["Widget"],
      "properties": {
        "Widget": {
          "isAlignTop": true,
          "isAlignBottom": true,
          "isAlignLeft": true,
          "isAlignRight": true
        }
      },
      "active": false
    }
  }
}
```

### 17. 添加游戏结束标题

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_node",
    "arguments": {
      "nodeName": "GameOverTitle",
      "parent": "GameOverPanel",
      "components": ["Label"],
      "properties": {
        "Label": {
          "string": "游戏结束",
          "fontSize": 64,
          "color": { "r": 255, "g": 0, "b": 0 }
        }
      },
      "position": { "x": 0, "y": 100 }
    }
  }
}
```

### 18. 添加最终分数显示

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_node",
    "arguments": {
      "nodeName": "FinalScore",
      "parent": "GameOverPanel",
      "components": ["Label"],
      "properties": {
        "Label": {
          "string": "最终得分: 0",
          "fontSize": 36
        }
      },
      "position": { "x": 0, "y": 0 }
    }
  }
}
```

### 19. 创建游戏结束脚本

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_script",
    "arguments": {
      "scriptName": "GameOverController",
      "content": `
import { _decorator, Component, Button, Label, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverController')
export class GameOverController extends Component {
    @property(Label)
    finalScoreLabel: Label | null = null;
    
    @property(Button)
    restartButton: Button | null = null;
    
    @property(Button)
    mainMenuButton: Button | null = null;
    
    onLoad() {
        if (this.restartButton) {
            this.restartButton.node.on(Button.EventType.CLICK, this.onRestart, this);
        }
        if (this.mainMenuButton) {
            this.mainMenuButton.node.on(Button.EventType.CLICK, this.onMainMenu, this);
        }
    }
    
    show(finalScore: number) {
        if (this.finalScoreLabel) {
            this.finalScoreLabel.string = \`最终得分: \${finalScore}\`;
        }
        this.node.active = true;
    }
    
    onRestart() {
        this.node.active = false;
        director.loadScene(director.getScene().name);
    }
    
    onMainMenu() {
        this.node.active = false;
        director.loadScene('MainMenu');
    }
}
`
    }
  }
}
```

### 20. 保存场景

```json
{
  "method": "tools/call",
  "params": {
    "name": "save_scene",
    "arguments": {
      "sceneName": "MainMenu"
    }
  }
}
```

## 使用示例

### 在游戏中显示 HUD

```typescript
import { UIManager, UIType } from './UIManager';

// 在游戏开始时显示 HUD
UIManager.instance.showUI(UIType.HUD);
```

### 暂停游戏

```typescript
import { UIManager, UIType } from './UIManager';

// 当点击暂停按钮时
UIManager.instance.showUI(UIType.PAUSE_MENU);
```

### 显示游戏结束

```typescript
import { _decorator, Component } from 'cc';
import { GameOverController } from './GameOverController';

@ccclass('GameManager')
export class GameManager extends Component {
    @property(GameOverController)
    gameOverPanel: GameOverController | null = null;
    
    gameOver(finalScore: number) {
        if (this.gameOverPanel) {
            this.gameOverPanel.show(finalScore);
        }
    }
}
```

## 最佳实践

1. **使用对象池**：频繁显示/隐藏的 UI 可以使用对象池优化性能
2. **分层管理**：将 UI 按层级管理（背景层、主界面层、弹窗层、提示层）
3. **适配不同分辨率**：使用 Widget 组件确保 UI 在不同分辨率下正常显示
4. **动画过渡**：为 UI 切换添加动画效果，提升用户体验
