
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {WorkbookReducerInterface, NoteReducerInterface, NoteFormItemInterface} from './data/workbook';
import NoteForm from './NoteForm';
import {connect} from 'react-redux';
import {noteEdit,noteLoad,noteCreate,noteDelete} from './actions';
import {noteFactory} from './reducers/note'
import {foatingButtonStyle, fullWidthDialagStyle} from './commonStyles';

interface MyProps {
  editNote(note: NoteReducerInterface): any;
  noteDelete(noteId: number): any;
  open: boolean;
  handleClose(): any
  note: NoteReducerInterface;
}

interface MyState {

}

class NoteEditComponent extends React.Component<MyProps, MyState> {


  render() {
    const {editNote, open, handleClose, note,noteDelete} = this.props;

    return (
          <NoteForm handleClose={handleClose} noteDelete={noteDelete} note={note} handleSubmit={editNote(note)} />
    );
  }
}

const getNote = (loadedNoteId, notes) => {
  let note = noteFactory(0,'')
  if(loadedNoteId > 0 && typeof notes[loadedNoteId + ''] !== 'undefined'){
     note = notes[loadedNoteId + ''];
  }
  return note;
}
const stateToProps = (state) => {
  return {
    open: state.loadedNoteId > -1,
    note: getNote(state.loadedNoteId,state.notes)
  }
}

const dispatchToProps = (dispatch,ownProps) => {
  return {
     editNote: (note: NoteReducerInterface) => { 
       return (noteForm: {text: string}) => {
         if(note.id){
           console.log('noteEdit');
           dispatch(noteEdit(note.id,noteForm.text)) 
         }else{
           console.log('noteCreate');
           dispatch(noteCreate(noteForm.text)) 
         }
         dispatch(noteLoad(-1));
       }
     },
     noteDelete: (noteId: number) => {
       dispatch(noteLoad(-1));
       dispatch(noteDelete(noteId));

     },
     handleClose: () => {
       dispatch(noteLoad(-1));
     }
  }
}
export default connect(stateToProps,dispatchToProps)(NoteEditComponent);