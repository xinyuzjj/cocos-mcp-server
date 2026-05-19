# Cocos MCP Server 使用示例

本目录包含使用 Cocos MCP Server 的各种示例。

## 示例列表

### 1. [创建平台跳跃游戏](./create-platformer-game.md)

展示如何创建一个完整的平台跳跃游戏，包括：
- 玩家角色控制（移动、跳跃）
- 物理系统（重力、碰撞）
- 敌人 AI
- 计分系统
- 关卡设计
- 音效系统

**难度**：中级  
**预计时间**：30-45 分钟

### 2. [创建 UI 系统](./create-ui-system.md)

展示如何创建一套完整的游戏 UI 系统，包括：
- 主菜单
- HUD（分数、生命值）
- 暂停菜单
- 游戏结束界面
- 设置面板

**难度**：初级  
**预计时间**：20-30 分钟

## 快速开始

### 安装

```bash
npm install -g cocos-mcp-server
```

### 启动 MCP 服务器

```bash
cocos-mcp
```

### 配置 AI 客户端

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

## 工具分类

Cocos MCP Server 提供 8 大类共 78 个工具：

| 分类 | 工具数量 | 描述 |
|------|---------|------|
| 场景操作 | 11 | 场景创建、节点管理、属性设置 |
| 代码操作 | 5 | 脚本创建、编辑、挂载 |
| 资源操作 | 4 | 资源导入、管理 |
| 预制体操作 | 3 | 预制体创建、实例化 |
| 组件操作 | 4 | 组件添加、配置 |
| 调试操作 | 2 | 日志查看、控制台管理 |
| 项目操作 | 2 | 项目运行、构建 |
| 游戏开发 | 47 | 游戏对象、系统创建 |

## 更多资源

- [项目主页](https://github.com/xinyuzjj/cocos-mcp-server)
- [English README](../README_EN.md)
- [中文 README](../README.md)
- [更新日志](../CHANGELOG.md)

## 贡献示例

欢迎提交更多示例！请遵循以下格式：

1. 创建新的 `.md` 文件
2. 包含完整的步骤说明
3. 提供可运行的代码示例
4. 说明预期结果

## 常见问题

### Q: 如何查看所有可用工具？

A: 连接到 MCP 服务器后，AI 客户端会自动获取工具列表。

### Q: 示例代码可以直接运行吗？

A: 示例中的 JSON 是 MCP 工具调用格式，需要通过 AI 客户端发送。TypeScript 代码需要放在 Cocos Creator 项目中运行。

### Q: 如何调试工具调用？

A: 使用 `get_console_logs` 工具查看 Cocos Creator 控制台输出。

### Q: 支持哪些 Cocos Creator 版本？

A: 支持 Cocos Creator 3.x 版本。
