/**
 * 工具导出
 * 统一导出所有 MCP 工具
 */

export { registerSceneTools } from './scene-tools';
export { registerCodeTools } from './code-tools';
export { registerAssetTools } from './asset-tools';
export { registerPrefabTools } from './prefab-tools';
export { registerComponentTools } from './component-tools';
export { registerDebugTools } from './debug-tools';
export { registerProjectTools } from './project-tools';

// 工具总数统计
export const TOOL_CATEGORIES = {
  scene: '场景/节点操作',
  code: '代码生成',
  asset: '资源管理',
  prefab: '预制体操作',
  component: '组件操作',
  debug: '调试工具',
  project: '项目构建'
};