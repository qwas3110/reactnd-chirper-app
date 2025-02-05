import { getInitialData } from '../utils/api';

import { receiveTweets } from '../actions/tweets';
import { receiveUsers } from '../actions/users';
import { setAuthedUser } from '../actions/authedUser';

import { showLoading,hideLoading  } from 'react-redux-loading';

// 指定用户

const AUTHED_ID = "tylermcginnis";




export function handleInitialData () {
    return (dispatch) => {

        dispatch(showLoading());

        return getInitialData()
            .then(({ users, tweets }) => {
                dispatch(receiveUsers(users));
                dispatch(receiveTweets(tweets));
                dispatch(setAuthedUser(AUTHED_ID));

                dispatch(hideLoading());
            })
    }
}
