import React from 'react';
import { connect } from 'react-redux';
import {formatDate, formatTweet} from "../utils/helpers";

import {
    TiArrowBackOutline,
    TiHeartOutline,
    TiHeartFullOutline
}
    from 'react-icons/ti/index'


import { handleToggleTweet } from '../actions/tweets';
import {  Link, withRouter  } from 'react-router-dom';


class Tweet extends React.Component {

    toParent = (e,id) => {
        e.preventDefault();

        this.props.history.push(`/tweet/${id}`)
    };


    handleLike = (e) => {
        e.preventDefault();

        const { dispatch, tweet, authedUser } = this.props;

        // todo: 当你喜欢这条推文的时候，
        //  将信息保存在我们重定向store的状态中.以及我们的数据库

        dispatch(handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser,
        }))
    }



    render() {

        const { tweet } = this.props;

        if (tweet === null) {
            return <p>This Tweet doesn's existd</p>
        }

        const {
            name, avatar, timestamp, text,
            hasLiked, likes, replies, id, parent
        } = tweet;

        return (
            <Link to={`/tweet/${id}`} className='tweet'>
                <img src={avatar}
                     alt={`Avatar of ${name}`}
                     className='avatar'
                />

                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>

                        { parent && (
                            <button className="replying-to"
                                    onClick={(e) => this.toParent(e,parent.id)}
                            >
                                Replying to to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>

                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon'/>
                        <span>{ replies !== 0 && replies }</span>
                        <button className='heart-button'
                                onClick={this.handleLike}
                        >
                            {
                                hasLiked === true
                                    ? <TiHeartFullOutline color='#e0245e'
                                                          className='tweet-icon'
                                    />
                                    : <TiHeartOutline className='tweet-icon'/>
                            }
                        </button>
                        <span>
                        { likes !== 0 && likes }
                    </span>
                    </div>
                </div>

            </Link>
        );
    }
}


function mapStateToProps ({ authedUser, users, tweets }, { id }) {
    const tweet = tweets[id];
    const parentTweet = tweet ?  tweets[tweet.replyingTo] : null;

    return {
        authedUser,
        tweet: tweet
          ? formatTweet(tweet, users[tweet.author], authedUser,parentTweet)
          : null
    }


}


export default withRouter(
    connect(
        mapStateToProps
    )(Tweet)
)



