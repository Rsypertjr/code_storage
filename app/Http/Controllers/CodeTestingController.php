<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class CodeTestingController extends Controller
{

     public $counter = 1;
     public function code_testing() {


        $arr = [];      
        $val = "1.2.3.4.5.6.7.8.9.10.11.12";
        $val2 = "Hello";

        $exploded = explode(".",$val);
        $arr[] = array("a" => $exploded);   


        echo "<br/><h1>Question #1<br/>";
        echo "How would you access the number 10 in the \$arr array?"."<\?php \$val = ‘1.2.3.4.5.6.7.8.9.10.11.12’;"." \$arr[] = array(‘a’ => explode(‘.’,\$val));";
        echo "<br/><h1>Answer #1<br/>";
        echo $arr[0]["a"][9];
        echo "</h2>";

        echo "<br/><h1>Question #2<br/>";
        echo "Write a foreach loop for array \$numbers that will modify each entry by adding 10 to the value. \$numbers = array(1,2,3,4,5,6); * ";
        echo "</h1>";

        $numbers = array(1, 2, 3, 4, 5, 6);

        $result_arr = [];
        foreach($numbers as $number) {
            array_push($result_arr,$number+10);
        }
        $numbers = $result_arr;
        echo "<h1>Answer #2 Code:<br/>";  
        echo "<code><pre> 

            \$numbers = array(1, 2, 3, 4, 5, 6);

            \$result_arr = [];
            foreach(\$numbers as \$number) {
                array_push(\$result_arr,\$number+10);
            }
            \$numbers = \$result_arr;
        
        </pre></code><br/>";
        echo "<h1>Answer #2 Result:<br/>";  
        print_r($numbers);
        echo "</h1>";



        function self_count() {
            
            if(!isset($GLOBALS["counter"])){
                $GLOBALS["counter"] = 0;
                $count = $GLOBALS["counter"];
                $GLOBALS["counter"]++;
                return $count;
            }
            else  {
                $count = $GLOBALS["counter"];
                $GLOBALS["counter"]++;
                return $count;
            }  
               
        }

        //echo self_count();
        //echo self_count();
        //echo self_count();
        //echo self_count();


        echo "<br/><h1>Question #3<br/>";
        echo "Write a function Counter() that keeps track of the number of times it is called. This function should not take any parameters and return the number of times that it has been called. <pre> Example: echo Counter();//1 echo Counter(); //2 </pre> ";
        echo "</h1>";

        echo "<h1>Answer #3 Code:<br/>";  
        echo "<code><pre>
           function self_count() {
            
            if(!isset(\$GLOBALS['counter'])){
                \$GLOBALS['counter'] = 0;
                \$count = \$GLOBALS['counter'];
                \$GLOBALS['counter']++;
                return \$count;
            }
            else  {
                \$count = \$GLOBALS['counter'];
                \$GLOBALS['counter']++;
                return \$count;
            }                  
        }</pre></code><br/>";
        echo "<h1>Answer #3 Result:<br/>";  
        echo self_count()."<br/>";
        echo self_count()."<br/>";
        echo self_count()."<br/>";
        echo self_count()."<br/>";
        echo "</h1>";

        echo "<br/><h1>Question #4<br/>";
        echo "<code>What are the tags used to create bulleted and numbered lists?</code>";
        echo  "</h1>";


        echo "<h1>Answer #4a - The Tag for bulleted lists is the 'ul' tag enclosing 'li' tags as list items.</h1>";
        echo "<h1>Answer #4a Bulleted List:<br/>";  
        echo "<ul>
                <li>Milk</li>
                <li>Eggs</li>
                <li>Bread</li>
             </ul></h1>";

        echo "<h1>Answer #4b - The Tag for numbered lists is the 'ol' tag enclosing 'li' tags as list items.</h1>";
        echo "<h1>Answer #4b Numbered List:<br/>"; 
        echo "<ol>
                <li>Milk</li>
                <li>Eggs</li>
                <li>Bread</li>
              </ol></h1>";

        echo "<br/><h1>Question #5<br/>";
        echo "<code> When is :: used instead of -> to access a method/variable in a class? *</code>";
        echo  "</h1><br/>";
        echo "<h1>Answer #5 - The :: reference is used to access variables and methods that are declared as 'static' in a class.</h1>";


        $numbers = [ 73, 22, 19, 62, 14, 3, 96, 88, 17, 41, 44, 1, 4, 31, 30, 24, 108, 37 ];
        
        function get_sorted_evens($numbers) {
            sort($numbers);
            //print_r($numbers);
            $modulated = [];
            foreach($numbers as $number){
                if($number % 2 == 0)
                    array_push($modulated,$number);
            }
            foreach($modulated as $number){
                echo $number."<br/>";
            }
        }

        get_sorted_evens($numbers);




        function isValidPhone($phone_number) {
            $pattern = '/^(\d{3})(-\d{3})(-\d{4})$/';
            if (preg_match($pattern, $phone_number)){
                echo "1";
            }
            else{
                echo "0";
                echo false;
            }
        }
        echo "<br/>Testing for Valid Phone Numbers:<br/>";
        echo isValidPhone("727-999-0001")."<br/>";
        echo isValidPhone("727-9990001");

    }





}

      
        