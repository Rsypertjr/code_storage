import {React, useEffect, useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Button, Tooltip, Container, Row, Col } from 'react-bootstrap';

const resolution_values = [
    ['1','one'],
    ['2','two'],
    ['3','three'],
    ['4','four'],
    ['5','five'],

];

const analytic_values = [
    ['1','High to Low'],
    ['2','Largest Difference'],
    ['3','Trump More Votes'],
    ['4','Biden More Votes'],
    ['5','No Analytics']
];

export default function ResolutionDropdown(props){
    const[selectOption, setSelectOption ] = useState("1");
    const[selectOptions, setSelectOptions ] = useState(resolution_values);
    const[selectionMade, setSelectionMade ] = useState("Please Select Here");
    const[firstSelectOption, setFirstSelectOption] = useState('Select Chart Resolution');
    const[analyticsType, setAnalyticsType] = useState("none");
    const[isAvail, setIsAvail] = useState(true);
    const[title, setTitle ] = useState('');
    const[defaultResolution, setDefaultResolution] = useState(props.theResolutions[0].toString());
    const[chArray, setCHArray] = useState(props.chartData.chartArray);

   
    const selectedOption = (e) => {
        
        
        console.log("Selected Text:", e);
       
        setSelectOption(e.toString());
        if(props.analytics !== 'analytics') {
            
            if(getTitle(e.toString()) == "Available" || parseInt(e.toString()) < parseInt(props.parse_resolution) ){
    
                props.selectResolution(e.toString());
                //alert(resolution);
            }
            else {
                alert("Resolution " + e.toString() + " is not Available!");
                setSelectOption("1");
                props.selectResolution("1");
            }
        }
        else {
            let selection = e.toString();
            let textholder = analytic_values.filter(values => {
                return values[0] === selection;
            }).map(item => {return item[1].toString();});
            console.log('Text Holder', textholder);

            props.selectAnalytics(textholder, props.chartData, props.chartType);
            setAnalyticsType(textholder);

        }
        

    }

    const Select = ({ values, onValueChange, selected_option}) => {
        return (
            <Container>
                <Row>
                    <h4 className="d-flex justify-content-center rounded p-1" style={{backgroundColor:"lightblue"}}>{firstSelectOption}</h4>
                </Row>
                <Row>
                    <select
                        onChange={({ target: { value }}) => onValueChange(value)}
                    >
                        <option value={parseInt(selectOption)} >{ selectionMade }</option>
                        {values.map(([value, text]) => (
                            <option key={value} selected={selected_option === value} value={value}>
                                {text}
                            </option>
                        ))}
                    </select>
                </Row>
                
            </Container>
           
        );
    };



    const getTitle = useCallback((res) => {
            let test = (parseInt(props.pageNo)-1)*10*parseInt(res)+parseInt(res);

            if(parseInt(test) <=  props.theVotes.length)
                return "Available";
            else
                return "Not Available";
    });

    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip();
       // setResolution(props.parse_resolution);

        if(props.analytics !== null && props.analytics === 'analytics'){
            setSelectOptions(analytic_values);
            setFirstSelectOption('Select Analyics Type');
            setSelectOption("1");
        }
      

    },[]);

    useEffect(() => {
   
            console.log("Parse Resolution:", props.parse_resolution);
            setSelectOption(props.parse_resolution);
        
       

    },[props.parse_resolution]);




    
    return(

            <Container className='resolution'>
                <Row>
               
                    <Col className="col-12 d-flex justify-content-center" style={{fontSize:"1.5em"}}>                      
                        <Container >
                            <Row className="w-100 mb-2">
                                <Col className="col-12 d-flex justify-content-center">
                                    <Select
                                        values={selectOptions}
                                        selected={selectOption}
                                        onValueChange={selectedOption}
                                        className="w-100"
                                    />                                   
                                </Col>
                            </Row>
                            
                            {typeof(props.analytics) === "undefined" && <Row className="rounded" style={{backgroundColor:"lightgray"}}>
                                <Col className="col-12 p-1 d-flex justify-content-center align-middle">                        
                                    <p>Resolution (data point multiplier) is {selectOption} </p>
                                </Col>
                            </Row>}
                            {props.analytics === 'analytics' && <Row className="rounded" style={{backgroundColor:"lightgray"}}>
                                <Col className="col-12 p-1 d-flex justify-content-center align-middle">  
                                     <p>Analytics Type is <font color="blue">{analyticsType}</font></p>
                                </Col>
                            </Row>}     
                                                
                            { props.analyticsIsOn && <Row className="rounded" style={{backgroundColor:"lightgray"}}>
                                <Col className="col-12 p-1 d-flex justify-content-center align-middle">                   
                                    <p>Analytics is Now On!</p>  
                                </Col>
                            </Row>}
                
                        </Container>
                        
                    </Col>
                </Row>

            </Container>
    );
}