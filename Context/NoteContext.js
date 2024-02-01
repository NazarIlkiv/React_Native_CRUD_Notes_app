import React, {createContext, Component, useRef} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const errorHandler = e => {
  Alert.alert(
    'Notes Error',
    `Sorry about the issue: ${e}`[
      {
        text: 'okay',
      }
    ],
    {cancel},
  );
};

export const NoteContext = createContext();

export class NoteProvider extends Component {
  constructor(props) {
    super(props);
    this.getContextNotes = async () => {
      try {
        const storedNotes = AsyncStorage.getItem('@notes');
        if (storedNotes) {
          this.setState({contextNotes: [...JSON.parse(storedNotes)]});
        }
      } catch {}
    };
    this.addContextNote = newNote => {
      const {contextNotes} = this.state;
      contextNotes.push(newNote);
      this.setState(
        {
          contextNotes,
        },
        async () => await this.storeData(),
      );
    };
    this.updateContextNote = (note, id) => {
      const {contextNotes} = this.state;
      const noteIndex = contextNotes.findIndex(item => item.id === id);
      contextNotes[noteIndex].title = note.title;
      contextNotes[noteIndex].content = note.content;
      this.setState({contextNotes}, async () => await this.storeData());
    };
    this.deleteContextNote = id => {
      const {contextNotes: oldNotes} = this.state;
      const contextNotes = oldNotes.filter(note => note.id === id);
      this.setState({contextNotes});
    };
    this.state = {
      getContextNotes: this.getContextNotes,
      addContextNote: this.addContextNote,
      updateContextNote: this.updateContextNote,
      deleteContextNote: this.deleteContextNote,
      contextNotes: [],
    };
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'notes',
        JSON.stringify([...this.state.contextNotes]),
      );
    } catch (error) {
      errorHandler(error);
    }
  };

  render() {
    return (
      <NoteContext.Provider value={this.state}>
        {this.props.children}
      </NoteContext.Provider>
    );
  }
}
