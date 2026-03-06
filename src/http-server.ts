/**
 * MCP Server 核心
 * 提供 HTTP 服务器，处理 MCP 协议请求
 */

import express from 'express';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { CocosMCPServer } from './mcp-server';

const app = express();
app.use(express.json());

// 存储活动的传输层
const transports = new Map<string, SSEServerTransport>();

/**
 * MCP SSE 端点 - 支持流式推送
 */
app.get('/mcp', async (req, res) => {
  const transport = new SSEServerTransport('/mcp', res);
  const sessionId = transport.sessionId;
  transports.set(sessionId, transport);
  
  res.on('close', () => {
    transports.delete(sessionId);
  });

  await transport.connect();
  const server = CocosMCPServer.getInstance().getServer();
  
  await server.run(transport);
});

/**
 * MCP POST 端点 - 标准请求/响应
 */
app.post('/mcp', async (req, res) => {
  try {
    const server = CocosMCPServer.getInstance().getServer();
    
    // 处理请求
    const { method, params, id } = req.body;
    
    if (method === 'tools/list') {
      const result = await server.request(
        { method: ListToolsRequestSchema.method, params },
        { method: ListToolsRequestSchema.method, params }
      );
      res.json({ jsonrpc: '2.0', id, result });
    } 
    else if (method === 'tools/call') {
      const result = await server.request(
        { method: CallToolRequestSchema.method, params },
        { method: CallToolRequestSchema.method, params }
      );
      res.json({ jsonrpc: '2.0', id, result });
    }
    else {
      res.json({
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: 'Method not found' }
      });
    }
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
app.get('/health', (req, res) => {
  res.json({ status: 'ok', server: 'cocos-mcp-server' });
});

/**
 * 获取服务器状态
 */
app.get('/status', (req, res) => {
  const instance = CocosMCPServer.getInstance();
  res.json({
    running: instance.isRunning(),
    port: instance.getPort(),
    toolsCount: instance.getToolsCount()
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

export { app };