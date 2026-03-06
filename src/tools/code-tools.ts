/**
 * 代码生成工具
 * AI 自动生成并挂载脚本
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export function registerCodeTools(): Tool[] {
  return [
    // ==================== 脚本创建 ====================
    {
      name: 'create_script',
      description: '创建新的 TypeScript 脚本文件',
      inputSchema: {
        type: 'object',
        properties: {
          scriptName: {
            type: 'string',
            description: '脚本名称（不含 .ts 后缀）'
          },
          scriptPath: {
            type: 'string',
            description: '脚本保存路径，默认 assets/scripts/{scriptName}.ts'
          },
          template: {
            type: 'string',
            description: '模板类型：empty, component, pure-component',
            enum: ['empty', 'component', 'pure-component']
          },
          code: {
            type: 'string',
            description: '自定义代码内容，不传则使用模板生成'
          }
        },
        required: ['scriptName']
      }
    },
    {
      name: 'generate_component',
      description: 'AI 生成 Cocos Creator 组件代码',
      inputSchema: {
        type: 'object',
        properties: {
          componentName: {
            type: 'string',
            description: '组件名称'
          },
          properties: {
            type: 'array',
            description: '属性定义数组',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                type: { type: 'string' },
                default: { type: 'object' },
                tooltip: { type: 'string' }
              }
            }
          },
          methods: {
            type: 'array',
            description: '方法定义数组',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                params: { type: 'array', items: { type: 'string' } },
                body: { type: 'string' }
              }
            }
          },
          description: {
            type: 'string',
            description: '组件描述'
          }
        },
        required: ['componentName']
      }
    },
    {
      name: 'generate_ui_component',
      description: 'AI 生成 UI 组件代码（带常用 UI 属性）',
      inputSchema: {
        type: 'object',
        properties: {
          componentName: {
            type: 'string',
            description: '组件名称'
          },
          uiType: {
            type: 'string',
            description: 'UI 类型：button, label, input, slider, toggle, progress',
            enum: ['button', 'label', 'input', 'slider', 'toggle', 'progress']
          },
          properties: {
            type: 'object',
            description: '额外的自定义属性'
          }
        },
        required: ['componentName', 'uiType']
      }
    },

    // ==================== 脚本挂载 ====================
    {
      name: 'attach_script',
      description: '将脚本组件挂载到节点',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          scriptName: {
            type: 'string',
            description: '脚本名称（不含 .ts）'
          },
          scriptPath: {
            type: 'string',
            description: '脚本路径，如 assets/scripts/MyScript.ts'
          }
        },
        required: ['nodeUuid', 'scriptName']
      }
    },
    {
      name: 'detach_script',
      description: '从节点移除脚本组件',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          scriptName: {
            type: 'string',
            description: '脚本名称'
          }
        },
        required: ['nodeUuid', 'scriptName']
      }
    },

    // ==================== 脚本编辑 ====================
    {
      name: 'edit_script',
      description: '编辑脚本文件内容',
      inputSchema: {
        type: 'object',
        properties: {
          scriptPath: {
            type: 'string',
            description: '脚本文件路径'
          },
          code: {
            type: 'string',
            description: '新的代码内容'
          }
        },
        required: ['scriptPath', 'code']
      }
    },
    {
      name: 'append_to_script',
      description: '在脚本文件末尾追加代码',
      inputSchema: {
        type: 'object',
        properties: {
          scriptPath: {
            type: 'string',
            description: '脚本文件路径'
          },
          code: {
            type: 'string',
            description: '要追加的代码'
          }
        },
        required: ['scriptPath', 'code']
      }
    },
    {
      name: 'replace_in_script',
      description: '替换脚本中的特定代码',
      inputSchema: {
        type: 'object',
        properties: {
          scriptPath: {
            type: 'string',
            description: '脚本文件路径'
          },
          search: {
            type: 'string',
            description: '要替换的代码'
          },
          replace: {
            type: 'string',
            description: '替换后的代码'
          }
        },
        required: ['scriptPath', 'search', 'replace']
      }
    },

    // ==================== 脚本查询 ====================
    {
      name: 'get_script',
      description: '读取脚本文件内容',
      inputSchema: {
        type: 'object',
        properties: {
          scriptPath: {
            type: 'string',
            description: '脚本文件路径'
          }
        },
        required: ['scriptPath']
      }
    },
    {
      name: 'list_scripts',
      description: '列出项目中的所有脚本',
      inputSchema: {
        type: 'object',
        properties: {
          folder: {
            type: 'string',
            description: '脚本文件夹路径，默认 assets/scripts'
          }
        },
        required: []
      }
    },
    {
      name: 'find_script',
      description: '查找包含指定内容的脚本',
      inputSchema: {
        type: 'object',
        properties: {
          searchText: {
            type: 'string',
            description: '搜索文本'
          },
          folder: {
            type: 'string',
            description: '搜索文件夹'
          }
        },
        required: ['searchText']
      }
    },
    {
      name: 'get_script_methods',
      description: '获取脚本中的所有方法名',
      inputSchema: {
        type: 'object',
        properties: {
          scriptPath: {
            type: 'string',
            description: '脚本文件路径'
          }
        },
        required: ['scriptPath']
      }
    },

    // ==================== 智能功能 ====================
    {
      name: 'generate_getter_setter',
      description: '为属性生成 getter/setter 方法',
      inputSchema: {
        type: 'object',
        properties: {
          scriptPath: {
            type: 'string',
            description: '脚本文件路径'
          },
          propertyName: {
            type: 'string',
            description: '属性名'
          },
          propertyType: {
            type: 'string',
            description: '属性类型'
          }
        },
        required: ['scriptPath', 'propertyName']
      }
    },
    {
      name: 'generate_event_handler',
      description: '生成事件处理方法模板',
      inputSchema: {
        type: 'object',
        properties: {
          scriptPath: {
            type: 'string',
            description: '脚本文件路径'
          },
          eventName: {
            type: 'string',
            description: '事件名称'
          },
          handlerName: {
            type: 'string',
            description: '处理方法名'
          },
          eventType: {
            type: 'string',
            description: '事件类型：click, touch, drag, etc.'
          }
        },
        required: ['scriptPath', 'eventName', 'handlerName']
      }
    },
    {
      name: 'fix_script_errors',
      description: '根据错误信息自动修复脚本',
      inputSchema: {
        type: 'object',
        properties: {
          scriptPath: {
            type: 'string',
            description: '脚本文件路径'
          },
          errorMessage: {
            type: 'string',
            description: '错误信息'
          }
        },
        required: ['scriptPath', 'errorMessage']
      }
    },

    // ==================== 项目相关 ====================
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
      name: 'run_project',
      description: '运行项目',
      inputSchema: {
        type: 'object',
        properties: {
          platform: {
            type: 'string',
            description: '运行平台：web, ios, android, mac, win',
            enum: ['web', 'ios', 'android', 'mac', 'win']
          }
        },
        required: []
      }
    },
    {
      name: 'build_project',
      description: '构建项目',
      inputSchema: {
        type: 'object',
        properties: {
          platform: {
            type: 'string',
            description: '构建平台：web, ios, android, mac, win',
            enum: ['web', 'ios', 'android', 'mac', 'win']
          },
          mode: {
            type: 'string',
            description: '构建模式：debug, release',
            enum: ['debug', 'release']
          }
        },
        required: ['platform']
      }
    }
  ];
}