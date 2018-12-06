import React from 'react';
import { connect } from 'react-redux';

import { handleAppMode } from '../../actions/app_mode_actions';
import TodoSidebarComp from '../partials/todo_sidebar';
import TodoListComp from '../partials/todo_list';

export class TodoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: ''
    }
  }

  changeGroupId = (groupId) => {
    this.setState({ groupId });
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    this.setState({ groupId: urlParams.get('group') || '' });
    this.props.handleAppMode(1);
  }
  
  render() {
    const activeGroup = this.props.groups.find(({ _id }) => (_id === this.state.groupId));
    return (
      <div className='todo-page-000'>
        <TodoSidebarComp
          groups={this.props.groups}
          changeGroupId={this.changeGroupId}
          active_groupId={this.state.groupId}
          visible={this.props.sideBar}
        />
        <div className='todo-page-001-content'>
          {(this.state.groupId === '') ? (
            <h2><span>✅❎</span>Your Todos</h2>
          ) : (
            <TodoListComp
              active_groupId={this.state.groupId}
              listTitle={activeGroup ? activeGroup.title : undefined}
              // pushToTodo={() => {
              //   this.props.history.push('/todo');
              // }}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ groups, events, sideBar }) => ({ groups, events, sideBar });

const mapDispatchToProps = (dispatch) => ({
  handleAppMode: (x) => dispatch(handleAppMode(x))
});

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(TodoPage),
  loadData: function (store) {
    return store.dispatch(handleAppMode(1));
  }
};