// import React, { Component } from 'react';
// import { BrowserRouter as Router } from "react-router-dom";
// import axios from 'axios';
// import { saveAs } from 'file-saver';
// import Navbar from './Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";

// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import GetAppIcon from '@material-ui/icons/GetApp';
// import Stack from '@mui/material/Stack';
// import CircularProgress from '@mui/material/CircularProgress';
// import "./App.css";

// import Search from "@material-ui/icons/Search";
// import ViewColumn from "@material-ui/icons/ViewColumn";
// import SaveAlt from "@material-ui/icons/SaveAlt";
// import ChevronLeft from "@material-ui/icons/ChevronLeft";
// import ChevronRight from "@material-ui/icons/ChevronRight";
// import FirstPage from "@material-ui/icons/FirstPage";
// import LastPage from "@material-ui/icons/LastPage";
// import Add from "@material-ui/icons/Add";
// import Check from "@material-ui/icons/Check";
// import FilterList from "@material-ui/icons/FilterList";
// import Remove from "@material-ui/icons/Remove";
// import ArrowDownward from "@material-ui/icons/ArrowDownward";
// import Clear from "@material-ui/icons/Clear";
// import DeleteOutline from "@material-ui/icons/DeleteOutline";
// import Edit from "@material-ui/icons/Edit";
// import MaterialTable from "material-table";




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

//     //SearchBox
//     searchField: '',
//     // Test State var
//     testeeRecords:[],
//     fileName:''
    
//   }

//   async componentDidMount() {
//     const url = "/request";
//     const response = await fetch(url);
//     const data =  await response.json();
//     this.setState({candidates: data, loading: false});
//   }
//   useStyles = makeStyles({
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
//       .then(() => axios.get('/fetch-pdf', { responseType: 'blob' }))
//       .then((res) => {
//         const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
//         saveAs(pdfBlob, "fileName.pdf" );
//       })
//   }

//   render() {

//     if(this.state.loading) {
//       return ( 
//         <div style={{
//           position: 'absolute', left: '50%', top: '50%',
//           transform: 'translate(-50%, -50%)'
//       }}>
//            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
//             <CircularProgress color="secondary" />
//             <CircularProgress color="success" />
//             <CircularProgress color="inherit" />
//           </Stack>
//         </div>
//      );
//     }
//     if(!this.state.candidates.length) {
//       return <div>Didn't get a candidate</div>
//     }
//     const {candidates, searchField} = this.state
//       const filteredCandidates = candidates.filter(candidate =>(
//         candidate.testeeName.toLowerCase().includes(searchField.toLocaleLowerCase())
//       ))
//       this.candidates = {filteredCandidates};
//     return (
//       <Router>
//           <div className="App">
//         <Navbar fixed="top" sticky="top"/>
//         <MaterialTable
                
//                 icons={{
//                  Check: Check,
//                  DetailPanel: ChevronRight,
//                  Delete: DeleteOutline,
//                  Export: SaveAlt,
//                  Filter: FilterList,
//                  FirstPage: FirstPage,
//                  LastPage: LastPage,
//                  NextPage: ChevronRight,
//                  PreviousPage: ChevronLeft,
//                  Search: Search,
//                  ThirdStateCheck: Remove,
//                  Add: Add,
//                  SortArrow: ArrowDownward,
//                  Clear: Clear,
//                  Edit: Edit,
//                  ViewColumn: ViewColumn,
//                  ResetSearch: Clear,
//                }}
//                title="Psychometric Tests Candidates"
//                columns={[
//                  { title: 'Candidate Id', field: 'candidate_id', width: "15%" },
//                  { title: 'Surname', field: 'testeeName' },
//                  { title: 'Test Name', field: 'testName', type: 'text' },
//                  { title: 'Attempts', field: 'attempts', type: 'numeric' },
//                  { title: 'Score', field: 'score', type: 'numeric' },
//                  { title: 'Percentile', field: 'percentile', type: 'numeric' },
//                  { title: 'Sten', field: 'sten', type: 'numeric' },
//                  { title: 'Date Taken', field: 'date_taken', type: 'date'},
//                  {title: 'Download',render: rowData => <GetAppIcon tooltip= 'Download Report'  onClick={this.clickMe.bind(this,rowData)} id={ 'col2-' + rowData.candidate_id } key={ 'col2-' + rowData.candidate_id } /> }
                 
//                ] }  
                  
//                data={this.state.candidates} 
//                parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}       
//                actions={[
//                  // {
//                  //   icon: () => <GetAppIcon onClick={this.clickMe.bind(this.state.candidate_id)}/>,
//                  //   tooltip: 'Download Report',
//                  //   // onClick: (event, rowData) => alert("Confirm Download"),
//                  // },
//                  // rowData => ({
//                  //   icon: 'delete',
//                  //   tooltip: 'Delete User',
//                  //   onClick: (event, rowData) => alert("You want to delete " + rowData.name),
//                  //   disabled: rowData.birthYear < 2000
//                  // })
//                ]}
//                options={{
//                  actionsColumnIndex: -1
//                }}
//              />   
//             </div>
//       </Router> 
//     );
//   }
// }

// export default App;