import Notes from './Notes';
import { connect } from 'react-redux';
import {noteLoad, noteDelete, noteEdit} from './actions';
import {WorkbookReducerInterface, NoteReducerInterface, NoteFormItemInterface} from './data/workbook';
const mapStateToProps = (state, ownProps) => {
  return {
    notes: state.noteIds.map((nid) => (state.notes[nid + ''])),
    isOnline: true
  };
};

const dispatchToProps = (dispatch) => {
  return {
    noteEdit: (note: NoteReducerInterface) => dispatch(noteLoad(note.id)),
    noteDelete: (noteId: number) => dispatch(noteDelete(noteId)),
    noteLoad: () => dispatch(noteLoad(0))
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(Notes);