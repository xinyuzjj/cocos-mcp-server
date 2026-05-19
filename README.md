# Cocos MCP Server

[![npm version](https://img.shields.io/npm/v/cocos-mcp-server.svg)](https://www.npmjs.com/package/cocos-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Cocos Creator AI MCP Server - 让 AI 辅助开发 Cocos Creator 项目

## 安装

### 全局安装（推荐）

```bash
npm install -g cocos-mcp-server
```

### 本地安装

```bash
npm install cocos-mcp-server
```

## 快速开始

### 1. 启动 MCP 服务器

```bash
# 全局安装后
cocos-mcp

# 或本地安装后
npx cocos-mcp
```

服务器将在 `http://localhost:3000` 启动。

### 2. 配置 AI 客户端

**Claude Desktop 配置** (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "cocos-creator": {
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

### 3. 开始使用

在 Claude 中直接询问：

```
帮我创建一个平台跳跃游戏场景
```

或调用具体工具：

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_game_project",
    "arguments": {
      "projectName": "MyGame",
      "gameType": "platformer",
      "features": ["physics", "animation", "sound"]
    }
  }
}
```

## 功能特点

🚀 **8大类工具，78个核心功能**：

| 分类 | 工具数量 | 描述 |
|------|---------|------|
| 🎮 场景操作 | 11 | 场景管理、节点操作、属性设置 |
| 💻 代码操作 | 5 | 脚本创建、编辑、挂载 |
| 📦 资源操作 | 4 | 资源导入、管理 |
| 🏗️ 预制体操作 | 3 | 预制体创建、实例化 |
| ⚙️ 组件操作 | 4 | 组件添加、配置 |
| 🔍 调试操作 | 2 | 日志查看、控制台管理 |
| 🚀 项目操作 | 2 | 项目运行、构建 |
| 🎲 游戏开发 | 47 | 游戏对象、系统创建 |

**总计：78 个工具**

### 🎮 场景操作 (11个工具)
- `get_current_scene` - 获取当前场景信息
- `list_scenes` - 列出项目中的所有场景
- `open_scene` - 打开指定场景
- `save_scene` - 保存当前场景
- `create_node` - 创建新节点
- `delete_node` - 删除节点
- `find_nodes` - 搜索节点
- `get_node` - 获取节点详情
- `set_node_property` - 设置节点属性
- `move_node` - 移动节点位置

### 💻 代码操作 (5个工具)
- `create_script` - 创建新脚本文件
- `attach_script` - 挂载脚本到节点
- `edit_script` - 编辑脚本内容
- `get_script` - 获取脚本内容
- `list_scripts` - 列出所有脚本

### 📦 资源操作 (4个工具)
- `list_assets` - 列出资源文件
- `import_assets` - 导入外部资源
- `delete_asset` - 删除资源
- `get_asset_info` - 获取资源信息

### 🏗️ 预制体操作 (3个工具)
- `create_prefab` - 从节点创建预制体
- `instantiate_prefab` - 实例化预制体
- `delete_prefab` - 删除预制体

### ⚙️ 组件操作 (4个工具)
- `add_component` - 添加组件到节点
- `remove_component` - 移除组件
- `get_components` - 获取组件列表
- `set_component_property` - 设置组件属性

### 🔍 调试操作 (2个工具)
- `get_console_logs` - 获取控制台日志
- `clear_console` - 清空控制台

### 🚀 项目操作 (2个工具)
- `run_project` - 运行项目
- `build_project` - 构建项目

### 🎲 游戏开发 (47个工具)
- `create_game_project` - 创建完整的游戏项目模板
- `init_game_scene` - 初始化游戏主场景
- `create_game_objects` - 创建游戏对象和系统
- `create_player` - 创建玩家角色
- `create_enemy` - 创建敌人
- `create_game_manager` - 创建游戏管理器脚本
- `create_score_system` - 创建计分系统
- `create_level_system` - 创建关卡系统
- `create_game_ui` - 创建游戏 UI 系统
- `setup_camera` - 设置摄像机系统
- `create_animation_controller` - 创建动画控制器
- `setup_animation_events` - 设置动画事件
- `create_particle_system` - 创建粒子系统
- `setup_effects` - 设置特效系统
- `setup_physics` - 设置物理系统
- `setup_collision` - 设置碰撞系统
- `setup_audio` - 设置音频系统
- `create_audio_manager` - 创建音频管理器
- `setup_game_config` - 设置游戏配置
- `export_game_config` - 导出游戏配置
- `check_project` - 检查项目完整性
- `build_and_test` - 构建和测试项目

## 使用示例

查看 [examples/](./examples/) 目录获取更多详细示例：

- [创建平台跳跃游戏](./examples/create-platformer-game.md) - 完整的游戏开发示例
- [创建 UI 系统](./examples/create-ui-system.md) - UI 界面开发示例

### 快速调用示例

```json
{
  "method": "tools/call",
  "params": {
    "name": "create_game_project",
    "arguments": {
      "projectName": "MyPlatformerGame",
      "gameType": "platformer",
      "features": ["ui", "physics", "animation", "sound"]
    }
  }
}
```

## 项目结构

```
cocos-mcp-server/
├── src/                     # 源代码
│   ├── main.ts              # 入口文件
│   ├── http-server.ts       # HTTP 服务
│   ├── mcp-server.ts        # MCP 服务器
│   ├── types.ts             # 类型定义
│   └── tools/               # 工具实现
│       ├── scene-tools.ts   # 场景操作工具
│       ├── code-tools.ts    # 代码操作工具
│       ├── asset-tools.ts   # 资源操作工具
│       ├── prefab-tools.ts  # 预制体操作工具
│       ├── component-tools.ts # 组件操作工具
│       ├── debug-tools.ts   # 调试操作工具
│       ├── project-tools.ts # 项目操作工具
│       └── game-tools.ts    # 游戏开发工具
├── dist/                    # 构建输出
├── examples/                # 使用示例
│   ├── README.md
│   ├── create-platformer-game.md
│   └── create-ui-system.md
├── .github/workflows/       # GitHub Actions
│   └── release.yml
├── package.json
├── tsconfig.json
├── CHANGELOG.md
├── README.md
└── README_EN.md
```

## 开发指南

### 添加新工具

1. 在 `src/tools/` 中创建新的工具文件
2. 导出 `registerXxxTools()` 函数返回 `Tool` 数组
3. 在 `mcp-server.ts` 中注册工具到服务器
4. 实现工具的处理方法

## 相关链接

- [English README](./README_EN.md)
- [使用示例](./examples/)
- [更新日志](./CHANGELOG.md)
- [问题反馈](https://github.com/xinyuzjj/cocos-mcp-server/issues)
- [项目主页](https://github.com/xinyuzjj/cocos-mcp-server#readme)

## 许可证

MIT License