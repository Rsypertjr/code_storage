<!DOCTYPE html>
<html>
<head>
    <title>Greeting</title>
</head>

<body>
    <div id="question6"></div>
   

    <div>Question #6 - Answer Code:</div>
    <div><code><pre>
        const make_invisible = document.getElementsByClassName("makeInvisible");
        Array.from(make_invisible).map(el => el.style.display = "none");

        const make_bold = document.getElementsByClassName("makeBold");
        Array.from(make_bold).forEach(el2 => el2.style.fontWeight = "bold");
    </code></pre></div>

    <div>Question #6 Output:</div>
    <div class="makeInvisible">Make me Invisible</div>
    <div class="makeBold">Make me Bold</div>

    <script>
        let question6 = `Question # 6 -  Write a javascript and/or JQuery statement that would hide the words “<div class="makeInvisible">this text should be invisible.” 
        Then, change the text “<div class="makeBold">this text should be bold</div>” to bold. *`;
        window.onload = function() {
            document.getElementById("question6").textContent = question6;
            const make_invisible = document.getElementsByClassName("makeInvisible");
            Array.from(make_invisible).map(el => el.style.display = "none");
  
            const make_bold = document.getElementsByClassName("makeBold");
            Array.from(make_bold).forEach(el2 => el2.style.fontWeight = "bold");

            const isEmpty = (test_object) => {
                return Object.keys(test_object).length === 0 ? true : false;

            };

            let empty_object = {};  
            console.log(isEmpty(empty_object)); // true 
            let not_empty_object = { foo : 'bar' }; 
            console.log(isEmpty(not_empty_object)); // false



            const checkString = (foo) => {
                return new Promise((resolve, reject) =>  {
                    setTimeout(() => {
                        if(foo == "hello")
                            resolve("Good!");
                        else 
                            reject("Bad!");
                    })
                })

            };

            checkString()
                .then(data => {
                    console.log("Success:", data);
                })
                .catch(error => {
                    console.error("Failure:", error);
                });

            checkString("hello")
                .then(data => {
                    console.log("Success:", data);
                })
                .catch(error => {
                    console.error("Failure:", error);
                });

        }
    </script>
    <?php
    class Foo { 
                public static $num_1 = 7; 
                public $num_2 = 4; 
                private $num_3 = 9; 
                public function getNum3() { 
                    return $this->num_3; 
                }
            }
            
            $foo = new Foo();

            $sum = Foo::$num_1 + $foo->num_2 + $foo->getNum3();
            echo "<br/>SUM:".$sum;
    ?>
</body>
</html>
