// import React, { Component } from 'react';
// import axios from 'axios';
// import { saveAs } from 'file-saver';
// import BasicSearch from './MaterialTable';
// import GetAppIcon from '@material-ui/icons/GetApp';



// import "./App.css";
// import MaterialTable from 'material-table';

// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TablePagination from '@material-ui/core/TablePagination';
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";

// import Paper from "@material-ui/core/Paper";


// import './App.css';

// class App extends Component {
//   state = {
//     name: '',
//     testeeName: '',
//     testName: '',
//     attempts: 0,
//     score: 0,
//     sten: 0,
//     percentile: 0,
//     date_taken: '',
//     candidates:[],
//     loading: true,

//     // Test State var
//     testeeRecords:[],
//     fileName:''
    
//   }

//   async componentDidMount() {
//     const url = "http://localhost:5000/items";
//     const response = await fetch(url);
//     const data =  await response.json();
//     this.setState({candidates: data, loading: false});
//   }

// useStyles = makeStyles({
//     table: {
//       minWidth: 650
//     }
//   });


//  classes = makeStyles({
//   table: {
//     minWidth: 650
//   }
// });

//   handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

//   async clickMe  (row){
//     var testeeRecords = [];
//     var allStens  = [];

//     this.state.candidates.forEach(candidate => {
//       if(candidate.candidate_id === row.candidate_id){
//         testeeRecords.push(candidate);
       
//       }
//     });

//     // this.setState(row, function () {
//     //   this.createAndDownloadPdf();
//     // });
    
//     this.setState({testeeRecords:testeeRecords}, function(){
//       this.createAndDownloadPdf();
//     })

//   }

//   createAndDownloadPdf = () => {
//     axios.post('/create-pdf', this.state.testeeRecords)
//       .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
//       .then((res) => {
//         const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        
//         saveAs(pdfBlob, "fileName.pdf" );
//       })
//   }

//   render() {
//     if(this.state.loading) {
//       return <div>loading....</div>;
//     }
//     if(!this.state.candidates.length) {
//       return <div>Didn't get a candidate</div>
//     }
//     return (
//       <div className="App">
        

//         <h1>Candidate list</h1>
//                   <Paper>
//                       <MaterialTable
//                           title="Psychometric Test Candidates"
//                          let row
//                           columns={[
//                             { title: 'Candidate Id', field: '{row.candidate_id}', width: "15%" },
//                             { title: 'Surname', field: 'testeeName' },
//                             { title: 'Test Name', field: 'testName', type: 'text' },
//                             { title: 'Attempts', field: 'attempts', type: 'numeric' },
//                             { title: 'Score', field: 'score', type: 'numeric' },
//                             { title: 'Percentile', field: 'percentile', type: 'numeric' },
//                             { title: 'Sten', field: 'sten', type: 'numeric' },
//                             { title: 'Date Taken', field: 'date_taken', type: 'date' },
                            
//                           ]}
//                           actions={[
        
//                             rowData => ({
//                               icon: <GetAppIcon onClick={this.clickMe.bind(this)}/>,
//                               tooltip: 'Delete User',
//                               // onClick:{clickMe},
                              
//                             })
//                           ]}
                          
//                           data={this.state.candidates}        
//                           options={{
//                             search: true
                            
//                           }}
//                         />

//                  </Paper>  
//                                 )    
//       </div>
//     );
//   }
// }

// export default App;
