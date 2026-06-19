/**
 * 剧情数据 - 凤鸣九霄（完整版）
 * 原创宫斗互动剧情 · 丰富版
 */
window.STORY_DATA = {
  config: {
    title: '凤鸣九霄',
    subtitle: '一入宫门深似海',
    author: '原型演示',
    values: {
      favor: { type: 'number', default: 10, desc: '恩宠值' },
      courage: { type: 'number', default: 5, desc: '勇气值' },
      wisdom: { type: 'number', default: 5, desc: '智慧值' },
      charm: { type: 'number', default: 5, desc: '魅力值' },
      name: { type: 'string', default: '苏婉清', desc: '角色名' },
      background: { type: 'string', default: '官家', desc: '出身' },
      hasTeaSkill: { type: 'number', default: 0, desc: '茶艺技能' },
      metPrincess: { type: 'number', default: 0, desc: '是否遇到公主' },
      knowsPlot: { type: 'number', default: 0, desc: '是否知晓阴谋' },
      survivedYears: { type: 'number', default: 0, desc: '存活年数' },
      helpedMaid: { type: 'number', default: 0, desc: '是否帮助宫女' },
      attendedBanquet: { type: 'number', default: 0, desc: '是否参加宴会' },
      foundSecret: { type: 'number', default: 0, desc: '发现秘密' },
      trustQueen: { type: 'number', default: 0, desc: '皇后信任' },
      offendedLi: { type: 'number', default: 0, desc: '得罪李贵人' }
    },
    arrays: {
      allies: { default: [], desc: '盟友列表' },
      enemies: { default: [], desc: '敌人列表' },
      items: { default: [], desc: '持有物品' }
    }
  },

  chapters: [
    { id: 'ch1', name: '第一章：入宫', scenes: ['scene_001','scene_002','scene_003','scene_004','scene_005'] },
    { id: 'ch2', name: '第二章：初识', scenes: ['scene_006','scene_007','scene_008','scene_009'] },
    { id: 'ch3', name: '第三章：风波', scenes: ['scene_010','scene_011','scene_012','scene_013','scene_014'] },
    { id: 'ch4', name: '第四章：抉择', scenes: ['scene_015','scene_016','scene_017','scene_018'] },
    { id: 'ch5', name: '终章', scenes: ['scene_end1','scene_end2','scene_end3','scene_end4'] }
  ],

  scenes: {
    // ==================== 第一章：入宫 ====================
    scene_001: {
      name: '开篇',
      commands: [
        { type: 'transition', duration: 800 },
        { type: 'bg', src: 'assets/bg/palace_gate.svg', transition: 'fade' },
        { type: 'chapterTitle', text: '第一章\n入 宫' },
        { type: 'narration', text: '大业三年，秋。\n\n天下初定，百废待兴。\n新帝登基三年，广选秀女，以充后宫。' },
        { type: 'narration', text: '你，苏婉清，出身书香门第。\n父亲官至五品，虽非显赫，却也清贵。\n一纸诏书，你踏入了这座吞噬无数女子青春的深宫。' },
        { type: 'narration', text: '马车在宫门前停下。\n你掀开帘子，望着那朱红色的宫门，心中五味杂陈。' },
        { type: 'narration', text: '身后是生养你十六年的家，\n身前是未知的命运。\n你深吸一口气，踏出了马车。' },
        {
          type: 'option',
          options: [
            {
              text: '心中忐忑，但仍怀希望',
              actions: [
                { type: 'set', name: 'mood', value: 'hopeful' },
                { type: 'modify', name: 'courage', op: '+', value: 3 },
                { type: 'narration', text: '你告诉自己：既来之，则安之。\n或许，这深宫之中，也有值得期待的东西。' }
              ]
            },
            {
              text: '淡然处之，听天由命',
              actions: [
                { type: 'set', name: 'mood', value: 'calm' },
                { type: 'modify', name: 'wisdom', op: '+', value: 3 },
                { type: 'narration', text: '你神色平静，仿佛只是赴一场寻常的宴席。\n在这深宫之中，喜怒不形于色，便是最好的保护。' }
              ]
            },
            {
              text: '暗下决心，绝不屈居人下',
              actions: [
                { type: 'set', name: 'mood', value: 'determined' },
                { type: 'modify', name: 'courage', op: '+', value: 5 },
                { type: 'modify', name: 'favor', op: '-', value: 2 },
                { type: 'narration', text: '你攥紧了袖中的手。\n既然入了这道门，便不能再回头。\n你要活下去，而且要活得好。' }
              ]
            }
          ]
        },
        { type: 'narration', text: '巍峨的宫门在眼前缓缓打开。\n红墙黄瓦，雕梁画栋，气势恢宏。\n远处传来编钟之声，庄严肃穆。' },
        { type: 'narration', text: '数十名秀女鱼贯而入，\n每个人都怀着不同的心思，\n走向那未知的命运。' },
        { type: 'jump', target: 'scene_002' }
      ]
    },

    scene_002: {
      name: '秀女教习',
      commands: [
        { type: 'bg', src: 'assets/bg/courtyard.svg', transition: 'fade' },
        { type: 'narration', text: '入宫第一日，你们被带到一处偏殿。\n一位面容严肃的老嬷嬷站在堂前，扫视众人。' },
        { type: 'text', speaker: '嬷嬷', text: '各位小主，老奴姓周，负责教导各位宫中规矩。' },
        { type: 'text', speaker: '周嬷嬷', text: '宫中规矩多，行止坐卧皆有章法。\n轻则呵斥，重则杖责。\n各位小主，可要记仔细了。' },
        { type: 'narration', text: '众秀女齐声应是，声音却微微发颤。' },
        { type: 'text', speaker: '周嬷嬷', text: '面圣之前，容老奴多说几句。\n皇上最重才学，若有什么才艺，不妨展示一二。' },
        { type: 'text', speaker: '周嬷嬷', text: '但切记——\n锋芒太露未必是好事，过于木讷也讨不了好。\n其中分寸，各位小主自己把握。' },
        {
          type: 'option',
          options: [
            {
              text: '「我善琴艺，可否展示？」',
              actions: [
                { type: 'modify', name: 'favor', op: '+', value: 5 },
                { type: 'modify', name: 'wisdom', op: '+', value: 2 },
                { type: 'narration', text: '嬷嬷微微点头，记下了你的才艺。\n「琴艺好，皇上也爱听琴。」' }
              ]
            },
            {
              text: '「我略通诗书，可否应对？」',
              actions: [
                { type: 'modify', name: 'wisdom', op: '+', value: 5 },
                { type: 'modify', name: 'favor', op: '+', value: 2 },
                { type: 'narration', text: '嬷嬷眼中闪过一丝赞赏。\n「读书识字的女子，倒是少见。」' }
              ]
            },
            {
              text: '低头不语，安静等待',
              actions: [
                { type: 'modify', name: 'courage', op: '-', value: 2 },
                { type: 'modify', name: 'wisdom', op: '+', value: 3 },
                { type: 'narration', text: '你选择沉默。\n在这深宫之中，锋芒毕露未必是好事。\n嬷嬷看了你一眼，没有多说什么。' }
              ]
            }
          ]
        },
        { type: 'narration', text: '教习持续了一整日。\n从行礼问安，到用膳就寝，事无巨细，皆有规矩。' },
        { type: 'narration', text: '夜幕降临，你独自坐在分配的厢房中。\n窗外月色如水，远处隐约传来更鼓之声。' },
        { type: 'narration', text: '从今往后，你便是这深宫中的一枚棋子。\n是随波逐流，还是逆流而上？' },
        { type: 'transition', duration: 800 },
        { type: 'jump', target: 'scene_003' }
      ]
    },

    scene_003: {
      name: '面圣',
      commands: [
        { type: 'bg', src: 'assets/bg/throne.svg', transition: 'fade' },
        { type: 'chapterTitle', text: '面 圣' },
        { type: 'narration', text: '三日后，选秀正式开始。\n你排在第七位，等候传召。' },
        { type: 'narration', text: '金碧辉煌的大殿之上，龙椅高悬。\n年轻的帝王端坐其上，目光如炬。' },
        { type: 'narration', text: '他看上去不过二十出头，\n眉宇间却有着超越年龄的沉稳。\n那双眼睛深邃如潭，仿佛能看透人心。' },
        { type: 'text', speaker: '太监', text: '传——苏氏婉清——' },
        { type: 'narration', text: '你深吸一口气，缓步走上前去。\n按照嬷嬷教的规矩，行三跪九叩之礼。' },
        { type: 'text', speaker: '皇帝', text: '抬起头来。' },
        { type: 'narration', text: '你缓缓抬头，与那双深邃的眼眸对视。\n他的目光在你脸上停留了片刻。' },
        {
          type: 'condition',
          condition: (vars) => vars.get('favor') >= 15,
          then: [
            { type: 'text', speaker: '皇帝', text: '嗯，倒是个清秀的。可有什么才学？' },
            {
              type: 'condition',
              condition: (vars) => vars.get('wisdom') >= 8,
              then: [
                { type: 'text', speaker: '你', text: '回陛下，臣女略通诗书，也习过几年琴艺。' },
                { type: 'text', speaker: '皇帝', text: '哦？倒是个有心的。' },
                { type: 'text', speaker: '皇帝', text: '留牌子，赐香囊。' },
                { type: 'modify', name: 'favor', op: '+', value: 10 },
                { type: 'modify', name: 'charm', op: '+', value: 5 },
                { type: 'narration', text: '太监高声唱道："苏氏婉清，留牌赐香！"\n你心中一松，却不敢表露分毫。' }
              ],
              else: [
                { type: 'text', speaker: '你', text: '回陛下，臣女不才，只知些女红针黹。' },
                { type: 'text', speaker: '皇帝', text: '嗯，也罢。留牌子吧。' },
                { type: 'modify', name: 'favor', op: '+', value: 3 },
                { type: 'narration', text: '虽不算出众，但总算是留了下来。' }
              ]
            }
          ],
          else: [
            { type: 'text', speaker: '皇帝', text: '……也留吧。' },
            { type: 'narration', text: '皇帝的语气平淡，显然并未十分在意。\n但无论如何，你已入了这深宫。' }
          ]
        },
        { type: 'narration', text: '选秀结束，你被分配到东六宫的延禧宫。\n位份虽低，却也总算有了立足之地。' },
        { type: 'narration', text: '一同入宫的秀女共十二人，\n分别被赐封为才人、美人、贵人不等。\n你的封号是——婉才人。' },
        { type: 'jump', target: 'scene_004' }
      ]
    },

    scene_004: {
      name: '初入延禧宫',
      commands: [
        { type: 'bg', src: 'assets/bg/courtyard.svg', transition: 'fade' },
        { type: 'narration', text: '延禧宫，虽不及坤宁、翊坤那般气派，却也清幽雅致。\n院中一株老槐树，枝叶婆娑。' },
        { type: 'narration', text: '正殿住着一位王贵人，入宫已有两年，性子温和。\n东厢房是你的住处，西厢房还空着。' },
        { type: 'text', speaker: '宫女', text: '小主安好，奴婢叫春桃，是延禧宫的管事宫女。' },
        { type: 'text', speaker: '春桃', text: '这位是夏荷，那位是秋菊，她们是伺候小主的贴身宫女。' },
        { type: 'narration', text: '两个十四五岁的女孩齐齐行礼，面容清秀。' },
        { type: 'text', speaker: '春桃', text: '宫中还有几位小主与您同住，改日再去拜会便是。\n对了，西边承乾宫的李贵人，最是跋扈，小主离她远些。' },
        {
          type: 'option',
          options: [
            {
              text: '「多谢春桃姐姐提醒，我记下了。」',
              actions: [
                { type: 'modify', name: 'wisdom', op: '+', value: 3 },
                { type: 'text', speaker: '春桃', text: '小主客气了。有什么事，尽管吩咐奴婢。' },
                { type: 'exec', fn: (vars) => { vars.arrays.allies.push('春桃'); } }
              ]
            },
            {
              text: '「你跟了我，我自不会亏待你。」',
              actions: [
                { type: 'modify', name: 'courage', op: '+', value: 2 },
                { type: 'narration', text: '春桃眼中闪过一丝意外，随即跪下磕头。' },
                { type: 'text', speaker: '春桃', text: '奴婢谢小主信任，定当尽心伺候！' },
                { type: 'exec', fn: (vars) => { vars.arrays.allies.push('春桃'); } }
              ]
            },
            {
              text: '「这宫里，可有什么有趣的事？」',
              actions: [
                { type: 'modify', name: 'charm', op: '+', value: 2 },
                { type: 'text', speaker: '春桃', text: '有趣的事？嗯……御花园的花开得正好，\n太后娘娘也常去赏花呢。' },
                { type: 'text', speaker: '春桃', text: '对了，听说皇上这几日也常去御花园。\n小主若是碰上了，可要好好表现。' }
              ]
            }
          ]
        },
        { type: 'narration', text: '入宫第一夜，你辗转难眠。\n窗外月色如水，远处隐约传来更鼓之声。' },
        { type: 'narration', text: '你想起白日里皇帝的那双眼睛，\n深邃、锐利，仿佛能看透一切。\n在他面前，你无所遁形。' },
        { type: 'narration', text: '从今往后，你便是这深宫中的一枚棋子。\n是随波逐流，还是逆流而上？' },
        { type: 'transition', duration: 1000 },
        { type: 'jump', target: 'scene_005' }
      ]
    },

    scene_005: {
      name: '晨昏定省',
      commands: [
        { type: 'bg', src: 'assets/bg/hall.svg', transition: 'fade' },
        { type: 'narration', text: '入宫第三日，开始晨昏定省。\n每日卯时起身，前往坤宁宫向皇后请安。' },
        { type: 'narration', text: '坤宁宫内，皇后端坐正中，\n凤冠霞帔，端庄威严。\n两侧坐着各宫妃嫔，环肥燕瘦，各有千秋。' },
        { type: 'text', speaker: '皇后', text: '都起来吧。' },
        { type: 'narration', text: '皇后的声音温和却不失威严。\n她扫视众人，目光在你身上停留了一瞬。' },
        { type: 'text', speaker: '皇后', text: '新来的几位妹妹，本宫有几句话要说。' },
        { type: 'text', speaker: '皇后', text: '在这后宫之中，最重要的是安分守己。\n本宫不求你们多有出息，只求你们别惹事。' },
        { type: 'narration', text: '话音刚落，一个妖娆的声音响起。' },
        { type: 'text', speaker: '李贵人', text: '皇后娘娘说得是。\n不过有些人啊，初来乍到的，可别以为得了几天好脸色，就不知道自己几斤几两了。' },
        { type: 'narration', text: '你感到一道目光落在你身上，带着几分不善。\n说话的是承乾宫的李贵人，容貌艳丽，眼角微挑。' },
        {
          type: 'option',
          options: [
            {
              text: '低头不语，装作没听见',
              actions: [
                { type: 'modify', name: 'wisdom', op: '+', value: 3 },
                { type: 'narration', text: '你选择了沉默。\n在这深宫之中，示弱有时候也是一种智慧。' }
              ]
            },
            {
              text: '微微一笑，不卑不亢',
              actions: [
                { type: 'modify', name: 'courage', op: '+', value: 3 },
                { type: 'modify', name: 'charm', op: '+', value: 2 },
                { type: 'narration', text: '你微微一笑，神色平静。\n李贵人眼中闪过一丝意外。' }
              ]
            },
            {
              text: '直视李贵人，目光坦然',
              actions: [
                { type: 'modify', name: 'courage', op: '+', value: 5 },
                { type: 'modify', name: 'offendedLi', op: '+', value: 1 },
                { type: 'narration', text: '你直视李贵人，目光坦然。\n她微微一愣，随即冷哼一声。' },
                { type: 'exec', fn: (vars) => { if (!vars.arrays.enemies.includes('李贵人')) vars.arrays.enemies.push('李贵人'); } }
              ]
            }
          ]
        },
        { type: 'text', speaker: '皇后', text: '好了，都散了吧。\n新来的妹妹们，好好歇着。' },
        { type: 'narration', text: '请安结束后，你随众人退出坤宁宫。\n春桃在门口等你。' },
        { type: 'text', speaker: '春桃', text: '小主，方才李贵人那话……您别往心里去。\n她这人就这样，仗着皇上宠爱，谁都看不上。' },
        { type: 'narration', text: '你点了点头，心中却暗暗记下了这个人。\n在这深宫之中，每一個人都可能是敌人，也可能是盟友。' },
        { type: 'transition', duration: 800 },
        { type: 'jump', target: 'scene_006' }
      ]
    },

    // ==================== 第二章：初识 ====================
    scene_006: {
      name: '御花园',
      commands: [
        { type: 'chapterTitle', text: '第二章\n初 识' },
        { type: 'bg', src: 'assets/bg/garden.svg', transition: 'fade' },
        { type: 'narration', text: '入宫半月，你逐渐适应了宫中的生活。\n每日晨昏定省，循规蹈矩。' },
        { type: 'narration', text: '这一日，春光明媚，你信步来到御花园。\n园中百花盛开，蝶舞蜂飞。' },
        { type: 'narration', text: '你正赏花间，忽闻一阵琴声。\n那琴声如泣如诉，婉转悠扬，却又带着几分说不出的凄凉。' },
        {
          type: 'option',
          options: [
            {
              text: '循声而去，一探究竟',
              actions: [
                { type: 'modify', name: 'courage', op: '+', value: 3 },
                { type: 'modify', name: 'metPrincess', op: '+', value: 1 }
              ],
              jump: 'scene_007a'
            },
            {
              text: '悄悄离开，莫惹是非',
              actions: [
                { type: 'modify', name: 'wisdom', op: '+', value: 3 }
              ],
              jump: 'scene_007b'
            },
            {
              text: '循声而去，但保持距离',
              actions: [
                { type: 'modify', name: 'wisdom', op: '+', value: 2 },
                { type: 'modify', name: 'courage', op: '+', value: 1 }
              ],
              jump: 'scene_007c'
            }
          ]
        }
      ]
    },

    scene_007a: {
      name: '御花园·遇公主',
      commands: [
        { type: 'bg', src: 'assets/bg/pavilion.svg', transition: 'fade' },
        { type: 'narration', text: '你循着琴声，来到一座假山后的小亭。\n亭中一位女子正在抚琴，衣着素雅，却难掩高贵之气。' },
        { type: 'text', speaker: '女子', text: '……你是谁？为何在此偷听？' },
        { type: 'narration', text: '她停下琴声，目光警惕地看向你。' },
        {
          type: 'option',
          options: [
            {
              text: '「臣女苏婉清，被琴声吸引而来。冒犯之处，还请恕罪。」',
              actions: [
                { type: 'modify', name: 'favor', op: '+', value: 5 },
                { type: 'text', speaker: '女子', text: '……你倒是坦诚。' },
                { type: 'narration', text: '她的神色稍缓，重新拨弄琴弦。' },
                { type: 'text', speaker: '女子', text: '我叫赵灵溪，是……皇帝的妹妹。你叫我灵溪便好。' },
                { type: 'narration', text: '竟是当朝公主！你连忙行礼。' },
                { type: 'text', speaker: '赵灵溪', text: '不必多礼。你……会弹琴吗？' },
                { type: 'text', speaker: '你', text: '略知一二。' },
                { type: 'text', speaker: '赵灵溪', text: '那改日来陪我弹一曲吧。\n这宫里，能说话的人不多。' },
                { type: 'exec', fn: (vars) => { vars.arrays.allies.push('赵灵溪'); } }
              ]
            },
            {
              text: '「臣女失礼，这就告退。」',
              actions: [
                { type: 'text', speaker: '女子', text: '等等。' },
                { type: 'narration', text: '你停下脚步。' },
                { type: 'text', speaker: '女子', text: '你叫什么名字？' },
                { type: 'text', speaker: '你', text: '臣女苏婉清。' },
                { type: 'text', speaker: '女子', text: '苏婉清……好名字。\n我叫赵灵溪，改日来找我玩吧。' },
                { type: 'narration', text: '她报上名号，竟是当朝公主！' },
                { type: 'exec', fn: (vars) => { vars.arrays.allies.push('赵灵溪'); } }
              ]
            }
          ]
        },
        { type: 'narration', text: '离开时，你回头望了一眼。\n那位公主的背影，竟有几分落寞。' },
        { type: 'narration', text: '身为公主，却独自在御花园抚琴。\n这深宫之中，人人都有说不出的苦。' },
        { type: 'jump', target: 'scene_008' }
      ]
    },

    scene_007b: {
      name: '御花园·避开',
      commands: [
        { type: 'narration', text: '你决定不去打扰。\n在这深宫之中，多一事不如少一事。' },
        { type: 'narration', text: '回到延禧宫，春桃迎上来。' },
        { type: 'text', speaker: '春桃', text: '小主，方才李贵人派人来传话，说是要请您过去坐坐。' },
        {
          type: 'condition',
          condition: (vars) => vars.get('wisdom') >= 8,
          then: [
            { type: 'text', speaker: '你', text: '李贵人？她平日里与我并无交集，突然相邀，怕是没安好心。' },
            { type: 'text', speaker: '春桃', text: '小主英明。那李贵人素来跋扈，怕是要给小主一个下马威。' },
            { type: 'text', speaker: '你', text: '就说我不舒服，改日再访。' },
            { type: 'narration', text: '你决定暂避锋芒。在这宫里，示弱有时候也是一种智慧。' }
          ],
          else: [
            { type: 'text', speaker: '你', text: '好，我这就去。' },
            { type: 'narration', text: '你来到承乾宫，李贵人正在品茶。' },
            { type: 'text', speaker: '李贵人', text: '哟，苏妹妹来了。坐，尝尝这新进贡的碧螺春。' },
            { type: 'narration', text: '她笑得亲切，可眼底的傲慢却掩饰不住。' },
            { type: 'text', speaker: '李贵人', text: '妹妹初入宫，有什么不懂的，尽管来问姐姐。\n姐姐在这宫里，也算说得上话。' },
            { type: 'narration', text: '话虽如此，你却听出了几分居高临下的意味。' },
            { type: 'modify', name: 'favor', op: '-', value: 3 }
          ]
        },
        { type: 'jump', target: 'scene_008' }
      ]
    },

    scene_007c: {
      name: '御花园·远观',
      commands: [
        { type: 'narration', text: '你循着琴声，却不敢靠得太近。\n只是远远地望着那座小亭。' },
        { type: 'narration', text: '亭中女子一袭白衣，长发如瀑。\n指尖在琴弦上跳跃，如泣如诉。' },
        { type: 'narration', text: '忽然，一阵风吹落了你手中的帕子。\n帕子随风飘向那座小亭。' },
        { type: 'text', speaker: '女子', text: '这是……谁的帕子？' },
        { type: 'narration', text: '她拾起帕子，向你望来。' },
        { type: 'text', speaker: '你', text: '臣女失礼，那是臣女的帕子。' },
        { type: 'text', speaker: '女子', text: '过来拿吧。\n我又不是什么吃人的妖怪。' },
        { type: 'narration', text: '你走上前去，接过帕子。\n近距离看，这位女子果然气质不凡。' },
        { type: 'text', speaker: '女子', text: '你叫什么？' },
        { type: 'text', speaker: '你', text: '臣女苏婉清。' },
        { type: 'text', speaker: '女子', text: '我叫赵灵溪。下次想听琴，就过来坐坐。\n不必远远站着，像是我欺负了你似的。' },
        { type: 'narration', text: '她嘴角微微上扬，竟有几分俏皮。\n你这才发现，这位公主并没有想象中那么高冷。' },
        { type: 'exec', fn: (vars) => { vars.arrays.allies.push('赵灵溪'); } },
        { type: 'jump', target: 'scene_008' }
      ]
    },

    scene_008: {
      name: '宫中日常',
      commands: [
        { type: 'bg', src: 'assets/bg/hall.svg', transition: 'fade' },
        { type: 'narration', text: '入宫一月，你已渐渐摸清了后宫的局势。' },
        { type: 'narration', text: '皇后赵氏，出身名门，端庄贤淑，育有大皇子。\n贵妃柳氏，美艳动人，深得圣宠，育有二皇子。\n淑妃沈氏，温婉贤良，掌管六宫事务。' },
        { type: 'narration', text: '而你，不过是个小小的才人，\n在这后宫的棋盘上，连一颗棋子都算不上。' },
        { type: 'narration', text: '这一日，你正在房中绣花，\n忽然听到外面传来一阵喧哗。' },
        { type: 'text', speaker: '夏荷', text: '小主，不好了！\n御花园里出事了！' },
        { type: 'narration', text: '你放下绣绷，快步走出房门。\n只见远处御花园方向，隐隐有人群聚集。' },
        {
          type: 'option',
          options: [
            {
              text: '赶去御花园看个究竟',
              actions: [
                { type: 'modify', name: 'courage', op: '+', value: 3 },
                { type: 'modify', name: 'foundSecret', op: '+', value: 1 }
              ],
              jump: 'scene_009a'
            },
            {
              text: '先打听清楚发生了什么',
              actions: [
                { type: 'modify', name: 'wisdom', op: '+', value: 3 }
              ],
              jump: 'scene_009b'
            },
            {
              text: '待在房中，不趟浑水',
              actions: [
                { type: 'modify', name: 'wisdom', op: '+', value: 1 },
                { type: 'modify', name: 'courage', op: '-', value: 2 }
              ],
              jump: 'scene_009c'
            }
          ]
        }
      ]
    },

    scene_009a: {
      name: '御花园事件·亲临',
      commands: [
        { type: 'bg', src: 'assets/bg/garden.svg', transition: 'fade' },
        { type: 'narration', text: '你赶到御花园，只见一群宫女太监围在一起。\n中间躺着一个昏迷的宫女，脸色苍白。' },
        { type: 'text', speaker: '宫女', text: '秋菊姐姐怎么了？\n好好的怎么会突然晕倒？' },
        { type: 'narration', text: '你认出那个宫女，正是延禧宫的秋菊。\n她平日里沉默寡言，做事勤恳。' },
        { type: 'narration', text: '你蹲下身，探了探她的鼻息。\n还有呼吸，但十分微弱。' },
        { type: 'text', speaker: '你', text: '快，去请太医！\n把她扶到阴凉处，先喂些水。' },
        { type: 'narration', text: '众人手忙脚乱地行动起来。\n你注意到秋菊的手心里，紧紧攥着什么东西。' },
        { type: 'narration', text: '你轻轻掰开她的手指，\n发现是一张揉皱的纸条。' },
        { type: 'narration', text: '纸条上写着几个字：\n"事不可泄，速速离开。"' },
        { type: 'narration', text: '你心中一惊，迅速将纸条藏入袖中。\n这件事，绝不简单。' },
        { type: 'exec', fn: (vars) => { vars.set('foundSecret', 1); } },
        { type: 'narration', text: '太医赶来，将秋菊抬走救治。\n你望着她苍白的脸，心中隐隐不安。' },
        { type: 'jump', target: 'scene_010' }
      ]
    },

    scene_009b: {
      name: '御花园事件·打听',
      commands: [
        { type: 'narration', text: '你没有贸然前往，而是拉住一个路过的宫女询问。' },
        { type: 'text', speaker: '你', text: '这位姐姐，御花园出了什么事？' },
        { type: 'text', speaker: '宫女', text: '听说是延禧宫的一个宫女晕倒了。\n好像是中了暑，也有人说是吃了什么不干净的东西。' },
        { type: 'narration', text: '你心中一紧。延禧宫的宫女？\n莫非是秋菊？' },
        { type: 'text', speaker: '你', text: '可请了太医？' },
        { type: 'text', speaker: '宫女', text: '请了，请了。\n不过听说……事情没那么简单。' },
        { type: 'narration', text: '那宫女压低声音，左右看了看。' },
        { type: 'text', speaker: '宫女', text: '有人说，是被人下了毒。\n不过这话可别乱说，小心惹祸上身。' },
        { type: 'narration', text: '你谢过那宫女，心中却掀起了波澜。\n下毒？在这后宫之中，果然暗流涌动。' },
        { type: 'exec', fn: (vars) => { vars.set('foundSecret', 1); } },
        { type: 'jump', target: 'scene_010' }
      ]
    },

    scene_009c: {
      name: '御花园事件·旁观',
      commands: [
        { type: 'narration', text: '你选择待在房中。\n在这深宫之中，好奇心往往是最危险的东西。' },
        { type: 'narration', text: '过了一阵，春桃回来了，脸色有些不好。' },
        { type: 'text', speaker: '春桃', text: '小主，秋菊出事了。\n在御花园晕倒了，现在在太医院。' },
        { type: 'text', speaker: '你', text: '怎么回事？' },
        { type: 'text', speaker: '春桃', text: '说是中了暑。\n不过……奴婢听说，可能是被人下了毒。' },
        { type: 'narration', text: '你心中一惊，却没有表露出来。' },
        { type: 'text', speaker: '你', text: '这件事，你我知道就好。\n不要到处乱说。' },
        { type: 'text', speaker: '春桃', text: '是，小主。' },
        { type: 'narration', text: '你望着窗外，心中思绪万千。\n下毒……这后宫之中，果然暗流涌动。' },
        { type: 'jump', target: 'scene_010' }
      ]
    },

    // ==================== 第三章：风波 ====================
    scene_010: {
      name: '第三章开篇',
      commands: [
        { type: 'chapterTitle', text: '第三章\n风 波' },
        { type: 'bg', src: 'assets/bg/palace_night.svg', transition: 'fade' },
        { type: 'narration', text: '入宫三月，一场突如其来的风波打破了平静。\n秋菊中毒之事，在后宫掀起轩然大波。' },
        { type: 'narration', text: '皇后下令彻查，\n一时间，宫中人心惶惶。\n各方势力蠢蠢欲动。' },
        { type: 'narration', text: '你手中那张纸条，一直贴身藏着。\n"事不可泄，速速离开。"\n这句话是什么意思？是谁写的？' },
        {
          type: 'condition',
          condition: (vars) => vars.get('foundSecret') === 1,
          then: [
            { type: 'narration', text: '你决定暗中调查这件事。\n或许，这背后隐藏着更大的阴谋。' },
            { type: 'jump', target: 'scene_011a' }
          ],
          else: [
            { type: 'narration', text: '你虽然没有直接卷入，\n但直觉告诉你，这件事绝非表面那么简单。' },
            { type: 'jump', target: 'scene_011b' }
          ]
        }
      ]
    },

    scene_011a: {
      name: '暗中调查',
      commands: [
        { type: 'bg', src: 'assets/bg/night.svg', transition: 'fade' },
        { type: 'narration', text: '夜深人静，你悄悄来到御花园。\n月光如水，照在那座假山上，投下斑驳的影子。' },
        { type: 'narration', text: '你蹲下身，在假山附近的花丛中仔细搜寻。\n果然，在一丛灌木下，你发现了一个小瓷瓶。' },
        { type: 'narration', text: '瓷瓶中残留着一些粉末，散发着淡淡的苦杏仁味。\n你虽然不懂医术，但也知道这不是什么好东西。' },
        { type: 'narration', text: '忽然，远处传来脚步声。\n你连忙将瓷瓶藏入袖中，躲到假山后面。' },
        { type: 'narration', text: '两个黑影匆匆走过，低声交谈着什么。\n你屏住呼吸，努力听清他们的话。' },
        { type: 'narration', text: '"……事情办得怎么样了？"\n"放心，那宫女不会说出去的。\n不过……有人好像发现了什么。"' },
        { type: 'narration', text: '"谁？"\n"一个新来的才人，姓苏。\n今晚她好像来过御花园。"' },
        { type: 'narration', text: '你心中一惊，差点叫出声来。\n他们说的……是你！' },
        { type: 'narration', text: '两个黑影渐渐走远，你才敢松一口气。\n手中紧紧攥着那个瓷瓶。' },
        { type: 'narration', text: '这件事，果然不简单。\n而你，已经卷入了其中。' },
        { type: 'exec', fn: (vars) => { vars.set('foundSecret', 2); } },
        { type: 'jump', target: 'scene_012' }
      ]
    },

    scene_011b: {
      name: '静观其变',
      commands: [
        { type: 'narration', text: '你决定静观其变。\n在这深宫之中，有时候不动声色才是最好的保护。' },
        { type: 'narration', text: '几日后，秋菊清醒过来。\n但她对中毒之事闭口不提，仿佛什么都没发生过。' },
        { type: 'text', speaker: '春桃', text: '小主，秋菊回来了。\n不过她好像变了一个人，整天沉默寡言的。' },
        { type: 'text', speaker: '你', text: '她没事就好。别去打扰她。' },
        { type: 'narration', text: '你望着窗外，心中思绪万千。\n这件事，真的就这么结束了吗？' },
        { type: 'jump', target: 'scene_012' }
      ]
    },

    scene_012: {
      name: '宴会',
      commands: [
        { type: 'bg', src: 'assets/bg/hall.svg', transition: 'fade' },
        { type: 'narration', text: '入宫百日，恰逢太后寿辰。\n皇帝下旨，在太液池畔设宴，与民同乐。' },
        { type: 'narration', text: '这是你入宫以来第一次参加大型宴会。\n后宫妃嫔齐聚一堂，衣香鬓影，觥筹交错。' },
        { type: 'narration', text: '你被安排在末席，距离皇帝的主位很远。\n但你并不在意，只是静静观察着这一切。' },
        { type: 'narration', text: '酒过三巡，柳贵妃起身献舞。\n她身着华服，翩翩起舞，宛如仙子下凡。\n皇帝看得入神，眼中满是宠溺。' },
        { type: 'narration', text: '皇后坐在一旁，脸上带着得体的微笑，\n但你分明看到，她握着酒杯的手微微发白。' },
        {
          type: 'option',
          options: [
            {
              text: '向皇后敬酒，表示尊敬',
              actions: [
                { type: 'modify', name: 'trustQueen', op: '+', value: 5 },
                { type: 'modify', name: 'favor', op: '+', value: 3 },
                { type: 'narration', text: '你端起酒杯，走到皇后席前。\n"臣妾敬皇后娘娘一杯。"' },
                { type: 'narration', text: '皇后微微一愣，随即露出欣慰的笑容。\n"好孩子，你有心了。"' }
              ]
            },
            {
              text: '趁机向皇帝展示才艺',
              actions: [
                { type: 'modify', name: 'favor', op: '+', value: 8 },
                { type: 'modify', name: 'offendedLi', op: '+', value: 2 },
                { type: 'narration', text: '你鼓起勇气，起身向皇帝行礼。\n"臣妾不才，愿为陛下抚琴一曲。"' },
                { type: 'narration', text: '皇帝有些意外，但还是点了点头。\n你坐下，指尖轻抚琴弦。' },
                { type: 'narration', text: '一曲《凤求凰》缓缓流出，\n琴声悠扬，如泣如诉。' },
                { type: 'narration', text: '曲终，殿内一片寂静。\n随即，掌声响起。' },
                { type: 'text', speaker: '皇帝', text: '好。弹得好。\n赏。' },
                { type: 'narration', text: '你心中一喜，却不敢表露分毫。\n只是恭敬地行礼退下。' }
              ]
            },
            {
              text: '安静地坐在角落，不引人注目',
              actions: [
                { type: 'modify', name: 'wisdom', op: '+', value: 3 },
                { type: 'narration', text: '你选择安静地坐在角落，不引人注目。\n在这深宫之中，有时候低调才是最好的保护。' }
              ]
            }
          ]
        },
        { type: 'narration', text: '宴会结束，你独自走在回延禧宫的路上。\n月色如水，洒在红墙之上。' },
        { type: 'narration', text: '你想起皇后的笑容，柳贵妃的舞姿，\n还有皇帝那双深邃的眼睛。\n这后宫之中，人人都在演戏。' },
        { type: 'narration', text: '而你，又将扮演什么样的角色？' },
        { type: 'transition', duration: 1000 },
        { type: 'jump', target: 'scene_013' }
      ]
    },

    scene_013: {
      name: '阴谋浮现',
      commands: [
        { type: 'bg', src: 'assets/bg/night.svg', transition: 'fade' },
        { type: 'narration', text: '宴会后第三日，宫中传出一个消息：\n皇后身边的贴身宫女，突然暴毙。' },
        { type: 'narration', text: '死因是……中毒。\n和秋菊中的毒，一模一样。' },
        { type: 'narration', text: '后宫震动，人人自危。\n皇帝龙颜大怒，下令严查。' },
        {
          type: 'condition',
          condition: (vars) => vars.get('foundSecret') >= 2,
          then: [
            { type: 'narration', text: '你知道，是时候做出选择了。\n你手中的证据，足以扳倒幕后黑手。' },
            { type: 'narration', text: '但同时，你也将自己置于险境。' },
            { type: 'jump', target: 'scene_014a' }
          ],
          else: [
            { type: 'narration', text: '你虽然没有直接证据，\n但直觉告诉你，这件事和李贵人有关。' },
            { type: 'jump', target: 'scene_014b' }
          ]
        }
      ]
    },

    scene_014a: {
      name: '抉择·有证据',
      commands: [
        { type: 'bg', src: 'assets/bg/throne.svg', transition: 'fade' },
        { type: 'narration', text: '你鼓起勇气，求见皇帝。' },
        { type: 'text', speaker: '皇帝', text: '你说有要事禀报？说吧。' },
        { type: 'text', speaker: '你', text: '陛下，臣女发现有人在暗中策划，意图不轨。' },
        { type: 'narration', text: '你将瓷瓶和纸条呈上，\n并将所知的一切和盘托出。' },
        { type: 'narration', text: '皇帝沉默良久。' },
        { type: 'text', speaker: '皇帝', text: '你可知，告密若属实，便是大功一件；若不实……' },
        { type: 'text', speaker: '你', text: '臣女愿以性命担保。' },
        { type: 'narration', text: '皇帝深深地看了你一眼。\n那一眼中，有审视，也有一丝赞许。' },
        { type: 'text', speaker: '皇帝', text: '好。朕会查证。你先回去，此事不可对外人提起。' },
        { type: 'narration', text: '事后，李贵人被废。\n而你，从一个默默无闻的小主，\n变成了皇帝眼中"有胆有识"的女子。' },
        { type: 'modify', name: 'favor', op: '+', value: 15 },
        { type: 'modify', name: 'courage', op: '+', value: 5 },
        { type: 'exec', fn: (vars) => { vars.arrays.allies.push('皇帝'); } },
        { type: 'transition', duration: 1000 },
        { type: 'jump', target: 'scene_015' }
      ]
    },

    scene_014b: {
      name: '抉择·无证据',
      commands: [
        { type: 'narration', text: '你没有直接证据，但心中已有猜测。\n这件事，恐怕和李贵人脱不了干系。' },
        {
          type: 'option',
          options: [
            {
              text: '向皇后告密',
              actions: [
                { type: 'modify', name: 'trustQueen', op: '+', value: 10 },
                { type: 'modify', name: 'favor', op: '+', value: 5 },
                { type: 'narration', text: '你找到皇后，将自己的猜测说了出来。\n皇后沉默良久。' },
                { type: 'text', speaker: '皇后', text: '你有心了。\n这件事，本宫会处理。' },
                { type: 'narration', text: '几日后，李贵人被废。\n皇后对你更加信任。' }
              ]
            },
            {
              text: '装作不知，静观其变',
              actions: [
                { type: 'modify', name: 'wisdom', op: '+', value: 5 },
                { type: 'narration', text: '你选择沉默。\n在这深宫之中，有时候不动声色才是最好的保护。' },
                { type: 'narration', text: '几日后，事情败露。\n李贵人的阴谋被揭穿，被打入冷宫。' }
              ]
            }
          ]
        },
        { type: 'narration', text: '风波平息，你在宫中的地位也悄然提升。\n但你知道，这不过是开始。' },
        { type: 'transition', duration: 1000 },
        { type: 'jump', target: 'scene_015' }
      ]
    },

    // ==================== 第四章：抉择 ====================
    scene_015: {
      name: '第四章开篇',
      commands: [
        { type: 'chapterTitle', text: '第四章\n抉 择' },
        { type: 'bg', src: 'assets/bg/palace_golden.svg', transition: 'fade' },
        { type: 'narration', text: '入宫一年，你已不再是当初那个忐忑的少女。\n风波过后，你被晋封为美人，赐居长春宫。' },
        { type: 'narration', text: '这一日，皇帝忽然召你侍寝。\n你心中忐忑，却也不得不去。' },
        { type: 'bg', src: 'assets/bg/throne.svg', transition: 'fade' },
        { type: 'text', speaker: '皇帝', text: '婉清，朕有一事想问你。' },
        { type: 'text', speaker: '你', text: '陛下请说。' },
        { type: 'text', speaker: '皇帝', text: '若让你重新选一次，你还会入宫吗？' },
        {
          type: 'option',
          options: [
            {
              text: '「会。因为这里有陛下。」',
              actions: [
                { type: 'modify', name: 'favor', op: '+', value: 15 },
                { type: 'modify', name: 'charm', op: '+', value: 5 },
                { type: 'narration', text: '皇帝笑了，那是你第一次见他笑得如此真心。' }
              ]
            },
            {
              text: '「臣妾不敢妄言。」',
              actions: [
                { type: 'modify', name: 'wisdom', op: '+', value: 5 },
                { type: 'modify', name: 'favor', op: '+', value: 5 },
                { type: 'narration', text: '皇帝微微点头，眼中闪过一丝赞许。\n"你倒是谨慎。"' }
              ]
            },
            {
              text: '「若能选择，臣妾愿做一只自由的鸟。」',
              actions: [
                { type: 'modify', name: 'courage', op: '+', value: 10 },
                { type: 'modify', name: 'favor', op: '-', value: 5 },
                { type: 'narration', text: '皇帝沉默良久。\n"你倒是诚实。"' }
              ]
            }
          ]
        },
        { type: 'narration', text: '那一夜，你与皇帝长谈到天明。\n你发现，这个看似冷酷的帝王，\n其实也有柔软的一面。' },
        { type: 'transition', duration: 1000 },
        { type: 'jump', target: 'scene_016' }
      ]
    },

    scene_016: {
      name: '最终抉择',
      commands: [
        { type: 'bg', src: 'assets/bg/garden.svg', transition: 'fade' },
        { type: 'narration', text: '入宫两年，你面临一个重要的抉择。\n皇后与柳贵妃争斗日烈，双方都在拉拢你。' },
        { type: 'narration', text: '皇后许你协理六宫之权，\n柳贵妃许你荣华富贵。\n而皇帝，似乎在等着你的选择。' },
        {
          type: 'option',
          options: [
            {
              text: '站在皇后一边',
              actions: [
                { type: 'modify', name: 'trustQueen', op: '+', value: 20 },
                { type: 'modify', name: 'favor', op: '+', value: 5 },
                { type: 'exec', fn: (vars) => { vars.set('side', 'queen'); } }
              ]
            },
            {
              text: '站在柳贵妃一边',
              actions: [
                { type: 'modify', name: 'favor', op: '+', value: 15 },
                { type: 'modify', name: 'wisdom', op: '-', value: 5 },
                { type: 'exec', fn: (vars) => { vars.set('side', 'guifei'); } }
              ]
            },
            {
              text: '保持中立，谁也不帮',
              actions: [
                { type: 'modify', name: 'wisdom', op: '+', value: 10 },
                { type: 'modify', name: 'courage', op: '+', value: 5 },
                { type: 'exec', fn: (vars) => { vars.set('side', 'neutral'); } }
              ]
            }
          ]
        },
        { type: 'narration', text: '你的选择，将决定你在这深宫中的命运。\n而命运的齿轮，已经开始转动。' },
        { type: 'transition', duration: 1000 },
        { type: 'jump', target: 'scene_017' }
      ]
    },

    scene_017: {
      name: '结局前奏',
      commands: [
        { type: 'gradient', colors: ['#0a0a0f', '#1a1510', '#0a0a0f'] },
        { type: 'narration', text: '时光如白驹过隙。\n入宫三年，你已不再是当初那个不起眼的小主。' },
        {
          type: 'condition',
          condition: (vars) => {
            const f = vars.get('favor');
            const c = vars.get('courage');
            const w = vars.get('wisdom');
            const ch = vars.get('charm');
            return (f >= 30) || (c >= 20 && w >= 15) || (ch >= 15 && f >= 20);
          },
          then: [
            { type: 'narration', text: '你凭借自己的才智与勇气，\n在这深宫中站稳了脚跟。' },
            { type: 'narration', text: '皇帝对你日渐器重，\n你也被晋封为淑妃，赐居长乐宫。' },
            { type: 'jump', target: 'scene_end1' }
          ],
          else: [
            {
              type: 'condition',
              condition: (vars) => vars.get('wisdom') >= 15 && vars.get('courage') >= 10,
              then: [
                { type: 'narration', text: '你虽然没有大富大贵，\n但在这深宫中活得安稳。\n不争不抢，反而赢得了几分清净。' },
                { type: 'jump', target: 'scene_end2' }
              ],
              else: [
                {
                  type: 'condition',
                  condition: (vars) => vars.get('side') === 'neutral',
                  then: [
                    { type: 'narration', text: '你选择了中立，\n虽然没有得罪任何人，\n却也没有得到任何人的庇护。' },
                    { type: 'jump', target: 'scene_end3' }
                  ],
                  else: [
                    { type: 'narration', text: '入宫三年，你仍是那个不起眼的小主。\n宫中的风浪一波接一波，你只能随波逐流。' },
                    { type: 'jump', target: 'scene_end4' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },

    scene_018: {
      name: '最终场景',
      commands: [
        { type: 'narration', text: '无论结局如何，你都在这深宫中留下了属于自己的印记。\n或许辉煌，或许平淡，但那都是你的人生。' },
        { type: 'narration', text: '窗外，凤鸣九霄，朝阳初升。\n新的一天，又开始了。' },
        { type: 'jump', target: 'scene_end1' }
      ]
    },

    // ==================== 终章 ====================
    scene_end1: {
      name: '结局一：凤鸣九霄',
      commands: [
        { type: 'chapterTitle', text: '终 章\n凤鸣九霄' },
        { type: 'bg', src: 'assets/bg/palace_golden.svg', transition: 'fade' },
        { type: 'narration', text: '大业五年，春。\n你被封为淑妃，赐居长乐宫。' },
        { type: 'narration', text: '那一日，你身着凤袍，步上长乐宫的台阶。\n回望来时路，恍如隔世。' },
        { type: 'narration', text: '你想起入宫那日的忐忑，\n想起御花园的琴声，\n想起那些暗流涌动的夜晚。\n一切，都值得了。' },
        { type: 'text', speaker: '皇帝', text: '婉清，朕有一事想问你。' },
        { type: 'text', speaker: '你', text: '陛下请说。' },
        { type: 'text', speaker: '皇帝', text: '若让你重新选一次，你还会入宫吗？' },
        { type: 'narration', text: '你微微一笑。' },
        { type: 'text', speaker: '你', text: '会。因为这里有陛下。' },
        { type: 'narration', text: '皇帝笑了，那是你第一次见他笑得如此真心。\n窗外，凤鸣九霄，朝阳初升。' },
        { type: 'transition', duration: 2000 },
        { type: 'end', text: '— 完 —\n\n【凤鸣九霄】· 最佳结局\n\n恩宠: {favor} | 勇气: {courage} | 智慧: {wisdom} | 魅力: {charm}' }
      ]
    },

    scene_end2: {
      name: '结局二：岁月静好',
      commands: [
        { type: 'chapterTitle', text: '终 章\n岁月静好' },
        { type: 'bg', src: 'assets/bg/garden.svg', transition: 'fade' },
        { type: 'narration', text: '大业五年，秋。\n你仍是那个不争不抢的小主。' },
        { type: 'narration', text: '宫中的风浪来了又去，你始终安然无恙。\n不是因为你有多大的本事，\n而是因为你懂得——\n在这深宫中，平安才是最大的福气。' },
        { type: 'narration', text: '你常常在院中老槐树下弹琴，\n春桃在旁煮茶。\n日子虽平淡，却也安宁。' },
        { type: 'text', speaker: '你', text: '春桃，你说这宫里，最难得的是什么？' },
        { type: 'text', speaker: '春桃', text: '奴婢愚钝，不知。' },
        { type: 'text', speaker: '你', text: '是自在。能按自己的心意活着，便是最大的自在。' },
        { type: 'narration', text: '你抬头望天，万里无云。\n岁月静好，不过如此。' },
        { type: 'transition', duration: 2000 },
        { type: 'end', text: '— 完 —\n\n【岁月静好】· 良好结局\n\n恩宠: {favor} | 勇气: {courage} | 智慧: {wisdom} | 魅力: {charm}' }
      ]
    },

    scene_end3: {
      name: '结局三：独善其身',
      commands: [
        { type: 'chapterTitle', text: '终 章\n独善其身' },
        { type: 'bg', src: 'assets/bg/pavilion.svg', transition: 'fade' },
        { type: 'narration', text: '大业五年，冬。\n你选择了中立，不偏不倚。' },
        { type: 'narration', text: '皇后与柳贵妃的争斗愈演愈烈，\n而你，始终保持着距离。' },
        { type: 'narration', text: '有人说你懦弱，有人说你聪明。\n但只有你自己知道，\n你只是不想成为任何人的棋子。' },
        { type: 'text', speaker: '赵灵溪', text: '婉清，你真是个奇怪的人。\n在这宫里，人人都在争，你却不争。' },
        { type: 'text', speaker: '你', text: '争来争去，最后能得到什么呢？\n不如守好自己的本心。' },
        { type: 'text', speaker: '赵灵溪', text: '……你说得对。\n或许，这才是真正的智慧。' },
        { type: 'narration', text: '你微微一笑，望向远方。\n这深宫之中，能有一个人懂你，便已足够。' },
        { type: 'transition', duration: 2000 },
        { type: 'end', text: '— 完 —\n\n【独善其身】· 特殊结局\n\n恩宠: {favor} | 勇气: {courage} | 智慧: {wisdom} | 魅力: {charm}' }
      ]
    },

    scene_end4: {
      name: '结局四：深宫遗梦',
      commands: [
        { type: 'chapterTitle', text: '终 章\n深宫遗梦' },
        { type: 'bg', src: 'assets/bg/night.svg', transition: 'fade' },
        { type: 'narration', text: '大业五年，冬。\n你仍是那个不受宠的小主。' },
        { type: 'narration', text: '宫中的日子一天比一天难熬。\n没有恩宠，没有地位，\n甚至连冬日的炭火都不够用。' },
        { type: 'narration', text: '你时常想起入宫前的日子——\n虽不富裕，却也自由。\n如今，你被困在这高墙之内，\n再也出不去了。' },
        { type: 'text', speaker: '春桃', text: '小主，您又在想家了？' },
        { type: 'text', speaker: '你', text: '想又有什么用呢？回不去了。' },
        { type: 'narration', text: '窗外大雪纷飞，你裹紧了单薄的被子。\n这深宫中的梦，终是一场空。' },
        { type: 'narration', text: '但你仍相信，\n总有一天，你会找到属于自己的出路。\n哪怕那条路，布满荆棘。' },
        { type: 'transition', duration: 2000 },
        { type: 'end', text: '— 完 —\n\n【深宫遗梦】· 普通结局\n\n恩宠: {favor} | 勇气: {courage} | 智慧: {wisdom} | 魅力: {charm}' }
      ]
    }
  }
};
