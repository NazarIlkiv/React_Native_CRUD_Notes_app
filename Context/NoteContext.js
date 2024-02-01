import React, {createContext, Component} from 'react';
import {Alert} from 'react-native';

export const NoteContext = createContext();

export class NoteProvider extends Component {
  constructor(props) {
    super(props);
    this.getContextNotes = () => {
      return this.state.contextNotes;
    };
    this.addContextNote = newNote => {
      const {contextNotes} = this.state;
      contextNotes.push(newNote);
      this.setState({
        contextNotes,
      });
    };
    this.updateContextNote = (note, id) => {
      const {contextNotes} = this.state;
      const noteIndex = contextNotes.findIndex(item => item.id === id);
      contextNotes[noteIndex].title = note.title;
      contextNotes[noteIndex].content = note.content;
      this.setState({contextNotes});
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

  render() {
    <NoteContext.Provider value={this.state}>
      {this.props.children}
    </NoteContext.Provider>;
  }
}
