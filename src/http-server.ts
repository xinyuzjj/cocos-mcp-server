import express from 'express';

const app = express();
app.use(express.json());

/**
 * MCP SSE 端点 - 支持流式推送
 */
app.get('/mcp', async (req: any, res: any) => {
  res.header('Content-Type', 'text/event-stream');
  res.header('Cache-Control', 'no-cache');
  res.header('Connection', 'keep-alive');
  
  res.write('data: {"type":"connected","message":"MCP server connected"}\n\n');
  
  // 保持连接
  req.on('close', () => {
    res.end();
  });
});

/**
 * MCP POST 端点 - 标准请求/响应
 */
app.post('/mcp', async (req: any, res: any) => {
  try {
    const result = await handleRequest(req.body);
    res.json(result);
  } catch (error: any) {
    res.json({
      jsonrpc: '2.0',
      id: req.body.id,
      error: { code: -32603, message: error.message }
    });
  }
});

/**
 * 健康检查
 */
app.get('/health', (req: any, res: any) => {
  res.json({ status: 'ok', server: 'cocos-mcp-server' });
});

/**
 * 获取服务器状态
 */
app.get('/status', (req: any, res: any) => {
  res.json({
    running: true,
    port: 3000,
    toolsCount: 45
  });
});

/**
 * 启动 HTTP 服务器
 */
export function startHttpServer(port: number): Promise<void> {
  return new Promise((resolve, reject) => {
    app.listen(port, () => {
      console.log(`[Cocos MCP Server] HTTP Server running on http://localhost:${port}/mcp`);
      resolve();
    }).on('error', reject);
  });
}

// 简单的请求处理
async function handleRequest(request: any): Promise<any> {
  if (request.method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id: request.id,
      result: {
        tools: [
          { name: 'get_current_scene', description: '获取当前场景' },
          { name: 'list_scenes', description: '列出场景' },
          { name: 'create_node', description: '创建节点' },
          { name: 'delete_node', description: '删除节点' },
          { name: 'list_assets', description: '列出资源' },
          { name: 'run_project', description: '运行项目' },
          { name: 'build_project', description: '构建项目' }
        ]
      }
    };
  }

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: {
      content: [{ type: 'text', text: 'Not implemented yet' }]
    }
  };
}