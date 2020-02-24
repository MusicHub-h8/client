import React, { Component } from "react";
import { GiftedChat } from "react-web-gifted-chat";
import firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDER
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default class ChatRoom extends Component {
  // ++++++++ di state chatUser kalian hrs set state dgn data user yg lagi login ya
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: {},
      chatUser: {
        avatar: this.props.currentUser.avatar,
        id: this.props.currentUser._id,
        name: this.props.currentUser.display_name
      }
    };
  }

  componentDidMount() {
    console.log(this.props, "ini props");
    this.loadMessages();
  }

  loadMessages() {
    const callback = snap => {
      const message = snap.val();
      message.id = snap.key;
      const { messages } = this.state;
      messages.push(message);
      this.setState({ messages });
    };
    firebase
      .database()
      .ref("/messages/")
      .orderByChild("roomId")
      .equalTo(this.props.roomId)
      .on("child_added", callback);
  }

  onSend(messages) {
    for (const message of messages) {
      this.saveMessage(message);
    }
  }

  saveMessage(message) {
    return firebase
      .database()
      .ref("/messages/")
      .push({ ...message, roomId: this.props.roomId })
      .catch(function(error) {
        console.error("Error saving message to Database:", error);
      });
  }

  renderChat() {
    return (
      <GiftedChat
        user={this.state.chatUser}
        messages={this.state.messages.slice().reverse()}
        onSend={messages => this.onSend(messages)}
      />
    );
  }

  renderChatHeader() {
    return (
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {this.props.roomDetail.music_title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.chat}>
          {this.renderChatHeader()}
          {this.renderChat()}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "50vh",
    backgroundColor: "#091d27"
  },
  chat: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
    borderWidth: "1px",
    borderRightStyle: "solid",
    borderLeftStyle: "solid",
    backgroundColor: "#091d27"
  }
};
