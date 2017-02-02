
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

class NoteEditDialog extends React.Component<MyProps, MyState> {


  render() {
    const {editNote, open, handleClose, note,noteDelete} = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={handleClose}
      />
    ];
    if(note.id){
      actions.push(
        <FlatButton
            label="Delete"
            primary={true}
            onTouchTap={() => {
              noteDelete(note.id);
              handleClose();
            }}
        />
      );
    }

    return (
      <div>
    
        <Dialog
          title="Note"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={handleClose}
          contentStyle={fullWidthDialagStyle}
        >

          <NoteForm note={note} handleSubmit={editNote(note)} />
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
       dispatch(noteDelete(noteId));
     },
     handleClose: () => {
       dispatch(noteLoad(-1));
     }
  }
}
export default connect(stateToProps,dispatchToProps)(NoteEditDialog);