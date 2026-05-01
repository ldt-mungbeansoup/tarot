export interface SpreadType {
  id: string;
  name: string;
  cardCount: number;
  positions: string[];
}

export const SPREADS: SpreadType[] = [
  {
    id: 'single',
    name: '单张牌阵',
    cardCount: 1,
    positions: ['核心提示']
  },
  {
    id: 'three_cards',
    name: '万能牌阵-三张',
    cardCount: 3,
    positions: ['过去 (归因)', '现在 (现状)', '未来 (趋势)']
  },
  {
    id: 'core_solution',
    name: '解决核心牌阵',
    cardCount: 4,
    positions: ['当前问题', '隐性挑战', '建议对策', '可能结果']
  },
  {
    id: 'two_choices',
    name: '二选一牌阵',
    cardCount: 5,
    positions: ['当前处境', '选择 A 的过程', '选择 B 的过程', '选择 A 的结果', '选择 B 的结果']
  },
  {
    id: 'hexagram',
    name: '六芒星牌阵',
    cardCount: 7,
    positions: ['过去', '现在', '未来', '核心建议', '周遭环境', '潜在阻碍', '最终走向']
  }
];
