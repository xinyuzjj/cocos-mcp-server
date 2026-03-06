/**
 * 类型定义
 */

// ============ MCP 协议类型 ============

export interface MCPRequest {
  jsonrpc: '2.0';
  id: string | number;
  method: string;
  params?: {
    name: string;
    arguments?: Record<string, unknown>;
  };
}

export interface MCPResponse {
  jsonrpc: '2.0';
  id: string | number;
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

// ============ Cocos Creator 类型 ============

export interface CocosNode {
  uuid: string;
  name: string;
  type: string;
  parent?: string;
  children?: string[];
  components?: CocosComponent[];
  active: boolean;
  position?: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number; w: number };
  scale?: { x: number; y: number; z: number };
}

export interface CocosComponent {
  __id__: number;
  type: string;
  name?: string;
  [key: string]: unknown;
}

export interface CocosScene {
  uuid: string;
  name: string;
  root: string;
}

export interface CocosPrefab {
  uuid: string;
  name: string;
  assetPath: string;
}

export interface CocosAsset {
  uuid: string;
  name: string;
  type: string;
  path: string;
  isDirectory: boolean;
  children?: CocosAsset[];
}

// ============ 工具参数类型 ============

// Scene Tools
export interface GetSceneParams {
  includeComponents?: boolean;
}

export interface OpenSceneParams {
  scenePath: string;
}

export interface SaveSceneParams {
  scenePath?: string;
}

export interface CreateNodeParams {
  name: string;
  parentUuid?: string;
  nodeType?: '2DNode' | '3DNode' | 'Sprite' | 'Label' | 'Button' | 'RichText';
  position?: { x: number; y: number; z?: number };
  rotation?: { x: number; y: number; z: number; w?: number };
  scale?: { x: number; y: number; z?: number };
}

export interface DeleteNodeParams {
  nodeUuid: string;
}

export interface MoveNodeParams {
  nodeUuid: string;
  parentUuid: string;
  index?: number;
}

export interface SetNodePropertyParams {
  nodeUuid: string;
  property: string;
  value: unknown;
}

export interface FindNodeParams {
  name?: string;
  type?: string;
  uuid?: string;
}

// Code Tools
export interface CreateScriptParams {
  scriptName: string;
  scriptPath?: string;
  template?: 'empty' | 'component' | 'pure-component';
  code?: string;
}

export interface AttachScriptParams {
  nodeUuid: string;
  scriptName: string;
}

export interface EditScriptParams {
  scriptPath: string;
  code: string;
}

export interface GetScriptParams {
  scriptPath: string;
}

// Asset Tools
export interface ListAssetsParams {
  folder?: string;
  type?: string;
  recursive?: boolean;
}

export interface ImportAssetsParams {
  filePaths: string[];
  folder?: string;
}

export interface DeleteAssetParams {
  assetPath: string;
}

export interface MoveAssetParams {
  from: string;
  to: string;
}

export interface GetAssetInfoParams {
  assetPath: string;
}

// ============ 工具结果类型 ============

export interface ToolResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SceneInfo {
  uuid: string;
  name: string;
  path: string;
  nodeCount: number;
}

export interface NodeInfo {
  uuid: string;
  name: string;
  type: string;
  parentUuid?: string;
  childUuids: string[];
  componentCount: number;
  active: boolean;
}

export interface ScriptInfo {
  name: string;
  path: string;
  uuid: string;
  isComponent: boolean;
}

export interface AssetInfo {
  uuid: string;
  name: string;
  type: string;
  path: string;
  size: number;
  isDirectory: boolean;
}

// ============ 服务器配置 ============

export interface MCPServerConfig {
  port: number;
  autoStart: boolean;
  debug: boolean;
  maxConnections: number;
}