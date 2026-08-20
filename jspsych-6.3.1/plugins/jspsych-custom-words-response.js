/**
 * html-custom-words-response
 * a custom plugin for free-text responses restricted to a configurable number of
 * single alphabetic words (min_words/max_words), with an optional countdown timer
 * (timer_seconds) that forces the trial to end when time runs out.
 *
 * Structural conventions mirrored from jspsych-custom-grid-response.js
 * (Hector Leos, McGill University)
 */

jsPsych.plugins['html-custom-words-response'] = (function () {

    var plugin = {};

    plugin.info = {
        name: 'html-custom-words-response',

        parameters: {
            stimulus: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name: 'Stimulus',
                default: undefined,
                description: 'The HTML string to be displayed (the question prompt).'
            },
            button_label: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Button label',
                default: 'Continue',
                description: 'Label of the button used to submit the response.'
            },
            min_words: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Minimum words',
                default: 1,
                description: 'Minimum number of words required.'
            },
            max_words: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Maximum words',
                default: 3,
                description: 'Maximum number of words allowed.'
            },
            timer_seconds: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Timer seconds',
                default: null,
                description: 'If set, a countdown (in seconds) is displayed below the answer box. When it reaches 0, the trial ends automatically and the participant is moved on to the next stimulus.'
            }
        }
    }

    plugin.trial = function (display_element, trial) {

        var min_words = trial.min_words;
        var max_words = trial.max_words;
        var timer_seconds = trial.timer_seconds;

        // Build trial HTML: prompt, single text input, inline error area, continue button
        var html = '<br><br><div id="jspsych-html-custom-words-response-stimulus">' + trial.stimulus + '</div>';
        html += '<div style="margin: 20px auto; width: 60%;">';
        html += '<input type="text" id="words-input" autocomplete="off" ';
        html += 'style="width: 100%; font-size: 22px; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; text-align: center;">';
        html += '</div>';
        html += '<div id="words-error" style="color: #c0392b; min-height: 24px; margin-top: 10px; font-size: 16px;"></div>';
        if (timer_seconds) {
            html += '<div id="words-timer" style="font-size: 28px; font-weight: bold; margin-top: 6px;">' + timer_seconds + '</div>';
        }
        html += '<button id="words-continue" class="jspsych-btn" style="margin-top: 10px;">' + trial.button_label + '</button>';

        display_element.innerHTML = html;

        var input_el = document.getElementById('words-input');
        var error_el = document.getElementById('words-error');
        var button_el = document.getElementById('words-continue');
        var timer_el = timer_seconds ? document.getElementById('words-timer') : null;

        input_el.focus();

        var start_time = performance.now();
        var timed_out = false;
        var countdown_interval = null;

        if (timer_seconds) {
            var seconds_left = timer_seconds;
            countdown_interval = setInterval(function () {
                seconds_left -= 1;
                if (seconds_left <= 0) {
                    timer_el.innerHTML = '0';
                    clearInterval(countdown_interval);
                    timed_out = true;
                    submit_response();
                } else {
                    timer_el.innerHTML = seconds_left;
                }
            }, 1000);
        }

        // Splits on whitespace and/or commas, drops empty tokens, checks count and
        // that every token is letters-only (no digits, punctuation, or multi-word phrases).
        function parse_and_validate(raw) {
            var tokens = raw.split(/[\s,]+/).filter(function (t) { return t.length > 0; });

            if (tokens.length < min_words || tokens.length > max_words) {
                return {
                    valid: false,
                    tokens: tokens,
                    error: 'Please enter between ' + min_words + ' and ' + max_words + ' word' + (max_words > 1 ? 's' : '') + '.'
                };
            }

            var word_pattern = /^[A-Za-z]+$/;
            for (var i = 0; i < tokens.length; i++) {
                if (!word_pattern.test(tokens[i])) {
                    return {
                        valid: false,
                        tokens: tokens,
                        error: 'Please use single words with letters only (no numbers or punctuation).'
                    };
                }
            }

            return { valid: true, tokens: tokens, error: null };
        }

        function submit_response() {
            var raw = input_el.value.trim();
            var parsed = parse_and_validate(raw);

            // If the timer ran out, force the trial to end regardless of
            // whether the response is valid (even if empty or incomplete).
            if (!parsed.valid && !timed_out) {
                error_el.innerHTML = parsed.error;
                return;
            }

            if (countdown_interval) {
                clearInterval(countdown_interval);
            }

            var end_time = performance.now();
            var rt = end_time - start_time;

            var results = {
                stimulus: trial.stimulus,
                response: raw,
                words: parsed.tokens,
                word_count: parsed.tokens.length,
                valid: parsed.valid,
                timed_out: timed_out,
                rt: rt
            };

            button_el.removeEventListener('click', submit_response);
            input_el.removeEventListener('keydown', handle_enter);

            display_element.innerHTML = '';

            jsPsych.finishTrial(results);
        }

        function handle_enter(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                submit_response();
            }
        }

        button_el.addEventListener('click', submit_response);
        input_el.addEventListener('keydown', handle_enter);
    };

    return plugin;
})();
