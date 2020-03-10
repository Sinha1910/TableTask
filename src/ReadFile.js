import React, { Component } from 'react';

class ReadFile extends Component {
      render() {
        return (
          <div className="file-upload-component">
            <input type="file" onChange={() => this.props.getText()} />
          </div>
        );
      } 
}

export default ReadFile;
