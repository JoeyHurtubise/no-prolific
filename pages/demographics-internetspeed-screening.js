var demographics = {
    type: 'survey-demo',
    data: {
        trial:'demo',
        PID: pid,
        START_TIME: start_time
    },
    on_finish: function () {
        jsPsych.setProgressBar(jsPsych.getProgressBarCompleted() + (1 / PROGRESS_BAR_N))
      }
};

var internet_screened_out = {
    type: 'html-button-response',
    stimulus: '<div style="text-align: center; width: 800px; margin: auto"><h3>Thank you for participating!</h1><p>Your internet speed is too slow to participate in this experiment and you have been screened out of this study. You will be compensated for the time you have spent on this study by bonus/partial payment. Thank you for your time.</p><p>You will be automatically redirected to Prolific upon clicking <strong>Complete Experiment</strong>.</p><p>Please <strong>DO NOT</strong> close this tab until you have been redirected to Prolific. Please take note of your Prolific Completion Code: <strong>C15MF6SK</strong>.</p></div>',
    choices: ['Complete Experiment'],
    on_finish: function() {
        jsPsych.endExperiment("Screened out due to low internet speed.");
    }
};

var fast_branch = {
    timeline: [],
    conditional_function: function() {
        var last_response = jsPsych.data.get().last(1).values()[0].responses.internetspeed;
        var speed = parseInt(last_response, 10); // Convert string to integer
        return speed >= 25; // If speed > 25, return true (continue down this path)
    }
};

var slow_branch = {
    timeline: [internet_screened_out],
    conditional_function: function() {
        var last_response = jsPsych.data.get().last(1).values()[0].responses.internetspeed;
        var speed = parseInt(last_response, 10);
        return speed < 25; // If speed < 25, return true (continue down this path)
    }
};

var DEMOGRAPHICS = [demographics, slow_branch, fast_branch];