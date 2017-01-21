
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {WorkbookReducerInterface, NoteReducerInterface, NoteFormItemInterface} from './data/workbook';
import NoteForm from './NoteForm';
import {connect} from 'react-redux';
import {noteEdit,noteLoad,noteCreate} from './actions';
import {noteFactory} from './reducers/note'



interface MyProps {
  editNote(note: NoteReducerInterface): any;
  open: boolean;
  handleClose(): any
  note: NoteReducerInterface;
}

interface MyState {

}

class NoteEditDialog extends React.Component<MyProps, MyState> {


  render() {
    const {editNote, open, handleClose, note} = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={handleClose}
      />,
    ];

    return (
      <div>
    
        <Dialog
          title="Note"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={handleClose}
        >

          <NoteForm note onSubmit={editNote(note)} />
        </Dialog>
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    open: state.loadedNoteId > -1,
    note: state.loadedNoteId > 0 ? state.notes[state.loadedNoteId + ''] : noteFactory(0,'')
  }
}

const dispatchToProps = (dispatch,ownProps) => {
  return {
     editNote: (note) => { 
       return (noteForm: NoteFormItemInterface) => {
         if(note.id){
           console.log('noteEdit');
           dispatch(noteEdit(note.id,noteForm)) 
         }else{
           console.log('noteCreate');
           dispatch(noteCreate(noteForm)) 
         }
         dispatch(noteLoad(-1));
       }
     },
     handleClose: () => {
       dispatch(noteLoad(-1));
     }
  }
}
export default connect(stateToProps,dispatchToProps)(NoteEditDialog);