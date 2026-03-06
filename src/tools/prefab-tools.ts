/**
 * 预制体操作工具
 * 提供预制体创建、实例化、编辑等 MCP 工具定义
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export function registerPrefabTools(): Tool[] {
  return [
    // ==================== 预制体创建 ====================
    {
      name: 'create_prefab',
      description: '从节点创建预制体',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '要制作预制体的节点 UUID'
          },
          prefabPath: {
            type: 'string',
            description: '预制体保存路径，如 assets/prefabs/MyPrefab.prefab'
          }
        },
        required: ['nodeUuid', 'prefabPath']
      }
    },
    {
      name: 'create_prefab_from_template',
      description: '从模板创建预制体',
      inputSchema: {
        type: 'object',
        properties: {
          prefabName: {
            type: 'string',
            description: '预制体名称'
          },
          templateType: {
            type: 'string',
            description: '模板类型：button, sprite, label, progressBar, scrollView, toggle, slider',
            enum: ['button', 'sprite', 'label', 'progressBar', 'scrollView', 'toggle', 'slider']
          },
          prefabPath: {
            type: 'string',
            description: '保存路径'
          }
        },
        required: ['prefabName', 'templateType']
      }
    },

    // ==================== 预制体实例化 ====================
    {
      name: 'instantiate_prefab',
      description: '实例化预制体到场景',
      inputSchema: {
        type: 'object',
        properties: {
          prefabPath: {
            type: 'string',
            description: '预制体路径，如 assets/prefabs/MyPrefab.prefab'
          },
          parentUuid: {
            type: 'string',
            description: '父节点 UUID'
          },
          position: {
            type: 'object',
            description: '实例化位置',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
              z: { type: 'number' }
            }
          }
        },
        required: ['prefabPath']
      }
    },
    {
      name: 'instantiate_multiple_prefab',
      description: '批量实例化预制体',
      inputSchema: {
        type: 'object',
        properties: {
          prefabPath: {
            type: 'string',
            description: '预制体路径'
          },
          count: {
            type: 'number',
            description: '实例化数量'
          },
          parentUuid: {
            type: 'string',
            description: '父节点 UUID'
          },
          layout: {
            type: 'string',
            description: '布局方式：grid, horizontal, vertical',
            enum: ['grid', 'horizontal', 'vertical']
          },
          spacing: {
            type: 'number',
            description: '间距'
          }
        },
        required: ['prefabPath', 'count']
      }
    },

    // ==================== 预制体编辑 ====================
    {
      name: 'prefab_save',
      description: '保存预制体更改',
      inputSchema: {
        type: 'object',
        properties: {
          prefabPath: {
            type: 'string',
            description: '预制体路径'
          }
        },
        required: ['prefabPath']
      }
    },
    {
      name: 'prefab_revert',
      description: '还原预制体到原始状态',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '预制体实例节点 UUID'
          }
        },
        required: ['nodeUuid']
      }
    },
    {
      name: 'prefab_apply',
      description: '应用预制体实例的更改到原始预制体',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '预制体实例节点 UUID'
          }
        },
        required: ['nodeUuid']
      }
    },
    {
      name: 'prefab_unlink',
      description: '解除预制体链接（转换为普通节点）',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '预制体实例节点 UUID'
          }
        },
        required: ['nodeUuid']
      }
    },

    // ==================== 预制体查询 ====================
    {
      name: 'list_prefabs',
      description: '列出所有预制体',
      inputSchema: {
        type: 'object',
        properties: {
          folder: {
            type: 'string',
            description: '预制体文件夹路径，默认 assets'
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
      name: 'get_prefab_info',
      description: '获取预制体详细信息',
      inputSchema: {
        type: 'object',
        properties: {
          prefabPath: {
            type: 'string',
            description: '预制体路径'
          }
        },
        required: ['prefabPath']
      }
    },
    {
      name: 'find_prefab_by_node',
      description: '通过节点查找对应的预制体',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          }
        },
        required: ['nodeUuid']
      }
    },
    {
      name: 'get_prefab_instances',
      description: '获取场景中所有预制体实例',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },

    // ==================== 预制体删除 ====================
    {
      name: 'delete_prefab',
      description: '删除预制体文件',
      inputSchema: {
        type: 'object',
        properties: {
          prefabPath: {
            type: 'string',
            description: '预制体路径'
          }
        },
        required: ['prefabPath']
      }
    }
  ];
}