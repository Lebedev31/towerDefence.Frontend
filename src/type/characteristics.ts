/* eslint-disable @typescript-eslint/no-explicit-any */
export type Characteristics = {
  /**
   * Здоровье
   */
  hp: number;
  /**
   * Физический урон
   */
  physicalDamage: number;
  /**
   * Магический урон
   */
  magicalDamage: number;
  /**
   * Ядовитый урон
   */
  poisonousDamage: number;
  /**
   * Физическая защита
   */
  physicalDefence: number;
  /**
   * Магическая защита
   */
  magicalDefence: number;
  /**
   * Ядовитая защита
   */
  poisonousDefence: number;
  /**
   * Радиус атаки
   */
  range: number;
  /**
   * Скорость атаки (ударов в секунду)
   */
  speed: number;
  /**
   * Золотых монет
   */
  gold: number;

  extra?: Record<string, any>;
};
