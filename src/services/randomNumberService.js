
export async function generateRandomNumber() {

  //sample api call - this is 401, need to add the jwt to header as bearer
  fetch('https://strivermobile-api.herokuapp.com/api/home/next')
  .then((response) => {
    //console.log(state.authenticationToken);
    console.log(response);
  })
  .then((responseJson) => {
    console.log(responseJson);  
  })  
  .catch((e)=>{
      alert(e);
  });

  return new Promise((res) => setTimeout(res, 1000))
    .then(() => Math.floor(Math.random() * 100));
}
