<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AminoController extends Controller
{
    //

    public function view_migrations(): void
    {
        $migrations = DB::select('select * from migrations where id = ?', [1]);
 
        foreach ($migrations as $migration) {
            echo $migration->migration;
        }
    }


      
    public function index(Request $request)
    { 
        
        $dropDb = $request->dropDb;
        $file = $request->file;
        $motif = $request->motif;

        echo $file;

        if($dropDb == 'yes')
        {
          
            $sql = 'DROP TABLE proteins';
            try {
                DB::statement($sql);
            } catch (\Exception $e) {
                echo $e->getMessage();

            }
    
        }

        if($file && !$motif)
            {
                if($file != 'none') 
                {

                    $path = dirname(__FILE__). '/'.$file;
                    //echo $path;
                    $fileString = file_get_contents($path);
                    //echo $fileString;
                    $this->buildProteinDb($fileString,$request);   // call function to Build Protein Database
                }
            }

        if($motif)
            {
              
                $mo = array();
                $mo = str_split($motif,2);
                $ms = $mo[1];
                $m1 = str_split($mo[0]);

                $moPatt = $m1[0].'XX'.$m1[1];
                $question_num = $ms; // question number 
                //mysqli_close($dbhandle);
                $header = array();
            
                $rows = array();
          

                    $qstr = array();
                    $qstr[] = 'SELECT DISTINCT accessionNumber, motifPattern FROM miniMotif WHERE motifPattern = "'.$moPatt.'" ORDER BY accessionNumber';
                    $qstr[] = 'SELECT actualMotif, motifPattern, accessionNumber,motifLength FROM miniMotif WHERE motifPattern = "'.$moPatt.'" ORDER BY accessionNumber, motifLength';
                    $qstr[] = 'SELECT DISTINCT startPosition, motifPattern, accessionNumber FROM miniMotif WHERE motifPattern = "'.$moPatt.'" ORDER BY accessionNumber, startPosition';
                    $qstr[] = 'SELECT DISTINCT accessionNumber, COUNT(accessionNumber) as motifCount FROM miniMotif  WHERE motifPattern = "'.$moPatt.'" GROUP BY accessionNumber';
                    $qstr[] = 'SELECT DISTINCT speciesName, motifPattern FROM miniMotif WHERE motifPattern = "'.$moPatt.'" ORDER BY speciesName';
                    $qstr[] = 'SELECT AVG(proteinLength), motifPattern FROM miniMotif WHERE motifPattern = "'.$moPatt.'"';
                    //echo "check query: ".$qstr[5];
                    $columns = array(
                        array('accessionNumber','motifPattern'),
                        array('actualMotif','motifPattern','accessionNumber','motifLength'),
                        array('startPosition','motifPattern','accessionNumber'),
                        array('accessionNumber','motifCount'),
                        array('speciesName','motifPattern'),
                        array('AVG(DISTINCT p.proteinLength)','motifPattern')
                    );
            
                    $headers = array(array('Accession Number','Motif Pattern'),
                        array('Actual Motif','Motif Pattern','Accession Number','Motif Length'),
                        array('Start Position','Motif Pattern','Accession Number'),
                        array('Accession Number','Motif Count with Pattern '.$moPatt),
                        array('Species Name','Motif Pattern'),
                        array('AVG Protein Length','Motif Patterns')
                    );
            
      
                    $sql= $qstr[$question_num];
                    //echo $sql;

                    try {
                        $result = DB::select($sql);
                        $result2 = array();
                        $index = 0;
                        $index2 = 0;
                        foreach($result as $item){
                            $result2[$index] = (array)$item;
                        /*    foreach($result2 as $item2){
                                $result2[$index2] = (array) $item2;
                                $index2++;
                            } */
                            $index++;
                        }
                        //print_r($result2);
                        $headers = $headers[$question_num];
                        //print_r($headers);
                        $columns = $columns[$question_num];
                        //print_r($columns);
                        $count  = 0;
                       // while($newArray = mysqli_fetch_array($result))
                        $newArray = array();
                        $rows = array();
                        foreach($result2 as $newArray)
                            {             
                                //print_r($newArray);
                                if(isset($newArray['motifPattern'])){
                                    $newArray['motifPattern'] = str_replace('XX','---',$newArray['motifPattern']);
                                }
                               
                                
                                $rows[$count] = $newArray;     
                                $count++;   
                            }
                        
                      
                        $return_arr =  array("headers" => $headers, "rows" => $rows);
                         
                        $data = json_encode($return_arr);
                        echo $data;             
                    } catch (\Exception $e) {
                        echo $e->getMessage();
        
                    }
                }
        return;
 
    } // end function index   




function assocArray($m,&$resarr, $c/*for comments*/,$ss/*strip spaces*/,$prev)  // Recursive
  {
    global $turns;
    $index=0;
    foreach ($m as $key=>$value)
      {
        if(!is_array($value))
          {
            if($c) 
              {
                echo $key.'=>'.$value.'<br />';
              }
                
            $resarr[$turns-$prev][$key]=$value;

            if($ss&&$key==0) 
              {
                $value = str_replace(" ", "", $value);
              }                
          
            if($index==1) 
              {
                $index=0;
              }                
            else 
              {
                $index++;
              }  
          }
        else
          {
            if(is_array($value))
              {
                if($c) 
                  {
                    echo "Value #: ".$turns.'<br />';
                  } 
                  $this->assocArray($value,$resarr,$c,false,$prev);
                  $turns++;
              }
            else 
              {
                break;
              }   
          }
      }        
    return $turns;
  }


function findMotifs($seq,$first,$last,$patt,$acc,$sName,$sLength)
  {

    $soSeq = strlen((string)$seq);
    $seqStr = array();
    $seqStr = str_split($seq);

    for($i=0;$i<$soSeq;$i++)
      {
        if($seqStr[$i]==$first)
          {
            for($j=$i+1;$j<$soSeq;$j++)
              {
                if($seqStr[$j]==$last)
                  {
                    $sl=($j-$i+1);
                    $ss= substr($seq,$i,$sl);
                    $st= ($i+1);
                    $end=($j+1);
                
                    $sql = "INSERT INTO miniMotif (motifPattern,actualMotif,accessionNumber,speciesName,proteinLength,motifLength,startPosition,endPosition) values('$patt','$ss','$acc','$sName','$sLength','$sl','$st','$end')";
                    //execute SQL
                   
                    try {
                        $result = DB::statement($sql);
                    } catch (\Exception $e) {
                        echo $e->getMessage();
            
                    }            
                    
                    $i = $j;
                    $j = $j + $soSeq;
                  }
              }              
          }
      }
  }


function proteinDatabaseCreate($sql,$dbhandle)
{
 
  mysqli_query($dbhandle,$sql);
  if (mysqli_error($dbhandle)) 
    {
      echo "Error message: ". mysqli_error($dbhandle);
      echo "<br>";
      //exit();
      return false;
    }
  else if(!mysqli_error($dbhandle))
    {
      echo "Database being created";
      echo "<br>";
      //exit();
      return true;
    }   
}

function executeSQL($sql,$conn,&$message)
{
  //execute SQL
  set_time_limit(300);
  $querySucceeded = "Query succeeded";

  if($result = $conn->query($sql))
    {
      $message = $querySucceeded;
      return $result;
    }
  else 
    {
      $message= "<br/>Query error: ". mysqli_error($conn);
      return NULL;
    }
}


function buildProteinDb($filestr,$request)  // function for building Protein Database
{
  $fileString=$filestr;
  $conn = 0;
  $gi_number= array(array());
  $accession_num= array(array());
  $spcName= array(array());
  $locus= array(array());
  $seqnc= array(array());
  $miniM= array();
  $seqLength=array();
  $arrOfPatts=array();
  $num_Names = 0;
  $num_Locus = 0;
  $num_Species = 0;
  $num_Acc_Nums = 0;
  $num_Seqs = 0;
  $count = 0;
  $data= array(
    "data" => ""
  );

  $sql = "CREATE TABLE IF NOT EXISTS proteins (id int not null primary key auto_increment, locus varchar(250),speciesNumber varchar(75),speciesName varchar(75), accessionNumber varchar(75), proteinSequence varchar(2000), proteinLength int)";
   
  try {

        DB::statement($sql); 
        $count = DB::statement('SELECT COUNT(*) AS row_count FROM proteins');

    } catch (\Exception $e) {
        echo $e->getMessage();
    }  
if($count == 0)
    {

        $pattern = '/gi\|[0-9]+\|ref/';


        preg_match_all($pattern, $fileString, $matches, PREG_OFFSET_CAPTURE);

        $trns = $this->assocArray($matches,$gi_number,0,0,0);
        $num_Species = $trns;
        //echo "Number of Species: ".$num_Species.'<br/>';

        $pattern = '/ref\|[A-Za-z0-9(\.)(_)]+\|/';
        preg_match_all($pattern, $fileString, $matches2, PREG_OFFSET_CAPTURE);
        $trns2=$this->assocArray($matches2,$accession_num,0,0,$trns);
        $num_Acc_Nums = $trns2-$trns;
        //echo "Number of Accessions: ".$num_Acc_Nums.'<br/>';


        $pattern = '/\|\s+[A-Za-z]+[\w|\d|\s|\-|:|;|\(|\)|\,|\/|]+\[/';
        preg_match_all($pattern, $fileString, $matches3, PREG_OFFSET_CAPTURE);
        $trns3=$this->assocArray($matches3,$locus,0,0,$trns2);
        $num_Locus = $trns3-$trns2;
        //echo "Number of Names: ".$num_Locus.'<br/>';

        $pattern = '/[A-Z][A-Z]{50}[\w|\s]+[A-Z]/';
        preg_match_all($pattern, $fileString, $matches4, PREG_OFFSET_CAPTURE);
        $trns4=$this->assocArray($matches4,$seqnc,0,0,$trns3);
        $num_Seqs = $trns4-$trns3;
        //echo "Number of Sequences: ".$num_Seqs.'<br/>';


        $pattern = '/\[[\w|\s|\(|\)|\-|\.]*\]/';
        preg_match_all($pattern, $fileString, $matches5, PREG_OFFSET_CAPTURE);
        $trns5=$this->assocArray($matches5,$spcName,0,0,$trns4);
        $num_Names=$trns5-$trns4;
        //echo "Number of Species Names: ".$num_Names.'<br/>';


            $data['data'] .= "Connection to MySQL Made\n"."<br>";
            $data['data'] .= "Now Checking Database!\n";
            $data['data'] .= "<br>";

        

        for($i=0;$i<$num_Seqs-1;$i++)  // clean up strings and fill protein database
        {
            $locus[$i][0]= substr($locus[$i][0],1,strlen($locus[$i][0])-2);  // locus strings
            $lc = $locus[$i][0];
            //echo '<br/>'.$lc;
    
            $gi_number[$i][0]= substr($gi_number[$i][0],3,strlen($gi_number[$i][0])-7);  //  gi-number or species-number
            $gi = $gi_number[$i][0];
            //echo '<br/>'.$gi;
    
            $accession_num[$i][0]= substr($accession_num[$i][0],4,strlen($accession_num[$i][0])-5);  //  accession numbers
            $acc = $accession_num[$i][0];
            //echo '<br/>'.$acc;
    
            $seqnc[$i][0]= substr($seqnc[$i][0],4,strlen($seqnc[$i][0]));  //  sequences
            $sq =  $seqnc[$i][0];
            //echo '<br/>'.$sq;
    
            $spcNm = $spcName[$i][0];      // species Names
    
            $seqLength[$i] = strlen($sq);
            //echo '<br/> Length of String:  '.$locus_length[$i];
            $id = $i+1; 
            $sql = "INSERT INTO proteins values('$id', '$lc', '$gi','$spcNm', '$acc', '$sq','$seqLength[$i]' )";   
            //$result = mysqli_query($dbhandle,$sql);   
            try {                   
                $result = DB::statement($sql);
            } catch (\Exception $e) {
                echo $e->getMessage();
    
            }       
        }    
        
 
        $this->buildMinimotifDatabase();                

    }
    else{
        $data = json_encode(array('data' => 'Database already built'));
        echo $data;
    }

     
  
  }     // End of buildProteinDb function

function buildMinimotifDatabase()
{
       
  $num_rows=0;
	$amino_code = array();
	$amino_code[]= 'G';
	$amino_code[]='P';
	$amino_code[]='A';
	$amino_code[]='V';
	$amino_code[]='L';
	$amino_code[]='I';
	$amino_code[]='M';
	$amino_code[]='C';
	$amino_code[]='P';
	$amino_code[]='Y';
	$amino_code[]='W';
	$amino_code[]='H';
	$amino_code[]='K';
	$amino_code[]='R';
	$amino_code[]='Q';
	$amino_code[]='N';
	$amino_code[]='E';
	$amino_code[]='D';
	$amino_code[]='S';
	$amino_code[]='T';

   // Create mini-Motif database  
   $sql = "CREATE TABLE IF NOT EXISTS miniMotif (id int not null primary key auto_increment,motifPattern varchar(75),actualMotif varchar(1500),accessionNumber varchar(75),speciesName varchar(75), proteinLength int, motifLength int, startPosition int, endPosition int )";
   try {
       DB::statement($sql);

       
    $sql = "SELECT * FROM proteins";  
    try {
        $result = json_decode(DB::table('proteins')->get());
        } catch (\Exception $e) {
            echo $e->getMessage();
        }       

    foreach ($result as $newArray) // One Protein per Loop
        {
        
        $seq = $newArray->proteinSequence;
        $acc = $newArray->accessionNumber;
        $spName = $newArray->speciesName;
        //$sqName = $newArray["seqName"];
        $sqLength = $newArray->proteinLength;

        $so = sizeof($amino_code);
        for($k=0;$k<$so;$k++)
            {
            for($j=0;$j<$so;$j++)
                {
                    $pattrn = $amino_code[$k]."XX".$amino_code[$j];    
                    $this->findMotifs($seq,$amino_code[$k],$amino_code[$j],$pattrn,$acc,$spName,$sqLength);            
                }
            }  // end for
        
        } //End foreach   
        echo "Please Wait... MiniMotifs Table Are Done Building..."; 
    } catch (\Exception $e) {
        echo $e->getMessage();
    }            



   
    return true;
  
}  // end of buildMinimotifDatabase


  function query3($dbhandle,&$cntarr,$mopat)
    {
        // Begin calculation of count of motifs for all accession numbers, subst. for query 3 below query 0 is the first
        $sql = 'SELECT DISTINCT accessionNumber FROM miniMotif WHERE motifPattern = "'.$mopat.'" ORDER BY accessionNumber'; 
        $sarr = array();  
        
        while($newArray = mysqli_fetch_array($result))
            { 
            //print_r($newArray); 
            $sarr[]=$newArray['accessionNumber'];
        
            }
        
        for($w=0;$w<sizeof($sarr);$w++)
          {
              $sql = 'SELECT Count(actualMotif), actualMotif, accessionNumber, motifPattern FROM miniMotif WHERE motifPattern = "'.$mopat.'" AND accessionNumber = "'.$sarr[$w];
              //echo $sql;
              if(!$result = mysqli_query($dbhandle,$sql))
                die("Error getting count of Motifs: ".mysqli_error($dbhandle));
              else
                  {              
                    while($newArray = mysqli_fetch_array($result))
                      {  
                        $cntarr[] = $newArray[0];
                      }             
                  } 
          }
    }
  
  

}
