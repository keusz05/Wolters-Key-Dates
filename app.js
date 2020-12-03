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
    let output = resp.response.data;  
    if(resp.status){
        output.map(function(i){
            let dataYear=[];
            let arrYrMonthSplit =  i.id.split('-');

            dataYear.push({
                'month': arrYrMonthSplit[0],
                'year': arrYrMonthSplit[1],
            });
            i.id.replace(/\s/g, '');

            var newDate = new Date();
            var yearToday = newDate.getFullYear();
            
            dataYear.map(function(a){
                if(parseInt(a.year) >= parseInt(yearToday)){
                    let appendData=`<div class="eaKeyDate CurrentYear" data-id='${i.id}'>
                                        <span class="eaKeyYear">${a.year}</span>
                                        <span class="eaKeyMonth">${defineMonth(a.month)}</span>
                                    </div>`;         
                    $('.mainWrapperKeyDate').append(appendData); 
                }else{
                    let appendData=`<div class="eaKeyDate" data-id='${i.id}'>
                                        <span class="eaKeyYear">${a.year}</span>
                                        <span class="eaKeyMonth">${defineMonth(a.month)}</span>
                                    </div>`;    
                    $('.mainWrapperKeyDateArch').append(appendData);
                }// end if
            });//dataYear Map
        });//map
    }

    $('.mainWrapperKeyDate, .mainWrapperKeyDateArch').on('click','.eaKeyDate', function() {
        $('.mainWrapperKeyDate').hide();
        $('.mainWrapperKeyDateArch').hide();
        $('.kdEachResulWrapper').show();
        $('.kdBtnLink').hide();
        $('.kdMainText').hide();
        let xdate = $(this).attr("data-id");
        let trimByID = output.filter(x => x.id == xdate);
            removeDuplicate(trimByID);
            displayResult(trimByID);
    });
});

// result each page Data
function displayResult(data){
    data.map(function(i){
        $('.resultTableBody').html("");
        $('.kdresultDate').html("Key Dates -  "+ i.month);
            i.key_dates.map(function(kd){
                let appendData=`<div class="kdDateRusults">
                                    <div class="kdDateData"> ${kd.date}</div>
                                    <div class="kdCategData"><em>${kd.category}</em></div>
                                    <div class="kdDespData">${kd.description}</div>
                                </div>`;
                $('.resultTableBody').append(appendData);
            });
    }); //end map
}//end function

function defineMonth(data){
    let monthData;

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
    return monthData;                            
}//defineMonth

$(".kdresultBtn").on('click', function(){
    $('.kdEachResulWrapper').hide();
    $('.mainWrapperKeyDate').show();
    $('.kdBtnLink').show();
    $('.kdMainText').show();
    $('.kdBtnLink').text('Key Dates Archives');
    $('.kdBtnLink').attr('data-btnData','present');
});

$('.kdBtnLink').on('click', function(){
    let x=  $(this).attr('data-btnData');
        if (x=="present"){
            $(this).attr('data-btnData','past');
            $(this).text('Back to Key Dates');
            $('.mainWrapperKeyDate').hide();
            $('.mainWrapperKeyDateArch').show();
        }
        if(x=="past"){
            $(this).attr('data-btnData','present');
            $(this).text('Key Dates Archives');
            $('.mainWrapperKeyDate').show();
            $('.mainWrapperKeyDateArch').hide();
        }
});

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