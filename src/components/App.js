import React, { Component } from 'react'
import { connect } from 'react-redux';

import { handleInitialData } from '../actions/shared';
import Dashboard from "./Dashboard";



//导入加载栏
import LoadingBar from 'react-redux-loading';
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";

class App extends Component {

  componentDidMount() {

    this.props.dispatch(handleInitialData())

  }

  render() {
    return (
      <div>

        <LoadingBar/>

        {
          this.props.loading === true
            ? null
            : <TweetPage match={{params: {id: '8xf0y6ziyjabvozdd253nd'}}}/>
        }

      </div>
    )
  }
}


// 用户未验证成功前，显示loading
function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}



export default connect(
    mapStateToProps
)(App);
