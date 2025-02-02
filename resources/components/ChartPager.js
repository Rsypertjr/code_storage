import React, { useState, useEffect } from 'react';

export default function ChartPager(props){
   
    
    const handlePage = (e) => {
        let num = e.target.value;
        let obj = {};
        obj.num = num;
        
        obj.type = props.type;
        props.getPageNumber(obj);      
    }

    const leftArrow = (e) => {  
        let check = (parseInt(props.thePageSetNumber)-1)*parseInt(props.thePageSize) + 1;
        if((parseInt(props.pageNo)) > check){
            e.target.value = parseInt(props.pageNo) - 1;           
            handlePage(e);
         }
         else{
            let nxpagenum = parseInt(props.thePageSetNumber)*parseInt(props.thePageSize) - 1;
            let obj = {};  
            obj.nxpagenum = nxpagenum;
            obj.num = props.pageNo-1;
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
                handlePage(e);
             }        
            else if( !chk1 && chk2 ) {
                let obj = {};
                let nxpagenum = parseInt(props.thePageSetNumber)*parseInt(props.thePageSize) + 1;
                obj.nxpagenum = nxpagenum;
                obj.num = parseInt(props.pageNo) + 1;
                obj.type = props.type;
                props.rightArrow(obj);
             }
             else{
                 ;
             }
     
    }


    return(        
            <div>                
                <input class="page-arrow" type="button" value="<" onClick={leftArrow}/>                
                {                  
                    props.theChartArray[parseInt(props.thePageSetNumber)-1].map((num) => (      
                        <span>
                        { (num < (props.chartData.dateHeadersStore.length)) && <input type="button" class="page" id={`page-${num+1}`} value={num+1} onClick={handlePage}/> }
                        </span>
                    ))          
                }                    
                <input class="page-arrow" type="button" value=">" onClick={rightArrow}/> 
            </div>                    
        );
}