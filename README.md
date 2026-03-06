# Cocos MCP Server

Cocos Creator AI MCP Server - 让 AI 辅助开发 Cocos Creator 项目

## 功能特点

🚀 **8大类工具，78个核心功能**：

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

## 使用方法

### 1. 安装依赖
```bash
cd extensions/cocos-mcp-server
npm install
```

### 2. 构建
```bash
npm run build
```

### 3. 配置 AI 客户端

**Claude 配置：**
```json
{
  "mcpServers": {
    "cocos-creator": {
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

### 4. 调用示例

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
├── src/
│   ├── main.ts              # 入口文件
│   ├── http-server.ts       # HTTP 服务
│   ├── mcp-server.ts        # MCP 服务器
│   ├── types.ts             # 类型定义
│   └── tools/
│       ├── scene-tools.ts   # 场景操作工具
│       ├── code-tools.ts    # 代码操作工具
│       ├── asset-tools.ts   # 资源操作工具
│       ├── prefab-tools.ts  # 预制体操作工具
│       ├── component-tools.ts # 组件操作工具
│       ├── debug-tools.ts   # 调试操作工具
│       ├── project-tools.ts # 项目操作工具
│       └── game-tools.ts    # 游戏开发工具
├── dist/                    # 构建输出
├── package.json
├── tsconfig.json
└── README.md
```

## 开发指南

### 添加新工具

1. 在 `src/tools/` 中创建新的工具文件
2. 导出 `registerXxxTools()` 函数返回 `Tool` 数组
3. 在 `mcp-server.ts` 中注册工具到服务器
4. 实现工具的处理方法

## 许可证

MIT License