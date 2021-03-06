export const assetItems = [
  { name: 'cash', label: '現預金' },
  { name: 'currentAssets', label: '流動資産' },
  { name: 'nonCurrentAssets', label: '固定資産' }
];
export const liabilityItems = [
  { name: 'currentLiabilities', label: '流動負債' },
  { name: 'nonCurrentLiabilities', label: '固定負債' },
  { name: 'equity', label: '純資産' }
];
export const _ = {
  data: 'データ',
  add: 'ふやす',
  remove: '消す',
  asset: '資産',
  liability: '負債',
  fy: '会計年度',
  car: '自己資本比率', // Capital Adequacy Ratio
  excessDebtError: '債務超過のグラフは正常に表示されません'
};
