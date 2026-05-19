# 示例：创建平台跳跃游戏

本示例展示如何使用 Cocos MCP Server 创建一个完整的平台跳跃游戏。

## 游戏特性

- 玩家角色控制（左右移动、跳跃）
- 物理系统（重力、碰撞检测）
- 敌人 AI
- 计分系统
- 关卡系统
- 音效和背景音乐

## 步骤

### 1. 创建游戏项目

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_game_project",
    "arguments": {
      "projectName": "PlatformerGame",
      "gameType": "platformer",
      "features": ["physics", "animation", "sound", "ui"]
    }
  }
}
```

### 2. 初始化游戏场景

```json
{
  "method": "tools/call",
  "params": {
    "name": "init_game_scene",
    "arguments": {
      "sceneName": "Level1",
      "setupCamera": true,
      "setupPhysics": true
    }
  }
}
```

### 3. 创建玩家角色

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_player",
    "arguments": {
      "playerName": "Player",
      "hasAnimation": true,
      "hasPhysics": true,
      "startPosition": { "x": 0, "y": 100 }
    }
  }
}
```

### 4. 创建玩家控制脚本

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_script",
    "arguments": {
      "scriptName": "PlayerController",
      "template": "player-controller",
      "content": `
import { _decorator, Component, Vec3, input, Input, EventKeyboard, KEYCODE, RigidBody2D, Vec2, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property
    speed: number = 200;
    
    @property
    jumpForce: number = 500;
    
    private rigidBody: RigidBody2D | null = null;
    private animation: Animation | null = null;
    private isGrounded: boolean = false;
    
    start() {
        this.rigidBody = this.getComponent(RigidBody2D);
        this.animation = this.getComponent(Animation);
        
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
    
    onKeyDown(event: EventKeyboard) {
        switch(event.keyCode) {
            case KEYCODE.A:
            case KEYCODE.ARROW_LEFT:
                this.moveLeft();
                break;
            case KEYCODE.D:
            case KEYCODE.ARROW_RIGHT:
                this.moveRight();
                break;
            case KEYCODE.SPACE:
            case KEYCODE.W:
            case KEYCODE.ARROW_UP:
                this.jump();
                break;
        }
    }
    
    onKeyUp(event: EventKeyboard) {
        if (this.rigidBody) {
            this.rigidBody.linearVelocity = new Vec2(0, this.rigidBody.linearVelocity.y);
        }
        if (this.animation) {
            this.animation.play('idle');
        }
    }
    
    moveLeft() {
        if (this.rigidBody) {
            this.rigidBody.linearVelocity = new Vec2(-this.speed, this.rigidBody.linearVelocity.y);
        }
        this.node.setScale(-1, 1, 1);
        if (this.animation) this.animation.play('run');
    }
    
    moveRight() {
        if (this.rigidBody) {
            this.rigidBody.linearVelocity = new Vec2(this.speed, this.rigidBody.linearVelocity.y);
        }
        this.node.setScale(1, 1, 1);
        if (this.animation) this.animation.play('run');
    }
    
    jump() {
        if (this.isGrounded && this.rigidBody) {
            this.rigidBody.applyLinearImpulse(new Vec2(0, this.jumpForce), new Vec2(0, 0), true);
            this.isGrounded = false;
            if (this.animation) this.animation.play('jump');
        }
    }
    
    onBeginContact() {
        this.isGrounded = true;
    }
}
`
    }
  }
}
```

### 5. 挂载玩家控制脚本

```json
{
  "method": "tools/call",
  "params": {
    "name": "attach_script",
    "arguments": {
      "nodeName": "Player",
      "scriptName": "PlayerController"
    }
  }
}
```

### 6. 创建平台

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_game_objects",
    "arguments": {
      "objects": [
        {
          "type": "platform",
          "name": "Ground",
          "position": { "x": 0, "y": -200 },
          "size": { "width": 800, "height": 40 }
        },
        {
          "type": "platform",
          "name": "Platform1",
          "position": { "x": -200, "y": -50 },
          "size": { "width": 150, "height": 20 }
        },
        {
          "type": "platform",
          "name": "Platform2",
          "position": { "x": 200, "y": 50 },
          "size": { "width": 150, "height": 20 }
        },
        {
          "type": "platform",
          "name": "Platform3",
          "position": { "x": 0, "y": 150 },
          "size": { "width": 100, "height": 20 }
        }
      ]
    }
  }
}
```

### 7. 创建敌人

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_enemy",
    "arguments": {
      "enemyName": "Enemy1",
      "enemyType": "patrol",
      "position": { "x": 150, "y": -150 },
      "patrolRange": { "min": 100, "max": 250 }
    }
  }
}
```

### 8. 创建游戏管理器

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_game_manager",
    "arguments": {
      "managerName": "GameManager",
      "features": ["score", "lives", "gameState"]
    }
  }
}
```

### 9. 创建计分系统

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_score_system",
    "arguments": {
      "scoreName": "ScoreManager",
      "scoreEvents": ["enemyKill", "coinCollect", "levelComplete"]
    }
  }
}
```

### 10. 创建游戏 UI

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_game_ui",
    "arguments": {
      "uiElements": [
        { "type": "score", "position": { "x": -300, "y": 200 } },
        { "type": "lives", "position": { "x": 200, "y": 200 } },
        { "type": "pauseButton", "position": { "x": 350, "y": 200 } }
      ]
    }
  }
}
```

### 11. 设置摄像机跟随

```json
{
  "method": "tools/call",
  "params": {
    "name": "setup_camera",
    "arguments": {
      "cameraType": "follow",
      "target": "Player",
      "smoothness": 0.1,
      "bounds": { "minX": -400, "maxX": 400, "minY": -300, "maxY": 300 }
    }
  }
}
```

### 12. 设置音效

```json
{
  "method": "tools/call",
  "params": {
    "name": "setup_audio",
    "arguments": {
      "audioType": "2d",
      "sounds": [
        { "name": "jump", "event": "playerJump" },
        { "name": "coin", "event": "coinCollect" },
        { "name": "enemyHit", "event": "enemyKill" },
        { "name": "bgm", "type": "music", "loop": true }
      ]
    }
  }
}
```

### 13. 构建并测试

```json
{
  "method": "tools/call",
  "params": {
    "name": "build_and_test",
    "arguments": {
      "platform": "web-desktop",
      "debug": true
    }
  }
}
```

## 完整脚本示例

### PlayerController.ts

```typescript
import { _decorator, Component, Vec3, input, Input, EventKeyboard, 
         KEYCODE, RigidBody2D, Vec2, Animation, Collider2D, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property
    speed: number = 200;
    
    @property
    jumpForce: number = 500;
    
    private rigidBody: RigidBody2D | null = null;
    private animation: Animation | null = null;
    private isGrounded: boolean = false;
    
    start() {
        this.rigidBody = this.getComponent(RigidBody2D);
        this.animation = this.getComponent(Animation);
        
        // 输入监听
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        
        // 碰撞监听
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    
    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
    
    onKeyDown(event: EventKeyboard) {
        switch(event.keyCode) {
            case KEYCODE.A:
            case KEYCODE.ARROW_LEFT:
                this.moveLeft();
                break;
            case KEYCODE.D:
            case KEYCODE.ARROW_RIGHT:
                this.moveRight();
                break;
            case KEYCODE.SPACE:
            case KEYCODE.W:
            case KEYCODE.ARROW_UP:
                this.jump();
                break;
        }
    }
    
    onKeyUp(event: EventKeyboard) {
        if (event.keyCode === KEYCODE.A || event.keyCode === KEYCODE.D ||
            event.keyCode === KEYCODE.ARROW_LEFT || event.keyCode === KEYCODE.ARROW_RIGHT) {
            if (this.rigidBody) {
                this.rigidBody.linearVelocity = new Vec2(0, this.rigidBody.linearVelocity.y);
            }
            if (this.animation) {
                this.animation.play('idle');
            }
        }
    }
    
    moveLeft() {
        if (this.rigidBody) {
            this.rigidBody.linearVelocity = new Vec2(-this.speed, this.rigidBody.linearVelocity.y);
        }
        this.node.setScale(-1, 1, 1);
        if (this.animation) this.animation.play('run');
    }
    
    moveRight() {
        if (this.rigidBody) {
            this.rigidBody.linearVelocity = new Vec2(this.speed, this.rigidBody.linearVelocity.y);
        }
        this.node.setScale(1, 1, 1);
        if (this.animation) this.animation.play('run');
    }
    
    jump() {
        if (this.isGrounded && this.rigidBody) {
            this.rigidBody.applyLinearImpulse(new Vec2(0, this.jumpForce), new Vec2(0, 0), true);
            this.isGrounded = false;
            if (this.animation) this.animation.play('jump');
        }
    }
    
    onBeginContact() {
        this.isGrounded = true;
        if (this.animation && this.animation.name !== 'run') {
            this.animation.play('idle');
        }
    }
}
```

### GameManager.ts

```typescript
import { _decorator, Component, director, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    public static instance: GameManager = null;
    
    @property(Label)
    scoreLabel: Label | null = null;
    
    @property(Label)
    livesLabel: Label | null = null;
    
    private _score: number = 0;
    private _lives: number = 3;
    private _isGameOver: boolean = false;
    
    get score(): number { return this._score; }
    get lives(): number { return this._lives; }
    get isGameOver(): boolean { return this._isGameOver; }
    
    onLoad() {
        if (GameManager.instance === null) {
            GameManager.instance = this;
            director.addPersistRootNode(this.node);
        } else {
            this.destroy();
        }
    }
    
    addScore(points: number) {
        this._score += points;
        this.updateUI();
    }
    
    loseLife() {
        this._lives--;
        this.updateUI();
        
        if (this._lives <= 0) {
            this.gameOver();
        }
    }
    
    updateUI() {
        if (this.scoreLabel) {
            this.scoreLabel.string = `Score: ${this._score}`;
        }
        if (this.livesLabel) {
            this.livesLabel.string = `Lives: ${this._lives}`;
        }
    }
    
    gameOver() {
        this._isGameOver = true;
        director.pause();
        // 显示游戏结束 UI
    }
    
    restart() {
        this._score = 0;
        this._lives = 3;
        this._isGameOver = false;
        director.resume();
        director.loadScene(director.getScene().name);
    }
}
```

## 运行游戏

```json
{
  "method": "tools/call",
  "params": {
    "name": "run_project",
    "arguments": {}
  }
}
```

## 扩展建议

1. **添加更多关卡**：使用 `create_level_system` 工具创建多关卡游戏
2. **添加道具系统**：创建金币、加速道具等
3. **添加存档功能**：使用 `export_game_config` 保存游戏进度
4. **优化性能**：使用对象池管理敌人和道具
