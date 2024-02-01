import React, {useEffect, useState, useContext, useRef} from 'react';
import {Text, FlatList, TouchableOpacity} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {Button} from 'native-base';
import {Layout} from '../Components/Layout';
import {NoteContext} from '../Context/NoteContext';
import {NoteContent} from '../Components/NoteContent';

const HomeScreen = props => {
  const prevPros = useRef(false);
  const {getContextNotes} = useContext(NoteContext);
  const [notes, setNotes] = useState();

  useEffect(() => {
    const getData = () => {
      if (prevPros.isFocused === props.isFocused) {
        const getNotes = getContextNotes();
        setNotes(getNotes);
      }
    };
    getData();
  }, [getContextNotes, props.isFocused]);

  return (
    <Layout
      title="My Notes"
      footer={
        <>
          <Button
            full
            onPress={() => props.navigation.navigate('AddNoteScreen')}>
            <Text>Add Note</Text>
          </Button>
          <FlatList
            data={notes}
            keyExtractor={note => note.id}
            renderItem={({item: note}) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('ModifyNoteScreen', {
                    id: note.item.id,
                  })
                }>
                <NoteContent note={{...note}} />
              </TouchableOpacity>
            )}
          />
        </>
      }
    />
  );
};

export default withNavigationFocus(HomeScreen);
