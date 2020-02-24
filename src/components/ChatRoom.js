import React, { Component } from 'react'
import { GiftedChat } from 'react-web-gifted-chat'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDER,
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default class ChatRoom extends Component {
  // ++++++++ di state chatUser kalian hrs set state dgn data user yg lagi login ya
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      user: {},
      chatUser: {
        avatar: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/cat-455-896812.png',
        id: 'cbba1',
        name: 'cat',
      },
      // avatar: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/cat-455-896812.png',
      avatar: this.props.avatar,
      // id: this.props._id,
      // name: this.props.display_name,
    }
  }

  componentDidMount() {
    this.loadMessages()
  }

  loadMessages() {
    const callback = (snap) => {
      const message = snap.val()
      message.id = snap.key
      const { messages } = this.state
      messages.push(message)
      this.setState({ messages })
    }
    firebase
      .database()
      .ref('/messages/')
      .orderByChild('roomId')
      // .equalTo(this.props.match.params.roomId)
      .equalTo('5e53444f8531bb11fed69751')
      .on('child_added', callback)
  }

  onSend(messages) {
    for (const message of messages) {
      this.saveMessage(message)
    }
  }

  saveMessage(message) {
    return firebase
      .database()
      .ref('/messages/')
      .push({ ...message, roomId: '5e53444f8531bb11fed69751' })
      .catch(function(error) {
        console.error('Error saving message to Database:', error)
      })
  }

  renderSignOutButton() {
    if (this.state.isAuthenticated) {
      return <Button onClick={() => this.signOut()}>Sign out</Button>
    }
    return null
  }

  renderChat() {
    return (
      <GiftedChat
        user={this.state.chatUser}
        messages={this.state.messages.slice().reverse()}
        onSend={(messages) => this.onSend(messages)}
      />
    )
  }

  renderChannels() {
    return (
      <List>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>D</Avatar>
          </ListItemAvatar>
          <ListItemText primary='Default' />
        </ListItem>
      </List>
    )
  }

  renderChannelsHeader() {
    return (
      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
            Channels
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
  renderChatHeader() {
    return (
      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
            Default channel
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
  renderSettingsHeader() {
    return (
      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.chat}>
          {this.renderChatHeader()}
          {this.renderChat()}
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '50vh',
    width: '50vh',
  },
  channelList: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  chat: {
    display: 'flex',
    flex: 3,
    flexDirection: 'column',
    borderWidth: '1px',
    borderColor: '#ccc',
    borderRightStyle: 'solid',
    borderLeftStyle: 'solid',
  },
  settings: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
}
