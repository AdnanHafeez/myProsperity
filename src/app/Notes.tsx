import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import BasicDialog from './BasicDialog';
import {WorkbookReducerInterface,NoteReducerInterface} from './data/workbook';
import {List, ListItem} from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import NoteEditComponent from './NoteEditComponent';
import {foatingButtonStyle,topRightButtonStyle, subMenuFlexContainerStyle} from './commonStyles';

const styles = {
  video: {
    width: '100%',
    height: 'auto'
  }
};

interface MyProps {
  appBarTitle(title: string): any;
  notes: NoteReducerInterface[];
  isOnline: any;
  noteEdit(note: NoteReducerInterface): any;
  noteDelete(noteId: number): any;
  noteLoad(): any;
  noteEditMode: boolean;
}

interface MyState {
  editMode: boolean;
}
class Workbook extends React.Component<MyProps, MyState> {
  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle('Notes');
  }

  render () {
    const {isOnline, noteEdit, notes, noteDelete,noteLoad,noteEditMode} = this.props;
    if(noteEditMode){
      return <NoteEditComponent />
    }
    return (
      <div>
        <List>
          {notes.map((item) => {
            return (<ListItem key={item.id} primaryText={item.text}  
                              onTouchTap={() => noteEdit(item)}
                              rightIcon={<EditIcon  />}
                               />)
          })}
        </List>
          <FloatingActionButton  onTouchTap={() => noteLoad()} style={foatingButtonStyle}>
            <ContentAdd />
          </FloatingActionButton>
      </div>
    );
  }
}
export default Workbook;