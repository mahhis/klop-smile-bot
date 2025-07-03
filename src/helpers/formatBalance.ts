export const RUB_PER_SMILE = 10_000

export default function formatBalance(smiles: number) {
  const rubles = smiles * RUB_PER_SMILE
  const formattedRub = new Intl.NumberFormat('ru-RU').format(rubles)
  return `${smiles} (₽${formattedRub})`
} 