"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/notification/notificationPanel.module.scss";
import NotificationMenu from "./NotificationMenu";

interface NotificationPanelProps {
  hasNewNotifications?: boolean;
  hasNewFriendRequests?: boolean;
}

export default function NotificationPanel({
  hasNewNotifications = false,
  hasNewFriendRequests = false,
}: NotificationPanelProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Эффект для мигания при получении новых уведомлений
  useEffect(() => {
    if (hasNewNotifications || hasNewFriendRequests) {
      setIsBlinking(true);

      // Остановка мигания через 5 секунд, если меню не открыто
      const timer = setTimeout(() => {
        if (!isMenuOpen) {
          setIsBlinking(false);
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasNewNotifications, hasNewFriendRequests, isMenuOpen]);

  // Остановка мигания при открытии меню
  const handlePanelClick = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsBlinking(false);
  };

  return (
    <div className={styles.notification_container}>
      {!isMenuOpen ? (
        <div
          className={`${styles.notification_panel} ${
            isBlinking ? styles.blinking : ""
          }`}
          onClick={handlePanelClick}
        >
          <div className={styles.notification_icon}>
            {(hasNewNotifications || hasNewFriendRequests) && (
              <span className={styles.notification_badge}></span>
            )}
            <span className={styles.icon}>🔔</span>
          </div>
        </div>
      ) : (
        <NotificationMenu onClose={() => setIsMenuOpen(false)} />
      )}
    </div>
  );
}
