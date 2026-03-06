/**
 * Cocos Creator MCP Server
 * 入口文件
 */

import { Editor, Menu } from '@editor-framework/editor';
import { CocosMCPServer } from './mcp-server';

// 扩展加载时执行
export function load() {
  console.log('[Cocos MCP Server] Loading...');
  
  // 注册菜单
  Menu.register('CocosMCPServer', {
    label: 'Cocos MCP Server',
    icon: path.join(__dirname, '../static/icon.png'),
    submenu: [
      {
        label: '启动服务器',
        click() {
          CocosMCPServer.getInstance().start();
        }
      },
      {
        label: '停止服务器',
        click() {
          CocosMCPServer.getInstance().stop();
        }
      },
      {
        label: '打开控制面板',
        click() {
          Editor.Panel.open('cocos-mcp-server');
        }
      }
    ]
  });

  console.log('[Cocos MCP Server] Loaded!');
}

// 扩展卸载时执行
export function unload() {
  console.log('[Cocos MCP Server] Unloading...');
  CocosMCPServer.getInstance().stop();
  console.log('[Cocos MCP Server] Unloaded!');
}

// 声明 path
declare const __dirname: string;
import * as path from 'path';