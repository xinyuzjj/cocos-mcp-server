/**
 * 项目构建与运行工具
 * 提供项目运行、构建、平台管理等 MCP 工具定义
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export function registerProjectTools(): Tool[] {
  return [
    // ==================== 项目信息 ====================
    {
      name: 'get_project_info',
      description: '获取项目信息（名称、路径、版本等）',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'get_project_settings',
      description: '获取项目设置',
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: '设置类别：general, preview, build, asset',
            enum: ['general', 'preview', 'build', 'asset']
          }
        },
        required: []
      }
    },
    {
      name: 'get_cocos_version',
      description: '获取 Cocos Creator 版本',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'get_project_dependencies',
      description: '获取项目依赖信息',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },

    // ==================== 项目运行 ====================
    {
      name: 'run_project',
      description: '运行项目',
      inputSchema: {
        type: 'object',
        properties: {
          platform: {
            type: 'string',
            description: '运行平台：web, ios, android, mac, win, quick',
            enum: ['web', 'ios', 'android', 'mac', 'win', 'quick']
          },
          debug: {
            type: 'boolean',
            description: '是否调试模式，默认 true'
          }
        },
        required: []
      }
    },
    {
      name: 'stop_project',
      description: '停止运行项目',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'restart_project',
      description: '重新运行项目',
      inputSchema: {
        type: 'object',
        properties: {
          platform: {
            type: 'string',
            description: '运行平台'
          }
        },
        required: []
      }
    },
    {
      name: 'get_run_status',
      description: '获取项目运行状态',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },

    // ==================== 场景运行 ====================
    {
      name: 'open_and_run_scene',
      description: '打开场景并运行',
      inputSchema: {
        type: 'object',
        properties: {
          scenePath: {
            type: 'string',
            description: '场景路径'
          },
          platform: {
            type: 'string',
            description: '运行平台'
          }
        },
        required: ['scenePath']
      }
    },
    {
      name: 'switch_scene',
      description: '切换到指定场景（运行时）',
      inputSchema: {
        type: 'object',
        properties: {
          scenePath: {
            type: 'string',
            description: '场景路径'
          }
        },
        required: ['scenePath']
      }
    },

    // ==================== 项目构建 ====================
    {
      name: 'build_project',
      description: '构建项目',
      inputSchema: {
        type: 'object',
        properties: {
          platform: {
            type: 'string',
            description: '构建平台：web, ios, android, mac, win, minigame, hs',
            enum: ['web', 'ios', 'android', 'mac', 'win', 'mini-game', 'huawei', 'bytegame', ' OPPO', 'vivo', 'xiaomi']
          },
          mode: {
            type: 'string',
            description: '构建模式：debug, release',
            enum: ['debug', 'release']
          },
          outputPath: {
            type: 'string',
            description: '输出目录'
          },
          options: {
            type: 'object',
            description: '其他构建选项'
          }
        },
        required: ['platform']
      }
    },
    {
      name: 'get_build_platforms',
      description: '获取支持的构建平台列表',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'get_build_settings',
      description: '获取构建设置',
      inputSchema: {
        type: 'object',
        properties: {
          platform: {
            type: 'string',
            description: '平台'
          }
        },
        required: []
      }
    },
    {
      name: 'set_build_settings',
      description: '设置构建选项',
      inputSchema: {
        type: 'object',
        properties: {
          platform: {
            type: 'string',
            description: '平台'
          },
          settings: {
            type: 'object',
            description: '设置项'
          }
        },
        required: ['platform', 'settings']
      }
    },
    {
      name: 'get_build_progress',
      description: '获取构建进度',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'cancel_build',
      description: '取消当前构建',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },

    // ==================== 预览设置 ====================
    {
      name: 'get_preview_settings',
      description: '获取预览设置',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'set_preview_settings',
      description: '设置预览选项',
      inputSchema: {
        type: 'object',
        properties: {
          settings: {
            type: 'object',
            description: '预览设置'
          }
        },
        required: ['settings']
      }
    },
    {
      name: 'set_preview_resolution',
      description: '设置预览分辨率',
      inputSchema: {
        type: 'object',
        properties: {
          width: {
            type: 'number',
            description: '宽度'
          },
          height: {
            type: 'number',
            description: '高度'
          }
        },
        required: ['width', 'height']
      }
    },

    // ==================== 模拟器/设备 ====================
    {
      name: 'list_simulators',
      description: '列出可用的模拟器',
      inputSchema: {
        type: 'object',
        properties: {
          platform: {
            type: 'string',
            description: '平台：ios, android, mac, win'
          }
        },
        required: []
      }
    },
    {
      name: 'run_on_simulator',
      description: '在模拟器上运行',
      inputSchema: {
        type: 'object',
        properties: {
          platform: {
            type: 'string',
            description: '平台'
          },
          simulatorId: {
            type: 'string',
            description: '模拟器 ID'
          }
        },
        required: ['platform']
      }
    },
    {
      name: 'list_devices',
      description: '列出连接的设备',
      inputSchema: {
        type: 'object',
        properties: {
          platform: {
            type: 'string',
            description: '平台'
          }
        },
        required: []
      }
    },
    {
      name: 'run_on_device',
      description: '在真机上运行',
      inputSchema: {
        type: 'object',
        properties: {
          deviceId: {
            type: 'string',
            description: '设备 ID'
          }
        },
        required: ['deviceId']
      }
    },

    // ==================== 发布 ====================
    {
      name: 'open_build_folder',
      description: '打开构建输出目录',
      inputSchema: {
        type: 'object',
        properties: {
          platform: {
            type: 'string',
            description: '平台'
          }
        },
        required: []
      }
    },
    {
      name: 'get_latest_build',
      description: '获取最近一次构建的信息',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  ];
}