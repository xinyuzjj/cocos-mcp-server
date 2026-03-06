/**
 * 资源管理工具
 * 提供 Cocos Creator 资源管理的 MCP 工具定义
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export function registerAssetTools(): Tool[] {
  return [
    // ==================== 资源列表 ====================
    {
      name: 'list_assets',
      description: '列出项目中的资源文件',
      inputSchema: {
        type: 'object',
        properties: {
          folder: {
            type: 'string',
            description: '资源文件夹路径，默认 assets'
          },
          type: {
            type: 'string',
            description: '资源类型：scene, prefab, texture, sprite-frame, script, animation-clip, audio, etc.'
          },
          recursive: {
            type: 'boolean',
            description: '是否递归子文件夹，默认 true'
          }
        },
        required: []
      }
    },
    {
      name: 'list_textures',
      description: '列出所有纹理资源',
      inputSchema: {
        type: 'object',
        properties: {
          folder: {
            type: 'string',
            description: '纹理文件夹路径，默认 assets/textures'
          },
          recursive: {
            type: 'boolean',
            description: '是否递归，默认 true'
          }
        },
        required: []
      }
    },
    {
      name: 'list_scenes',
      description: '列出所有场景资源',
      inputSchema: {
        type: 'object',
        properties: {
          folder: {
            type: 'string',
            description: '场景文件夹路径，默认 assets/scenes'
          }
        },
        required: []
      }
    },
    {
      name: 'list_prefabs',
      description: '列出所有预制体资源',
      inputSchema: {
        type: 'object',
        properties: {
          folder: {
            type: 'string',
            description: '预制体文件夹路径，默认 assets/prefabs'
          }
        },
        required: []
      }
    },
    {
      name: 'list_audio',
      description: '列出所有音频资源',
      inputSchema: {
        type: 'object',
        properties: {
          folder: {
            type: 'string',
            description: '音频文件夹路径，默认 assets/audio'
          }
        },
        required: []
      }
    },

    // ==================== 资源操作 ====================
    {
      name: 'import_assets',
      description: '导入外部资源到项目',
      inputSchema: {
        type: 'object',
        properties: {
          filePaths: {
            type: 'array',
            description: '要导入的文件路径数组',
            items: { type: 'string' }
          },
          folder: {
            type: 'string',
            description: '目标文件夹，默认 assets'
          }
        },
        required: ['filePaths']
      }
    },
    {
      name: 'delete_asset',
      description: '删除资源文件',
      inputSchema: {
        type: 'object',
        properties: {
          assetPath: {
            type: 'string',
            description: '资源路径，如 assets/scripts/MyScript.ts'
          }
        },
        required: ['assetPath']
      }
    },
    {
      name: 'move_asset',
      description: '移动资源文件',
      inputSchema: {
        type: 'object',
        properties: {
          from: {
            type: 'string',
            description: '源路径'
          },
          to: {
            type: 'string',
            description: '目标路径'
          }
        },
        required: ['from', 'to']
      }
    },
    {
      name: 'copy_asset',
      description: '复制资源文件',
      inputSchema: {
        type: 'object',
        properties: {
          from: {
            type: 'string',
            description: '源路径'
          },
          to: {
            type: 'string',
            description: '目标路径'
          }
        },
        required: ['from', 'to']
      }
    },
    {
      name: 'rename_asset',
      description: '重命名资源文件',
      inputSchema: {
        type: 'object',
        properties: {
          assetPath: {
            type: 'string',
            description: '资源路径'
          },
          newName: {
            type: 'string',
            description: '新名称'
          }
        },
        required: ['assetPath', 'newName']
      }
    },

    // ==================== 资源信息 ====================
    {
      name: 'get_asset_info',
      description: '获取资源详细信息',
      inputSchema: {
        type: 'object',
        properties: {
          assetPath: {
            type: 'string',
            description: '资源路径'
          }
        },
        required: ['assetPath']
      }
    },
    {
      name: 'get_asset_dependencies',
      description: '获取资源的依赖关系',
      inputSchema: {
        type: 'object',
        properties: {
          assetPath: {
            type: 'string',
            description: '资源路径'
          }
        },
        required: ['assetPath']
      }
    },
    {
      name: 'find_asset_by_name',
      description: '按名称搜索资源',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: '资源名称（支持模糊匹配）'
          },
          type: {
            type: 'string',
            description: '资源类型过滤'
          }
        },
        required: ['name']
      }
    },
    {
      name: 'find_assets_by_uuid',
      description: '通过 UUID 查找资源',
      inputSchema: {
        type: 'object',
        properties: {
          uuid: {
            type: 'string',
            description: '资源 UUID'
          }
        },
        required: ['uuid']
      }
    },

    // ==================== 资源创建 ====================
    {
      name: 'create_folder',
      description: '创建资源文件夹',
      inputSchema: {
        type: 'object',
        properties: {
          folderPath: {
            type: 'string',
            description: '文件夹路径，如 assets/myFolder'
          }
        },
        required: ['folderPath']
      }
    },
    {
      name: 'create_empty_scene',
      description: '创建空场景文件',
      inputSchema: {
        type: 'object',
        properties: {
          sceneName: {
            type: 'string',
            description: '场景名称'
          },
          scenePath: {
            type: 'string',
            description: '保存路径，如 assets/scenes/NewScene.scene'
          }
        },
        required: ['sceneName']
      }
    },
    {
      name: 'create_empty_prefab',
      description: '创建空预制体文件',
      inputSchema: {
        type: 'object',
        properties: {
          prefabName: {
            type: 'string',
            description: '预制体名称'
          },
          prefabPath: {
            type: 'string',
            description: '保存路径，如 assets/prefabs/NewPrefab.prefab'
          }
        },
        required: ['prefabName']
      }
    },

    // ==================== 资源刷新 ====================
    {
      name: 'refresh_assets',
      description: '刷新资源数据库',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'reimport_asset',
      description: '重新导入资源',
      inputSchema: {
        type: 'object',
        properties: {
          assetPath: {
            type: 'string',
            description: '资源路径'
          }
        },
        required: ['assetPath']
      }
    },
    {
      name: 'reimport_folder',
      description: '重新导入文件夹中的所有资源',
      inputSchema: {
        type: 'object',
        properties: {
          folderPath: {
            type: 'string',
            description: '文件夹路径'
          }
        },
        required: ['folderPath']
      }
    },

    // ==================== 资源分析 ====================
    {
      name: 'analyze_asset_usage',
      description: '分析资源使用情况',
      inputSchema: {
        type: 'object',
        properties: {
          assetPath: {
            type: 'string',
            description: '资源路径'
          }
        },
        required: ['assetPath']
      }
    },
    {
      name: 'find_unused_assets',
      description: '查找未使用的资源',
      inputSchema: {
        type: 'object',
        properties: {
          folder: {
            type: 'string',
            description: '检查的文件夹，默认 assets'
          }
        },
        required: []
      }
    },
    {
      name: 'get_project_assets_summary',
      description: '获取项目资源统计信息',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },

    // ==================== 资源 URL ====================
    {
      name: 'get_asset_url',
      description: '获取资源的 CDN/远程 URL',
      inputSchema: {
        type: 'object',
        properties: {
          assetPath: {
            type: 'string',
            description: '资源路径'
          }
        },
        required: ['assetPath']
      }
    },
    {
      name: 'get_asset_uuid',
      description: '通过路径获取资源的 UUID',
      inputSchema: {
        type: 'object',
        properties: {
          assetPath: {
            type: 'string',
            description: '资源路径'
          }
        },
        required: ['assetPath']
      }
    }
  ];
}