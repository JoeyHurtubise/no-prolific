var thankyou = {
    type: 'html-button-response',
    stimulus: function() {
        var msg = '<h3>Thank you for participating!</h3>';
        msg += '<p>You are done with the experiment. Thank you for your time and contribution.</p>';
        if (COMPLETION_CODE) {
            msg += '<p>Please take note of your completion code before clicking <strong>Complete Experiment</strong>: <strong>' + COMPLETION_CODE + '</strong>.</p>';
        }
        if (REDIRECT_URL) {
            msg += '<p>You will be automatically redirected upon clicking <strong>Complete Experiment</strong>. Please do not close this tab until then.</p>';
        } else {
            msg += '<p>You may now close this window.</p>';
        }
        return msg;
    },
    choices: ['Complete Experiment'],
    data: {
        PID: pid,
        START_TIME: start_time,
        ATTENTION_FAILURES: attention_failures
    }
}

var THANKYOU = [thankyou];
