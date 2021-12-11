// ランダムに並び替える
const shurffleArray = (array: string[]) =>
  [...array].sort(() => Math.random() - 0.5);

export default shurffleArray;
