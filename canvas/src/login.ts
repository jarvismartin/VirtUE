function updateMsg (color: string, msg: string) {
  console.log('UPDATE MSG');
  let loginMsg: HTMLElement = document.getElementById('loginMsg');

  loginMsg.innerHTML = msg;
  loginMsg.className = ''; // Clear out old color
  loginMsg.classList.add(color);
}

function login(e: any) {
  let id: string = (document.getElementById('userId') as HTMLInputElement).value;
  let pw: string = (document.getElementById('password')as HTMLInputElement).value;
  let login: HTMLElement = document.getElementById('login');
  let dockWrapper: HTMLElement  = document.getElementById('dockWrapper');

  // Ignore unless user pressed enter in pwd field OR clicked submit button
  if (e.type === 'keypress' && e.charCode === 13 || e.type === 'click') {
    if(id === ''){
      updateMsg('admin', 'Please enter your ID');
    } else if (pw === '') {
      updateMsg('admin', 'Please enter your password');
    } else {

      updateMsg('black', 'Attempting to log in...');

      // Send authorization request to Excalibur AD
      var url = 'http://localhost:8080/auth/user';

      // var formData = new FormData();
      //
      // formData.append('username', id);
      // formData.append('password', pw);
      // formData.append('grant_type', 'password');
      //
      // fetch(url, {
      //   method: 'POST',
      //   headers: {'content-type': 'application/x-www-form-urlencoded'},
      //   body: formData
      // })

      var data = {"username": id, "password": pw, "grant_type": "password"};

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(res => res.json())
      .catch(error => {
        console.error('Error:', error);
        updateMsg('admin', 'Please check ID and password and try again');
      })
      .then(response => {
        console.log('Success ' + typeof response + ':', response);

        if (response.auth) {
          // Authenticated
          login.classList.remove('fadeIn');
          login.classList.add('fadeOut');
          setTimeout( function() {
            login.parentElement.removeChild(login);
          }, 300);
          dockWrapper.style.display = 'flex';
          updateMsg('viewer', 'Welcome!');
        } else {
          console.log('AUTH FAILED');
          updateMsg('admin', 'Please check ID and password and try again');
        }
      });

    }

  }



}
