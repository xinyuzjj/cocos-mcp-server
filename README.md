# Cocos MCP Server 🏝️

[English](./README_EN.md) | [中文](./README.md)

一款专为 Cocos Creator 打造的 MCP（Model Context Protocol）服务器插件，让 AI 能够通过标准化协议与 Cocos Creator 编辑器进行交互，辅助你开发游戏。

## ✨ 特性

- 🤖 **AI 驱动开发** - AI 可自动创建场景、节点、组件、脚本
- 📝 **智能代码生成** - 自动生成 TypeScript 组件代码并挂载到节点
- 🎮 **完整场景控制** - 场景/节点/组件/预制体全面操作
- 📁 **资源管理** - 导入、删除、查询游戏资源
- 🔌 **标准化协议** - 基于 MCP 协议，兼容各种 AI 客户端

## 🚀 快速开始

### 1. 安装

将整个项目复制到你的 Cocos Creator 扩展目录：

```
你的Cocos项目/
├── assets/
├── extensions/
│   └── cocos-mcp-server/    ← 放这里
├── settings/
└── ...
```

### 2. 构建

```bash
cd extensions/cocos-mcp-server
npm install
npm run build
```

### 3. 启动

1. 重启 Cocos Creator
2. 点击菜单：`扩展` → `Cocos MCP Server` → `启动服务器`
3. 服务器将在 `http://localhost:3000/mcp` 运行

### 4. 配置 AI 客户端

**Claude CLI:**
```bash
claude mcp add --transport http cocos-creator http://127.0.0.1:3000/mcp
```

**Cursor / VS Code:**
```json
{
  "mcpServers": {
    "cocos-creator": {
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

## 📖 工具列表

### 🎯 场景/节点操作 (12 个工具)

| 工具 | 描述 |
|------|------|
| `get_current_scene` | 获取当前场景信息 |
| `list_scenes` | 列出所有场景 |
| `open_scene` | 打开指定场景 |
| `save_scene` | 保存场景 |
| `create_node` | 创建节点 |
| `delete_node` | 删除节点 |
| `find_nodes` | 查找节点 |
| `get_node` | 获取节点详情 |
| `set_node_property` | 设置节点属性 |
| `move_node` | 移动节点 |
| `clone_node` | 克隆节点 |
| `add_component` | 添加组件 |

### 💻 代码生成工具 (15 个工具)

| 工具 | 描述 |
|------|------|
| `create_script` | 创建脚本文件 |
| `generate_component` | AI 生成组件代码 |
| `generate_ui_component` | 生成 UI 组件 |
| `attach_script` | 挂载脚本到节点 |
| `detach_script` | 移除节点脚本 |
| `edit_script` | 编辑脚本 |
| `append_to_script` | 追加代码 |
| `replace_in_script` | 替换代码 |
| `get_script` | 读取脚本内容 |
| `list_scripts` | 列出所有脚本 |
| `find_script` | 搜索脚本 |
| `fix_script_errors` | 自动修复脚本错误 |
| `run_project` | 运行项目 |
| `build_project` | 构建项目 |

### 📁 资源管理工具 (4 个工具)

| 工具 | 描述 |
|------|------|
| `list_assets` | 列出资源 |
| `import_assets` | 导入资源 |
| `delete_asset` | 删除资源 |
| `get_asset_info` | 获取资源信息 |

## 💡 使用示例

### 创建场景并添加节点

```json
{
  "tool": "create_node",
  "arguments": {
    "name": "Player",
    "nodeType": "Sprite",
    "position": { "x": 0, "y": 0 }
  }
}
```

### AI 自动生成组件

```json
{
  "tool": "generate_component",
  "arguments": {
    "componentName": "PlayerController",
    "properties": [
      { "name": "speed", "type": "number", "default": 100 },
      { "name": "jumpForce", "type": "number", "default": 300 }
    ],
    "methods": [
      { "name": "jump", "body": "this.node.setPosition(0, this.jumpForce)" }
    ]
  }
}
```

### 挂载脚本到节点

```json
{
  "tool": "attach_script",
  "arguments": {
    "nodeUuid": "节点UUID",
    "scriptName": "PlayerController"
  }
}
```

## 🛠️ 开发

### 项目结构

```
cocos-mcp-server/
├── src/
│   ├── main.ts           # 插件入口
│   ├── mcp-server.ts     # MCP 服务器核心
│   ├── http-server.ts    # HTTP 服务
│   ├── types.ts          # 类型定义
│   └── tools/
│       ├── scene-tools.ts    # 场景工具
│       ├── code-tools.ts     # 代码工具
│       └── asset-tools.ts    # 资源工具
├── package.json
└── tsconfig.json
```

### 添加新工具

1. 在 `src/tools/` 中创建新工具文件
2. 实现 `registerXxxTools()` 函数
3. 在 `mcp-server.ts` 中注册工具

## 📋 版本要求

- Cocos Creator 3.8.0+

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License