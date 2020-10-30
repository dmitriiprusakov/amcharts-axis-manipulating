import { random } from "faker";

const randomQuantities = [
  "Напряжение U",
  "Ток I",
  "Активная мощность P",
  "Реактивная мощность Q",
  "Полная мощность S",
  "Фазное напряжение U",
];
const randomVariables = ["a", "b", "c"];

export const getRandomTagName = (): string => {
  const quantity = random.arrayElement(randomQuantities);
  const variable = random.arrayElement(randomVariables);

  return `${quantity}${variable}`;
};
