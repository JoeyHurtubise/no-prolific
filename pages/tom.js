var fixation = {
  type: "html-keyboard-response",
  stimulus: '<span style="font-size:40px;">+</span>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000
};

var video = {
  type: 'html-keyboard-response',
  stimulus: function() {
      // Replace the URL dynamically
      return `
          <div style="text-align: center;">
              <p style="font-size: 20px; font-weight: bold;">Video:${jsPsych.timelineVariable('name')}</p>
          <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
              <iframe id="vimeo-player" 
                      src="${jsPsych.timelineVariable('player_embed_url')}&autoplay=1&muted=1&controls=0&loop=0&title=0&byline=0&portrait=0&playsinline=1&keyboard=0" 
                      width="768" 
                      height="432" 
                      frameborder="0" 
                      allow="autoplay; fullscreen">
              </iframe>
          </div>`;
  },
  trial_duration: null, // No predefined duration; the trial ends based on video playback
  choices: jsPsych.NO_KEYS, // Disable participant response
  on_load: function() {
      // Wait for the DOM to be fully loaded
      var iframe = document.getElementById('vimeo-player');
      
      // Create a Vimeo Player instance
      var player = new Vimeo.Player(iframe);

      // Attach an event listener for when the video ends
      player.on('ended', function() {
          // End the trial when the video finishes
          jsPsych.finishTrial();
      });

      // Handle any potential errors from the player
      player.on('error', function(error) {
          console.error('Vimeo Player Error:', error);
          jsPsych.finishTrial(); // End the trial to prevent the experiment from stalling
      });
  }
};

var mask = {
  type: "image-keyboard-response",
  stimulus: 'stimuli/noise_texture.png',
  stimulus_height: 500,
  maintain_aspect_ration: true,
  trial_duration: 500,
  choices: jsPsych.NO_KEYS
};

var labels_instructions = {
  type: 'instructions',
  pages: [
    '<div style="width: 1000px; height: 200px"><p>This test will investigate your ability to read emotion from an expression.</p><p>You will be shown a short video demonstrating an expression. Following this, you will be shown four labels and you should select the one that best describes the emotion that was represented in the video. Please provide one best guess for each item.</p><p>Click on <strong>Next</strong> to see an example.</p></div>',
    '<div style="width: 1000px; height: 600px;"> \
    <p>Here is an example of a video and four possible emotion labels. Clicking on <span style="color: red; font-weight: bold;">doubtful</span> would mean that you consider this video to correspond best to that emotion.</p> \
    <div style="display: flex; align-items: center; justify-content: space-between;"> \
      <iframe id="vimeo-player" \
        src="https://player.vimeo.com/video/1030059255?h=2973baf53a&autoplay=1&muted=1&controls=0&loop=0&title=0&byline=0&portrait=0&playsinline=1&keyboard=0" \
        width="768" \
        height="432" \
        frameborder="0" \
        allow="autoplay; fullscreen">\
      </iframe> \
    <img src="stimuli/instructions-labels.png" alt="instructions-labels" width="400"></div></div>',
    '<p>Now you will be shown the glossary of the mental states used in this experiment.</p><p>Please read through the list and make sure to learn the definition of any mental states you are not familiar with.</p>Please note that you will not have access to the glossary during the rest of the experiment.<p>Click on <strong>Next</strong> to continue.</p.>',
    '<br><br><b>GLOSSARY FOR MENTAL STATES </b><br><br>' + emotion_definitions,
    '<p>Now we are going to do a practice trial.</p><p>You will be shown a short video. Then, the labels will be displayed for you to click on the one corresponding to the shown emotion.</p><p>Click on <strong>Next</strong> when you are ready to start. Once you click <strong>Next</strong>, you will not be able to go back.</p>'
    ],
  show_clickable_nav: true
}

var labels = {
  type: "custom-labels-response",
  stimulus: 'What emotion was the face showing?<br><br>',
  choices: function() {
    let target_emn = jsPsych.timelineVariable('target_emotion');
    // console.log("Target emotion:", target_emn);  // Debugging
    return emotion_array(target_emn);
  },
  data: {
    trial: 'tom-labels',
    actor: jsPsych.timelineVariable('actor'),
    target_emotion: jsPsych.timelineVariable('target_emotion')
  }
};

var grid = {
  type: 'html-custom-grid-response',
  around_grid: 'labels',
  stimulus: "Please locate the emotion in an appropriate spot in the grid by pointing and clicking the mouse.<br>Press the <b>space bar</b> when you\'re ready to continue.<br><br>",
  grid_height: 300,
  maintain_aspect_ratio: true,
  data: {
    trial: 'tom-grid',
    actor: jsPsych.timelineVariable('actor'),
    target_emotion: jsPsych.timelineVariable('target_emotion')
  }
}

var labels_practice = {
  timeline: [labels_instructions, fixation, video, mask, labels],
  randomize_order: false,
  timeline_variables: [{
    "name": "12_distrustful_3sec",
    "player_embed_url": "https://player.vimeo.com/video/1030059255?h=2973baf53a",
    "actor": 12,
    "target_emotion": "Doubtful",
    "choices": ['Doubtful', 'Hostile', 'Alarmed', 'Disappointed']
  }]
};

var labels_attention_check = {
  type: "custom-labels-response",
  stimulus: 'If you are paying attention, please select <strong>Annoyed</strong>.<br>',
  choices: ['Doubtful', 'Hostile', 'Annoyed', 'Disappointed'],
  on_finish: function(data) {
    // Check if the participant selected "annoyed"
    var passed = (data.response === "annoyed");

    // Update failure count if they fail
    if (!passed) {
      attention_failures += 1}},
  data: {
    trial: 'attention-check',
    actor: jsPsych.timelineVariable('actor'),
    target_emotion: jsPsych.timelineVariable('target_emotion'),
  }
};

var labels_attention_check_procedure1 = {
  timeline: [fixation, video, mask, labels_attention_check],
  randomize_order: false,
  timeline_variables: labels_variables.slice(5,6)
};

var labels_attention_check_procedure2 = {
  timeline: [fixation, video, mask, labels_attention_check],
  randomize_order: false,
  timeline_variables: labels_variables.slice(30,31)
};

var labels_instructions_again = {
  type: 'html-button-response',
  stimulus: '<div style="width: 1000px; height: 45px"><p>You will now be shown a series of short videos. Please select the label that best describes the emotion that the face was showing. Please provide one best guess for each item. Starting now, your responses will be recorded.</p><p>Click <strong>Continue</strong> to start. Good luck!</p></div>',
  choices: ['Continue'],
  data: {trial:false},
  margin_vertical: '80px'
}

var between_trials_countdown = {
  type: 'html-button-response',
  stimulus: 'You have completed the first part of the experiment.'
    + '<br> Please take a five-minute break before moving on to the next trial.'
    + '<p> Feel free to walk around the room and stretch. However, please make sure to return to the task'
    + '<br> within 5 minutes. Press <b>Continue</b> to proceed with the experiment.'
    + '<p><span id="clock">5:00</span>',
  choices: ['Continue'],
  on_load: function(){
    var wait_time = 5 * 60 * 1000; // in milliseconds
    var start_time = performance.now();
    // document.querySelector('button').disabled = true;
    var interval = setInterval(function(){
    var time_left = wait_time - (performance.now() - start_time);
    var minutes = Math.floor(time_left / 1000 / 60);
    var seconds = Math.floor((time_left - minutes*1000*60)/1000);
    var seconds_str = seconds.toString().padStart(2,'0');
    document.querySelector('#clock').innerHTML = minutes + ':' + seconds_str
    if(time_left <= 0){
        document.querySelector('#clock').innerHTML = "0:00";
        document.querySelector('button').disabled = false;
        clearInterval(interval);
    }
    }, 250)
  }}

var grid_instructions = {
  type: 'instructions',
  pages: [
    '<div style="width: 1000px; height: 200px"><p>This test will investigate your ability to read emotion from an expression.</p><p>You will be shown a short video demonstrating an expression, and then a grid will appear for you to select the best placement describing the emotion that the face was showing. This placement is based on your perception of <strong>arousal</strong> (low or high intensity) and <strong>valence</strong> (negative or positive emotion). Please provide one best guess for each item.</p><p>Click on <strong>Next</strong> to see an example.</p></div>',
    '<div style="width: 1000px; height: 600px;"> \
    <p>Here is an example of a valence-arousal grid. Clicking somewhere in the upper right quadrant would mean that you consider this expression to be more positive and higher arousal.</p> \
    <div style="display: flex; align-items: center; justify-content: space-between;"> \
      <iframe id="vimeo-player" \
        src="https://player.vimeo.com/video/1030059255?h=2973baf53a&autoplay=1&muted=1&controls=0&loop=0&title=0&byline=0&portrait=0&playsinline=1&keyboard=0" \
        width="768" \
        height="432" \
        frameborder="0" \
        allow="autoplay; fullscreen">\
      </iframe> \
    <img src="stimuli/instructions-grid.png" alt="instructions-grid" width="400"></div><p>Click on <strong>Next</strong> to continue.</p></div>',
    '<p>Now we are going to do a practice trial.</p><p>You will be shown a short video. After this, the grid will be displayed for you to click on the placement you believe to best correspond to the shown emotion.</p><p>Click on <strong>Next</strong> when you are ready to start. Once you click <strong>Next</strong>, you will not be able to go back.</p>'
    ],
  show_clickable_nav: true
}

var grid_practice = {
  timeline: [grid_instructions, fixation, video, mask, grid],
  randomize_order: false,
  timeline_variables: [{
    "name": "12_distrustful_3sec",
    "player_embed_url": "https://player.vimeo.com/video/1030059255?h=2973baf53a",
    "actor": 12,
    "target_emotion": "Doubtful",
  }]
};

var grid_instructions_again = {
  type: 'html-button-response',
  stimulus: '<div style="width: 1000px; height: 70px"><p>You will now be shown a series of short videos. Please identify an appropriate location in the grid for the emotion expressed as you did before in the practice trials. Starting now, your responses will be recorded.</p><p>Click <strong>Continue</strong> to start. Good luck!</p></div>',
  choices: ['Continue'],
  data: {trial:false},
  margin_vertical: '80px'
}

var grid_attention_check1 = {
  type: 'html-custom-grid-response',
  around_grid: 'labels',
  stimulus: "If you are paying attention, please click anywhere in the <strong>bottom left quadrant</strong>.<br>Press the <b>space bar</b> when you\'re ready to continue.<br><br>",
  grid_height: 300,
  maintain_aspect_ratio: true,
  on_finish: function(data) {
    var x = Number(data.x);
    var y = Number(data.y);
    
    // Check if the click was in the bottom left quadrant
    var passed = (x < 0 && y < 0);

    // Update global failure counter if they fail
    if (!passed) {
      attention_failures += 1;
    }
  },
  data: {
    trial: 'attention-check',
    actor: jsPsych.timelineVariable('actor'),
    target_emotion: jsPsych.timelineVariable('target_emotion'),
  }
}

var grid_attention_check2 = {
  type: 'html-custom-grid-response',
  around_grid: 'labels',
  stimulus: "If you are paying attention, please click anywhere in the <strong>top left quadrant</strong>.<br>Press the <b>space bar</b> when you\'re ready to continue.<br><br>",
  grid_height: 300,
  maintain_aspect_ratio: true,
  on_finish: function(data) {
    var x = Number(data.x);
    var y = Number(data.y);
    
    // Check if the click was in the top left quadrant
    var passed = (x < 0 && y > 0);

    // Update global failure counter if they fail
    if (!passed) {
      attention_failures += 1;
    }
  },
  data: {
    trial: 'attention-check',
    actor: jsPsych.timelineVariable('actor'),
    target_emotion: jsPsych.timelineVariable('target_emotion'),
  }
}

var grid_attention_check_procedure1 = {
  timeline: [fixation, video, mask, grid_attention_check1],
  randomize_order: false,
  timeline_variables: grid_variables.slice(5,6)
};

var grid_attention_check_procedure2 = {
  timeline: [fixation, video, mask, grid_attention_check2],
  randomize_order: false,
  timeline_variables: grid_variables.slice(30,31)
};

// ==========

// labels_variables = video_info_01  // default -- testing only -- TODO
// grid_variables = video_info_01    // default -- testing only -- TODO

var labels_procedure = {
  timeline: [fixation, video, mask, labels],
  randomize_order: true,
  timeline_variables: labels_variables
};

var labels_procedure_pt1 = {
  timeline: [fixation, video, mask, labels],
  // randomize_order: true,
  timeline_variables: labels_variables.slice(0,20)
};

var labels_procedure_pt2 = {
  timeline: [fixation, video, mask, labels],
  // randomize_order: true,
  timeline_variables: labels_variables.slice(20,50)
};

var labels_procedure_pt3 = {
  timeline: [fixation, video, mask, labels],
  // randomize_order: true,
  timeline_variables: labels_variables.slice(50,186)
};

var grid_procedure = {
  timeline: [fixation, video, mask, grid],
  randomize_order: true,
  timeline_variables: grid_variables
};

var grid_procedure_pt1 = {
  timeline: [fixation, video, mask, grid],
  // randomize_order: true,
  timeline_variables: grid_variables.slice(0,20)
};

var grid_procedure_pt2 = {
  timeline: [fixation, video, mask, grid],
  // randomize_order: true,
  timeline_variables: grid_variables.slice(20,50)
};

var grid_procedure_pt3 = {
  timeline: [fixation, video, mask, grid],
  // randomize_order: true,
  timeline_variables: grid_variables.slice(50,186)
};

// Define an alternate timeline if they fail 2 attention checks
var attention_screened_out = {
  type: 'html-button-response',
  stimulus: '<div style="text-align: center; width: 800px; margin: auto"><h3>Thank you for participating!</h1><p>You have failed two attention checks and you have been screened out of this study. You will be compensated for the time you have spent on this study by bonus/partial payment. Thank you for your time.</p><p>You will be automatically redirected to Prolific upon clicking <strong>Complete Experiment</strong>.</p><p>Please <strong>DO NOT</strong> close this tab until you have been redirected to Prolific. Please take note of your Prolific Completion Code: <strong>XXXXX</strong>.</p></div>',
  choices: ['Complete Experiment'],
  on_finish: function() {
      jsPsych.endExperiment("Screened out due to failing attention checks.");
      }
  };

  // Define a conditional node to check if failures reached 2
  var check_attention_failures = {
  timeline: [attention_screened_out],
  conditional_function: function() {
      return attention_failures >= 2;
    }
  };

var TOM_LABELS = [
  labels_practice, 
  labels_instructions_again, 
  labels_procedure_pt1, 
  labels_attention_check_procedure1, check_attention_failures, 
  labels_procedure_pt2,
  labels_attention_check_procedure2, check_attention_failures, 
  labels_procedure_pt3,
]

var TOM_GRID = [
  grid_practice, 
  grid_instructions_again, 
  grid_procedure_pt1, 
  grid_attention_check_procedure1, check_attention_failures, 
  grid_procedure_pt2, 
  grid_attention_check_procedure2, check_attention_failures, 
  grid_procedure_pt3,
]

// var video_testing = {
//   timeline: [video],
//   randomize_order: false, // change this back for actual experiment! TODO
//   timeline_variables: tom_variables.slice(5,94)
// };