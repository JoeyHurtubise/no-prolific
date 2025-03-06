/**
 * jspsych-custom-labels-response
 * 
 * 
 * Hector Leos, 2012
 * McGill University
 * 
 * Based on Josh de Leeuw's jspsych-html-button-response plugin
 *
 *
 **/

jsPsych.plugins["custom-labels-response"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'custom-labels-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      choices: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Choices',
        default: undefined,
        array: true,
        description: 'The labels for the buttons.'
      },
      button_html: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button HTML',
        default: '<button class="jspsych-btn">%choice%</button>',
        array: true,
        description: 'The html of the button. Can create own style.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed under the button.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show the trial.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, then trial will end when user responds.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    // display stimulus
    var html = '<div id="jspsych-custom-labels-response-stimulus">'+trial.stimulus+'</div>';
    html += trial.stimulus;

    //display buttons
    var buttons = [];
    buttons.push(trial.button_html); buttons.push(trial.button_html); buttons.push(trial.button_html); buttons.push(trial.button_html);
    html += '<div class="jspsych-custom-labels-response-button" style="display: inline-block; padding: 5px 20px" id="jspsych-custom-labels-response-button-0"' 
    html += 'data-choice= ' + trial.choices[0] + '"> <button class="jspsych-custom-label">' + trial.choices[0] + '  </button>     <div id="hovwin" class="btn-hoverwindow"> HELLOOO </div>    </div><br><br>';
    html += '<div class="jspsych-custom-labels-response-button" style="display: inline-block;; margin: 0px 8px" id="jspsych-custom-labels-response-button-1"'
    html += 'data-choice= ' + trial.choices[1] + '"> <button class="jspsych-custom-label">' + trial.choices[1] + '</button></div>  &emsp; &emsp; &emsp; ';
    html += '<div class="jspsych-custom-labels-response-button" style="display: inline-block; margin: 0px 8px" id="jspsych-custom-labels-response-button-2"'
    html += 'data-choice= ' + trial.choices[2] + '"> <button class="jspsych-custom-label">' + trial.choices[2] + '</button></div><br><br>';
    html += '<div class="jspsych-custom-labels-response-button" style="display: inline-block; margin: 0px 8px" id="jspsych-custom-labels-response-button-3"'
    html += 'data-choice= ' + trial.choices[3] + '"> <button class="jspsych-custom-label">' + trial.choices[3] + '</button></div><br><br><br>';
    html += '</div>';

    //show prompt if there is one
    if (trial.prompt !== null) {
      html += trial.prompt;
    }
    display_element.innerHTML = html;

    // start time
    var start_time = performance.now();

    // add event listeners to buttons
    for (var i = 0; i < trial.choices.length; i++) {
      display_element.querySelector('#jspsych-custom-labels-response-button-' + i).addEventListener('click', function(e){
        var choice = e.currentTarget.getAttribute('data-choice'); // don't use dataset for jsdom compatibility
        after_response(choice);
      });
/*

      // show definition window on mouse hover (after one second)
      // from tutorial https://codelair.com/javascript/settimeout-delay-hover-javascript/
      let showDelay = 300, hideDelay = 800;
      let mouseEnterTimer, mouseLeaveTimer;
  
      display_element.querySelector('#jspsych-custom-labels-response-button-' + i).addEventListener('mouseenter', function(e){
        let thisItem = this;
        clearTimeout(mouseLeaveTimer);
        mouseEnterTimer = setTimeout(function(){
          thisItem.classList.add('active');
        }, showDelay)
      });

      display_element.querySelector('#jspsych-custom-labels-response-button-' + i).addEventListener('mouseleave', function(e){
        let thisItem = this;
        clearTimeout(mouseEnterTimer);
        mouseLeaveTimer = setTimeout(function(){
          thisItem.classList.remove('active');
        }, hideDelay)
      }); */

   
    }

    // store response
    var response = {
      rt: null,
      emotion: null
    };

    // function to handle responses by the subject
    function after_response(choice) {

      // measure rt
      var end_time = performance.now();
      var rt = end_time - start_time;
      response.emotion = choice;
      response.rt = rt;

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-custom-labels-response-stimulus').className += ' responded';

      // disable all the buttons after a response
      var btns = document.querySelectorAll('.jspsych-custom-labels-response-button button');
      for(var i=0; i<btns.length; i++){
        //btns[i].removeEventListener('click');
        btns[i].setAttribute('disabled', 'disabled');
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // function to end trial when it is time
    function end_trial() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "response": response.emotion.replace(/\W/g, '').toLowerCase()
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // hide image if timing is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-custom-labels-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if time limit is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

  };

  return plugin;
})();
