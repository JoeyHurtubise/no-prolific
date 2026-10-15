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
// PROMPTS
// ---------------------------------------------------------
// The two main sections use the same two tasks (grid + words)
// but a different question:
//   Section 1 = regular theory-of-mind question
//   Section 2 = metaperception question
// The practice trial keeps the longer, task-specific instructions.
// =========================================================

var PROMPT_TOM  = 'What do you think the person is thinking?'
var PROMPT_META = 'What do you think the person is thinking about you?'

// =========================================================
// GRID response (valence/arousal)
// make_grid(prompt_html, section) returns one grid trial.
// =========================================================

function make_grid(prompt_html, section) {
  return {
    type: 'html-custom-grid-response',
    around_grid: 'labels',
    stimulus: prompt_html + '<br><br>',
    grid_height: 300,
    maintain_aspect_ratio: true,
    data: {
      trial: 'tom-grid',
      section: section,
      actor: jsPsych.timelineVariable('actor'),
      target_emotion: jsPsych.timelineVariable('target_emotion')
    },
    on_finish: function () {
      jsPsych.setProgressBar(jsPsych.getProgressBarCompleted() + (1 / PROGRESS_BAR_N))
    }
  }
}

// =========================================================
// WORDS response (2 to 3 words)
// make_words(prompt_html, section) returns one words trial.
// =========================================================

function make_words(prompt_html, section) {
  return {
    type: 'html-custom-words-response',
    stimulus: prompt_html + '<br><br>',
    min_words: 2,
    max_words: 3,
    timer_seconds: 12,
    data: {
      trial: 'tom-words',
      section: section,
      actor: jsPsych.timelineVariable('actor'),
      target_emotion: jsPsych.timelineVariable('target_emotion')
    },
    on_finish: function () {
      jsPsych.setProgressBar(jsPsych.getProgressBarCompleted() + (1 / PROGRESS_BAR_N))
    }
  }
}

// Practice version: question + task instructions
var grid_practice = make_grid(
  PROMPT_TOM
  + '<br>Please locate the spot in the grid that best matches your impression by pointing and clicking the mouse.'
  + '<br>Press the <b>space bar</b> when you\'re ready to continue.',
  'practice')

var words_practice = make_words(
  'In 2 to 3 words, what do you think the person is thinking?',
  'practice')

// Section 1 (theory of mind): short prompt, same for both tasks
var grid_tom  = make_grid(PROMPT_TOM, 'tom')
var words_tom = make_words(PROMPT_TOM, 'tom')

// Section 2 (metaperception): short prompt, same for both tasks
var grid_meta  = make_grid(PROMPT_META, 'metaperception')
var words_meta = make_words(PROMPT_META, 'metaperception')

// =========================================================
// Instructions (shown once, at the beginning)
// =========================================================

var gridwords_instructions = {
  type: 'instructions',
  pages: [
    '<div style="width: 1000px; height: 300px"><p>This test will investigate your ability to read emotion and infer mental states from an expression.</p><p>You will be shown a short video demonstrating an expression. After each video, you will do three things: first, place a mark on a grid describing the emotion; second, watch the same video again; third, type 2 to 3 words describing what you think the person is thinking, within 12 seconds.</p><p>The experiment has two sections with the same tasks. The question you are asked will differ slightly between the two sections, and you will be told when it changes.</p><p>Click on <strong>Next</strong> to see an example.</p></div>',
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
    '<div style="width: 1000px; height: 300px"><p>After the grid, the video will play again, and then you will be asked: <strong>"In 2 to 3 words, what do you think the person is thinking?"</strong></p><p>Please answer with <strong>2 to 3 words</strong> (letters only: no numbers or punctuation) that come to mind. You will have <strong>12 seconds</strong> to respond, shown by a countdown below the answer box; when the countdown reaches 0, you will automatically move on to the next video.</p><p>In the main experiment, the question will be shortened to <strong>"What do you think the person is thinking?"</strong>, but you should still answer with 2 to 3 words.</p><p>Click on <strong>Next</strong> to continue.</p></div>',
    '<p>Now we are going to do a practice trial.</p><p>You will be shown a short video. After this, the grid will be displayed, then the video will play again, followed by the words question.</p><p>Click on <strong>Next</strong> when you are ready to start. Once you click <strong>Next</strong>, you will not be able to go back.</p>'
    ],
  show_clickable_nav: true
}

var gridwords_instructions_again = {
  type: 'html-button-response',
  stimulus: '<div style="width: 1000px; height: 120px"><p>You will now begin <strong>Section 1</strong>. You will be shown a series of short videos. After each one, please rate it on the grid (press the <strong>space bar</strong> to confirm your choice), watch the video again, then type 2 to 3 words describing what the person is thinking within 12 seconds, as you did in the practice trial. Starting now, your responses will be recorded.</p><p>Click <strong>Continue</strong> to start. Good luck!</p></div>',
  choices: ['Continue'],
  data: {trial:false},
  margin_vertical: '80px'
}

// =========================================================
// Practice trial
// =========================================================

var gridwords_practice_trial = [grid_practice, fixation, video, mask, words_practice];

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
// Breaks (3 in total):
//   1) middle of Section 1
//   2) between Section 1 and Section 2
//   3) middle of Section 2
// make_break(intro_html) builds one 5-minute break screen with
// the given opening message; the rest of the text is shared.
// =========================================================

function make_break(intro_html) {
  var break_interval = null;
  return {
    type: 'html-button-response',
    stimulus: intro_html
      + '<p> Feel free to walk around the room and stretch. However, please make sure to return to the task'
      + '<br> within 5 minutes, as extended delays may result in automatic withdrawal from the study.<br>Press <b>Continue</b> to proceed with the experiment.'
      + '<p><span id="clock">5:00</span>',
    choices: ['Continue'],
    trial_duration: break_threshold,    // defined in index.html
    on_load: function(){
      var wait_time = 5 * 60 * 1000; // in milliseconds
      var break_start = performance.now();
      break_interval = setInterval(function(){
        var clock = document.querySelector('#clock');
        if (!clock) { clearInterval(break_interval); return; }
        var time_left = wait_time - (performance.now() - break_start);
        var minutes = Math.floor(time_left / 1000 / 60);
        var seconds = Math.floor((time_left - minutes*1000*60)/1000);
        var seconds_str = seconds.toString().padStart(2,'0');
        clock.innerHTML = minutes + ':' + seconds_str
        if(time_left <= 0){
          clock.innerHTML = "0:00";
          document.querySelector('button').disabled = false;
          clearInterval(break_interval);
        }
      }, 250)
    },
    on_finish: function(data) {
      if (break_interval) { clearInterval(break_interval); }
      var too_long = (data.response === null);
      if (too_long) {
        break_timed_out = true
      }
    }
  }
}

var break_mid_section1 = make_break(
  'You have completed the first half of Section 1 of the experiment.'
  + '<br> Please take a five-minute break before moving on to the second half of Section 1.')

var break_between_sections = make_break(
  'You have completed Section 1 of the experiment.'
  + '<br> Please take a five-minute break before moving on to Section 2.'
  + '<p>In Section 2, the tasks are the same, but the question will change: you will now be asked what you think the person is thinking <strong>about you</strong>.</p>')

var break_mid_section2 = make_break(
  'You have completed the first half of Section 2 of the experiment.'
  + '<br> Please take a five-minute break before moving on to the second half of Section 2.')


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
// Main procedure - the stimuli in gridwords_variables (set in
// index.html) are dynamically chunked into 4 parts:
//
//   SECTION 1 (theory of mind: "...thinking?")
//       part 1 -> attention check 1 -> BREAK 1 -> part 2
//   BREAK 2 (between sections)
//   SECTION 2 (metaperception: "...thinking about you?")
//       part 3 -> attention check 2 -> BREAK 3 -> part 4
//
// Each participant sees every video once: parts 1-2 (first half
// of the stimuli) are shown in Section 1, parts 3-4 in Section 2.
// The stimulus order is already randomized per participant in
// index.html.
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
    ac1: ac_slice(0), // within Section 1
    ac2: ac_slice(2)  // within Section 2
  };
}

var gridwords_procedure = build_procedure_blocks(gridwords_variables);

// Section 1 trials (theory of mind prompt)
var gridwords_procedure_pt1 = {
  timeline: [fixation, video, mask, grid_tom, fixation, video, mask, words_tom],
  timeline_variables: gridwords_procedure.blocks[0]
};

var gridwords_procedure_pt2 = {
  timeline: [fixation, video, mask, grid_tom, fixation, video, mask, words_tom],
  timeline_variables: gridwords_procedure.blocks[1]
};

// Section 2 trials (metaperception prompt)
var gridwords_procedure_pt3 = {
  timeline: [fixation, video, mask, grid_meta, fixation, video, mask, words_meta],
  timeline_variables: gridwords_procedure.blocks[2]
};

var gridwords_procedure_pt4 = {
  timeline: [fixation, video, mask, grid_meta, fixation, video, mask, words_meta],
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

  // ---------- SECTION 1: theory of mind ----------
  gridwords_procedure_pt1, gridwords_attention_check_procedure1, check_attention_failures,
  break_mid_section1,
  gridwords_procedure_pt2,

  // ---------- break between sections ----------
  break_between_sections,

  // ---------- SECTION 2: metaperception ----------
  gridwords_procedure_pt3, gridwords_attention_check_procedure2, check_attention_failures,
  break_mid_section2,
  gridwords_procedure_pt4
]
