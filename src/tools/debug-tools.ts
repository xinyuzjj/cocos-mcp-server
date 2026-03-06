/**
 * 调试与日志工具
 * 提供控制台日志、性能分析、错误处理等 MCP 工具定义
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export function registerDebugTools(): Tool[] {
  return [
    // ==================== 控制台日志 ====================
    {
      name: 'get_console_logs',
      description: '获取编辑器控制台日志',
      inputSchema: {
        type: 'object',
        properties: {
          limit: {
            type: 'number',
            description: '返回日志数量，默认 50'
          },
          filter: {
            type: 'string',
            description: '过滤类型：log, warn, error, info',
            enum: ['log', 'warn', 'error', 'info']
          },
          search: {
            type: 'string',
            description: '搜索关键词'
          }
        },
        required: []
      }
    },
    {
      name: 'clear_console',
      description: '清空控制台日志',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'get_error_logs',
      description: '获取错误日志',
      inputSchema: {
        type: 'object',
        properties: {
          limit: {
            type: 'number',
            description: '返回数量，默认 20'
          }
        },
        required: []
      }
    },

    // ==================== 项目日志 ====================
    {
      name: 'read_project_log',
      description: '读取项目日志文件',
      inputSchema: {
        type: 'object',
        properties: {
          lines: {
            type: 'number',
            description: '返回行数，默认 100'
          }
        },
        required: []
      }
    },
    {
      name: 'search_log',
      description: '搜索项目日志',
      inputSchema: {
        type: 'object',
        properties: {
          pattern: {
            type: 'string',
            description: '搜索模式（正则表达式）'
          },
          lines: {
            type: 'number',
            description: '返回行数'
          }
        },
        required: ['pattern']
      }
    },

    // ==================== 编辑器信息 ====================
    {
      name: 'get_editor_info',
      description: '获取编辑器信息',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'get_project_info',
      description: '获取项目信息',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'get_app_info',
      description: '获取应用程序信息',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },

    // ==================== 性能监控 ====================
    {
      name: 'get_performance_stats',
      description: '获取性能统计信息',
      inputSchema: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: '统计类型：cpu, memory, gpu',
            enum: ['cpu', 'memory', 'gpu']
          }
        },
        required: []
      }
    },
    {
      name: 'get_memory_usage',
      description: '获取内存使用情况',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'get_fps',
      description: '获取当前 FPS',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'start_profiling',
      description: '开始性能分析',
      inputSchema: {
        type: 'object',
        properties: {
          duration: {
            type: 'number',
            description: '持续时间（秒）'
          }
        },
        required: ['duration']
      }
    },
    {
      name: 'stop_profiling',
      description: '停止性能分析并获取结果',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },

    // ==================== 场景调试 ====================
    {
      name: 'validate_scene',
      description: '验证场景完整性',
      inputSchema: {
        type: 'object',
        properties: {
          checkMissingAssets: {
            type: 'boolean',
            description: '检查缺失资源'
          },
          checkMissingScripts: {
            type: 'boolean',
            description: '检查缺失脚本'
          },
          checkOrphanedNodes: {
            type: 'boolean',
            description: '检查孤立节点'
          }
        },
        required: []
      }
    },
    {
      name: 'debug_node_tree',
      description: '获取节点树调试信息',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID（为空则获取整个场景）'
          },
          depth: {
            type: 'number',
            description: '深度限制'
          }
        },
        required: []
      }
    },

    // ==================== 错误处理 ====================
    {
      name: 'get_last_error',
      description: '获取最近的错误信息',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'analyze_error',
      description: '分析错误并提供解决方案',
      inputSchema: {
        type: 'object',
        properties: {
          errorMessage: {
            type: 'string',
            description: '错误信息'
          }
        },
        required: ['errorMessage']
      }
    },

    // ==================== 开发者工具 ====================
    {
      name: 'execute_js',
      description: '在编辑器上下文中执行 JavaScript 代码',
      inputSchema: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            description: '要执行的 JavaScript 代码'
          }
        },
        required: ['code']
      }
    },
    {
      name: 'open_devtools',
      description: '打开开发者工具',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'reload_preview',
      description: '重新加载预览窗口',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  ];
}