var ERROR = {
    type: 'html-button-response',
    stimulus: 'An error has occurred. Please contact experimenter.',
    choices: ['<strong>Okay</strong>']
}

var ERROR_pid = {
    type: 'html-button-response',
    stimulus: 'The participant ID in your provided experiment URL is incorrect. Please contact experimenter.',
    choices: ['<strong>Okay</strong>']
}

var pid_incorrect = {
    timeline: [ERROR_pid],
    conditional_function: function() {
        return pid = 'ERROR'; 
    }
};