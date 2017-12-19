import React, {Component} from 'react';
import RegisterForm from './RegisterForm';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postType: null,
    }

  }



  render() {



    return (
      <div className="hero">
        <h1>Home Page</h1>
        <RegisterForm
          postType = {this.state.postType}
          handleInputChange = {this.props.handleInputChange}
          handleLoginSubmit = {this.props.handleLoginSubmit}
          handleRegisterSubmit = {this.props.handleRegisterSubmit}
        />
      </div>
    )


  }//end of render
}//END OF CLASS

export default Home;
