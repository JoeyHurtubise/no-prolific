/**
 * html-custom-grid-response-ac
 * a custom plugin for grid responses
 *
 *Made by Héctor Leos
 *McGill University
 *
 *Modified by Sophie Hoyer 2025-07-04 with an "X" and text for an attention check
 *
 */


jsPsych.plugins['html-custom-grid-response-ac'] = (function () {

    var plugin = {};

    plugin.info = {
        name: 'html-custom-grid-response-ac',
        
        parameters: {
            print_coords: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Print coords',
                default: false,
                description: 'True if using to print coords for testing',
            },
            stimulus: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name: 'Stimulus',
                default: undefined,
                description: 'The HTML string to be displayed'
            },
            prompt: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Prompt',
                default: null,
                description: 'Any content here will be displayed below the slider.'
            },
            around_grid: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Labels',
                default: null,
                description: 'What is displayed around grid: labels, maniquins, nothing (null)'
            },
            feedback: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Feedback',
                default: false,
                description: 'Whether feedback is displayed or not'
            },
            xcoord: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'XCoord',
                default: 0,
                description: 'The X coordinate of the text that says "click this quadrant"'
            },
            ycoord: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'YCoord',
                default: 0,
                description: 'The Y coordinate of the text that says "click this quadrant"'
            },


     
       
        }
    }

    plugin.trial = function (display_element, trial) {

        var top = ""
        var bottom = ""
        var left = ""
        var right = ""

        if (trial.around_grid == "maniquins") {
            top = "<img src='stimuli/examples/strong.png' width='70' height='75'>"
            bottom = "<img src='stimuli/examples/weak.png' width='60' height='65'>"
            left = " <br><br><br><br><br><br><br> <img src='stimuli/examples/negative.png' width='60' height='65'>"
            right = "<br><br><br><br><br><br><br> <img src='stimuli/examples/positive.png' width='60' height='65'>"
        } else if (trial.around_grid == "labels") {
            top = "<b>High Intensity</b>"
            bottom = "<b>Low Intensity</b>"
            left = " <br><br><br><br><br><br><br><br><b>Negative<br>Emotion</b>"
            right = "<br><br><br><br><br><br><br><br><b>Positive<br>Emotion</b>"
        }

        //Stimulus display
        var grid_html = '<br><br><div id="jspsych-html-button-response-stimulus">' + trial.stimulus + '</div>';

        grid_html += '<!DOCTYPE HTML>    <html>    <head>  <meta charset="utf-8"> <div class="outer_container">'

        grid_html += '<script> function draw() { var canvas = document.getElementById("canvas");'
        grid_html += "if (canvas.getContext) { var context = canvas.getContext('2d'); context.lineWidth = 1;context.strokeStyle = 'black';"
        grid_html += "context.moveTo(canvas.width / 2, 0);  context.lineTo(canvas.width / 2, 500);  context.moveTo(0, canvas.height / 2); context.lineTo(500, canvas.width / 2) context.stroke();}}"

        grid_html += "</script><style> #canvas { border-top: 9px solid black;  border-right: 10px solid gray; border-bottom: 10px solid gray;"
        grid_html += "border-left: 11px solid black; background-color: #f7f6df;} </style> </head>"

        grid_html += "<body onload='draw()'> <div class='container'> <div id='top'>" + top + "</div> <div class='middle'> <div id='center_left'>" + left + "</div> <div id='mid'>"
        grid_html += "<div id='field' > <canvas id='canvas' width='300' height='300'></canvas> </div></div> <div id='center_right'>" + right + "</div> </div>"
        grid_html += "<div id='bottom'>" + bottom + "</div> </div>  <br> <div id='feedback' class='feedback'> <br> </div> <br></body> </html>"

        display_element.innerHTML = grid_html;

        //Draw grid
        // For bottom left quadrant: use x = 20, y = 230
        // For top left quadrant: use x = 20, y = 80

        x = trial.xcoord
        y = trial.ycoord

        var canvas = document.getElementById("canvas");
        if (canvas.getContext) {
            var context = canvas.getContext('2d');
            context.lineWidth = 1;
            context.strokeStyle = 'black';
            context.moveTo(canvas.width / 2, 0);
            context.lineTo(canvas.width / 2, 500);
            context.moveTo(0, canvas.height / 2);
            context.lineTo(500, canvas.width / 2);
            context.stroke();
            context.font = '13px Arial';
            context.fillStyle = 'black';
            context.fillText('Click this quadrant', x, y);
        }

        //Get start time
        var start_time = performance.now();

        var click_x;
        var click_y;
        var top;
        var left;
        var right;
        var bottom;

        //Function that saves the x and y coordinates of the grid mouse click
        var click_listener = function (e) {

            //Get mouse click coordinates
            click_x = e.clientX;
            click_y = e.clientY;

            //Get grid boundary values
            //(y value increases from top to bottom)
            top = document.getElementById("canvas").getBoundingClientRect().top + 8
            bottom = document.getElementById("canvas").getBoundingClientRect().bottom - 10
            //(x value increases from left to right)
            left = document.getElementById("canvas").getBoundingClientRect().left + 10
            right = document.getElementById("canvas").getBoundingClientRect().right - 10

            //Do not save coords until participant clicks inside of the grid
            if (click_y > top && click_y < bottom && click_x > left && click_x < right) {
                after_response(click_x, click_y, left, top);
            } else {
                alert("Please make your selection inside of the grid");
            }
        };

        document.addEventListener('click', click_listener);

        //Create uninitialized results object
        var results = {
            stimulus: null,
            rt: null,
            x: null,
            y: null
        }

        var clicked_already = false;

        //Function to handle mouse click responses
        var after_response = function (x_coords, y_coords, left, top) {

            //Measure rt (each click updates this value)
            var end_time = performance.now();
            var rt = end_time - start_time;

            //Gather the data to store for the trial
            results.stimulus = trial.stimulus;
            results.rt = rt;
            results.x = (x_coords - left - 151).toFixed(0);
            results.y = -(y_coords - top - 151).toFixed(0);
            if (results.x == -0) { results.x = 0; }

            //Print coords if testing
            if (trial.print_coords) {
                alert("x: " + results.x + ", y: " + results.y);
            }

            //Leave trace where clicked
            if (clicked_already) {
                $('#point').remove();
            }
            clicked_already = true;
            leave_trace(x_coords, y_coords);

            if (trial.feedback) {
                //Display feedback message upon click response
                var val_adj;
                var arl_adj;

                var valence = "pleasant";
                var arousal = "intense";

                var val_percent = (results.x * 100 / 300).toFixed(0);
                var arl_percent = (results.y * 100 / 300).toFixed(0);

                if (val_percent > 35) {
                    val_adj = "extremely ";
                } else if (val_percent > 16) {
                    val_adj = "very ";
                } else if (val_percent > 0) {
                    val_adj = "somewhat ";
                } else if (val_percent > -16) {
                    val_adj = "somewhat ";
                    valence = "unpleasant";
                } else if (val_percent > -35) {
                    val_adj = "very ";
                    valence = "unpleasant";
                } else {
                    val_adj = "extremely ";
                    valence = "unpleasant";
                }

                if (arl_percent > 35) {
                    arl_adj = "extremely ";
                } else if (arl_percent > 16) {
                    arl_adj = "very ";
                } else if (arl_percent > 0) {
                    arl_adj = "somewhat ";
                } else if (arl_percent > -16) {
                    arl_adj = "somewhat not ";
                } else if (arl_percent > -35) {
                    arl_adj = "almost not ";
                } else {
                    arl_adj = "not ";
                }

                var msg = 'You rated this facial expression as being <b>' + val_adj + valence;
                msg += '</b> and <b>' + arl_adj + arousal + '</b>.';
                document.getElementById("feedback").innerHTML = msg;
            }

            //Wait for keyboard response
            keyboard_response();

        };

        //Function that leaves mouse trace on screen    
        function leave_trace(x, y) {
            $("body").append(
                $('<div id="point"></div>').css({
                    position: 'absolute',
                    top: y -3+ 'px',
                    left: x -3.5+ 'px',
                    width: '7px',
                    height: '7px',
                    background: '#ff0000'
                })
            );
        }

        //Function that waits for space bar to be pressed
        function keyboard_response() {
            jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: end_trial,
                valid_responses: [' '],
                rt_method: 'performance',
                persist: false,
                allow_held_key: false
            });
        }

        //Function that ends the trial
        var end_trial = function () {

            //Get rid of screen traces, timeouts, listeners...
            $('#point').remove();
            jsPsych.pluginAPI.clearAllTimeouts();
            document.removeEventListener('click', click_listener);
            jsPsych.pluginAPI.cancelAllKeyboardResponses();

            //Clear the display
            display_element.innerHTML = '';

            //Move on to the next trial
            jsPsych.finishTrial(results);
        }

    };

    return plugin;
})();
