import React, { Component } from 'react';
import ReadFile  from './ReadFile';
import Table from './Table';

class App extends Component {
  constructor() {
    super();
    this.parseTextToObject = this.parseTextToObject.bind(this);
    this.separatorMethod = this.separatorMethod.bind(this);
    this.storeFilterValues = this.storeFilterValues.bind(this);
    this.state = {
      tableData: [],
      delimiter: ',',
      lines: 2
    };
  }

  separatorMethod(text, separator){
    var returnArray = [];
    if(text.indexOf(separator)){
      returnArray = text.split(separator);
      returnArray = returnArray.splice(0, this.state.lines);
    }
    return returnArray;
  }

  showFile = () => {
    console.log("=====here=====")
    var _this = this;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
         var file = document.querySelector('input[type=file]').files[0];
         var reader = new FileReader()
         var textFile = /text.*/;

         if (file.type.match(textFile)) {
            reader.onload = function (event) {
              if(!_this.state.delimiter){
                alert("Enter delimiter value!");
              }else if(!_this.state.lines){
                alert("Enter number of lines!");
              }else{
                _this.parseTextToObject(event.target.result)
                .then((objectWithData) => {
                  console.log("===resolve===")
                  console.log(objectWithData)
                  _this.setState({tableData:objectWithData});
                  document.querySelector('input[type=file]').value([]);
                })
                .catch(() => {
                  // console.log("===catch===")
                  // alert("Check file content and delimiter value!");
                })
              }
            }
         } else {
            // preview.innerHTML = "<span class='error'>It doesn't seem to be a text file!</span>";
         }
         reader.readAsText(file);

   } else {
      alert("Your browser is too old to support HTML5 File API");
   }
  }

  parseTextToObject(text){
    return new Promise((resolve, reject) => {
      var returnObj = [];
      var mainObj = [];
      if(text){
        returnObj = this.separatorMethod(text, new RegExp(/\r?\n/));
        returnObj.forEach(element => {
          if(element.indexOf(this.state.delimiter) != -1){
            var eachArray = element.split(this.state.delimiter);
            mainObj.push(Object.assign({}, eachArray));
          }
        });

        if(mainObj.length != 0){
          console.log("resolve")
          resolve(mainObj);
        }else{
          console.log("reject")
          reject([]);
        }
      }else{
        console.log("reject 2")
        reject([]);
      }  
    });
  }

  storeFilterValues(value, type){
    if(type == 1){
      this.setState({delimiter: value});
    }else if(type == 2){
      this.setState({lines: value});
    }else{
      this.setState({delimiter:',', lines: 2});
    }
  }

  render() {
    return (
      <div className="main-container">
          <div className="filter-container">
            <div className="delimiter-section">
              <label>Delimiter</label>
              <input type="text" className="delimiter-input" value={this.state.delimiter} ref="delimiter" onChange={(event) => this.storeFilterValues(event.target.value, 1)}/>
            </div>
            <div className="line-limiter">
              <label>Lines</label>
              <input type="text" className="line-limiter" value={this.state.lines} ref="lineLimiter" onChange={(event) => this.storeFilterValues(event.target.value, 2)}/>
            </div>
          </div>
          <div className="read-file-container">
            <ReadFile getText={this.showFile}/>
          </div>
          <div className="table-container">
            {this.state.tableData.length ? <Table data={this.state.tableData}/> : "Upload file!!"}
          </div>
      </div>
    );
  }
}

export default App;
