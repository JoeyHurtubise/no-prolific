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
    stimulus: function() {
        var msg = '<div style="text-align: center; width: 800px; margin: auto"><h3>Thank you for participating!</h3>';
        msg += '<p>Your internet speed is too slow to participate in this experiment and you have been screened out of this study. You will be compensated for the time you have spent on this study by bonus/partial payment. Thank you for your time.</p>';
        if (COMPLETION_CODE) {
            msg += '<p>Please take note of your completion code: <strong>' + COMPLETION_CODE + '</strong>.</p>';
        }
        if (REDIRECT_URL) {
            msg += '<p>You will be automatically redirected upon clicking <strong>Complete Experiment</strong>. Please do not close this tab until then.</p>';
        } else {
            msg += '<p>You may now close this window.</p>';
        }
        msg += '</div>';
        return msg;
    },
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
