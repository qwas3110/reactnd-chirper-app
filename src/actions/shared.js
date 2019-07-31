import { getInitialData } from '../utils/api';

import { receiveTweets } from '../actions/tweets';
import { receiveUsers } from '../actions/users';
import { setAuthedUser } from '../actions/authedUser';

// 指定用户

const AUTHED_ID = "tylermcginnis";




export function handleInitialData () {
    return (dispatch) => {
        return getInitialData()
            .then(({ users, tweets }) => {
                dispatch(receiveUsers(users));
                dispatch(receiveTweets(tweets));
                dispatch(setAuthedUser(AUTHED_ID));
            })
    }
}
