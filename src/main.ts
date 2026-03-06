import { registerSceneTools } from './tools/scene-tools';
import { registerCodeTools } from './tools/code-tools';
import { registerAssetTools } from './tools/asset-tools';
import { registerPrefabTools } from './tools/prefab-tools';
import { registerComponentTools } from './tools/component-tools';
import { registerDebugTools } from './tools/debug-tools';
import { registerProjectTools } from './tools/project-tools';
import { registerGameTools } from './tools/game-tools';
import { startHttpServer } from './http-server';
import { TOOL_CATEGORIES, getToolCount } from './tools/index';

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
  const gameCount = registerGameTools().length;
  
  const total = getToolCount();
  
  console.log(`✅ 工具注册完成:`);
  console.log(`   🎮 场景操作: ${sceneCount} 个`);
  console.log(`   💻 代码操作: ${codeCount} 个`);
  console.log(`   📦 资源操作: ${assetCount} 个`);
  console.log(`   🏗️ 预制体操作: ${prefabCount} 个`);
  console.log(`   ⚙️ 组件操作: ${componentCount} 个`);
  console.log(`   🔍 调试操作: ${debugCount} 个`);
  console.log(`   🚀 项目操作: ${projectCount} 个`);
  console.log(`   🎲 游戏开发: ${gameCount} 个`);
  console.log(`📊 总工具数: ${total} 个`);
}

// 初始化
startMCPServer();