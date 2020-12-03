// NOTE NG KA ERROR PO  SA CONNECTION GINAMIT KO PO MUNA ANG LUMANG AJAX FOR NOW  ETO PO ANG ERROR https://prnt.sc/vt47m6

let getKeyDates = doAjax({
    url:`actions.php`,
    type: 'POST',
    data:JSON.stringify({
        'action':'Get Key Dates',
        'country':'nz'//au or nz
    })
});


getKeyDates.then(data=>{
    let resp = JSON.parse(data);
    console.log(data,'test');
    if(resp.status){
        let output = resp.response.data;  
        let pushItem = [];
        console.log(output);
            output.map(function(i){
                let id =  i.id;
                let current = i.current;
                let keydates =  i.key_dates;
                let month =  i.month;
                let notes =  i.notes;
                
                pushItem.push({
                    'id': id,
                    'current': current,
                    'keydates': keydates,
                    'month': month,
                    'notes': notes
                });
            }); //map
            appenditem(pushItem);
    }else{
        console.log(resp);
    }
});


function appenditem(pushItem) {
    pushItem.map(function(data) {

        let dataYear=[];
        let arrYrMonthSplit =  data.id.split('-');

        dataYear.push({
            'month': arrYrMonthSplit[0],
            'year': arrYrMonthSplit[1],
        });
        data.id.replace(/\s/g, '');
            dataYear.map(function(a){
                    DifineMonth(a.month)
                    if(a.year =="2020"){
                    
                
                        let appendData=`<div class="eaKeyDate CurrentYear" data-id='${data.id}'>
                                            <span class="eaKeyYear">${a.year}</span>
                                            <span class="eaKeyMonth">${monthData}</span>
                                        </div>`;         
                                        $('.mainWrapperKeyDate').append(appendData); 
                    }else{
                
                        let appendData=`<div class="eaKeyDate" data-id='${data.id}'>
                                            <span class="eaKeyYear">${a.year}</span>
                                            <span class="eaKeyMonth">${monthData}</span>
                                        </div>`;    
                        $('.mainWrapperKeyDateArch').append(appendData);
                    }// end if

            });//dataYear Map
    }); //pushItem Map kdEachResulWrapper

        $(".eaKeyDate").on("click", function(){ 
            $('.mainWrapperKeyDate').toggleClass('hideCurrent');
  
        $('.kdEachResulWrapper').toggleClass('showDatesEach');
        $('.kdBtnLinkPast').toggleClass('hidePassBtn');
            let xdate = $(this).attr("data-id");
            let trimByID = pushItem.filter(x => x.id == xdate);
            removeDuplicate(trimByID);
            displayResult(trimByID);
            $('.kdBtnLink').toggleClass('hideBtnLink'); // hide BTN TOP RIGHT
        });
    


        // $('.kdBtnLink').on("click", function(){
        //     $(this).text(function(i, text){
        //         return text === "Back to Key Dates" ? "Key Dates Archives" : "Back to Key Dates";
        //     });
        // });
        $(".kdresultBtn").on("click", function(){
            $('.kdBtnLinkCurrent').toggleClass('hidePassBtn'); // SHOW BTN TOP RIGHT
            $('.kdBtnLinkPast').toggleClass('hidePassBtn');
            // $('.mainWrapperKeyDate ').toggleClass('hideCurrent');
            // $('.kdEachResulWrapper ').toggleClass('showDatesEach');
        });
        
    //     $('.kdBtnLinkCurrent').click(function(){
    //    $(this).toggleClass('hideCurrentBtn');
    //     });
                
 

         
   
} // function appenditem


$('.kdBtnLinkCurrent').click(function(){
    $(this).toggleClass('hidePassBtn');
    $('.kdBtnLinkPast').toggleClass('hidePassBtn');
    $('.mainWrapperKeyDate ').toggleClass('hideCurrent');
    $('.mainWrapperKeyDateArch ').toggleClass('showArchive');
 });    
 $('.kdBtnLinkPast').click(function(){
    $(this).toggleClass('hidePassBtn');
    $('.kdBtnLinkCurrent').toggleClass('hidePassBtn');
    $('.mainWrapperKeyDate ').toggleClass('hideCurrent');
    $('.mainWrapperKeyDateArch ').toggleClass('showArchive');
 });

// result each page Data
function displayResult(data){
    data.map(function(i){
        $('.resultTableBody').html("");
        $('.kdresultDate').html("Key Dates -  "+ i.month);
            i.keydates.map(function(kd){
                let appendData=`<div class="kdDateRusults">
                                    <div class="kdDateData"> ${kd.date}</div>
                                    <div class="kdCategData"><em>${kd.category}</em></div>
                                    <div class="kdDespData">${kd.description}</div>
                                </div>`;
                $('.resultTableBody').append(appendData);

            });

    }); //end map
}//end function

function DifineMonth(data){
    switch(data) {
        case "january":
            monthData = "Jan";
        break;

        case "february":
            monthData = "FEB";
        break;

        case "march":
            monthData = "MAR";
        break;

        case "april":
            monthData = "APR";
        break;

        case "may":
            monthData = "MAY";
        break;

        case "june":
            monthData = "JUN";
        break;

        case "july":
            monthData = "JUL";
        break;

        case "august":
            monthData = "AUG";
        break;

        case "september":
            monthData = "SEP";
        break;

        case "october":
            monthData = "OCT";
        break;

        case "november":
            monthData = "NOV";
        break;

        case "december":
            monthData = "DEC";
        break;

        default:
            monthData = "JAN";
    }                             
}//DifineMonth


function removeDuplicate(arr){
    return uniqueItems = Array.from(new Set(arr))
} // end removeDuplicate

/**
 * @param settings
 * Reusable Async AJAX
 * eg: var a = {
        url: ajaxurl,
        type: 'POST',
        data: args
    }
    Callback : a.then(data => {
        console.log(data)
    })
    */
   async function doAjax(settings) {
    let result
    try{
        result = await $.ajax(settings);
        return result;
    }catch(error){
        console.log(error)
    }
}