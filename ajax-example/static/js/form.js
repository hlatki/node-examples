/*var JS_cnt;
var BS_cnt;
var OST_cnt;
var KS_cnt;*/
var JS_Xcoord = 110;
var JS_Ycoord = 150;
var BS_Xcoord = 360;
var BS_Ycoord = 150;
var OST_Xcoord = 110;
var OST_Ycoord = 375;
var KS_Xcoord = 360;
var KS_Ycoord = 375;

var graph;  // The graph
var ctx;  // The context

$(document).ready(function() {
    // Add graph to DOM
    $('.graph').append('<canvas id="graphRadar" width="500" height="500" style="border:1px solid #d3d3d3;"></canvas>');

    graph = document.getElementById("graphRadar");
    ctx = graph.getContext("2d");

 /*   // Draw initial graph
    updateCounts(ctx, JS_cnt, JS_Xcoord, JS_Ycoord);
    updateCounts(ctx, BS_cnt, BS_Xcoord, BS_Ycoord);
    updateCounts(ctx, OST_cnt, OST_Xcoord, OST_Ycoord);
    updateCounts(ctx, KS_cnt, KS_Xcoord, KS_Ycoord);
    drawGraph(ctx);*/

    //make a call to the server to grab the current count
    $.ajax({
      type: "POST",
      url: "/saveResponse",
      success: function(data) {
        sumAndUpdate(data);
      }
    });

});

/*$('#target').submit(function() {
  alert('Handler for .submit() called.');
  return false;
});*/

$("#the-form").submit(function() {
        //Do the AJAX post
        $.post($("#the-form").attr("action"), $("#the-form").serialize(), function(data){
            // this is what happens when the server responds
            // data is what the server sent back
            // this will be an array of all the responses that have been submitted

            console.log(data);
            
            sumAndUpdate(data);
        });
        return false;
});

// sum everything up and update the counts
function sumAndUpdate(responseArray) {
    var JS_cnt = 0;
    var BS_cnt = 0;
    var OST_cnt = 0;
    var KS_cnt = 0;

    clearGraph(ctx);

    // update the count for each item returns
    var len = responseArray.length
    for (var i = 0; i < len; i++) {
        var preferredFont = responseArray[i].favorite_font;
        switch(preferredFont)
        {
            case 'JosefinSans':
                JS_cnt++;
                break;
            case 'BerkshireSwash':
                BS_cnt++;
                break;
            case 'OldStdTT':
                OST_cnt++;
                break;
            case 'KaushanScript':
                KS_cnt++;
                break;
        }
    };
   
   //draw everything
   updateCounts(ctx, JS_cnt, JS_Xcoord, JS_Ycoord);
   updateCounts(ctx, BS_cnt, BS_Xcoord, BS_Ycoord);
   updateCounts(ctx, OST_cnt, OST_Xcoord, OST_Ycoord);
   updateCounts(ctx, KS_cnt, KS_Xcoord, KS_Ycoord);
   drawGraph(ctx);
}

/* 
 * These functions take in graph's context:
 *      -drawGraph()
 *      -updateCounts()
 *      -clearGraph()
 *
 */
function drawGraph(ctx)
{
    // Don't need to draw the circle for now.
    //ctx.arc(250,250,250,0,2*Math.PI);

    ctx.moveTo(250,0);
    ctx.lineTo(250,500);
    ctx.moveTo(0,250);
    ctx.lineTo(500,250);
    ctx.stroke();

    // TODO: make font match text
    ctx.font = "20px Arial";
    ctx.fillText("Josefin Sans",30,30);
    ctx.fillText("Berkshire Swash",330,30);
    ctx.fillText("Old Standard TT",30,480);
    ctx.fillText("Kaushan Script",330,480);
}

function updateCounts(ctx, fontText, countX, countY)
{
    ctx.font = "60px Arial";
    ctx.fillText(fontText, countX, countY);
}

function clearGraph(ctx)
{
    ctx.clearRect(0,0,500,500);
}

/*function storeUserData(name, font, years)
  {
  alert("Hey, "+name+"! I see you like "+font+" & that you've been desiging for "+years+" years!");
  }*/
