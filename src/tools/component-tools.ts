/**
 * 组件操作工具
 * 提供组件添加、删除、属性设置等 MCP 工具定义
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export function registerComponentTools(): Tool[] {
  return [
    // ==================== 组件类型列表 ====================
    {
      name: 'list_component_types',
      description: '列出所有可用的组件类型',
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: '组件类别：2d, 3d, ui, animation, physics, render, other',
            enum: ['2d', '3d', 'ui', 'animation', 'physics', 'render', 'other']
          }
        },
        required: []
      }
    },
    {
      name: 'get_component_schema',
      description: '获取组件的属性架构',
      inputSchema: {
        type: 'object',
        properties: {
          componentType: {
            type: 'string',
            description: '组件类型，如 Sprite, Label, Button 等'
          }
        },
        required: ['componentType']
      }
    },

    // ==================== 组件添加 ====================
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
      name: 'add_multiple_components',
      description: '为节点添加多个组件',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          components: {
            type: 'array',
            description: '组件数组',
            items: {
              type: 'object',
              properties: {
                type: { type: 'string' },
                properties: { type: 'object' }
              }
            }
          }
        },
        required: ['nodeUuid', 'components']
      }
    },

    // ==================== 组件移除 ====================
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
            description: '组件的 cid（类型标识），可通过 get_components 获取'
          }
        },
        required: ['nodeUuid', 'componentCid']
      }
    },
    {
      name: 'remove_all_components',
      description: '移除节点上的所有组件',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          keepScripts: {
            type: 'boolean',
            description: '是否保留脚本组件，默认 false'
          }
        },
        required: ['nodeUuid']
      }
    },

    // ==================== 组件查询 ====================
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
      name: 'get_component',
      description: '获取节点上指定类型的组件',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          componentType: {
            type: 'string',
            description: '组件类型'
          }
        },
        required: ['nodeUuid', 'componentType']
      }
    },
    {
      name: 'has_component',
      description: '检查节点是否有指定组件',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          componentType: {
            type: 'string',
            description: '组件类型'
          }
        },
        required: ['nodeUuid', 'componentType']
      }
    },

    // ==================== 组件属性操作 ====================
    {
      name: 'set_component_property',
      description: '设置组件单个属性',
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
    {
      name: 'set_component_properties',
      description: '设置组件多个属性',
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
          properties: {
            type: 'object',
            description: '属性对象'
          }
        },
        required: ['nodeUuid', 'componentCid', 'properties']
      }
    },
    {
      name: 'get_component_property',
      description: '获取组件属性值',
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
          }
        },
        required: ['nodeUuid', 'componentCid', 'property']
      }
    },

    // ==================== 常用组件快捷操作 ====================
    // Sprite
    {
      name: 'set_sprite_sprite',
      description: '设置 Sprite 组件的精灵帧',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          spritePath: {
            type: 'string',
            description: '精灵帧资源路径'
          }
        },
        required: ['nodeUuid', 'spritePath']
      }
    },
    {
      name: 'set_sprite_color',
      description: '设置 Sprite 组件颜色',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          color: {
            type: 'string',
            description: '颜色值，如 #FF0000 或 {r:255,g:0,b:0,a:255}'
          }
        },
        required: ['nodeUuid', 'color']
      }
    },

    // Label
    {
      name: 'set_label_text',
      description: '设置 Label 组件文本',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          text: {
            type: 'string',
            description: '文本内容'
          }
        },
        required: ['nodeUuid', 'text']
      }
    },
    {
      name: 'set_label_font_size',
      description: '设置 Label 组件字体大小',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          fontSize: {
            type: 'number',
            description: '字体大小'
          }
        },
        required: ['nodeUuid', 'fontSize']
      }
    },

    // Button
    {
      name: 'setup_button',
      description: '设置 Button 组件（目标节点、点击事件）',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: 'Button 节点 UUID'
          },
          targetUuid: {
            type: 'string',
            description: '目标节点 UUID（用于视觉反馈）'
          },
          clickEvent: {
            type: 'string',
            description: '点击事件方法名'
          },
          scriptUuid: {
            type: 'string',
            description: '脚本所在节点 UUID'
          }
        },
        required: ['nodeUuid', 'clickEvent']
      }
    },

    // RichText
    {
      name: 'set_rich_text',
      description: '设置 RichText 组件内容',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          content: {
            type: 'string',
            description: '富文本内容，支持 <color=#ff0000>等标签</color>'
          }
        },
        required: ['nodeUuid', 'content']
      }
    },

    // ProgressBar
    {
      name: 'set_progress_bar',
      description: '设置 ProgressBar 组件',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          progress: {
            type: 'number',
            description: '进度值 0-1'
          },
          totalLength: {
            type: 'number',
            description: '总长度'
          }
        },
        required: ['nodeUuid', 'progress']
      }
    },

    // Slider
    {
      name: 'setup_slider',
      description: '设置 Slider 组件',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          min: {
            type: 'number',
            description: '最小值'
          },
          max: {
            type: 'number',
            description: '最大值'
          },
          value: {
            type: 'number',
            description: '当前值'
          }
        },
        required: ['nodeUuid']
      }
    },

    // Toggle
    {
      name: 'setup_toggle',
      description: '设置 Toggle 组件',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          isChecked: {
            type: 'boolean',
            description: '是否勾选'
          },
          checkEvent: {
            type: 'string',
            description: '状态变化事件方法名'
          }
        },
        required: ['nodeUuid']
      }
    },

    // Animation
    {
      name: 'play_animation',
      description: '播放动画',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          clipName: {
            type: 'string',
            description: '动画剪辑名称'
          },
          loop: {
            type: 'boolean',
            description: '是否循环'
          }
        },
        required: ['nodeUuid', 'clipName']
      }
    },
    {
      name: 'stop_animation',
      description: '停止动画',
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

    // Spine
    {
      name: 'set_spine_skeleton',
      description: '设置 Spine 骨骼动画',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          skeletonPath: {
            type: 'string',
            description: '骨骼数据路径'
          },
          animationName: {
            type: 'string',
            description: '动画名称'
          },
          loop: {
            type: 'boolean',
            description: '是否循环'
          }
        },
        required: ['nodeUuid', 'skeletonPath']
      }
    },

    // Particle
    {
      name: 'set_particle',
      description: '设置粒子系统',
      inputSchema: {
        type: 'object',
        properties: {
          nodeUuid: {
            type: 'string',
            description: '节点 UUID'
          },
          particlePath: {
            type: 'string',
            description: '粒子资源路径'
          },
          enabled: {
            type: 'boolean',
            description: '是否启用'
          }
        },
        required: ['nodeUuid', 'particlePath']
      }
    }
  ];
}