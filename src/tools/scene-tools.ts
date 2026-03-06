/**
 * 场景/节点操作工具
 * 提供场景管理和节点操作的 MCP 工具定义
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export function registerSceneTools(): Tool[] {
  return [
    // ==================== 场景管理 ====================
    {
      name: 'get_current_scene',
      description: '获取当前打开的场景信息',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'list_scenes',
      description: '列出项目中的所有场景文件',
      inputSchema: {
        type: 'object',
        properties: {
          folder: {
            type: 'string',
            description: '场景所在文件夹路径，默认 assets'
          }
        },
        required: []
      }
    },
    {
      name: 'open_scene',
      description: '打开指定路径的场景',
      inputSchema: {
        type: 'object',
        properties: {
          scenePath: {
            type: 'string',
            description: '场景文件路径，如 assets/scenes/Main.scene'
          }
        },
        required: ['scenePath']
      }
    },
    {
      name: 'save_scene',
      description: '保存当前场景或指定场景',
      inputSchema: {
        type: 'object',
        properties: {
          scenePath: {
            type: 'string',
            description: '场景文件路径，为空则保存当前场景'
          }
        },
        required: []
      }
    },
    {
      name: 'create_scene',
      description: '创建新场景',
      inputSchema: {
        type: 'object',
        properties: {
          sceneName: {
            type: 'string',
            description: '新场景名称'
          },
          scenePath: {
            type: 'string',
            description: '场景保存路径，如 assets/scenes/NewScene.scene'
          }
        },
        required: ['sceneName']
      }
    },

    // ==================== 节点操作 ====================
    {
      name: 'create_node',
      description: '创建新节点',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: '节点名称'
          },
          parentUuid: {
            type: 'string',
            description: '父节点 UUID，为空则作为根节点'
          },
          nodeType: {
            type: 'string',
            description: '节点类型：2DNode, 3DNode, Sprite, Label, Button, RichText, etc.',
            enum: ['2DNode', '3DNode', 'Sprite', 'Label', 'Button', 'RichText', 'ProgressBar', 'ScrollView', 'Toggle', 'Slider']
          },
          position: {
            type: 'object',
            description: '节点位置',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
              z: { type: 'number' }
            }
          },
          rotation: {
            type: 'object',
            description: '节点旋转',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
              z: { type: 'number' },
              w: { type: 'number' }
            }
          },
          scale: {
            type: 'object',
            description: '节点缩放',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
              z: { type: 'number' }
            }
          }
        },
        required: ['name']
      }
    },
    {
      name: 'delete_node',
      description: '删除指定节点',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '要删除的节点 UUID'
          }
        },
        required: ['nodeUuid']
      }
    },
    {
      name: 'find_nodes',
      description: '按名称、类型或 UUID 查询节点',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: '节点名称（支持模糊匹配）'
          },
          type: {
            type: 'string',
            description: '节点类型'
          },
          uuid: {
            type: 'string',
            description: '节点 UUID'
          }
        },
        required: []
      }
    },
    {
      name: 'get_node',
      description: '获取节点详细信息',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          includeComponents: {
            type: 'boolean',
            description: '是否包含组件信息，默认 false'
          }
        },
        required: ['nodeUuid']
      }
    },
    {
      name: 'set_node_property',
      description: '设置节点属性（位置、旋转、缩放、名称等）',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          property: {
            type: 'string',
            description: '属性名：name, position, rotation, scale, active, anchorX, anchorY, etc.'
          },
          value: {
            type: 'object',
            description: '属性值'
          }
        },
        required: ['nodeUuid', 'property', 'value']
      }
    },
    {
      name: 'move_node',
      description: '移动节点到指定父节点下',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '要移动的节点 UUID'
          },
          parentUuid: {
            type: 'string',
            description: '新的父节点 UUID'
          },
          index: {
            type: 'number',
            description: '在父节点子节点中的索引位置'
          }
        },
        required: ['nodeUuid', 'parentUuid']
      }
    },
    {
      name: 'clone_node',
      description: '克隆节点',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '要克隆的节点 UUID'
          },
          newName: {
            type: 'string',
            description: '新节点名称'
          },
          parentUuid: {
            type: 'string',
            description: '父节点 UUID'
          }
        },
        required: ['nodeUuid']
      }
    },

    // ==================== 组件操作 ====================
    {
      name: 'add_component',
      description: '为节点添加组件',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          componentType: {
            type: 'string',
            description: '组件类型：Sprite, Label, Button, RichText, Animation, etc.'
          },
          properties: {
            type: 'object',
            description: '组件属性'
          }
        },
        required: ['nodeUuid', 'componentType']
      }
    },
    {
      name: 'remove_component',
      description: '移除节点上的组件',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          componentCid: {
            type: 'string',
            description: '组件的 cid（类型标识）'
          }
        },
        required: ['nodeUuid', 'componentCid']
      }
    },
    {
      name: 'get_components',
      description: '获取节点上的所有组件',
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
      name: 'set_component_property',
      description: '设置组件属性',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          componentCid: {
            type: 'string',
            description: '组件 cid'
          },
          property: {
            type: 'string',
            description: '属性名'
          },
          value: {
            type: 'object',
            description: '属性值'
          }
        },
        required: ['nodeUuid', 'componentCid', 'property', 'value']
      }
    },

    // ==================== 预制体操作 ====================
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
      name: 'list_prefabs',
      description: '列出所有预制体',
      inputSchema: {
        type: 'object',
        properties: {
          folder: {
            type: 'string',
            description: '预制体文件夹路径，默认 assets'
          }
        },
        required: []
      }
    },

    // ==================== 场景视图 ====================
    {
      name: 'refresh_scene_view',
      description: '刷新场景视图',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'select_node',
      description: '在编辑器中选中节点',
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
      name: 'focus_node',
      description: '聚焦到场景视图中的节点',
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
    }
  ];
}