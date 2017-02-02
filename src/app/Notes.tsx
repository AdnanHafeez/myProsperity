import * as React from 'react';
import * as ReactDOM from 'react-dom';
import NoteEditDialog from './NoteEditDialog';
import {connect} from 'react-redux';
import BasicDialog from './BasicDialog';
import {WorkbookReducerInterface,NoteReducerInterface} from './data/workbook';
import {List, ListItem} from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {foatingButtonStyle} from './commonStyles';
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
}

interface MyState {

}
class Workbook extends React.Component<MyProps, MyState> {
  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle('Notes');
  }
  render () {
    var {isOnline, noteEdit, notes, noteDelete,noteLoad} = this.props;

    return (
      <div>
  
        <List>
          {notes.map((item) => {
            return (<ListItem key={item.id} primaryText={item.text}  
                              rightIcon={<IconButton onTouchTap={() => noteDelete(item.id)}><DeleteIcon  /></IconButton>} 
                              leftIcon={<IconButton onTouchTap={() => noteEdit(item)}><EditIcon  /></IconButton>}  />)
          })}
        </List>
          <FloatingActionButton  onTouchTap={() => noteLoad()} style={foatingButtonStyle}>
            <ContentAdd />
          </FloatingActionButton>
        <NoteEditDialog />
      </div>
    );
  }
}
export default Workbook;