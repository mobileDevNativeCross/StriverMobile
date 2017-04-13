import { AsyncStorage } from 'react-native';
import * as AppState from '../modules/AppState';
import {connect} from 'react-redux';
import store from '../redux/store';

//module.exports = function
export default oldTokenCheck = function(reduxCurrentToken) {
  console.warn('reduxCurrentToken', reduxCurrentToken);
  AsyncStorage.getItem('currentToken')
    .then(token => {
      // console.warn('token in reducer: ', token);
      if (token) {
        return token;
        store.dispatch(AppState.setTokenToRedux(JSON.parse(token)));
      }
    })
    .then(() => {
      const { reduxCurrentToken } = this.props;
      const currentToken = reduxCurrentToken.idToken;
      // console.warn('checking next token: ', reduxCurrentToken.idToken);
      if (currentToken) {
        fetch('https://strivermobile-api.herokuapp.com/api/private',{
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + currentToken
          }
        })
        .then((response) => {
          if ((response.status == 401) && (response.ok == false) && (response._bodyText === 'Unauthorized', '\\n')) {
            console.warn('bad responce');
            auth0.showLogin()
              .catch(e => console.warn('error in showLogin()', e))
          }
          return response.json();
        })
        .catch((e) => {
          console.warn('error in getWorkoutTree(): ', e);
        });
      }
    })
    .catch(e => {console.warn(/*'error in getItem(\'newToken\') in reducer', */e)})
}