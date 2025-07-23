import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeTowerMenu, removeGameObject } from "@/Api/Slice/mainGameSlice";
import { RootState } from "@/Api/store";
import styles from "@/styles/game/towerMenu.module.scss";

interface TowerMenuProps {}

export const TowerMenu: React.FC<TowerMenuProps> = () => {
  const dispatch = useDispatch();
  const towerMenu = useSelector((state: RootState) => state.mainGame.towerMenu);

  if (!towerMenu.isOpen) {
    return null;
  }

  const handleClose = () => {
    dispatch(closeTowerMenu());
  };

  const handleUpgrade = () => {
    console.log("Upgrading tower:", towerMenu.towerName);
    // Логика улучшения башни
  };

  const handleSell = () => {
    if (towerMenu.index !== null) {
      dispatch(removeGameObject(towerMenu.index));
    }
    dispatch(closeTowerMenu());
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.menu}>
        <div className={styles.header}>
          <h2 className={styles.title}>{towerMenu.towerName}</h2>
          <button onClick={handleClose} className={styles.close}>
            ×
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>HP</div>
            <div className={styles.statValue}>
              {towerMenu.characteristics?.hp}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Physical Damage</div>
            <div className={styles.statValue}>
              {towerMenu.characteristics?.physicalDamage}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Magical Damage</div>
            <div className={styles.statValue}>
              {towerMenu.characteristics?.magicalDamage}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Poisonous Damage</div>
            <div className={styles.statValue}>
              {towerMenu.characteristics?.poisonousDamage}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Range</div>
            <div className={styles.statValue}>
              {towerMenu.characteristics?.range}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Speed</div>
            <div className={styles.statValue}>
              {towerMenu.characteristics?.speed}
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.defense}`}>
            <div className={styles.statLabel}>Physical Defence</div>
            <div className={styles.statValue}>
              {towerMenu.characteristics?.physicalDefence}
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.defense}`}>
            <div className={styles.statLabel}>Magical Defence</div>
            <div className={styles.statValue}>
              {towerMenu.characteristics?.magicalDefence}
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.defense}`}>
            <div className={styles.statLabel}>Poisonous Defence</div>
            <div className={styles.statValue}>
              {towerMenu.characteristics?.poisonousDefence}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            onClick={handleUpgrade}
            className={`${styles.actionBtn} ${styles.upgrade}`}
          >
            Upgrade
          </button>
          <button
            onClick={handleSell}
            className={`${styles.actionBtn} ${styles.sell}`}
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};
