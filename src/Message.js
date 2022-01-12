// @flow
import React, { useEffect } from "react";
import Markdown from "react-markdown";
import breaks from "remark-breaks";
import { formatDistance } from "date-fns";
import classnames from "classnames";
import type { ChatMessage } from "./Chatroom";
import { noop } from "./utils";

type MessageTimeProps = {
  time: number,
  isBot: boolean,
};
export const MessageTime = ({ time, isBot }: MessageTimeProps) => {
  if (time === 0) return null;

  const messageTime = Math.min(Date.now(), time);
  const messageTimeObj = new Date(messageTime);
  return (
    <li
      // className={classnames("time", isBot ? "left" : "right")}
      // title={messageTimeObj.toISOString()}
    >
      {/* {formatDistance(messageTimeObj, Date.now())} */}
    </li>
  );
};

type MessageProps = {
  chat: ChatMessage,
  onButtonClick?: (title: string, payload: string) => void,
  toogleChat?: () => *,
  voiceLang?: ?string,
};

const supportSpeechSynthesis = () => "SpeechSynthesisUtterance" in window;

const speak = (message: string, voiceLang: string) => {
  const synth = window.speechSynthesis;
  let voices = [];
  voices = synth.getVoices();
  const toSpeak = new SpeechSynthesisUtterance(message);
  toSpeak.voice = voices.find((voice) => voice.lang === voiceLang);
  synth.speak(toSpeak);
};

const Message = ({
  chat,
  onButtonClick,
  toogleChat,
  voiceLang = null,
}: MessageProps) => {
  const message = chat.message;
  const isBot = chat.username === "bot";

  useEffect(() => {
    if (
      isBot &&
      voiceLang != null &&
      message.type === "text" &&
      supportSpeechSynthesis()
    ) {
      // speak(message.text, voiceLang); Voice enabeler
    }
  }, []);

  // Aca empieza la activación de Genesys
  if (message.text.substring(0,4) === "Dame") {
  // if (message.text === "¡Bienvenido! Soy MiBot, tu asistente digital Movistar. Indícame tu requerimiento") {
    toogleChat();
    // alert('Genesys')
    // window.getAdvancedConfig('Test','Testing','test@test.com','Prueba')
    // customPlugin.command('WebChat.open', getAdvancedConfig('Test','Testing','test@test.com','Prueba'))
    customPlugin.command('WebChat.open', getAdvancedConfig('','','',''))
    // $(".chatroom").hide()
  }

  switch (message.type) {
    case "button":
      return (
        <ul className="chat-buttons">
          {message.buttons.map(({ payload, title, selected }) => (
            <li
              className={classnames("chat-button", {
                "chat-button-selected": selected,
                "chat-button-disabled": !onButtonClick,
              })}
              key={payload}
              onClick={
                onButtonClick != null
                  ? () => onButtonClick(title, payload)
                  : noop
              }
            >
              <Markdown
                source={title}
                skipHtml={false}
                allowedTypses={["root", "break"]}
                renderers={{
                  paragraph: ({ children }) => <span>{children}</span>,
                }}
                plugins={[breaks]}
              />
            </li>
          ))}
        </ul>
      );

    case "image":
      return (
        <li className={`chat ${isBot ? "left" : "right"} chat-img`}>
          <img src={message.image} alt="" />
        </li>
      );
    case "text":
      return (
        <div>
          {/* <img
            style={{ display: isBot ? "block" : "none" }}
            src="/src/assets/MiBot-200x200-der.png"
            alt="mibot"
            width="30"
          ></img> */}
          <li className={classnames("chat", isBot ? "left" : "right")}>
            <Markdown
              className="text"
              source={message.text}
              skipHtml={false}
              allowedTypses={[
                "root",
                "break",
                "paragraph",
                "emphasis",
                "strong",
                "link",
                "list",
                "listItem",
                "image",
              ]}
              renderers={{
                paragraph: ({ children }) => <span>{children}</span>,
                link: ({ href, children }) => (
                  <a href={href} target="_blank">
                    {children}
                  </a>
                ),
              }}
              plugins={[breaks]}
            />
          </li>
        </div>
      );
    default:
      return null;
  }
};

export default Message;
