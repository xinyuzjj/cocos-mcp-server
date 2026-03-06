/**
 * MCP Server 主类
 * 单例模式，管理整个 MCP 服务
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema, 
  ListToolsRequestSchema,
  Tool 
} from '@modelcontextprotocol/sdk/types.js';
import { startHttpServer } from './http-server';
import { registerSceneTools } from './tools/scene-tools';
import { registerCodeTools } from './tools/code-tools';
import { registerAssetTools } from './tools/asset-tools';
import { MCPServerConfig } from './types';

export class CocosMCPServer {
  private static instance: CocosMCPServer;
  private server: Server;
  private config: MCPServerConfig;
  private running: boolean = false;
  private port: number = 3000;
  private tools: Tool[] = [];

  private constructor() {
    this.config = {
      port: 3000,
      autoStart: false,
      debug: false,
      maxConnections: 10
    };

    // 初始化 MCP Server
    this.server = new Server(
      {
        name: 'cocos-mcp-server',
        version: '1.0.0'
      },
      {
        capabilities: {
          tools: {}
        }
      }
    );

    // 注册所有工具
    this.registerTools();
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): CocosMCPServer {
    if (!CocosMCPServer.instance) {
      CocosMCPServer.instance = new CocosMCPServer();
    }
    return CocosMCPServer.instance;
  }

  /**
   * 注册所有工具
   */
  private registerTools() {
    console.log('[Cocos MCP Server] Registering tools...');
    
    // 注册场景/节点工具
    const sceneTools = registerSceneTools();
    this.tools.push(...sceneTools);

    // 注册代码生成工具
    const codeTools = registerCodeTools();
    this.tools.push(...codeTools);

    // 注册资源管理工具
    const assetTools = registerAssetTools();
    this.tools.push(...assetTools);

    // 注册到 MCP Server
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return { tools: this.tools };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      try {
        const result = await this.executeTool(name, args || {});
        return { content: [{ type: 'text', text: JSON.stringify(result) }] };
      } catch (error: any) {
        return {
          content: [{ type: 'text', text: JSON.stringify({ error: error.message }) }],
          isError: true
        };
      }
    });

    console.log(`[Cocos MCP Server] Registered ${this.tools.length} tools`);
  }

  /**
   * 执行工具
   */
  private async executeTool(toolName: string, args: Record<string, unknown>): Promise<unknown> {
    // 场景工具
    switch (toolName) {
      // Scene Tools
      case 'get_current_scene':
        return this.getCurrentScene(args);
      case 'list_scenes':
        return this.listScenes(args);
      case 'open_scene':
        return this.openScene(args);
      case 'save_scene':
        return this.saveScene(args);
      case 'create_node':
        return this.createNode(args);
      case 'delete_node':
        return this.deleteNode(args);
      case 'find_nodes':
        return this.findNodes(args);
      case 'get_node':
        return this.getNode(args);
      case 'set_node_property':
        return this.setNodeProperty(args);
      case 'move_node':
        return this.moveNode(args);
      
      // Code Tools
      case 'create_script':
        return this.createScript(args);
      case 'attach_script':
        return this.attachScript(args);
      case 'edit_script':
        return this.editScript(args);
      case 'get_script':
        return this.getScript(args);
      case 'list_scripts':
        return this.listScripts(args);
      
      // Asset Tools
      case 'list_assets':
        return this.listAssets(args);
      case 'import_assets':
        return this.importAssets(args);
      case 'delete_asset':
        return this.deleteAsset(args);
      case 'get_asset_info':
        return this.getAssetInfo(args);
      
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }

  // ==================== Scene Tools 实现 ====================

  private async getCurrentScene(args: any): Promise<any> {
    // 获取当前打开的场景
    const scene = await Editor.Scene.getCurrentScene();
    return {
      success: true,
      data: {
        uuid: scene.uuid,
        name: scene.name,
        root: scene.root?.uuid
      }
    };
  }

  private async listScenes(args: any): Promise<any> {
    // 列出所有场景
    const scenes = await Editor.Project.getAssetPaths('scene');
    return {
      success: true,
      data: scenes
    };
  }

  private async openScene(args: any): Promise<any> {
    const { scenePath } = args;
    await Editor.Scene.open(scenePath);
    return { success: true, message: `Opened scene: ${scenePath}` };
  }

  private async saveScene(args: any): Promise<any> {
    const { scenePath } = args;
    await Editor.Scene.save(scenePath);
    return { success: true, message: `Saved scene: ${scenePath}` };
  }

  private async createNode(args: any): Promise<any> {
    const { name, parentUuid, nodeType, position, rotation, scale } = args;
    
    // 使用 Cocos Creator API 创建节点
    const node = await Editor.Scene.createNode({
      name,
      parent: parentUuid,
      type: nodeType || 'Node',
      position: position || { x: 0, y: 0, z: 0 },
      rotation: rotation || { x: 0, y: 0, z: 0, w: 1 },
      scale: scale || { x: 1, y: 1, z: 1 }
    });

    return {
      success: true,
      data: {
        uuid: node.uuid,
        name: node.name,
        type: node.type
      }
    };
  }

  private async deleteNode(args: any): Promise<any> {
    const { nodeUuid } = args;
    await Editor.Scene.deleteNode(nodeUuid);
    return { success: true, message: `Deleted node: ${nodeUuid}` };
  }

  private async findNodes(args: any): Promise<any> {
    const { name, type, uuid } = args;
    const nodes = await Editor.Scene.queryNodes({
      name,
      type,
      uuid
    });
    return { success: true, data: nodes };
  }

  private async getNode(args: any): Promise<any> {
    const { nodeUuid, includeComponents } = args;
    const node = await Editor.Scene.getNode(nodeUuid);
    return {
      success: true,
      data: {
        uuid: node.uuid,
        name: node.name,
        type: node.type,
        parent: node.parent?.uuid,
        active: node.active,
        position: node.position,
        rotation: node.rotation,
        scale: node.scale,
        components: includeComponents ? node.components : undefined
      }
    };
  }

  private async setNodeProperty(args: any): Promise<any> {
    const { nodeUuid, property, value } = args;
    const node = await Editor.Scene.getNode(nodeUuid);
    (node as any)[property] = value;
    await Editor.Scene.save();
    return { success: true, message: `Set ${property} = ${JSON.stringify(value)}` };
  }

  private async moveNode(args: any): Promise<any> {
    const { nodeUuid, parentUuid, index } = args;
    await Editor.Scene.moveNode(nodeUuid, parentUuid, index);
    return { success: true, message: `Moved node ${nodeUuid} to ${parentUuid}` };
  }

  // ==================== Code Tools 实现 ====================

  private async createScript(args: any): Promise<any> {
    const { scriptName, scriptPath, template, code } = args;
    
    // 生成脚本代码
    let finalCode = code;
    if (!finalCode) {
      finalCode = this.generateScriptCode(scriptName, template || 'component');
    }

    // 保存脚本文件
    const path = scriptPath || `assets/scripts/${scriptName}.ts`;
    await Editor.EditorAsset.save(path, finalCode);
    await Editor.AssetDB.refresh(path);

    return {
      success: true,
      data: {
        name: scriptName,
        path,
        code: finalCode
      }
    };
  }

  private generateScriptCode(scriptName: string, template: string): string {
    if (template === 'empty') {
      return `// ${scriptName}.ts\n\nexport class ${scriptName} {\n    // Your code here\n}\n`;
    }
    
    // Component 模板（默认）
    return `import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('${scriptName}')
export class ${scriptName} extends Component {\n    // 属性定义\n    @property({ type: Node })\n    targetNode: Node | null = null;\n\n    // 生命周期\n    onLoad() {\n        // 节点加载完成\n    }\n\n    start() {\n        // 场景开始\n    }\n\n    update(deltaTime: number) {\n        // 每帧调用\n    }\n}\n`;
  }

  private async attachScript(args: any): Promise<any> {
    const { nodeUuid, scriptName } = args;
    
    const node = await Editor.Scene.getNode(nodeUuid);
    const scriptUuid = await Editor.EditorAsset.queryUuid(`assets/scripts/${scriptName}.ts`);
    
    await Editor.Scene.addComponent(nodeUuid, {
      type: scriptName,
      _scriptUuid: scriptUuid
    });

    return { success: true, message: `Attached ${scriptName} to node` };
  }

  private async editScript(args: any): Promise<any> {
    const { scriptPath, code } = args;
    await Editor.EditorAsset.save(scriptPath, code);
    return { success: true, message: `Updated script: ${scriptPath}` };
  }

  private async getScript(args: any): Promise<any> {
    const { scriptPath } = args;
    const content = await Editor.EditorAsset.read(scriptPath);
    return { success: true, data: { path: scriptPath, content } };
  }

  private async listScripts(args: any): Promise<any> {
    const scripts = await Editor.Project.getAssetPaths('typescript', 'assets/scripts');
    return { success: true, data: scripts };
  }

  // ==================== Asset Tools 实现 ====================

  private async listAssets(args: any): Promise<any> {
    const { folder, type, recursive } = args;
    const assets = await Editor.AssetDB.queryAssets({
      folder: folder || 'assets',
      type,
      recursive
    });
    return { success: true, data: assets };
  }

  private async importAssets(args: any): Promise<any> {
    const { filePaths, folder } = args;
    const results = await Editor.AssetDB.import(filePaths, folder || 'assets');
    return { success: true, data: results };
  }

  private async deleteAsset(args: any): Promise<any> {
    const { assetPath } = args;
    await Editor.AssetDB.delete(assetPath);
    return { success: true, message: `Deleted: ${assetPath}` };
  }

  private async getAssetInfo(args: any): Promise<any> {
    const { assetPath } = args;
    const info = await Editor.AssetDB.queryAssetInfo(assetPath);
    return { success: true, data: info };
  }

  // ==================== 公共方法 ====================

  /**
   * 获取 MCP Server 实例
   */
  public getServer(): Server {
    return this.server;
  }

  /**
   * 启动服务器
   */
  public async start(config?: Partial<MCPServerConfig>): Promise<void> {
    if (this.running) {
      console.log('[Cocos MCP Server] Already running');
      return;
    }

    if (config) {
      this.config = { ...this.config, ...config };
    }

    this.port = this.config.port;

    try {
      // 启动 HTTP 服务器
      await startHttpServer(this.port);
      this.running = true;
      console.log(`[Cocos MCP Server] Started on port ${this.port}`);
    } catch (error: any) {
      console.error('[Cocos MCP Server] Failed to start:', error);
      throw error;
    }
  }

  /**
   * 停止服务器
   */
  public async stop(): Promise<void> {
    if (!this.running) {
      return;
    }
    
    this.running = false;
    console.log('[Cocos MCP Server] Stopped');
  }

  /**
   * 服务器是否运行中
   */
  public isRunning(): boolean {
    return this.running;
  }

  /**
   * 获取端口
   */
  public getPort(): number {
    return this.port;
  }

  /**
   * 获取工具数量
   */
  public getToolsCount(): number {
    return this.tools.length;
  }

  /**
   * 更新配置
   */
  public setConfig(config: Partial<MCPServerConfig>): void {
    this.config = { ...this.config, ...config };
  }
}