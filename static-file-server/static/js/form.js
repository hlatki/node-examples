var JS_cnt;
var BS_cnt;
var OST_cnt;
var KS_cnt;
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
    JS_cnt = 0;
    BS_cnt = 0;
    OST_cnt = 0;
    KS_cnt = 0;

    // Add graph to DOM
    $('.graph').append('<canvas id="graphRadar" width="500" height="500" style="border:1px solid #d3d3d3;"></canvas>');

    graph = document.getElementById("graphRadar");
    ctx = graph.getContext("2d");

    // Draw initial graph
    updateCounts(ctx, JS_cnt, JS_Xcoord, JS_Ycoord);
    updateCounts(ctx, BS_cnt, BS_Xcoord, BS_Ycoord);
    updateCounts(ctx, OST_cnt, OST_Xcoord, OST_Ycoord);
    updateCounts(ctx, KS_cnt, KS_Xcoord, KS_Ycoord);
    drawGraph(ctx);
});

$('form').submit(function() {
    var formArr = $('form').serializeArray();
    console.log(formArr);
    var userName = formArr[0].value;
    var preferredFont = formArr[1].value;
    var yrsDesign = formArr[2].value;
    console.log(preferredFont);

    storeUserData(userName, preferredFont, yrsDesign);

    // Redraw graph to update with latest counts
    clearGraph(ctx);
    
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
    updateCounts(ctx, JS_cnt, JS_Xcoord, JS_Ycoord);
    updateCounts(ctx, BS_cnt, BS_Xcoord, BS_Ycoord);
    updateCounts(ctx, OST_cnt, OST_Xcoord, OST_Ycoord);
    updateCounts(ctx, KS_cnt, KS_Xcoord, KS_Ycoord);
    drawGraph(ctx);

    return false;
});

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

function storeUserData(name, font, years)
{
    alert("Hey, "+name+"! I see you like "+font+" & that you've been desiging for "+years+" years!");
}
