"use client";
import styles from "@/styles/chat/messageGlobal.module.scss";
import Image from "next/image";
import { GlobalMessages } from "@/type/type";
import { useState } from "react";
import * as React from "react";

type MessageGlobalProps = GlobalMessages & {
  handleFocus: (parentId?: string, answers?: string) => void;
};

function MessageGlobal({ handleFocus, ...props }: MessageGlobalProps) {
  const [expandText, setExpendText] = useState<boolean>(true);
  const [branch, setBranch] = useState<boolean>(false);
  const renderText = () => {
    if (props.text.length < 50) {
      return (
        <>
          <span>
            {props.text}{" "}
            <span
              onClick={() => handleFocus(props._id, props.nameUser)}
              className={styles.messageGlobal__expend}
            >
              {" "}
              Ответить
            </span>
          </span>

          <div className={styles.messageGlobal__grade}>
            <Image
              height={20}
              width={20}
              src={"/assets/img/лайк.png"}
              alt="лайк"
            />
            {0}
            <Image
              height={20}
              width={20}
              src={"/assets/img/дизлайк.png"}
              alt="дизлайк"
            />
            {0}
          </div>
        </>
      );
    }

    if (props.text.length > 50) {
      return expandText ? (
        <>
          <span>
            {props.text.slice(0, 50)}
            <span
              className={styles.messageGlobal__expend}
              onClick={() => setExpendText(false)}
            >
              ...
            </span>
          </span>
        </>
      ) : (
        <>
          <span>
            {props.text}
            <span
              onClick={() => handleFocus(props._id, props.nameUser)}
              className={styles.messageGlobal__expend}
            >
              {" "}
              Ответить
            </span>
          </span>
          <p
            className={styles.messageGlobal__expend}
            onClick={() => setExpendText(true)}
          >
            Свернуть текст
          </p>
          <div className={styles.messageGlobal__grade}>
            <Image
              height={20}
              width={20}
              src={"/assets/img/лайк.png"}
              alt="лайк"
            />
            {0}
            <Image
              height={20}
              width={20}
              src={"/assets/img/дизлайк.png"}
              alt="дизлайк"
            />
            {0}
          </div>
          {/*branch
            ? mockGlobalMessages.map((item) => {
                return (
                  <MessageGlobal
                    key={item._id}
                    {...item}
                    handleFocus={handleFocus}
                  />
                );
              })
            : null */}
          {props.parentid ? null : (
            <div className={styles.messageGlobal__arrow}>
              <Image
                height={15}
                width={15}
                src={"assets//img/стрелочка.png"}
                alt="стрелочка"
                onClick={() => setBranch(!branch)}
                style={{
                  display: "inline-block",
                  transform: branch ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>
          )}
        </>
      );
    }

    return null;
  };
  return (
    <div className={styles.messageGlobal}>
      <Image
        className={styles.messageGlobal__avatar}
        height={50}
        width={50}
        src={props.patchAvatar}
        alt="аватарка"
      />
      <div className={styles.messageGlobal__info}>
        <div className={styles.messageGlobal__title}>
          <h4>{props.nameUser}</h4>
          <p>{props.timestamp.toDateString()}</p>
        </div>

        <div className={styles.messageGlobal__text}>{renderText()}</div>
      </div>
    </div>
  );
}

export default MessageGlobal;
