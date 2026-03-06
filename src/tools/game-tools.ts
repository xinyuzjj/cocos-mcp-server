/**
 * 游戏开发工具
 * 支持 AI 创建完整游戏项目的高级工具
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export function registerGameTools(): Tool[] {
  return [
    // ==================== 项目模板 ====================
    {
      name: 'create_game_project',
      description: '创建完整的游戏项目模板',
      inputSchema: {
        type: 'object',
        properties: {
          projectName: {
            type: 'string',
            description: '项目名称'
          },
          gameType: {
            type: 'string',
            description: '游戏类型：platformer, shooter, puzzle, rpg, casual',
            enum: ['platformer', 'shooter', 'puzzle', 'rpg', 'casual']
          },
          features: {
            type: 'array',
            description: '功能特性',
            items: {
              type: 'string',
              enum: ['ui', 'physics', 'animation', 'sound', 'network', 'analytics']
            }
          }
        },
        required: ['projectName', 'gameType']
      }
    },
    {
      name: 'init_game_scene',
      description: '初始化游戏主场景',
      inputSchema: {
        type: 'object',
        properties: {
          sceneName: {
            type: 'string',
            description: '场景名称，默认 GameScene'
          },
          includeUI: {
            type: 'boolean',
            description: '是否包含 UI 系统'
          },
          includeCamera: {
            type: 'boolean',
            description: '是否包含摄像机'
          }
        },
        required: []
      }
    },
    {
      name: 'create_game_objects',
      description: '创建游戏对象和系统',
      inputSchema: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: '对象类型：player, enemy, bullet, powerup, platform',
            enum: ['player', 'enemy', 'bullet', 'powerup', 'platform']
          },
          count: {
            type: 'number',
            description: '创建数量'
          }
        },
        required: ['type']
      }
    },

    // ==================== 角色系统 ====================
    {
      name: 'create_player',
      description: '创建玩家角色',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: '玩家名称，默认 Player'
          },
          controllerType: {
            type: 'string',
            description: '控制器类型：platformer, topdown, fps',
            enum: ['platformer', 'topdown', 'fps']
          },
          includePhysics: {
            type: 'boolean',
            description: '是否包含物理系统'
          },
          health: {
            type: 'number',
            description: '初始生命值'
          },
          speed: {
            type: 'number',
            description: '移动速度'
          }
        },
        required: []
      }
    },
    {
      name: 'create_enemy',
      description: '创建敌人',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: '敌人名称，默认 Enemy'
          },
          enemyType: {
            type: 'string',
            description: '敌人类型：simple, patrol, chase, boss',
            enum: ['simple', 'patrol', 'chase', 'boss']
          },
          health: {
            type: 'number',
            description: '生命值'
          },
          damage: {
            type: 'number',
            description: '伤害值'
          },
          speed: {
            type: 'number',
            description: '移动速度'
          }
        },
        required: []
      }
    },

    // ==================== 游戏逻辑 ====================
    {
      name: 'create_game_manager',
      description: '创建游戏管理器脚本',
      inputSchema: {
        type: 'object',
        properties: {
          includeScoring: {
            type: 'boolean',
            description: '是否包含计分系统'
          },
          includeLives: {
            type: 'boolean',
            description: '是否包含生命值系统'
          },
          includePause: {
            type: 'boolean',
            description: '是否包含暂停功能'
          },
          includeGameState: {
            type: 'boolean',
            description: '是否包含游戏状态管理'
          }
        },
        required: []
      }
    },
    {
      name: 'create_score_system',
      description: '创建计分系统',
      inputSchema: {
        type: 'object',
        properties: {
          scoringRules: {
            type: 'array',
            description: '计分规则',
            items: {
              type: 'object',
              properties: {
                action: { type: 'string' },
                points: { type: 'number' }
              }
            }
          },
          highScoreEnabled: {
            type: 'boolean',
            description: '是否启用最高分记录'
          }
        },
        required: []
      }
    },
    {
      name: 'create_level_system',
      description: '创建关卡系统',
      inputSchema: {
        type: 'object',
        properties: {
          levelCount: {
            type: 'number',
            description: '关卡数量'
          },
          includeProgression: {
            type: 'boolean',
            description: '是否包含进度系统'
          },
          includeDifficulty: {
            type: 'boolean',
            description: '是否包含难度系统'
          }
        },
        required: []
      }
    },

    // ==================== UI 系统 ====================
    {
      name: 'create_game_ui',
      description: '创建游戏 UI 系统',
      inputSchema: {
        type: 'object',
        properties: {
          includeHUD: {
            type: 'boolean',
            description: '是否包含 HUD'
          },
          includePauseMenu: {
            type: 'boolean',
            description: '是否包含暂停菜单'
          },
          includeGameOver: {
            type: 'boolean',
            description: '是否包含游戏结束界面'
          },
          includeSettings: {
            type: 'boolean',
            description: '是否包含设置界面'
          }
        },
        required: []
      }
    },
    {
      name: 'setup_camera',
      description: '设置摄像机系统',
      inputSchema: {
        type: 'object',
        properties: {
          cameraType: {
            type: 'string',
            description: '摄像机类型：follow, fixed, dynamic',
            enum: ['follow', 'fixed', 'dynamic']
          },
          followTarget: {
            type: 'string',
            description: '跟随目标节点 UUID'
          },
          smoothing: {
            type: 'number',
            description: '平滑度'
          },
          bounds: {
            type: 'object',
            description: '边界限制'
          }
        },
        required: ['cameraType']
      }
    },

    // ==================== 动画系统 ====================
    {
      name: 'create_animation_controller',
      description: '创建动画控制器',
      inputSchema: {
        type: 'object',
        properties: {
          for: {
            type: 'string',
            description: '动画对象：player, enemy, collectible',
            enum: ['player', 'enemy', 'collectible']
          },
          animations: {
            type: 'array',
            description: '动画列表：idle, walk, run, jump, attack, death',
            items: { type: 'string' }
          },
          includeTransitions: {
            type: 'boolean',
            description: '是否包含动画过渡'
          }
        },
        required: ['for']
      }
    },
    {
      name: 'setup_animation_events',
      description: '设置动画事件',
      inputSchema: {
        type: 'object',
        properties: {
          onEnter: {
            type: 'string',
            description: '进入动画时触发的方法'
          },
          onLoop: {
            type: 'string',
            description: '循环动画时触发的方法'
          },
          onExit: {
            type: 'string',
            description: '退出动画时触发的方法'
          },
          customEvents: {
            type: 'array',
            description: '自定义事件'
          }
        },
        required: []
      }
    },

    // ==================== 特效系统 ====================
    {
      name: 'create_particle_system',
      description: '创建粒子系统',
      inputSchema: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: '粒子类型：fire, explosion, smoke, spark, rain',
            enum: ['fire', 'explosion', 'smoke', 'spark', 'rain']
          },
          position: {
            type: 'object',
            description: '位置'
          },
          duration: {
            type: 'number',
            description: '持续时间（秒）'
          },
          autoDestroy: {
            type: 'boolean',
            description: '是否自动销毁'
          }
        },
        required: ['type']
      }
    },
    {
      name: 'setup_effects',
      description: '设置特效系统',
      inputSchema: {
        type: 'object',
        properties: {
          includeDamage: {
            type: 'boolean',
            description: '是否包含伤害特效'
          },
          includeExplosion: {
            type: 'boolean',
            description: '是否包含爆炸特效'
          },
          includeCollect: {
            type: 'boolean',
            description: '是否包含收集特效'
          }
        },
        required: []
      }
    },

    // ==================== 物理系统 ====================
    {
      name: 'setup_physics',
      description: '设置物理系统',
      inputSchema: {
        type: 'object',
        properties: {
          gravity: {
            type: 'number',
            description: '重力值'
          },
          includeCollision: {
            type: 'boolean',
            description: '是否包含碰撞系统'
          },
          includeRigidBodies: {
            type: 'boolean',
            description: '是否包含刚体系统'
          }
        },
        required: []
      }
    },
    {
      name: 'setup_collision',
      description: '设置碰撞系统',
      inputSchema: {
        type: 'object',
        properties: {
          playerLayer: {
            type: 'number',
            description: '玩家层'
          },
          enemyLayer: {
            type: 'number',
            description: '敌人层'
          },
          groundLayer: {
            type: 'number',
            description: '地面层'
          },
          collectibleLayer: {
            type: 'number',
            description: '收集物层'
          }
        },
        required: []
      }
    },

    // ==================== 音频系统 ====================
    {
      name: 'setup_audio',
      description: '设置音频系统',
      inputSchema: {
        type: 'object',
        properties: {
          includeMusic: {
            type: 'boolean',
            description: '是否包含背景音乐'
          },
          includeSFX: {
            type: 'boolean',
            description: '是否包含音效'
          },
          masterVolume: {
            type: 'number',
            description: '主音量'
          }
        },
        required: []
      }
    },
    {
      name: 'create_audio_manager',
      description: '创建音频管理器',
      inputSchema: {
        type: 'object',
        properties: {
          defaultMusic: {
            type: 'string',
            description: '默认背景音乐'
          },
          musicVolume: {
            type: 'number',
            description: '音乐音量'
          },
          sfxVolume: {
            type: 'number',
            description: '音效音量'
          }
        },
        required: []
      }
    },

    // ==================== 游戏配置 ====================
    {
      name: 'setup_game_config',
      description: '设置游戏配置',
      inputSchema: {
        type: 'object',
        properties: {
          gameTitle: {
            type: 'string',
            description: '游戏标题'
          },
          version: {
            type: 'string',
            description: '版本号'
          },
          author: {
            type: 'string',
            description: '作者'
          },
          description: {
            type: 'string',
            description: '游戏描述'
          }
        },
        required: ['gameTitle']
      }
    },
    {
      name: 'export_game_config',
      description: '导出游戏配置',
      inputSchema: {
        type: 'object',
        properties: {
          format: {
            type: 'string',
            description: '格式：json, yaml, xml',
            enum: ['json', 'yaml', 'xml']
          },
          path: {
            type: 'string',
            description: '导出路径'
          }
        },
        required: []
      }
    },

    // ==================== 项目收尾 ====================
    {
      name: 'check_project',
      description: '检查项目完整性',
      inputSchema: {
        type: 'object',
        properties: {
          include: {
            type: 'array',
            description: '检查项：scenes, scripts, assets, ui, physics',
            items: { type: 'string' }
          }
        },
        required: []
      }
    },
    {
      name: 'build_and_test',
      description: '构建和测试项目',
      inputSchema: {
        type: 'object',
        properties: {
          platform: {
            type: 'string',
            description: '测试平台：web, android, ios, desktop',
            enum: ['web', 'android', 'ios', 'desktop']
          },
          includeTests: {
            type: 'boolean',
            description: '是否包含测试'
          }
        },
        required: []
      }
    }
  ];
}