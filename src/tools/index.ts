/**
 * 工具导出
 * 统一导出所有 MCP 工具
 */

import { registerSceneTools as _registerSceneTools } from './scene-tools';
import { registerCodeTools as _registerCodeTools } from './code-tools';
import { registerAssetTools as _registerAssetTools } from './asset-tools';
import { registerPrefabTools as _registerPrefabTools } from './prefab-tools';
import { registerComponentTools as _registerComponentTools } from './component-tools';
import { registerDebugTools as _registerDebugTools } from './debug-tools';
import { registerProjectTools as _registerProjectTools } from './project-tools';
import { registerGameTools as _registerGameTools } from './game-tools';

export { _registerSceneTools as registerSceneTools };
export { _registerCodeTools as registerCodeTools };
export { _registerAssetTools as registerAssetTools };
export { _registerPrefabTools as registerPrefabTools };
export { _registerComponentTools as registerComponentTools };
export { _registerDebugTools as registerDebugTools };
export { _registerProjectTools as registerProjectTools };
export { _registerGameTools as registerGameTools };

// 工具总数统计
export const TOOL_CATEGORIES = {
  scene: '场景/节点操作',
  code: '代码生成',
  asset: '资源管理',
  prefab: '预制体操作',
  component: '组件操作',
  debug: '调试工具',
  project: '项目构建',
  game: '游戏开发'
};

// 工具数量计算
export function getToolCount(): number {
  const sceneCount = _registerSceneTools().length;
  const codeCount = _registerCodeTools().length;
  const assetCount = _registerAssetTools().length;
  const prefabCount = _registerPrefabTools().length;
  const componentCount = _registerComponentTools().length;
  const debugCount = _registerDebugTools().length;
  const projectCount = _registerProjectTools().length;
  const gameCount = _registerGameTools().length;

  return sceneCount + codeCount + assetCount + prefabCount + 
         componentCount + debugCount + projectCount + gameCount;
}