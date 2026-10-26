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

// Grid prompts (valence/arousal task)
var PROMPT_TOM  = 'What do you think the person is thinking?'
var PROMPT_META = 'What do you think the person is thinking <b><u>about you</u></b>?'

// Free-label (words) prompts: participants type "a few words"
var PROMPT_TOM_WORDS  = 'In a few words, what do you think the person is thinking?'
var PROMPT_META_WORDS = 'In a few words, what do you think the person is thinking <b><u>about you</u></b>?'

// Timers (in seconds)
var GRID_TIMER_SECONDS  = 10
var WORDS_TIMER_SECONDS = 18

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
    timer_seconds: GRID_TIMER_SECONDS,
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
// WORDS response (a few words: minimum 1 word, no maximum,
// no restriction on numbers/punctuation, 18-second timer)
// make_words(prompt_html, section) returns one words trial.
// =========================================================

function make_words(prompt_html, section) {
  return {
    type: 'html-custom-words-response',
    stimulus: prompt_html + '<br><br>',
    min_words: 1,
    max_words: null,
    timer_seconds: WORDS_TIMER_SECONDS,
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
  + '<br>You have <b>10 seconds</b> (shown by the countdown below the grid). Click the <b>Continue</b> button (or press <b>Enter</b>) to confirm your choice, or wait for the countdown to finish.',
  'practice')

var words_practice = make_words(PROMPT_TOM_WORDS, 'practice')

// Section 1 (theory of mind)
var grid_tom  = make_grid(PROMPT_TOM, 'tom')
var words_tom = make_words(PROMPT_TOM_WORDS, 'tom')

// Section 2 (metaperception)
var grid_meta  = make_grid(PROMPT_META, 'metaperception')
var words_meta = make_words(PROMPT_META_WORDS, 'metaperception')

// =========================================================
// Instructions (shown once, at the beginning)
// =========================================================

var gridwords_instructions = {
  type: 'instructions',
  pages: [
    '<div style="width: 1000px; height: 300px"><p>This test will investigate your ability to read emotion and infer mental states from an expression.</p><p>You will be shown a short video demonstrating an expression. After each video, you will do three things: first, place a mark on a grid describing the emotion, within <strong>10 seconds</strong>; second, watch the same video again; third, type a few words describing what you think the person is thinking, within <strong>18 seconds</strong>.</p><p>The experiment has two sections with the same tasks. The question you are asked will differ slightly between the two sections, and you will be told when it changes.</p><p>Click on <strong>Next</strong> to see an example.</p></div>',
    '<div style="width: 1000px; height: 700px;"> \
    <p>Here is an example of a valence-arousal grid. Clicking somewhere in the upper right quadrant would mean that you consider this expression to be more positive and higher arousal.</p> \
    <p>You will have <strong>10 seconds</strong> to make your selection, shown by a countdown below the grid. After you click a spot on the grid, click the <strong>Continue</strong> button (or press <strong>Enter</strong>) to confirm your choice; when the countdown reaches 0, you will automatically move on.</p> \
    <div style="display: flex; align-items: center; justify-content: space-between;"> \
      <iframe id="vimeo-player" \
        src="https://player.vimeo.com/video/1030059255?h=2973baf53a&autoplay=1&muted=1&controls=0&loop=0&title=0&byline=0&portrait=0&playsinline=1&keyboard=0" \
        width="768" \
        height="432" \
        frameborder="0" \
        allow="autoplay; fullscreen">\
      </iframe> \
    <img src="stimuli/instructions-grid.png" alt="instructions-grid" width="400"></div><p>Click on <strong>Next</strong> to continue.</p></div>',
    '<div style="width: 1000px; height: 300px"><p>After the grid, the video will play again, and then you will be asked: <strong>"In a few words, what do you think the person is thinking?"</strong></p><p>Please answer with <strong>a few words</strong> that come to mind (at least one word). You will have <strong>18 seconds</strong> to respond, shown by a countdown below the answer box; when the countdown reaches 0, you will automatically move on to the next video.</p><p>The experiment has two sections. This question will be asked in Section 1, and you will be told clearly when the question changes for Section 2.</p><p>Click on <strong>Next</strong> to continue.</p></div>',
    '<p>Now we are going to do a practice trial.</p><p>You will be shown a short video. After this, the grid will be displayed, then the video will play again, followed by the words question.</p><p>Click on <strong>Next</strong> when you are ready to start. Once you click <strong>Next</strong>, you will not be able to go back.</p>'
    ],
  show_clickable_nav: true
}

var gridwords_instructions_again = {
  type: 'html-button-response',
  stimulus: '<div style="width: 1000px; height: 120px"><p>You will now begin <strong>Section 1</strong>. You will be shown a series of short videos. After each one, please rate it on the grid within 10 seconds (click <strong>Continue</strong> or press <strong>Enter</strong> to confirm your choice), watch the video again, then type a few words describing what the person is thinking within 18 seconds, as you did in the practice trial. Starting now, your responses will be recorded.</p><p>Click <strong>Continue</strong> to start. Good luck!</p></div>',
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
  + '<br> Please take a five-minute break before moving on to Section 2.')

// ---------------------------------------------------------
// Section 2 transition: a clearly different screen that the
// participant must actively acknowledge before continuing.
// The button is the only way to proceed.
// ---------------------------------------------------------
var section2_transition = {
  type: 'html-button-response',
  stimulus:
    '<div style="width: 900px; margin: auto; padding: 30px 40px; border: 5px solid #c0392b; border-radius: 12px; background-color: #fdecea; text-align: center;">'
    + '<h1 style="color: #c0392b; font-weight: 800; font-size: 38px; margin: 0 0 20px 0; letter-spacing: 1px;">IMPORTANT: THE QUESTION IS CHANGING</h1>'
    + '<p style="font-size: 22px; font-weight: bold; margin: 12px 0;">In Section 1, you were asked what the person in the video is thinking:</p>'
    + '<p style="font-size: 22px; margin: 4px 0 18px 0;"><i>&ldquo;What do you think the person is thinking?&rdquo;</i></p>'
    + '<p style="font-size: 24px; font-weight: 800; margin: 12px 0;">In Section 2, you will be asked <u>a different question</u>:</p>'
    + '<p style="font-size: 26px; font-weight: 800; color: #c0392b; margin: 4px 0 18px 0;">What do you think the person is thinking <u>ABOUT YOU</u>?</p>'
    + '<p style="font-size: 20px; font-weight: bold; margin: 12px 0;">You will no longer be judging what the person is thinking or feeling in general. You will be judging what the person in the video is thinking about <u>you</u>, the viewer.</p>'
    + '<p style="font-size: 18px; margin: 12px 0 24px 0;">The tasks, the grid (10 seconds) and the few-words response (18 seconds), stay the same. Only the question changes.</p>'
    + '<p style="font-size: 18px; font-weight: bold; margin: 0 0 6px 0;">Please click the button below to confirm that you have read and understood this change.</p>'
    + '</div>',
  choices: ['Yes, I have read the changes and I acknowledge that I will now be thinking about what the person in the video is thinking about ME'],
  button_html: '<button class="jspsych-btn" style="font-size: 18px; font-weight: bold; padding: 14px 24px; max-width: 760px; white-space: normal; line-height: 1.4; background-color: #c0392b; color: white; border: none; border-radius: 8px; margin-top: 20px;">%choice%</button>',
  data: {trial: 'section2-acknowledgement'}
}

var break_mid_section2 = make_break(
  'You have completed the first half of Section 2 of the experiment.'
  + '<br> Please take a five-minute break before moving on to the second half of Section 2.')


// =========================================================
// Attention checks - grid-only (unchanged mechanics), no words step
// =========================================================

var grid_attention_check1 = {
  type: 'html-custom-grid-response-ac',
  around_grid: 'labels',
  stimulus: "If you are paying attention, please click anywhere in the <span style='color: #ff0000;'><strong>bottom left quadrant</strong></span>.<br>Click the <b>Continue</b> button (or press <b>Enter</b>) when you\'re ready to continue.<br><br>",
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
  stimulus: "If you are paying attention, please click anywhere in the <span style='color: #ff0000;'><strong>top left quadrant</strong></span>.<br>Click the <b>Continue</b> button (or press <b>Enter</b>) when you\'re ready to continue.<br><br>",
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
// Main procedure
//
// The SAME set of stimuli is used in both sections so the two
// sections can be compared directly. index.html builds:
//   section1_stimuli - the stimulus set, in a random order (no actor twice in a row)
//   section2_stimuli - the identical set, in a different random order
//
// Each section is split into two halves with a break between:
//
//   SECTION 1 (theory of mind: "...thinking?")
//       part 1 -> attention check 1 -> BREAK 1 -> part 2
//   BREAK 2 (between sections)
//   SECTION 2 INTRO (must be acknowledged)
//   SECTION 2 (metaperception: "...thinking about you?")
//       part 3 -> attention check 2 -> BREAK 3 -> part 4
//
// Block sizes and attention-check placement are computed
// dynamically from the length of the stimulus set.
// =========================================================

// Picks an attention-check clip from the held-out clips (the ones NOT used in
// either section), so no stimulus is repeated within a section. The clip's actor
// also differs from the trial before and after it, so the same actor never
// appears twice in a row. The chosen clip is removed from the pool so the two
// attention checks use different clips.
function pick_attention_clip(pool, before_actor, after_actor) {
  var ok = pool.filter(function (v) { return v.actor !== before_actor && v.actor !== after_actor });
  var chosen = (ok.length ? ok : pool)[Math.floor(Math.random() * (ok.length ? ok.length : pool.length))];
  pool.splice(pool.indexOf(chosen), 1);
  return [chosen];
}

function split_section(stimuli) {
  var half = Math.ceil(stimuli.length / 2);
  var first_half  = stimuli.slice(0, half);
  var second_half = stimuli.slice(half);
  return {
    first_half: first_half,
    second_half: second_half,
    // attention check sits between the two halves
    ac: pick_attention_clip(attention_check_pool,
                            first_half[first_half.length - 1].actor,
                            second_half[0].actor)
  };
}

var section1_blocks = split_section(section1_stimuli);
var section2_blocks = split_section(section2_stimuli);

// Section 1 trials (theory of mind prompt)
var gridwords_procedure_pt1 = {
  timeline: [fixation, video, mask, grid_tom, fixation, video, mask, words_tom],
  timeline_variables: section1_blocks.first_half
};

var gridwords_procedure_pt2 = {
  timeline: [fixation, video, mask, grid_tom, fixation, video, mask, words_tom],
  timeline_variables: section1_blocks.second_half
};

// Section 2 trials (metaperception prompt)
var gridwords_procedure_pt3 = {
  timeline: [fixation, video, mask, grid_meta, fixation, video, mask, words_meta],
  timeline_variables: section2_blocks.first_half
};

var gridwords_procedure_pt4 = {
  timeline: [fixation, video, mask, grid_meta, fixation, video, mask, words_meta],
  timeline_variables: section2_blocks.second_half
};

var gridwords_attention_check_procedure1 = {
  timeline: [fixation, video, mask, grid_attention_check1],
  randomize_order: false,
  timeline_variables: section1_blocks.ac
};

var gridwords_attention_check_procedure2 = {
  timeline: [fixation, video, mask, grid_attention_check2],
  randomize_order: false,
  timeline_variables: section2_blocks.ac
};

var TOM_GRIDWORDS = [
  gridwords_practice,
  gridwords_instructions_again,

  // ---------- SECTION 1: theory of mind ----------
  gridwords_procedure_pt1, gridwords_attention_check_procedure1, check_attention_failures,
  break_mid_section1,
  gridwords_procedure_pt2,

  // ---------- break between sections + acknowledgement ----------
  break_between_sections,
  section2_transition,

  // ---------- SECTION 2: metaperception ----------
  gridwords_procedure_pt3, gridwords_attention_check_procedure2, check_attention_failures,
  break_mid_section2,
  gridwords_procedure_pt4
]
