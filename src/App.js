import "./App.css";
import Messages from "./Components/Messages";
import MsgInput from "./Components/MsgInput";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

function getRandomName() {
  const ran = [
    "eternal",
    "haematic",
    "araneous",
    "filatory",
    "modius",
    "lastage",
    "tacent",
    "gatefold",
    "scantling",
  ];
  const dom = [
    "mood",
    "potto",
    "sedent",
    "agnomen",
    "turaco",
    "zendalet",
    "costellate",
    "gybe",
    "fog",
  ];

  return (
    ran[Math.floor(Math.random() * ran.length)] +
    "_" +
    dom[Math.floor(Math.random() * dom.length)]
  );
}
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

export default class App extends React.Component {
  state = {
    messages: [],
    member: {
      username: getRandomName(),
      color: getRandomColor(),
    },
  };

  constructor() {
    super();
    this.drone = new window.Scaledrone("455nPgpXZ04e3fys", {
      data: this.state.member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="Header">
          <h1>
            <FontAwesomeIcon icon={faUserAstronaut} />
            Space Chat
            <FontAwesomeIcon icon={faUserAstronaut} />
          </h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <MsgInput onSendMessage={this.onSendMessage} />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };
}
