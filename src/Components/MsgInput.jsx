import React from "react";
import Botun from "./botun.jpg";

export default class MsgInput extends React.Component {
  state = {
    text: "",
  };

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ text: "" });
    this.props.onSendMessage(this.state.text);
  }

  render() {
    return (
      <div className="InputField">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            onChange={(e) => this.handleChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Write something..."
          />
          <button>
            <img src={Botun} alt="earth" />
          </button>
        </form>
      </div>
    );
  }
}
