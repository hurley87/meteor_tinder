Profile = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		return {
			user: Meteor.user(),
			userLoading: Meteor.loggingIn()
		}
	},
	getLoginStatus() {
	  if (this.data.userLoading || !this.data.user) {return false;}
	  if (this.data.user) {return true;}
	  return false
	},
	render() {
	  let loginStatus = this.getLoginStatus();
	  if (this.data.userLoading) {
	    return <AppLoading />
	  }    
	  if (!this.data.user) {
	    return <NotLoggedIn /> 
	  }
	  return (
	    <div className="profile-wrapper">
	      <div className="image-wrapper">
			{loginStatus ? <img src={this.data.user.profile.image} /> : <div></div>}
	      </div>
	      <div className="login-wrapper">
	        {loginStatus ? <LoggedIn /> : <NotLoggedIn />}
	      </div> 
	    </div>
	  )
	}
})

LoginForm = React.createClass({
	getInitialState() {
	  return {
	    user: "",
	    pass: ""
	  }
	},
	handleChange(input, e) {
	  if (input == "user") {
	    this.setState({
	      user: e.target.value
	    })
	  };
	  if (input == "pass") {
	    this.setState({
	     pass: e.target.value
	    })
	  }
	},
  render() {
  	var user = this.state.user;
  	var pass = this.state.pass;
    return (
      <div>
        <div className="list">
          <label className="item item-input">
            <span className="input-label">Username</span>
            <input value={user} type="text" onChange={this.handleChange.bind(this, "user")} />
          </label>
          <label className="item item-input">
            <span className="input-label">Password</span>
            <input value={pass} type="password" onChange={this.handleChange.bind(this, "pass")} />
          </label>
        </div>
        <div className="padding">
	        <button onClick={this.props.login.bind(null, this.state.user, this.state.pass)} className="button button-block button-positive"> 
	          Log in
	        </button>
        </div>
      </div>
    )
  }
})

NotLoggedIn = React.createClass({
  login(user, pass) {
    Meteor.loginWithPassword(user, pass, function(err) {
    	alert(err.reason);
    });
  },
  render() {
    return <LoginForm login={this.login}/>
  }
})

LoggedIn = React.createClass({
	logout() {
	  Meteor.logout();
	},
	render() {
		return (
		  <div>
		    <a onClick={this.logout}>Logout</a>
		  </div>
		)
	}
})