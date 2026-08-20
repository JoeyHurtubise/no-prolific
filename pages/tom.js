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
    },
};

var mask = {
  type: "image-keyboard-response",
  stimulus: 'stimuli/noise_texture.png',
  stimulus_height: 500,
  maintain_aspect_ration: true,
  trial_duration: 500,
  choices: jsPsych.NO_KEYS
};

// =========================================================
// GRID response (valence/arousal) - unchanged from prior version
// =========================================================

var grid = {
  type: 'html-custom-grid-response',
  around_grid: 'labels',
  stimulus: "Please locate the spot in the grid that best matches what you think the actor feels towards you by pointing and clicking the mouse.<br>Press the <b>space bar</b> when you\'re ready to continue.<br><br>",
  grid_height: 300,
  maintain_aspect_ratio: true,
  data: {
    trial: 'tom-grid',
    actor: jsPsych.timelineVariable('actor'),
    target_emotion: jsPsych.timelineVariable('target_emotion')
  },
  on_finish: function () {
    jsPsych.setProgressBar(jsPsych.getProgressBarCompleted() + (1 / PROGRESS_BAR_N))
  }
}

// =========================================================
// WORDS response (new) - "what does the person think about you?"
// =========================================================

var words = {
  type: 'html-custom-words-response',
  stimulus: 'In 1 word, what do you think the actor was thinking about you?<br><br>',
  min_words: 1,
  max_words: 1,
  timer_seconds: 12,
  data: {
    trial: 'tom-words',
    actor: jsPsych.timelineVariable('actor'),
    target_emotion: jsPsych.timelineVariable('target_emotion')
  },
  on_finish: function () {
    jsPsych.setProgressBar(jsPsych.getProgressBarCompleted() + (1 / PROGRESS_BAR_N))
  }
}

// =========================================================
// Instructions
// =========================================================

var gridwords_instructions = {
  type: 'instructions',
  pages: [
    '<div style="width: 1000px; height: 220px"><p>This test will investigate your ability to read emotion and infer mental states from an expression.</p><p>You will be shown a short video demonstrating an expression. After each video, you will do three things: first, place a mark on a grid describing the emotion; second, watch the same video again; third, type 1 word describing what you think the person is thinking about, within 12 seconds.</p><p>Click on <strong>Next</strong> to see an example.</p></div>',
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
    '<div style="width: 1000px; height: 200px"><p>After the grid, the video will play again, and then you will be asked: <strong>"In 1 word, what do you think the actor was thinking about you?"</strong></p><p>Please answer with <strong>1 single word</strong> (no numbers, no punctuation, no phrases) that comes to mind. You will have <strong>12 seconds</strong> to respond, shown by a countdown below the answer box; when the countdown reaches 0, you will automatically move on to the next video.</p><p>Click on <strong>Next</strong> to continue.</p></div>',
    '<p>Now we are going to do a practice trial.</p><p>You will be shown a short video. After this, the grid will be displayed, then the video will play again, followed by the words question.</p><p>Click on <strong>Next</strong> when you are ready to start. Once you click <strong>Next</strong>, you will not be able to go back.</p>'
    ],
  show_clickable_nav: true
}

var gridwords_instructions_again = {
  type: 'html-button-response',
  stimulus: '<div style="width: 1000px; height: 70px"><p>You will now be shown a series of short videos. After each one, please rate it on the grid, watch the video again, then type 1 word describing what the person is thinking about within 12 seconds, as you did in the practice trials. Starting now, your responses will be recorded.</p><p>Click <strong>Continue</strong> to start. Good luck!</p></div>',
  choices: ['Continue'],
  data: {trial:false},
  margin_vertical: '80px'
}

// =========================================================
// Practice trial
// =========================================================

var gridwords_practice_trial = [grid, fixation, video, mask, words];

var PRACTICE_VIDEO = [{
  "name": "12_distrustful_3sec",
  "player_embed_url": "https://player.vimeo.com/video/1030059255?h=2973baf53a",
  "actor": 12,
  "target_emotion": "Doubtful",
}];

var gridwords_practice = {
  timeline: [gridwords_instructions, fixation, video, mask].concat(gridwords_practice_trial),
  randomize_order: false,
  timeline_variables: PRACTICE_VIDEO
};

// =========================================================
// Between-trial break (single break between the two blocks)
// =========================================================

var between_trials_countdown = {
  type: 'html-button-response',
  stimulus: 'You have completed the first block of the experiment.'
    + '<br> Please take a five-minute break before moving on to the second block.'
    + '<p> Feel free to walk around the room and stretch. However, please make sure to return to the task'
    + '<br> within 5 minutes, as extended delays may result in automatic withdrawal from the study.<br>Press <b>Continue</b> to proceed with the experiment.'
    + '<p><span id="clock">5:00</span>',
  choices: ['Continue'],
  trial_duration: break_threshold,    // defined in index.html
  on_load: function(){
    var wait_time = 5 * 60 * 1000; // in milliseconds
    var start_time = performance.now();
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
    },
    on_finish: function(data) {
    var too_long = (data.response === null);
    if (too_long) {
      break_timed_out = true}},
}

// =========================================================
// Attention checks - grid-only (unchanged mechanics), no words step
// =========================================================

var grid_attention_check1 = {
  type: 'html-custom-grid-response-ac',
  around_grid: 'labels',
  stimulus: "If you are paying attention, please click anywhere in the <span style='color: #ff0000;'><strong>bottom left quadrant</strong></span>.<br>Press the <b>space bar</b> when you\'re ready to continue.<br><br>",
  grid_height: 300,
  maintain_aspect_ratio: true,
  xcoord: 20,
  ycoord: 230,
  on_finish: function(data) {
    var x = Number(data.x);
    var y = Number(data.y);
    var passed = (x < 0 && y < 0);
    if (!passed) {
      attention_failures += 1;
    }
  },
  data: {
    trial: 'attention-check',
    actor: jsPsych.timelineVariable('actor'),
    target_emotion: jsPsych.timelineVariable('target_emotion'),
  },
  on_finish: function () {
    jsPsych.setProgressBar(jsPsych.getProgressBarCompleted() + (1 / PROGRESS_BAR_N))
  }
}

var grid_attention_check2 = {
  type: 'html-custom-grid-response-ac',
  around_grid: 'labels',
  stimulus: "If you are paying attention, please click anywhere in the <span style='color: #ff0000;'><strong>top left quadrant</strong></span>.<br>Press the <b>space bar</b> when you\'re ready to continue.<br><br>",
  grid_height: 300,
  maintain_aspect_ratio: true,
  xcoord: 20,
  ycoord: 80,
  on_finish: function(data) {
    var x = Number(data.x);
    var y = Number(data.y);
    var passed = (x < 0 && y > 0);
    if (!passed) {
      attention_failures += 1;
    }
  },
  data: {
    trial: 'attention-check',
    actor: jsPsych.timelineVariable('actor'),
    target_emotion: jsPsych.timelineVariable('target_emotion'),
  },
  on_finish: function () {
    jsPsych.setProgressBar(jsPsych.getProgressBarCompleted() + (1 / PROGRESS_BAR_N))
  }
}

// =========================================================
// Screen-out branches (unchanged)
// =========================================================

var attention_screened_out = {
  type: 'html-button-response',
  stimulus: function() {
    var msg = '<h3>Thank you for participating!</h3><p>You have been screened out of the experiment for failing too many attention checks. Thank you for your time and contribution.</p>';
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
  on_finish: function() {
      jsPsych.endExperiment("Screened out due to failing attention checks.");
      }
  };

var check_attention_failures = {
  timeline: [attention_screened_out],
  conditional_function: function() {
      return attention_failures >= 2;
    }
  };

var break_screened_out = {
  type: 'html-button-response',
  stimulus: function() {
    var msg = '<h3>Thank you for participating!</h3><p>You have been screened out of the experiment for taking too long during the break. Thank you for your time and contribution.</p>';
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
  on_finish: function() {
      jsPsych.endExperiment("Timed out due to exceeding the provided break time (inactivity).");
      }
  };

var check_break = {
  timeline: [break_screened_out],
  conditional_function: function() {
      return break_timed_out;
    }
  };

// =========================================================
// Main procedure - dynamically chunked into 4 parts (forming
// 2 blocks of 2 parts each) with 2 attention checks and 1
// break, based on however many stimuli end up in
// gridwords_variables (set in index.html).
//
// NOTE: block sizes and attention-check placement below are
// computed dynamically rather than hardcoded, since the final
// stimulus subset for this condition has not been finalized yet.
// If you want exact control over which specific videos are used
// as attention checks, replace build_procedure_blocks() with
// fixed .slice(...) calls once the stimulus list is final.
// =========================================================

function build_procedure_blocks(variables) {
  var total = variables.length;
  var chunk_size = Math.ceil(total / 4);

  var blocks = [];
  for (var i = 0; i < 4; i++) {
    var start = i * chunk_size;
    var end = Math.min(start + chunk_size, total);
    blocks.push(variables.slice(start, end));
  }

  function ac_slice(block_index) {
    var start = block_index * chunk_size;
    var mid = Math.min(start + Math.floor(chunk_size / 2), total - 1);
    return variables.slice(mid, mid + 1);
  }

  return {
    blocks: blocks,
    ac1: ac_slice(0), // within the first block
    ac2: ac_slice(2)  // within the second block
  };
}

var gridwords_procedure = build_procedure_blocks(gridwords_variables);

var gridwords_procedure_pt1 = {
  timeline: [fixation, video, mask, grid, fixation, video, mask, words],
  timeline_variables: gridwords_procedure.blocks[0]
};

var gridwords_procedure_pt2 = {
  timeline: [fixation, video, mask, grid, fixation, video, mask, words],
  timeline_variables: gridwords_procedure.blocks[1]
};

var gridwords_procedure_pt3 = {
  timeline: [fixation, video, mask, grid, fixation, video, mask, words],
  timeline_variables: gridwords_procedure.blocks[2]
};

var gridwords_procedure_pt4 = {
  timeline: [fixation, video, mask, grid, fixation, video, mask, words],
  timeline_variables: gridwords_procedure.blocks[3]
};

var gridwords_attention_check_procedure1 = {
  timeline: [fixation, video, mask, grid_attention_check1],
  randomize_order: false,
  timeline_variables: gridwords_procedure.ac1
};

var gridwords_attention_check_procedure2 = {
  timeline: [fixation, video, mask, grid_attention_check2],
  randomize_order: false,
  timeline_variables: gridwords_procedure.ac2
};

var TOM_GRIDWORDS = [
  gridwords_practice,
  gridwords_instructions_again,
  gridwords_procedure_pt1, gridwords_attention_check_procedure1, check_attention_failures,
  gridwords_procedure_pt2, between_trials_countdown,
  gridwords_procedure_pt3, gridwords_attention_check_procedure2, check_attention_failures,
  gridwords_procedure_pt4
]
