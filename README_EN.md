# Cocos MCP Server 🏝️

[English](./README_EN.md) | [中文](./README.md)

A Model Context Protocol (MCP) server plugin specifically designed for Cocos Creator, enabling AI to interact with the Cocos Creator editor through a standardized protocol to assist with game development.

## ✨ Features

- 🤖 **AI-Driven Development** - AI can automatically create scenes, nodes, components, and scripts
- 📝 **Smart Code Generation** - Auto-generate TypeScript component code and attach to nodes
- 🎮 **Complete Scene Control** - Full operations for scenes, nodes, components, and prefabs
- 📁 **Asset Management** - Import, delete, and query game assets
- 🔌 **Standardized Protocol** - Based on MCP protocol, compatible with various AI clients

## 🚀 Quick Start

### 1. Installation

Copy the entire project to your Cocos Creator extensions directory:

```
your-cocos-project/
├── assets/
├── extensions/
│   └── cocos-mcp-server/    ← Put here
├── settings/
└── ...
```

### 2. Build

```bash
cd extensions/cocos-mcp-server
npm install
npm run build
```

### 3. Start

1. Restart Cocos Creator
2. Click menu: `Extension` → `Cocos MCP Server` → `Start Server`
3. Server runs at `http://localhost:3000/mcp`

### 4. Configure AI Client

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

## 📖 Tools List

### 🎯 Scene/Node Operations (12 tools)

| Tool | Description |
|------|-------------|
| `get_current_scene` | Get current scene info |
| `list_scenes` | List all scenes |
| `open_scene` | Open specified scene |
| `save_scene` | Save scene |
| `create_node` | Create node |
| `delete_node` | Delete node |
| `find_nodes` | Find nodes |
| `get_node` | Get node details |
| `set_node_property` | Set node property |
| `move_node` | Move node |
| `clone_node` | Clone node |
| `add_component` | Add component |

### 💻 Code Generation Tools (15 tools)

| Tool | Description |
|------|-------------|
| `create_script` | Create script file |
| `generate_component` | AI generates component code |
| `generate_ui_component` | Generate UI component |
| `attach_script` | Attach script to node |
| `detach_script` | Remove script from node |
| `edit_script` | Edit script |
| `append_to_script` | Append code |
| `replace_in_script` | Replace code |
| `get_script` | Read script content |
| `list_scripts` | List all scripts |
| `find_script` | Search scripts |
| `fix_script_errors` | Auto-fix script errors |
| `run_project` | Run project |
| `build_project` | Build project |

### 📁 Asset Management Tools (4 tools)

| Tool | Description |
|------|-------------|
| `list_assets` | List assets |
| `import_assets` | Import assets |
| `delete_asset` | Delete asset |
| `get_asset_info` | Get asset info |

## 💡 Usage Examples

### Create Scene and Add Node

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

### AI Auto-Generate Component

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

### Attach Script to Node

```json
{
  "tool": "attach_script",
  "arguments": {
    "nodeUuid": "node-uuid-here",
    "scriptName": "PlayerController"
  }
}
```

## 🛠️ Development

### Project Structure

```
cocos-mcp-server/
├── src/
│   ├── main.ts           # Plugin entry
│   ├── mcp-server.ts     # MCP server core
│   ├── http-server.ts    # HTTP server
│   ├── types.ts          # Type definitions
│   └── tools/
│       ├── scene-tools.ts    # Scene tools
│       ├── code-tools.ts     # Code tools
│       └── asset-tools.ts    # Asset tools
├── package.json
└── tsconfig.json
```

### Adding New Tools

1. Create new tool file in `src/tools/`
2. Implement `registerXxxTools()` function
3. Register tool in `mcp-server.ts`

## 📋 Requirements

- Cocos Creator 3.8.0+

## 🤝 Contributing

Feel free to submit Issues and Pull Requests!

## 📄 License

MIT License