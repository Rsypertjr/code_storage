import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import AppRouter from './AppRouter';
import styled from "styled-components";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { map, takeRightWhile } from 'lodash';
import {Container, Row, Col } from 'react-bootstrap';
import $ from 'jquery';



const NavUnlisted = styled.ul`
  text-decoration: none;
`;

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'black',
  fontSize: '0.8em'
};

const states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho",
"Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota",
"Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina",
"North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee",
"Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

const resolutions= [1,2,3,4,5];

export default class VotesApp extends React.Component {
  constructor(props){
      super(props);
      this.setPages = this.setPages.bind(this);
      this.getVotes = this.getVotes.bind(this);
      this.selectState = this.selectState.bind(this);
      this.getStateData = this.getStateData.bind(this);
      this.getChartsData = this.getChartsData.bind(this);
      this.getPageNumber = this.getPageNumber.bind(this);
      this.leftArrow = this.leftArrow.bind(this);
      this.rightArrow = this.rightArrow.bind(this);
      this.selectResolution = this.selectResolution.bind(this);
      this.selectAnalytics = this.selectAnalytics.bind(this);
      this.resetCharts = this.resetCharts.bind(this);
      this.storeVoteDataInMongo = this.storeVoteDataInMongo.bind(this);
      this.checkForVotes = this.checkForVotes.bind(this);
      this.doAnalytics = this.doAnalytics.bind(this);
      this.analyticEngine = this.analyticEngine.bind(this);
      this.selectAnalytics = this.selectAnalytics.bind(this);
      this.selectChartForAnalytics = this.selectChartForAnalytics.bind(this);


      this.state = {
          theVotes: [],
          theOriginalVotes: [],
          DataisLoaded: false,
          analyticsIsOn: false,
          analyticsChartData: [],
          theCurrentPage: [],
          theCurrentPages: [],
          thePageSize:0,
          thePageSetNumber:1,
          selectedState:states[0],
          pageNo:1,
          raceId: '',
          raceSlug: '',
          raceUrl:'',
          theState:states[0],
          options: states,
          defaultOption:states[0],
          chartData:{},
          originalChartData:{},
          graphType:'table',
          goto_Linechart: false,
          parse_resolution: 1,
          noOfChartPages:0,
          theChartArray:[],
          theResolutions: resolutions,
          zoomFac:"105%"
      };


    let state = this.state.defaultOption;
    
    this.getStateData(state);
  }


  getPageNumber(obj)
  {
     let num = obj.num;
     this.setState({
         pageNo: num

     });
  }


  rightArrow(obj){
      let num = obj.num;
      let nxpagenum = obj.nxpagenum
      let type = obj.type;

      if( parseInt(num) < parseInt(this.state.thePageSetNumber+1)*parseInt(this.state.thePageSize) )
      {
        let newNum = Math.ceil(parseInt(this.state.thePageSetNumber-1) % parseInt(this.state.thePageSize))*parseInt(this.state.thePageSize) + 1;
        if(type == 'table' && parseInt(nxpagenum) < parseInt(this.state.thePagingArray.length)){
              this.setState({
                  thePageSetNumber:parseInt(this.state.thePageSetNumber) + 1,
                  pageNo: newNum
              });
          }

        else if(type != 'table' && parseInt(num) <= this.state.chartData.dateHeadersStore.length){
              this.setState({
                  thePageSetNumber:parseInt(this.state.thePageSetNumber)+1,
                  pageNo: num
              });
          }

        else if(type == 'table' && parseInt(nxpagenum) >= this.state.theVotes.length){
              let newNum2 = (parseInt(this.state.thePageSetNumber) - 1)*parseInt(this.state.thePageSize) + 1;
              this.setState({
                  thePageSetNumber:this.state.thePageSetNumber,
                  pageNo: newNum2
              });
          }
       
          else;
      }
      $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
      $('#page-'+this.state.pageNo).css('background-color','#ffc107');
  }

  leftArrow(obj){

      let num = obj.num;
      let newNum = parseInt(this.state.thePageSetNumber-1)*this.state.thePageSize;
      if(newNum > 0){
        this.setState({
            thePageSetNumber:parseInt(this.state.thePageSetNumber) - 1,
            pageNo: num
        });
        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
        $('#page-'+this.state.pageNo).css('background-color','#ffc107');


    }
    else {
        this.setState({
            thePageSetNumber:1,
            pageNo: 1
      });
    }
  }

 async storeVoteDataInMongo(chartData,currentState,theVotes){
    
    const token = document.querySelector('head').querySelector('meta[name="csrf-token"]').content;
    console.log("Token",token);
    console.log("ChartData before sending to Atlas:", chartData);
    await fetch('https://preselections.rsypertjr.net/api/create_election_data_mongo/', {
      method: 'POST',
      body: JSON.stringify({
          guid : currentState.toString(),
          race : 'Presidential',
          year : '2020',
          dateHeadersStore : chartData.dateHeadersStore,
          dateDataBidenStore : chartData.dateDataBidenStore,
          dateDataBidenAddStore : chartData.dateDataBidenAddStore, 
          dateDataBidenAddDiffStore : chartData.dateDataBidenAddDiffStore,
          dateDataTrumpStore : chartData.dateDataTrumpStore,
          dateDataTrumpAddStore : chartData.dateDataTrumpAddStore,
          dateDataTrumpAddDiffStore : chartData.dateDataTrumpAddDiffStore,
          dateDataTotalStore : chartData.dateDataTotalStore,
          dateDataOtherStore : chartData.dateDataOtherStore,
          dateDataOtherAddStore : chartData.dateDataOtherAddStore,
          dateDataTotalAddStore : chartData.dateDataTotalAddStore,
          perRemainingTrumpStore : chartData.perRemainingTrumpStore,
          perRemainingBidenStore : chartData.perRemainingBidenStore,
          bidenSlices : chartData.bidenSlices,
          trumpSlices : chartData.trumpSlices,
          otherSlices : chartData.otherSlices,
          totalSlices : chartData.totalSlices,
          pieHeaders : chartData.pieHeaders,
          voteBins : chartData.voteBins,
          bin_headers : chartData.bin_headers,
          bin_biden : chartData.bin_biden,
          bin_trump : chartData.bin_trump,
          numPages : chartData.numPages,
          chartArray : chartData.chartArray,
          theVotes : theVotes,
          raceId: chartData.raceId.toString(), 
          raceSlug: chartData.raceSlug.toString(), 
          raceUrl: chartData.raceUrl.toString()

      }),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "X-CSRF-TOKEN": token
      }
      }).then(function(response){ 
          return response.json()
      }).then(function(data){
          console.log(data);
         
      }).catch(error => console.error('Error:', error));  


 }


 getStateData(state){
  
    $('.viewerClose').click();
    let currentState = state;
    let stateUrl ='https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/'+ state.toLowerCase().replace(/\-/,'') + '/president.json';
    
    
    this.checkForVotes(state).then((res) => res.json())
    .then((json) => {
        console.log("Json Response",json);
        
        if(json.length == 0) {
            fetch(stateUrl).then((res) => res.json())
                .then((json) => {
    
                    // Parse Votes
                    let theVotes = this.getVotes(json);
                    let currentPages = [];
                    let pageSize = 10;
                    let numPages = Math.ceil(parseInt(theVotes.length)/pageSize);
                    let pagingArray = [];
    
                     
                    let result = this.setPages(pageSize,numPages,theVotes);
                    currentPages = JSON.parse(JSON.stringify(result.currentPages));
    
                    pagingArray = JSON.parse(JSON.stringify(result.pagingArray));
                    numPages = Math.ceil(currentPages.length);
    
    
    
    
                    this.setState({
                        theVotes: theVotes,
                        theOriginalVotes: theVotes,                        
                        DataisLoaded: true,
                        theCurrentPages: currentPages,
                        theCurrentPage: currentPages[this.state.pageNo-1],
                        theNumberOfPages: numPages,
                        thePagingArray: pagingArray,
                        thePageSize: pageSize,
                        selectedState: currentState,
                        defaultOption: this.state.theState,
                        analyticsIsOn:false
                    });
    
    
                let chartData = this.getChartsData(this.state.parse_resolution);
                console.log("new chartdata",chartData);
                   
                // Store data in MongoDB
                this.storeVoteDataInMongo(chartData, currentState, theVotes);
    
                this.setState({
                    chartData: chartData,
                    originalChartData: chartData,
                    noOfChartPages : chartData.numPages,
                    theChartArray: chartData.chartArray
                });
                setTimeout(() => {
                    $('#top-header').removeClass('turntopheader');
                },1000);
                return;
            });
        }
        else{
            console.log("Chartdata already available",json[0]);
            
            let theVotes = json[0].theVotes;
            let currentPages = [];
            let pageSize = 10;
            let numPages = Math.ceil(parseInt(theVotes.length)/pageSize);
            let pagingArray = [];


            let result = this.setPages(pageSize,numPages,theVotes);
            currentPages = JSON.parse(JSON.stringify(result.currentPages));

            pagingArray = JSON.parse(JSON.stringify(result.pagingArray));
            numPages = Math.ceil(currentPages.length);




            this.setState({
                theVotes: theVotes,
                theOriginalVotes: theVotes,
                DataisLoaded: true,
                theCurrentPages: currentPages,
                theCurrentPage: currentPages[this.state.pageNo-1],
                theNumberOfPages: numPages,
                thePagingArray: pagingArray,
                thePageSize: pageSize,
                defaultOption: this.state.theState,
                chartData: json[0],
                raceSlug: json[0].raceSlug,
                raceId: json[0].raceId,
                raceUrl: json[0].raceUrl,
                originalChartData: json[0],
                selectedState: currentState,
                noOfChartPages : json[0].numPages,
                theChartArray: json[0].chartArray,
                analyticsIsOn:false
            });
            setTimeout(() => {
                $('#top-header').removeClass('turntopheader');
            },1000);
            return;
        }
        
    });
    
    
}

async votesFromServer(state){
      let stateUrl = 'http://'+window.location.host+'/vote-rows/Michigan';
      await fetch(stateUrl).then((res) => res.json())
        .then((json) => {
            return json;
        });
  }

async checkForVotes(state){
    const result = await fetch("https://preselections.rsypertjr.net/api/check_election_data_mongo/" + state);
    console.log('Result', result);
    
    return result;
  }

 

  getChartsData(parse_interval,voteRows=null){
    let vote_rows;
    console.log("Vote Rows inside Charts Data:",voteRows);
    if(voteRows === null)
        vote_rows  = this.state.theVotes;
    else
        vote_rows = voteRows;

    var vote_bins = [];
    var dateheaders = [];
    var datedatabiden = [];
    var datedatabidenadd = [];
    var datedatabidenadddiff = [];
    var datedatatrump = [];
    var datedatatrumpadd = [];
    var datedatatrumpadddiff = [];
    var datedatatotal = [];
    var datedatatotaladd = [];
    var datedataother = [];
    var datedataotheradd = [];
    var perremainingtrump = [];
    var perremainingbiden = [];

    var dateheaders_store = [];
    var datedatabiden_store = [];
    var datedatabidenadd_store = [];
    var datedatabidenadddiff_store = [];
    var datedatatrump_store = [];
    var datedatatrumpadd_store = [];
    var datedatatrumpadddiff_store = [];
    var datedatatotal_store = [];
    var datedataother_store = [];
    var datedataotheradd_store = [];
    var datedatatotaladd_store = [];
    var perremainingtrump_store = [];
    var perremainingbiden_store = [];

    var totalslices = [];
    var bidenslices = [];
    var trumpslices = [];
    var otherslices = [];
    var pieheaders = [];
    for(i=0;i<vote_rows.length;i++){

        dateheaders[i] = vote_rows[i].timestamp;
        datedatabiden[i] = vote_rows[i].biden_votes;
        datedatatrump[i] = vote_rows[i].trump_votes;
        datedataother[i] = vote_rows[i].other_votes;
        datedatatotal[i] = vote_rows[i].votes;
        perremainingtrump[i] = vote_rows[i].remaining_percent_trump;
        perremainingbiden[i] = vote_rows[i].remaining_percent_biden;


        if(i == 0)
        {
            datedatabidenadd[i] = vote_rows[i].biden_votes;
            datedatatrumpadd[i] = vote_rows[i].trump_votes;
            datedataotheradd[i] = vote_rows[i].other_votes;
            datedatatotaladd[i] = vote_rows[i].votes;
            datedatabidenadddiff[i] = vote_rows[i].biden_votes;
            datedatatrumpadddiff[i] = vote_rows[i].trump_votes;
        }
        if(i > 0) {
          datedatabidenadd.push(vote_rows[i].biden_votes-vote_rows[i-1].biden_votes);
          datedatatrumpadd.push(vote_rows[i].trump_votes-vote_rows[i-1].trump_votes);
          datedataotheradd.push(vote_rows[i].other_votes-vote_rows[i-1].other_votes);
          datedatatotaladd.push(vote_rows[i].votes-vote_rows[i-1].votes);
          datedatabidenadddiff.push(vote_rows[i].biden_votes - vote_rows[i-1].biden_votes);
          datedatatrumpadddiff.push(vote_rows[i].trump_votes - vote_rows[i-1].trump_votes);
        }
    }

    let date_headers = [];
    let date_databiden = [];
    let date_datatrump = [];
    let date_databidenadd = [];
    let date_datatrumpadd = [];
    let date_databidenadddiff = [];
    let date_datatrumpadddiff = [];
    let date_dataotheradd = [];
    let date_datatotaladd = [];
    let date_datatotal = [];
    let date_dataother = [];
    let per_remainingtrump = [];
    let per_remainingbiden = [];
    let cnt3 = 0
    for(var k=0;k < datedatabiden.length;k=k+this.state.thePageSize*parse_interval){
        date_headers[cnt3] = dateheaders.slice(k,k+this.state.thePageSize*parse_interval);
        date_databiden[cnt3] = datedatabiden.slice(k,k+this.state.thePageSize*parse_interval);
        date_datatrump[cnt3] = datedatatrump.slice(k,k+this.state.thePageSize*parse_interval);
        date_databidenadd[cnt3] = datedatabidenadd.slice(k,k+this.state.thePageSize*parse_interval);
        date_datatrumpadd[cnt3] = datedatatrumpadd.slice(k,k+this.state.thePageSize*parse_interval);
        date_databidenadddiff[cnt3] = datedatabidenadddiff.slice(k,k+this.state.thePageSize*parse_interval);
        date_datatrumpadddiff[cnt3] = datedatatrumpadddiff.slice(k,k+this.state.thePageSize*parse_interval);
        date_dataotheradd[cnt3] = datedataotheradd.slice(k,k+this.state.thePageSize*parse_interval);
        date_datatotaladd[cnt3] = datedatatotaladd.slice(k,k+this.state.thePageSize*parse_interval);
        date_datatotal[cnt3] = datedatatotal.slice(k,k+this.state.thePageSize*parse_interval);
        date_dataother[cnt3] = datedataother.slice(k,k+this.state.thePageSize*parse_interval);
        per_remainingtrump[cnt3] = perremainingtrump.slice(k,k+this.state.thePageSize*parse_interval);
        per_remainingbiden[cnt3] = perremainingbiden.slice(k,k+this.state.thePageSize*parse_interval);
        cnt3++;
    }


    datedatabidenadd_store = date_databidenadd;
    datedatatrumpadd_store = date_datatrumpadd;

    datedataotheradd_store = date_dataotheradd;
    datedatatotaladd_store = date_datatotaladd;

    datedatabidenadddiff_store = date_databidenadddiff;
    datedatatrumpadddiff_store = date_datatrumpadddiff;
    dateheaders_store = date_headers;
    datedatabiden_store = date_databiden;
    datedatatrump_store = date_datatrump;
    datedatatotal_store = date_datatotal;
    datedataother_store = date_dataother;
    perremainingtrump_store = per_remainingtrump;
    perremainingbiden_store = per_remainingbiden;

    // PieChart calculations
    if(datedatabiden_store != null) {
        for(var i = 0;i < datedatabiden_store.length;i++){
                var total_amt = 0;
                var total_biden = 0;
                var total_trump = 0;
                var total_other = 0;
                for(var j = 0;j < datedatatotal_store[i].length;j++){
                    total_amt += datedatatotal_store[i][j];
                    total_biden += datedatabiden_store[i][j];
                    total_trump += datedatatrump_store[i][j];
                    total_other += datedataother_store[i][j];
                    if(j == 0 ){
                        pieheaders[i] = dateheaders_store[i][j] + " To ";
                    }
                    if(j == dateheaders_store[i].length-1){
                        pieheaders[i] +=  dateheaders_store[i][j];
                    }
                }
                totalslices.push(total_amt);
                bidenslices.push(total_biden);
                trumpslices.push(total_trump);
                otherslices.push(total_other);
            }
    }

   // Trim Out Nulls
    dateheaders_store  = dateheaders_store.filter((i) => i.length > 0);
    datedatabiden_store  = datedatabiden_store.filter((i) => i.length > 0);
    datedatabidenadd_store  = datedatabidenadd_store.filter((i) => i.length > 0);
    datedatabidenadddiff_store  = datedatabidenadddiff_store.filter((i) => i.length > 0);
    datedatatrump_store  = datedatatrump_store.filter((i) => i.length > 0);
    datedatatrumpadd_store  = datedatatrumpadd_store.filter((i) => i.length > 0);
    datedatatrumpadddiff_store  = datedatatrumpadddiff_store.filter((i) => i.length > 0);
    datedatatotal_store  = datedatatotal_store.filter((i) => i.length > 0);
    datedataother_store  = datedataother_store.filter((i) => i.length > 0);
    datedatatotaladd_store  = datedatatotaladd_store.filter((i) => i.length > 0);
    datedataotheradd_store  = datedataotheradd_store.filter((i) => i.length > 0);
    perremainingtrump_store  = perremainingtrump_store.filter((i) => i.length > 0);
    perremainingbiden_store  = perremainingbiden_store.filter((i) => i.length > 0);

    console.log("Date Data Biden Add Store: ", datedatabidenadddiff_store);
    console.log("Date Data Trump Add Store: ", datedatatrumpadddiff_store);

    let numPages = dateheaders_store.length;
    var arr = [];
    for(var i=0;i<numPages;i++){
        arr[i]=i;
    }

    var arr2 = [];
    for(var i=0;i<arr.length;i++){
        arr2[i]=[];
        for(var j = i*parseInt(this.state.thePageSize); j <= (i*parseInt(this.state.thePageSize)+parseInt(this.state.thePageSize)-1); j++ ){
           arr2[i].push(j);
      }
    }

    let chartArray = arr2;

    // Fill Votebins
    // Set up Vote Bins
    var index = 0;
    var interval = 0;
    let vote_bin = {
        "interval":0,
        "biden_in_bin": 0,
        "trump_in_bin":0,
    };

    let step = Math.floor(parseInt(200000)/(numPages*10));
    interval = vote_bin.interval;
    while(interval <= 200000){
        vote_bin.interval = interval;
        vote_bin.trump_in_bin = 0;
        vote_bin.biden_in_bin = 0;
        vote_bins[index] = vote_bin;
        index++;
        interval = interval + step;

        vote_bin = {
            "interval":0,
            "biden_in_bin": 0,
            "trump_in_bin":0,
        };
    }

    // Put in Biden Bins
    for(var j = 0;j<datedatabidenadddiff_store.length;j++){
        var store = datedatabidenadddiff_store[j];
        for(var k=0;k < store.length;k++){
            for(var l = 0;l < vote_bins.length;l++){
                if(l > 0)
                    if(store[k] < vote_bins[l].interval && store[k] >= vote_bins[l-1].interval)
                        vote_bins[l].biden_in_bin++;
            }
        }
    }

    // Put in Trump Bins
    for(var j = 0;j<datedatatrumpadddiff_store.length;j++){
        var store = datedatatrumpadddiff_store[j];
        for(var k=0;k < store.length;k++){
            for(var l = 0;l < vote_bins.length;l++){
                if(l > 0)
                    if(store[k] < vote_bins[l].interval && store[k] >= vote_bins[l-1].interval)
                        vote_bins[l].trump_in_bin++;
            }
        }
    }
    var bin_headers = [];
    var bin_biden = [];
    var bin_trump = [];

    var index = 0;
    for(let i=0;i<vote_bins.length;i++){
            if(i == 0){
                bin_headers[index] = [];
                bin_biden[index] = [];
                bin_trump[index] = [];
                bin_headers[index].push(vote_bins[i].interval);
                bin_biden[index].push(vote_bins[i].biden_in_bin);
                bin_trump[index].push(vote_bins[i].trump_in_bin);

            }
            else if( i % parse_interval != 0 ){
                bin_headers[index].push(vote_bins[i].interval);
                bin_biden[index].push(vote_bins[i].biden_in_bin);
                bin_trump[index].push(vote_bins[i].trump_in_bin);
            }
            else if(i % this.parse_interval == 0) {
                bin_headers[index].push(vote_bins[i].interval);
                bin_biden[index].push(vote_bins[i].biden_in_bin);
                bin_trump[index].push(vote_bins[i].trump_in_bin);

                index++;
                bin_headers[index] = [];
                bin_biden[index] = [];
                bin_trump[index] = [];
            }
            else{
                bin_headers[index].push(vote_bins[i].interval);
                bin_biden[index].push(vote_bins[i].biden_in_bin);
                bin_trump[index].push(vote_bins[i].trump_in_bin);
            }

        }

        // Trim Out Zeros
        bidenslices = bidenslices.filter((i) => i != 0);
        trumpslices = trumpslices.filter((i) => i != 0);
        otherslices = otherslices.filter((i) => i != 0);
        totalslices = totalslices.filter((i) => i != 0);
        pieheaders = pieheaders.filter((i) => i != null);
        vote_bins = vote_bins.filter((i) => i != null);
        bin_headers = bin_headers.filter((i) => i != null);
        bin_biden = bin_biden.filter((i) => i != null);
        bin_trump = bin_trump.filter((i) => i != null);


    let dataLoad = {
      "dateHeadersStore": dateheaders_store,
      "dateDataBidenStore": datedatabiden_store,
      "dateDataBidenAddStore": datedatabidenadd_store,
      "dateDataBidenAddDiffStore": datedatabidenadddiff_store,
      "dateDataTrumpStore": datedatatrump_store,
      "dateDataTrumpAddStore":  datedatatrumpadd_store,
      "dateDataTrumpAddDiffStore": datedatatrumpadddiff_store,
      "dateDataTotalStore": datedatatotal_store,
      "dateDataOtherStore": datedataother_store,
      "dateDataOtherAddStore": datedataotheradd_store,
      "dateDataTotalAddStore": datedatatotaladd_store,
      "perRemainingTrumpStore": perremainingtrump_store,
      "perRemainingBidenStore": perremainingbiden_store,
      "bidenSlices": bidenslices,
      "trumpSlices": trumpslices,
      "otherSlices": otherslices,
      "totalSlices": totalslices,
      "pieHeaders":  pieheaders,
      "voteBins": vote_bins,
      "bin_headers": bin_headers,
      "bin_biden": bin_biden,
      "bin_trump": bin_trump,
      "numPages": numPages,
      "chartArray": chartArray,
      "theVotes":this.state.theVotes,
      "raceId":this.state.raceId,
      "raceSlug":this.state.raceSlug,
      "raceUrl":this.state.raceUrl
    }

    return dataLoad;
  }





  setPages(pageSize,numPages,theVotes) {
      let currentPages = [];
      let pagingArray = [];

      for(var i = 0;i < parseInt(numPages);i++){
          currentPages[i]= theVotes.slice(i*parseInt(pageSize),( i*parseInt(pageSize)+parseInt(pageSize) ) );
          pagingArray[i] = [];

            for(var j = i*parseInt(pageSize); j <= (i*parseInt(pageSize)+parseInt(pageSize)-1); j++ ){
                  pagingArray[i].push(j);

            }
        }


    let pArray = pagingArray.map((page,index1) => {
         return page.map((row, index2) => {
                return row;
         });
     })


    pagingArray = pArray;




    if(theVotes.length > parseInt(numPages)*parseInt(pageSize)){
          currentPages[parseInt(numPages)] = theVotes.slice(parseInt(numPages)*parseInt(pageSize),theVotes.length);

      }

      let result = {
          "currentPages": currentPages,
          "pagingArray": pagingArray
      }
      return result;
  }

  selectState(e){
    $('#top-header').addClass('turntopheader');
    this.getStateData(e.value);
    this.setState({
        theState: e.value,
        theVotes:this.state.theVotes,
        pageNo: 1,
        thePageSetNumber:1,
        analyticsIsOn:false
      });

    
  }

  selectResolution(e){
     
    let chartData = this.getChartsData(parseInt(e));
 
    this.setState({
        parse_resolution:parseInt(e),
        chartData:  chartData,
        pageNo: 1,
        noOfChartPages : chartData.numPages,
        theChartArray: chartData.chartArray
        });
  }

  selectAnalytics(e,chartData,chartOrigin) {  
   
    console.log("Analytics selected:",e);
    console.log("Original Chart Data: ", this.state.originalChartData);
    let analyticsType = e.toString();
  
  
    if(analyticsType === 'No Analytics'){
        console.log("Wanting No Analytics:", analyticsType);
        let renewChartData = this.getChartsData(1,this.state.originalChartData.theVotes); 
        this.setState({
            analyticsIsOn: false,
            chartData: renewChartData,
            theVotes: renewChartData.theVotes,
            parse_resolution: 1
        });
      
    }
   
    else if(analyticsType !== 'No Analytics'){
        console.log("Analytics Type:",analyticsType);
        console.log("prior Analytics: ", this.state.priorAnalytics);       
      
        this.selectChartForAnalytics(analyticsType,chartOrigin,chartData);
    }
    
    

  }


  selectChartForAnalytics(analyticsType,chartOrigin,chart_Data){
    console.log("Chart Type:", chartOrigin);
    let tempData = {};
    let AnalyzedData = null;
    
    let chartData = this.getChartsData(this.state.parse_resolution,this.state.originalChartData.theVotes);     
    console.log("Chartdata for Analytics:", chartData); 

    switch(chartOrigin){
       
        case 'PerLineChart':
        
            tempData.dateHeadersStore = chartData.dateHeadersStore;
            tempData.Biden = chartData.perRemainingBidenStore;
            tempData.Trump = chartData.perRemainingTrumpStore;
            tempData.Other = [];
            tempData.Total = [];
            tempData.theVotes = chartData.theVotes;
            tempData.type = 'PerlineChart';
            
            AnalyzedData = this.doAnalytics(analyticsType,tempData);
            console.log("Analyzed Data 2", AnalyzedData);
            if(AnalyzedData != null) {
                chartData.dateHeadersStore = AnalyzedData.Date;
                chartData.perRemainingBidenStore = AnalyzedData.Biden;
                chartData.perRemainingTrumpStore = AnalyzedData.Trump
                chartData.theVotes = AnalyzedData.theVotes;

                this.setState({
                    chartData: chartData,
                    theVotes: chartData.theVotes,
                    parse_resolution: 1
                });
            }            
            break;
        case 'SpikesLineChart':
            
            tempData.dateHeadersStore = chartData.dateHeadersStore;
            tempData.Biden = chartData.dateDataBidenAddStore;
            tempData.Trump = chartData.dateDataTrumpAddStore;
            tempData.Other = chartData.dateDataOtherAddStore;
            tempData.Total = chartData.dateDataTotalAddStore;
            tempData.theVotes = chartData.theVotes;
            tempData.type = 'SpikesLineChart';
            
            AnalyzedData = this.doAnalytics(analyticsType,tempData);
            if(AnalyzedData != null) {
                chartData.dateHeadersStore = AnalyzedData.Date;
                chartData.dateDataBidenAddStore = AnalyzedData.Biden;
                chartData.dateDataTrumpAddStore = AnalyzedData.Trump;
                chartData.dateDataOtherAddStore = AnalyzedData.Other;
                chartData.dateDataTotalAddStore = AnalyzedData.Total;
                chartData.theVotes = AnalyzedData.theVotes;

                this.setState({
                    chartData: chartData,                    
                    theVotes: chartData.theVotes,
                    parse_resolution: 1
                });
            }            
            break;

        case 'DiffLineChart':
        
            tempData.dateHeadersStore = chartData.dateHeadersStore;
            tempData.Biden = chartData.dateDataBidenAddDiffStore;
            tempData.Trump = chartData.dateDataTrumpAddDiffStore;
            tempData.Other = [];
            tempData.Total = [];
            tempData.theVotes = chartData.theVotes;
            tempData.type = 'DiffLineChart';
            
            AnalyzedData = this.doAnalytics(analyticsType,tempData);
            if(AnalyzedData != null) {
                chartData.dateHeadersStore = AnalyzedData.Date;
                chartData.dateDataBidenAddDiffStore = AnalyzedData.Biden;
                chartData.dateDataTrumpAddDiffStore = AnalyzedData.Trump;
                chartData.dateDataOtherAddDiffStore = AnalyzedData.Other;
                chartData.dateDataTotalAddDiffStore = AnalyzedData.Total;
                chartData.theVotes = AnalyzedData.theVotes;

                this.setState({
                    chartData: chartData,                    
                    theVotes: chartData.theVotes,
                    parse_resolution: 1
                });
            }            
            break;

        case 'VotesLineChart2':
        
            tempData.dateHeadersStore = chartData.dateHeadersStore;
            tempData.Biden = chartData.dateDataBidenStore;
            tempData.Trump = chartData.dateDataTrumpStore;
            tempData.Other = [];
            tempData.Total = [];
            tempData.theVotes = chartData.theVotes;
            tempData.type = 'VotesLineChart2';
            
            AnalyzedData = this.doAnalytics(analyticsType,tempData);
            if(AnalyzedData != null) {
                chartData.dateHeadersStore = AnalyzedData.Date;
                chartData.dateDataBidenStore = AnalyzedData.Biden;
                chartData.dateDataTrumpStore = AnalyzedData.Trump;
                chartData.dateDataOtherStore = AnalyzedData.Other;
                chartData.dateDataTotalStore = AnalyzedData.Total;
                chartData.theVotes = AnalyzedData.theVotes;
            
                this.setState({
                    chartData: chartData,                    
                    theVotes: chartData.theVotes,
                    parse_resolution: 1
                });
            }            
            break;

        case 'BarChart':
            
            tempData.dateHeadersStore = chartData.dateHeadersStore;
            tempData.Biden = chartData.dateDataBidenStore;
            tempData.Trump = chartData.dateDataTrumpStore;
            tempData.Other = chartData.dateDataOtherStore;
            tempData.Total = [];
            tempData.theVotes = chartData.theVotes;
            tempData.type = 'BarChart';
            
            AnalyzedData = this.doAnalytics(analyticsType,tempData);
            if(AnalyzedData != null) {
                chartData.dateHeadersStore = AnalyzedData.Date;
                chartData.dateDataBidenStore = AnalyzedData.Biden;
                chartData.dateDataTrumpStore = AnalyzedData.Trump;
                chartData.dateDataOtherStore = AnalyzedData.Other;
                chartData.dateDataTotalStore = AnalyzedData.Total;
                chartData.theVotes = AnalyzedData.theVotes;

                this.setState({
                    chartData: chartData,                    
                    theVotes: chartData.theVotes,
                    parse_resolution: 1
                });
            }            
            break;
    
        case 'BinStackedChart':
        
            tempData.dateHeadersStore = chartData.dateHeadersStore;
            tempData.Biden = chartData.dateDataBidenStore;
            tempData.Trump = chartData.dateDataTrumpStore;
            tempData.Other = chartData.dateDataOtherStore;
            tempData.Total = [];
            tempData.theVotes = chartData.theVotes;
            tempData.type = 'BinStackedChart';
            
            AnalyzedData = this.doAnalytics(analyticsType,tempData);
            if(AnalyzedData != null) {
                chartData.dateHeadersStore = AnalyzedData.Date;
                chartData.dateDataBidenStore = AnalyzedData.Biden;
                chartData.dateDataTrumpStore = AnalyzedData.Trump;
                chartData.dateDataOtherStore = AnalyzedData.Other;
                chartData.dateDataTotalStore = AnalyzedData.Total;
                chartData.theVotes = AnalyzedData.theVotes;

                this.setState({
                    chartData: chartData,                    
                    theVotes: chartData.theVotes,
                    parse_resolution: 1
                });
            }            
            break;

        case 'PieChart':
            console.log("chart data biden slices:",chartData.bidenSlices );
            console.log("page no: ",this.state.pageNo);
            console.log("Original Pie Chart Data data:",chartData.dateHeadersStore);
            tempData.dateHeadersStore = chartData.dateHeadersStore;
            tempData.Biden = chartData.bidenSlices;
            tempData.Trump = chartData.trumpSlices;
            tempData.Other = chartData.otherSlices;
            tempData.Total = [];
            tempData.theVotes = chartData.theVotes;
            tempData.type = 'PieChart'
            
            AnalyzedData = this.doAnalytics(analyticsType,tempData);
            if(AnalyzedData != null) {
                chartData.dateHeadersStore = AnalyzedData.Date;
                console.log("analyzed pie chart dates:",AnalyzedData.Date);
                //chartData.theVotes = [];
                //AnalyzedData.theVotes.map(lev1 => lev1.map(lev2 => {chartData.theVotes.push(lev2)}));
                chartData.bidenSlices = [];
                AnalyzedData.Biden.map(lev1 => lev1.map(lev2 => {chartData.bidenSlices.push(lev2)}));
                console.log("analyzed biden slices:",chartData.bidenSlices);
                chartData.trumpSlices = [];
                AnalyzedData.Trump.map(lev1 => lev1.map(lev2 => {chartData.trumpSlices.push(lev2)}));
                chartData.otherSlices = [];
                AnalyzedData.Other.map(lev1 => lev1.map(lev2 => {chartData.otherSlices.push(lev2)}));
                //let newChartData = this.getChartsData(chartData.theVotes,this.state.parse_resolution); 
                this.setState({
                   // chartData: newChartData,
                    chartData: chartData,                                  
                    theVotes: chartData.theVotes,
                    analyticsChartData: chartData,
                    parse_resolution: 1
                });
            }            
            break;


        default:
        

    }
  }


  doAnalytics(analyticsType, tempData){
    let AnalyzedData = null;
   
   
    switch(analyticsType) {
        case 'High to Low':
            this.setState({
                analyticsIsOn: true
            });  
            AnalyzedData = this.analyticEngine(tempData,'hilo'); 

            break;  
        case 'Largest Difference':
            this.setState({
                analyticsIsOn: true
            });  
            AnalyzedData = this.analyticEngine(tempData,'ldiff'); 
            break; 
        case 'Trump More Votes':
            this.setState({
                analyticsIsOn: true
            });  
            AnalyzedData = this.analyticEngine(tempData,'Trump_plus'); 
            break; 
        case 'Biden More Votes':
            this.setState({
                analyticsIsOn: true
            });  
            AnalyzedData = this.analyticEngine(tempData,'Biden_plus'); 
            break; 
        
        default:      
    }      
   
    return AnalyzedData;                
  }


  analyticEngine(data,type){

    let tempBiden = [];
    let tempTrump = [];
    let tempOther = [];
    let tempTotal = [];
    let tempDate = [];

    if(data.type != 'PieChart'){
        tempBiden = [];
        data.Biden.map(lev1 => lev1.map(lev2 => {tempBiden.push(lev2)}));
        console.log("Temp Biden",tempBiden);

        tempTrump = [];
        data.Trump.map(lev1 => lev1.map(lev2 => {tempTrump.push(lev2)}));
        console.log("Temp Trump",tempTrump);

        tempOther = [];
        data.Other.map(lev1 => lev1.map(lev2 => {tempOther.push(lev2)}));
        console.log("Temp Other",tempOther);

        tempTotal = [];
        data.Total.map(lev1 => lev1.map(lev2 => {tempTotal.push(lev2)}));
        console.log("Temp Total",tempTotal);

        tempDate = [];
        data.dateHeadersStore.map(lev1 => lev1.map(lev2 => {tempDate.push(lev2)}));
        console.log("Temp Date",tempDate); 
    }
    else {
        tempBiden = data.Biden;
        tempTrump = data.Trump;
        tempOther = data.Other;
        tempTotal = data.Total;
        data.dateHeadersStore.map(lev1 => lev1.map(lev2 => {tempDate.push(lev2)}));
        console.log("Temp Date",tempDate); 
    }
    
    let tempCombined = [];
    tempBiden.forEach(function(item, index){
        tempCombined.push({"Trump":tempTrump[index],"Biden":tempBiden[index],"Other":tempOther[index],"Total":tempTotal[index],"Date":tempDate[index],
                "Votes":data.theVotes[index]});
    });

    console.log("Temp Combined",tempCombined);
    let sortResult;
    if(type==='hilo'){
        let Hi_low_sort = tempCombined.sort((a, b) => ( (a.Trump > a.Biden)  &&  ( a.Trump > (b.Trump && b.Biden) ) ||
                                                          (a.Trump < a.Biden)  &&  ( a.Biden > (b.Trump && b.Biden) ) 
                                                        )  ? -1 : 1);
        console.log("Hi to Low Sort", Hi_low_sort);
        sortResult = Hi_low_sort;
    }
    else if(type==='ldiff'){
        let Ldiff_sort = tempCombined.sort((a, b) => ( Math.abs(a.Trump - a.Biden) > Math.abs(b.Trump-b.Biden) )  ? -1 : 1);
        console.log("Largest Difference", Ldiff_sort);
        sortResult = Ldiff_sort;
    }
    else if(type==='Trump_plus'){
        let Trump_plus_sort = tempCombined.sort((a, b) => ( (a.Trump > a.Biden) > (b.Trump > b.Biden) )  ? -1 : 1);
        console.log("Trump Plus Votes", Trump_plus_sort);
        sortResult = Trump_plus_sort;
    }
    else if(type==='Biden_plus'){
        let Biden_plus_sort = tempCombined.sort((a, b) => ( (a.Biden > a.Trump) > (b.Biden > b.Trump) )  ? -1 : 1);
        console.log("Largest Difference", Biden_plus_sort);
        sortResult = Biden_plus_sort;
    }
    

    console.log("Sort Result: ",sortResult);
    let reconChart = [];
    let arr = [];
    sortResult.forEach(function(item, index) {
       arr.push(item);
       
       if(arr.length % 10 === 0) {
        reconChart.push(arr);
        arr = [];
       }
    });
    if(sortResult.length % 10 != 0 )
        reconChart.push(arr);

    console.log("Reconstituted Chart:", reconChart);

    let returnData = {
        Trump:[],
        Biden:[],
        Other:[],
        Date:[]
    };
    let analyzedTrump = reconChart.map(lev1 => lev1.map(lev2 => {
      return lev2.Trump;
    }));
    console.log("Analyzed Trump Data", analyzedTrump);

    let analyzedBiden = reconChart.map(lev1 => lev1.map(lev2 => {
        return lev2.Biden;
      }));
    console.log("Analyzed Biden Data", analyzedBiden);

    let analyzedOther = reconChart.map(lev1 => lev1.map(lev2 => {
        return lev2.Other;
      }));
    console.log("Analyzed Other Data", analyzedOther);

    let analyzedTotal = reconChart.map(lev1 => lev1.map(lev2 => {
        return lev2.Total;
      }));
    console.log("Analyzed Total Data", analyzedTotal);
    let analyzedDate;
    if(data.type != 'PieChart'){
        analyzedDate = reconChart.map(lev1 => lev1.map(lev2 => {
            return lev2.Date;
          }));
    }
    else{
        analyzedDate = data.dateHeadersStore;
    }
   
    console.log("Analyzed Date Data", analyzedDate);

    let analyzedVotes = sortResult.map(lev1 =>  {
        return lev1.Votes;
      });
    console.log("Analyzed Votes Data", analyzedVotes);

    return {
        "Trump":analyzedTrump,
        "Biden":analyzedBiden,
        "Other":analyzedOther,
        "Total":analyzedTotal,
        "Date":analyzedDate,
        "theVotes":analyzedVotes
    }
  }





  resetCharts(e){
       this.selectResolution(1);
  }


  getVotes(res){
      let jobj = res;

      let timeseries = jobj.data.races[0].timeseries;
      let raceId = jobj.data.races[0].race_id;
      let raceSlug = jobj.data.races[0].race_slug;
      let raceUrl = jobj.data.races[0].url;
      this.setState({ 
          raceId: raceId,
          raceSlug: raceSlug,
          raceUrl: raceUrl
      });



      // Parse Votes for Master Table
      var total_trump_increase = 0;
      function calc_votes(votes,index){
          let per_adj = votes.vote_shares.bidenj+votes.vote_shares.trumpd;
          let biden = votes.vote_shares.bidenj*votes.votes;

          let vote_row = {
          "index": index,
          "votes": votes.votes,
          "timestamp": votes.timestamp,
          "bidenj": votes.vote_shares.bidenj,
          "biden_votes":0,
          "trumpd": votes.vote_shares.trumpd,
          "trump_votes":0,
          "other_votes":0,
          "total_vote_add":0,
          "total_vote_add_trump":0,
          "total_vote_add_biden":0,
          "total_vote_add_other":0,
          "total_vote_add_total":0,
          "percent_of_remaining_trump":0,
          "percent_of_remaining_biden":0,
          "time":votes.timestamp
          };

          return vote_row;
      }


      let presVotes = timeseries.map(calc_votes);
      let thePresVotes = presVotes;
      var pres_votes = thePresVotes;


      pres_votes = pres_votes.map(function(votes,index){
        if(index == 0){
            votes.biden_votes = votes.bidenj*votes.votes;
            votes.trump_votes = votes.trumpd*votes.votes;
            votes.total_vote_add = votes.votes;
            votes.total_vote_add_trump = votes.votes * votes.trumpd;
            votes.total_vote_add_biden = votes.votes * votes.bidenj;
            votes.total_vote_add_other = votes.votes - (votes.votes * votes.trumpd + votes.votes * votes.bidenj);
            votes.other_votes = (1-votes.bidenj-votes.trumpd)*votes.votes;
        }
        else if(index > 0){

            if(votes.votes == 0)
                votes.total_vote_add = 0;
            else
                votes.total_vote_add = pres_votes[index].votes - pres_votes[index-1].votes;

            if(votes.bidenj == 0)
                votes.biden_votes = 0;
            else
                votes.biden_votes = votes.bidenj*votes.votes;

            if(votes.trumpd == 0)
                votes.trump_votes = 0;
            else
                votes.trump_votes = votes.trumpd*votes.votes;

            votes.other_votes = votes.votes - votes.biden_votes - votes.trump_votes;
            votes.total_vote_add_trump = votes.votes*votes.trumpd - pres_votes[index-1].votes*pres_votes[index-1].trumpd;
            votes.total_vote_add_biden = votes.votes*votes.bidenj - pres_votes[index-1].votes*pres_votes[index-1].bidenj;
            votes.total_vote_add_other = (1-votes.bidenj-votes.trumpd)*votes.votes - pres_votes[index-1].votes*(1 - pres_votes[index-1].bidenj - pres_votes[index-1].trumpd);
            votes.total_vote_add_total = pres_votes[index].votes - pres_votes[index-1].votes;
        }
        return votes;
    });

    var totalnum_votes = pres_votes[pres_votes.length-1].votes;
    let temp_rows = pres_votes.map(function(vote,index){
      vote.percent_of_remaining_trump = vote.total_vote_add_trump*100/(totalnum_votes-vote.votes);
      vote.percent_of_remaining_biden = vote.total_vote_add_biden*100/(totalnum_votes-vote.votes);
      return vote;
      });


    let vote_rows = temp_rows.map(function(vote,index){
        return {"id":index,"bidenj":vote.bidenj,"biden_votes":vote.biden_votes,"trumpd":vote.trumpd,"trump_votes":vote.trump_votes,"other_votes":vote.other_votes,"timestamp":vote.timestamp,"votes":vote.votes,"total_vote_add":vote.total_vote_add,"trump_added":vote.total_vote_add_trump,
            "biden_added":vote.total_vote_add_biden, "remaining_percent_trump":vote.percent_of_remaining_trump,"remaining_percent_biden": vote.percent_of_remaining_biden};
     });
    return vote_rows;

    }







  // ComponentDidMount is used to
  // execute the code
  componentDidMount() {

  }


  render() {
    return (
     <>
        <Container id="top-header" className="w-100 text-center rounded mb-1" style={{backgroundColor:'lightGrey', borderStyle:"groove",borderWidth:"15px",zoom:this.state.zoomFac}}>
            <Row className="d-flex justify-content-center p-2" >
                <Col xs lg="2"/>
                <Col md="auto pt-2">
                    <span>Select a State: </span>
                </Col>
                <Col md="auto">
                    <Dropdown options={this.state.options} onChange={this.selectState} value={this.state.defaultOption} placeholder="Select an option" />
                </Col>
                <Col xs lg="2"/>
            </Row>
            <Row className="d-flex justify-content-center p-2">
                <Col>
                    <h3>Laravel/React 2020 Presidential Election Parser</h3>
                    <h4>Race Data:</h4>
                    <p>{ this.state.raceId }</p>
                    <p>{ this.state.raceSlug }</p>
                    <p className="text-break">{ this.state.raceUrl }</p>
                    <p>State: { this.state.theState }</p>
                </Col>               
            </Row>
        </Container>
        <Container  className="w-100 p-3 rounded" style={{backgroundColor:"gray", height:"auto", marginBottom:"10%",zoom:this.state.zoomFac}}>
                <AppRouter  {...this.state} selectResolution={this.selectResolution} getChartsData={this.getChartsData} selectAnalytics={this.selectAnalytics} resetCharts={this.resetCharts}  
                        getPageNumber={this.getPageNumber} rightArrow={this.rightArrow} leftArrow={this.leftArrow} />    
        </Container>
        
     </>
        


    );
  }
}


//if (document.getElementById('votes-table-react')){
  //  ReactDOM.render(<VotesApp />, document.getElementById('votes-table-react'));
//}
