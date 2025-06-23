var thankyou = {
    type: 'html-button-response',
    stimulus: '<h3>Thank you for participating!</h1><p>You are done with the experiment. You will receive the full payment for your participation. Thank you for your time and contribution.</p><p>You will be automatically redirected to Prolific upon clicking <strong>Complete Experiment</strong>.</p><p>Please DO NOT close this tab until you have been redirected to Prolific. Please take note of your Prolific Completion Code: <strong>XXXXX</strong>.</p>',
    choices: ['Complete Experiment'],
    data: {
        PID: pid,
        START_TIME: start_time,
        EXP_AB: exp_ab,
        ATTENTION_FAILURES: attention_failures
    }
}

var THANKYOU = [thankyou];