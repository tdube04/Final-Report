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
// import TablePagination from '@mui/material/TablePagination';

// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import GetAppIcon from '@material-ui/icons/GetApp';
// import Stack from '@mui/material/Stack';
// import CircularProgress from '@mui/material/CircularProgress';
// import "./App.css";

// //////
// import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';

// import TableFooter from '@mui/material/TableFooter';

// import IconButton from '@mui/material/IconButton';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import LastPageIcon from '@mui/icons-material/LastPage';

// function TablePaginationActions(props) {
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onPageChange } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onPageChange(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onPageChange(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onPageChange(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         onClick={handleBackButtonClick}
//         disabled={page === 0}
//         aria-label="previous page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </Box>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };

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
//     rowsPerPage: 10,

//     //SearchBox
//     searchField: '',
//     // Test State var
//     testeeRecords:[],
//     fileName:'',
//     page: 0,
//     rowsPerPage:5
    
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
//     const handleChangePage = (event, newPage) => {
//       this.setState({ 
//         page: this.state.page })
//     };
  
//     const handleChangeRowsPerPage = (event) => {
      
//       this.setState({
//         rowsPerPage: parseInt(event.target.value, 10)
//       })
//     };

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
//                   <Paper>
                  
//                    <TableContainer>
//                      <Table >
//                        <TableHead>
//                          <TableRow>
//                            <TableCell align="center">Candidate ID</TableCell>
//                            <TableCell align="center">Testee Name</TableCell>
//                            <TableCell align="center">Test Name</TableCell>
//                            <TableCell align="center">Attempts</TableCell>
//                            <TableCell align="center">Score</TableCell>
//                            <TableCell align="center">Percentile   </TableCell>
//                            <TableCell align="center">Sten</TableCell>
//                            <TableCell align="center">Date Taken</TableCell>
//                          </TableRow>
//                        </TableHead>
//                        <TableBody >
                         
//                          {this.state.candidates.map((row) => (
//                            <TableRow key={row.candidate_id}>
//                              <TableCell align="center" component="th" scope="row">{row.candidate_id} </TableCell>
//                              <TableCell align="center">{row.testeeName}</TableCell>
//                              <TableCell align="center">{row.testName}</TableCell>
//                              <TableCell align="center">{row.attempts}</TableCell>
//                              <TableCell align="center">{row.score}</TableCell>
//                              <TableCell align="center">{row.percentile}</TableCell>
//                              <TableCell align="center">{row.sten}</TableCell>
//                              <TableCell align="center">{row.date_taken}</TableCell>
//                              <GetAppIcon onClick={this.clickMe.bind(this,row)}/>
//                              {/* <button onClick={this.clickMe.bind(this,row)}>Download PDF</button> */}
//                            </TableRow>
//                          ))}
//                        </TableBody>
//                        <TableRow>
//             <TablePagination
//               rowsPerPageOptions={[1, 10, 25, { label: 'All', value: -1 }]}
//               colSpan={3}
//               count={candidates.length}
//               rowsPerPage={10}
//               page={1}
//               SelectProps={{
//                 inputProps: {
//                   'aria-label': 'rows per page',
//                 },
//                 native: true,
//               }}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               ActionsComponent={TablePaginationActions}
             
//             />
//           </TableRow>
//                      </Table>
//                    </TableContainer>
//                  </Paper>     
//             </div>
//       </Router> 
//     );
//   }
// }

// export default App;