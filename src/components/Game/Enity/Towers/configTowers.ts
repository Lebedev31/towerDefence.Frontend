import { Characteristics } from "@/type/characteristics";

export const characteristicsRifleTower: Characteristics = {
  hp: 120,
  physicalDamage: 8,
  magicalDamage: 0,
  poisonousDamage: 0,
  range: 250,
  physicalDefence: 5,
  magicalDefence: 3,
  poisonousDefence: 2,
  speed: 3,
  gold: 50,
};

export const characteristicsMagicTower: Characteristics = {
  hp: 180,
  physicalDamage: 2,
  magicalDamage: 12,
  poisonousDamage: 0,
  range: 150,
  physicalDefence: 3,
  magicalDefence: 8,
  poisonousDefence: 5,
  speed: 4,
  gold: 70,
};

export const characteristicsArtilleryTower: Characteristics = {
  hp: 250,
  physicalDamage: 23,
  magicalDamage: 0,
  poisonousDamage: 0,
  range: 120,
  physicalDefence: 8,
  magicalDefence: 5,
  poisonousDefence: 3,
  speed: 8,
  gold: 75,
};

export const characteristicsRocketLauncherTower: Characteristics = {
  hp: 200,
  physicalDamage: 15,
  magicalDamage: 3,
  poisonousDamage: 0,
  range: 450,
  physicalDefence: 6,
  magicalDefence: 8,
  poisonousDefence: 5,
  speed: 6,
  gold: 90,
};

export const characteristicsBasicSupportTower: Characteristics = {
  hp: 150,
  physicalDamage: 0,
  magicalDamage: 0,
  poisonousDamage: 0,
  range: 60,
  physicalDefence: 5,
  magicalDefence: 5,
  poisonousDefence: 5,
  speed: 5,
  gold: 50,
  extra: {
    slowdown: 1,
  },
};

export const characteristicsGenerator: Characteristics = {
  hp: 1200,
  physicalDamage: 0,
  magicalDamage: 0,
  poisonousDamage: 0,
  range: 70,
  physicalDefence: 10,
  magicalDefence: 13,
  poisonousDefence: 12,
  speed: 0,
  gold: 50,
};
