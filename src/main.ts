import { registerSceneTools } from './tools/scene-tools';
import { registerCodeTools } from './tools/code-tools';
import { registerAssetTools } from './tools/asset-tools';
import { registerPrefabTools } from './tools/prefab-tools';
import { registerComponentTools } from './tools/component-tools';
import { registerDebugTools } from './tools/debug-tools';
import { registerProjectTools } from './tools/project-tools';
import { startHttpServer } from './http-server';

/**
 * 启动 MCP 服务器
 */
function startMCPServer() {
  console.log('🚀 启动 Cocos MCP Server...');
  
  startHttpServer(3000).catch(err => {
    console.error('❌ 服务器启动失败:', err);
  });

  // 打印工具统计
  const sceneCount = registerSceneTools().length;
  const codeCount = registerCodeTools().length;
  const assetCount = registerAssetTools().length;
  const prefabCount = registerPrefabTools().length;
  const componentCount = registerComponentTools().length;
  const debugCount = registerDebugTools().length;
  const projectCount = registerProjectTools().length;
  
  const total = sceneCount + codeCount + assetCount + prefabCount + componentCount + debugCount + projectCount;
  
  console.log(`✅ 工具注册完成: 场景${sceneCount} | 代码${codeCount} | 资源${assetCount} | 预制体${prefabCount} | 组件${componentCount} | 调试${debugCount} | 项目${projectCount}`);
  console.log(`📊 总工具数: ${total} 个`);
}

// 初始化
startMCPServer();