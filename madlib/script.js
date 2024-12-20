(function () {

    'use strict';

    // add script here

   


    const myForm= document.querySelector('#myform');
    const madlib= document.querySelector('#madlib');
    const formData= document.querySelectorAll('input');

    myForm.addEventListener('submit',function(event){
        event.preventDefault();
        processFormData(formData);
    });

    function processFormData(formData){
        const words=[];
        const emptyfields=[];
        let counter=0;


        for(const eachWord of formData){
            if(eachWord.value){
                words.push(eachWord.value);
            }else{
                emptyfields.push(counter);
            }
            counter++;
        }
        if(emptyfields.length>0){
            showErrors(formData,emptyfields);
        }else{
            document.querySelector('.open').addEventListener('click', function(event){
                event.preventDefault();
                document.querySelector('#overlay').className='showing';
        
            });
        
            document.querySelector('.tryagain').addEventListener('click', function(){
                event.preventDefault();
                document.querySelector('#overlay').className='hidden';
        
            });
        
            document.addEventListener('keydown', function(event){
                if(event.key==='Escape'){
                    document.getElementById('overlay').className='hidden';
                }
            });
            makeMadlib(words);
        }
    }

    function showErrors(formData,emptyfields){
        const errorId=formData[emptyfields[0]].id;
        
        const errorText=`Please fill out this field ${errorId}`;
        alert(errorText);
        /* madlib.innerHTML=errorText; */
        document.querySelector(`#${errorId}`).focus();
    }

    function makeMadlib(words){
        

        const blanks = document.querySelectorAll(".blank");
        if (words.length <= blanks.length) {
            words.forEach((word, index) => {
                blanks[index].textContent = word;
            });
            
            document.querySelector('#overlay').className = 'showing';
            
        } else {
            console.error(" there is a error");
        }
    }
    document.querySelector('.tryagain').addEventListener('click', function(event) {
        event.preventDefault();
        location.reload(); 
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            overlay.className = 'hidden';
        }
    });




})();