import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './Screens/HomeScreen';
import {AddNoteScreen} from './Screens/AddNoteScreen';
import {ModifyNoteScreen} from './Screens/ModifyNoteScreen';
import {NoteProvider} from './Context/NoteContext';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    AddNoteScreen: {
      screen: AddNoteScreen,
    },
    ModifyNoteScreen: {
      screen: ModifyNoteScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(RootStack);

const App = () => (
  <NoteProvider>
    <AppContainer />
  </NoteProvider>
);

export default App;
