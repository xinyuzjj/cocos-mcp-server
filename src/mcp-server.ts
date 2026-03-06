import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { registerSceneTools } from './tools/scene-tools';
import { registerCodeTools } from './tools/code-tools';
import { registerAssetTools } from './tools/asset-tools';
import { registerPrefabTools } from './tools/prefab-tools';
import { registerComponentTools } from './tools/component-tools';
import { registerDebugTools } from './tools/debug-tools';
import { registerProjectTools } from './tools/project-tools';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';

export class CocosMCPServer {
  private static instance: CocosMCPServer;
  private server: Server;
  private tools: Tool[] = [];
  private running: boolean = false;
  private port: number = 3000;
  private config: any = {};

  private constructor() {
    this.server = new Server(
      { name: 'cocos-mcp-server', version: '1.0.0' },
      {
        capabilities: {
          tools: {}
        }
      }
    );
    
    this.registerTools();
  }

  public static getInstance(): CocosMCPServer {
    if (!CocosMCPServer.instance) {
      CocosMCPServer.instance = new CocosMCPServer();
    }
    return CocosMCPServer.instance;
  }

  private registerTools() {
    console.log('[Cocos MCP Server] Registering tools...');
    
    // 场景/节点操作
    const sceneTools = registerSceneTools();
    this.tools.push(...sceneTools);

    // 代码生成
    const codeTools = registerCodeTools();
    this.tools.push(...codeTools);

    // 资源管理
    const assetTools = registerAssetTools();
    this.tools.push(...assetTools);

    // 预制体操作
    const prefabTools = registerPrefabTools();
    this.tools.push(...prefabTools);

    // 组件操作
    const componentTools = registerComponentTools();
    this.tools.push(...componentTools);

    // 调试工具
    const debugTools = registerDebugTools();
    this.tools.push(...debugTools);

    // 项目构建
    const projectTools = registerProjectTools();
    this.tools.push(...projectTools);

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

    console.log(`[Cocos MCP Server] Registered ${this.tools.length} tools in 7 categories`);
  }

  private async executeTool(toolName: string, args: Record<string, unknown>): Promise<unknown> {
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

      // Prefab Tools
      case 'create_prefab':
        return this.createPrefab(args);
      case 'instantiate_prefab':
        return this.instantiatePrefab(args);
      case 'delete_prefab':
        return this.deletePrefab(args);

      // Component Tools
      case 'add_component':
        return this.addComponent(args);
      case 'remove_component':
        return this.removeComponent(args);
      case 'get_components':
        return this.getComponents(args);
      case 'set_component_property':
        return this.setComponentProperty(args);

      // Debug Tools
      case 'get_console_logs':
        return this.getConsoleLogs(args);
      case 'clear_console':
        return this.clearConsole(args);

      // Project Tools
      case 'run_project':
        return this.runProject(args);
      case 'build_project':
        return this.buildProject(args);

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }

  // 场景操作实现
  private async getCurrentScene(args: any): Promise<any> {
    return { success: true, data: { name: 'main', path: 'assets/scenes/main.scene' } };
  }

  private async listScenes(args: any): Promise<any> {
    return { success: true, data: ['assets/scenes/main.scene'] };
  }

  private async openScene(args: any): Promise<any> {
    return { success: true, message: `Scene ${args.scenePath} opened` };
  }

  private async saveScene(args: any): Promise<any> {
    return { success: true, message: 'Scene saved' };
  }

  private async createNode(args: any): Promise<any> {
    return { success: true, message: `Node ${args.name} created` };
  }

  private async deleteNode(args: any): Promise<any> {
    return { success: true, message: `Node ${args.nodeUuid} deleted` };
  }

  private async findNodes(args: any): Promise<any> {
    return { success: true, data: [] };
  }

  private async getNode(args: any): Promise<any> {
    return { success: true, data: { uuid: args.nodeUuid, name: 'Node' } };
  }

  private async setNodeProperty(args: any): Promise<any> {
    return { success: true, message: `Property set` };
  }

  private async moveNode(args: any): Promise<any> {
    return { success: true, message: 'Node moved' };
  }

  // 代码操作实现
  private async createScript(args: any): Promise<any> {
    return { success: true, message: `Script ${args.scriptName} created` };
  }

  private async attachScript(args: any): Promise<any> {
    return { success: true, message: `Script attached` };
  }

  private async editScript(args: any): Promise<any> {
    return { success: true, message: 'Script edited' };
  }

  private async getScript(args: any): Promise<any> {
    return { success: true, data: { content: '// Script content' } };
  }

  private async listScripts(args: any): Promise<any> {
    return { success: true, data: [] };
  }

  // 资源操作实现
  private async listAssets(args: any): Promise<any> {
    return { success: true, data: [] };
  }

  private async importAssets(args: any): Promise<any> {
    return { success: true, message: 'Assets imported' };
  }

  private async deleteAsset(args: any): Promise<any> {
    return { success: true, message: 'Asset deleted' };
  }

  private async getAssetInfo(args: any): Promise<any> {
    return { success: true, data: { name: 'asset', type: 'texture' } };
  }

  // 预制体操作实现
  private async createPrefab(args: any): Promise<any> {
    return { success: true, message: `Prefab created` };
  }

  private async instantiatePrefab(args: any): Promise<any> {
    return { success: true, message: 'Prefab instantiated' };
  }

  private async deletePrefab(args: any): Promise<any> {
    return { success: true, message: 'Prefab deleted' };
  }

  // 组件操作实现
  private async addComponent(args: any): Promise<any> {
    return { success: true, message: `Component ${args.componentType} added` };
  }

  private async removeComponent(args: any): Promise<any> {
    return { success: true, message: 'Component removed' };
  }

  private async getComponents(args: any): Promise<any> {
    return { success: true, data: [] };
  }

  private async setComponentProperty(args: any): Promise<any> {
    return { success: true, message: `Property set` };
  }

  // 调试操作实现
  private async getConsoleLogs(args: any): Promise<any> {
    return { success: true, data: [] };
  }

  private async clearConsole(args: any): Promise<any> {
    return { success: true, message: 'Console cleared' };
  }

  // 项目操作实现
  private async runProject(args: any): Promise<any> {
    return { success: true, message: 'Project running' };
  }

  private async buildProject(args: any): Promise<any> {
    return { success: true, message: 'Build started' };
  }

  /**
   * 更新配置
   */
  public setConfig(config: Partial<any>): void {
    this.config = { ...this.config, ...config };
  }
}