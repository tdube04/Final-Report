import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import GetAppIcon from "@material-ui/icons/GetApp";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";

import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import SaveAlt from "@material-ui/icons/SaveAlt";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Add from "@material-ui/icons/Add";
import Check from "@material-ui/icons/Check";
import FilterList from "@material-ui/icons/FilterList";
import Remove from "@material-ui/icons/Remove";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";

import MaterialTable from "material-table";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

class App extends Component {
  state = {
    name: "",
    testeeName: "",
    testName: "",
    attempts: 0,
    score: 0,
    sten: 0,
    percentile: 0,
    date_taken: "",
    candidates: [],
    loading: true,

    //SearchBox
    searchField: "",
    // Test State var
    testeeRecords: [],
    fileName: "",

    hoveringOver: "",

    //for second report
    id: 0,
    cand_id: 0,
    assing_no: 0,
    test_typ: 0,
    ques_no: 0,
    
    ans_weight: 0,
    ans_typ: "", //Text
    for_part: "",
    ans_tym: "2021-09-21 17:03:38"
  };

  async componentDidMount() {
    const url = "/items";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ candidates: data, loading: false });
  }

  
  useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  classes = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  handleChange = ({ target: { value, name } }) =>
    this.setState({
      [name]: value,
    });

  async clickMe(row) {
    var testeeRecords = [];

    this.state.candidates.forEach((candidate) => {
      if (candidate.cand_id === row.cand_id) {
        testeeRecords.push(candidate);
        console.log(candidate.cand_id);
      }
    });

    this.setState({ testeeRecords: testeeRecords }, function() {
      this.createAndDownloadPdf();
    });
  }

  createAndDownloadPdf = () => {
    axios
      .post("/create-pdf", this.state.testeeRecords)
      .then(() => axios.get("/fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        console.log(this.state.testeeRecords);
        saveAs(pdfBlob);
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress color="secondary" />
            <CircularProgress color="success" />
            <CircularProgress color="inherit" />
          </Stack>{" "}
        </div>
      );
    }
    if (!this.state.candidates.length) {
      return (
        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "50%",
          }}
        >
          <Box sx={{ width: "400%" }}>
            <Grid>
              <Grid item xs={6}>
                <Item> Didn 't Get Any Candidate! </Item>{" "}
              </Grid>{" "}
            </Grid>{" "}
          </Box>{" "}
        </div>
      );
    }
    return (
      <Router>
        <div className="App ml-5 mr-5" >
          <Navbar fixed="top" sticky="top" />
          <div stlye={{}}>
            {/* <h4>NOTE THAT...</h4> */}
            <Accordion style={{ width: 400 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography
                  style={{
                    fontWeight: 90,
                    fontSize: "20px",
                  }}
                >
                  Having Challenges?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography  align="left">If the downloading is slow: Sorry its probably due to slow network, wait a few seconds...</Typography>
              </AccordionDetails>
              <hr/>
              <AccordionDetails>
                <Typography align="left">After Downloading: Please coonvert to word using the <a href="https://www.ilovepdf.com/pdf_to_word">link</a></Typography>
              </AccordionDetails>
              <hr/>
              <AccordionDetails >
                <Typography align="left">Change the text font-family while in Ms Word</Typography>
              </AccordionDetails>
            </Accordion>
            <hr/>
           
         </div>
          <MaterialTable
            icons={{
              Check: Check,
              DetailPanel: ChevronRight,
              Delete: DeleteOutline,
              Export: SaveAlt,
              Filter: FilterList,
              FirstPage: FirstPage,
              LastPage: LastPage,
              NextPage: ChevronRight,
              PreviousPage: ChevronLeft,
              Search: Search,
              ThirdStateCheck: Remove,
              Add: Add,
              SortArrow: ArrowDownward,
              Clear: Clear,
              Edit: Edit,
              ViewColumn: ViewColumn,
              ResetSearch: Clear,
            }}
            title="Psychometric Tests Candidates"
            columns={[
              {
                title: "Candidate id",
                field: "cand_id",
                width: "15%",
                hover: true,
              },
              { title: "Assign Number", field: "assing_no" , width: "20%"},
              { title: "Test Type", field: "test_typ", type: "numeric", width: "20%" },
              { title: "Question Number", field: "ques_no",  width: "20%" },
              { title: "Answer Type", field: "ans_typ",   width: "20%" },
              { title: "For Part", field: "for_part", type: "text" , width: "20%" },
              { title: "Answer Weight", field: "ans_weight", type: "numeric" , width: "20%" },
              {
                render: (rowData) => (
                  <GetAppIcon
                    tooltip="Download Report"
                    onClick={this.clickMe.bind(this, rowData)}
                    id={"col2-" + rowData.cand_id}
                    key={"col2-" + rowData.cand_id}
                  />
                ),
              }
              
            ]}
            data={this.state.candidates}
            parentChildData={(row, rows) =>
              rows.find((a) => a.id === row.parentId)
            }
            //  actions={[
            //   {
            //     icon: {render: rowData => <GetAppIcon tooltip= 'Download Report'   onClick={this.clickMe.bind(this,rowData)} id={ 'col2-' + rowData.candi_id } key={ 'col2-' + rowData.candidate_id }
            //     />},
            //     tooltip: 'Save User',
            //     onClick: (event, rowData) => alert("You saved " + rowData.name)
            //   }
            // ]}
            options={{
              actionsColumnIndex: -1,
               
            }}
          />
         
        </div>{" "}
      </Router>
    );
  }
}

export default App;
