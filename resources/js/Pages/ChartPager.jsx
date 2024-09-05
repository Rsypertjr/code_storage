import React, { useState, useEffect } from 'react';
import { Col} from 'react-bootstrap';

import $ from 'jquery';

import 'react-dropdown/style.css';

export default function ChartPager(props){
    const [pg, setPG] = useState(0);

    const handlePage = (e) => {
        let num = e.target.value;
        let obj = {};
        obj.num = num;

        obj.type = props.type;
        //alert(JSON.stringify(obj));
        props.getPageNumber(obj);
    }

    const leftArrow = (e) => {
        let check = (parseInt(props.thePageSetNumber)-1)*parseInt(props.thePageSize) + 1;
        if((parseInt(props.pageNo)) > check){
            e.target.value = parseInt(props.pageNo) - 1;
            setPG(e.target.value);
            handlePage(e);
         }
         else{
            let nxpagenum = parseInt(props.thePageSetNumber)*parseInt(props.thePageSize) - 1;
            let obj = {};
            obj.nxpagenum = nxpagenum;
            obj.num = props.pageNo-1;
            setPG(obj.num);
            obj.type = props.type;
            obj.type = props.type;
            props.leftArrow(obj);
         }
    }

    const rightArrow = (e) => {
           let chk1 = (parseInt(props.pageNo)+1) <= (parseInt(props.thePageSetNumber)-1)*parseInt(props.thePageSize) + parseInt(props.thePageSize);
           let chk2 =  (parseInt(props.pageNo)+1) <= props.chartData.dateHeadersStore.length;
            if( chk1 && chk2){
                e.target.value = parseInt(props.pageNo) + 1;
                setPG(e.target.value);
                handlePage(e);
             }
            else if( !chk1 && chk2 ) {
                let obj = {};
                let nxpagenum = parseInt(props.thePageSetNumber)*parseInt(props.thePageSize) + 1;
                obj.nxpagenum = nxpagenum;
                obj.num = parseInt(props.pageNo) + 1;
                setPG(obj.num);
                obj.type = props.type;
                props.rightArrow(obj);
             }
             else{
                 props.rightArrow(pg);
             }
        }

    
  
    return(
            <Col className="d-flex justify-content-center">
                <input className="page" type="button" value="<" onClick={leftArrow} readOnly/>
                {

                props.theChartArrray != 'undefined' && props.theChartArray.length > 0 && props.theChartArray[parseInt(props.thePageSetNumber)-1].map((num,j) => (
                    <span key={j}>
                    { (num < (props.chartData.dateHeadersStore.length)) && < input type="button" className="page" id={`page-${num+1}`} value={num+1} onClick={handlePage} readOnly/> }
                    </span>
                ))

                }
                <input className="page" type="button" value=">" onClick={rightArrow} readOnly/>
            </Col>
        );
}

function APage(props){
    return
}