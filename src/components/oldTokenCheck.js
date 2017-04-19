import { AsyncStorage } from 'react-native';
import * as AppState from '../modules/AppState';
import {connect} from 'react-redux';
import store from '../redux/store';

//module.exports = function
export default oldTokenCheck = function(reduxCurrentToken) {
  AsyncStorage.getItem('currentToken')
    .then(token => {
      if (token) {
        return token;
        store.dispatch(AppState.setTokenToRedux(JSON.parse(token)));
      }
    })
    .then(() => {
      const { reduxCurrentToken } = this.props;
      const currentToken = reduxCurrentToken.idToken;
      if (currentToken) {
        fetch('https://strivermobile-api.herokuapp.com/api/private',{
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + currentToken
          }
        })
        .then((response) => {
          if ((response.status == 401) && (response.ok == false) && (response._bodyText === 'Unauthorized', '\\n')) {
            console.warn('Unauthorized');
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
    .catch(e => {console.warn('error in getItem(\'newToken\') in reducer', e)})
}
