import store from '../redux/store';

export async function generateRandomNumber() {

   //HACK JUST FOR TESTING PURPOSE
  var id_token = store.getState()._root.entries[0][1]._root.entries[2][1]._root.entries[2][1];
  console.log('token_from_random:', id_token);
  console.log('state_from_random:' + store.getState());
  console.log('store.getState()._root.entries[0][1]._root.entries[2][1]._root.entries[2][1] - ' + store.getState()._root.entries[0][1]._root.entries[2][1]._root.entries[2][1]);

  //sample api call - THIS IS NOT HOW WE SHOULD DO THIS, JUST FOR TESTING PURPOSES
  fetch('https://strivermobile-api.herokuapp.com/api/home/next',{
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + id_token
    }
  })
  .then((response) => {
    return response.json();
  })
  .then((responseJson) => {
    console.log(responseJson);
  })
  .catch((e) => {
    console.log(e);
  });

  //for the demo of initial app (pepperoni) - can remove
  return new Promise((res) => setTimeout(res, 1000))
    .then(() => Math.floor(Math.random() * 100));
}
