import React, { Component } from 'react'

export default class User extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           user:''  
        }
    }
    componentDidMount(){
          console.log(`${process.env.REACT_APP_URI}`)
        this.setState({
    userid:this.props.match.userId
})
    }
    render() {
        return (
            <div>
                <h2>
                Profile

                </h2>
            </div>
        )
    }
}
