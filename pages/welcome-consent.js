var welcome = {
    type: 'html-button-response',
    stimulus: '<h1>Welcome to the Multiethnic Face Database Study!</h1>',
    choices: ['<strong>Start</strong>'],
    data: {
        PID: pid,
        START_TIME: start_time,
        EXP_AB: exp_ab,
        ATTENTION_FAILURES: attention_failures
    },
    on_finish: function () {
        jsPsych.setProgressBar(0)
      }
}

consent_text_labels =  '<div style="text-align: left; margin: 50px 80px -60px 80px;">'
consent_text_labels += "<p><span style='text-decoration: underline;'><strong>CONSENT FORM </strong></span></p>"
consent_text_labels += "<p><strong>McGill University </strong></p>"
consent_text_labels += "<p><strong>Title of Research:</strong> A Dual Process Theory of Theory of Mind</p>"
consent_text_labels += "<p><strong>Researchers:</strong><br>Ian Gold, Ph.D., Professor, McGill University<br />Elizaveta Solomonova, Ph.D., Researcher, McGill University <br />Fernanda Perez-Gay Juarez, M.D., Ph.D., Psychiatry Resident, McGill University<br />Sophie Serebryany, Undergraduate Student, McGill University <br />Ani Shahbazian, Undergraduate Student, Concordia University<br>Sophie Hoyer, Undergraduate Student, McGill University</p>"
consent_text_labels += "<p><strong>Contact Information:<br />Tel:</strong> 514-398-8939 (Dr. Ian Gold) <br /><strong>Email:</strong> neurophilosophylabmcgill@gmail.com (all researchers)</p>"
consent_text_labels += "<p><strong>Purpose of the research:</strong><br> This study aims to measure people's ability to understand what others are thinking and feeling across different contexts and modalities. Please read through the description of the research project, and take the opportunity to ask any questions that you have about the project.</p>"
consent_text_labels += "<p><strong>What is involved in participating:</strong><br>You will be asked to look at a series of videos of facial expressions and answer questions about them. The online study in its entirety will take around [insert time], divided into 3 blocks with two 5-minute breaks in between. You will be asked to respond by answering multiple choice questions about the video. You will only need a mouse and a keyboard to provide responses to the various tasks.</p>"
consent_text_labels += "<p><strong>Right to withdraw:</strong><br>Please note that your participation is voluntary, and you are free to withdraw at any time without any negative consequences. Once you consent to participate, you may proceed to complete the online tasks. At the end of the experiment, you will see the message 'This is the end of the study. Please click on the button 'Complete the Experiment' to save your data and obtain your payment code.' Once you click the button, your data will be automatically collected through Pavlovia. Since participants will be anonymized (identified only by an alphanumeric code assigned by Prolific), the data will not be able to be withdrawn anonymously once you have completed the experiment. If you wish to withdraw consent without data collection, do not click the button to end the experiment and just close your browser.</p>"
consent_text_labels += "<p><strong>Confidentiality:</strong><br>The study's data will be kept for 7 years, stored in a password-protected virtual drive under the jurisdiction of McGill University (Dr. Ian Gold McGill's OneDrive). Your responses will be kept strictly confidential and will be identified only by means of your Prolific ID and never with your name or other identifying information. Only members of Dr. Ian Gold's lab will have access to identifiable study materials. You will not be identified or identifiable in any report or reports that result from the research (peer reviewed publications, presentations at national and international conferences, etc).</p>"
consent_text_labels += "<p><strong>Compensation:</strong><br>You will be compensated with &pound;9 for the completion of the study which should take approximately 60 minutes. Please use the completion code given to you at the end of the study to retrieve your payment in your Prolific account. Please note that if you decide to withdraw before finishing a session, there will be no way to compensate you for the time you spent, given that your data will not be saved.</p>"
consent_text_labels += "<p><strong>Risks &amp; Benefits:</strong> The only associated risks associated with this study are screen fatigue. If you have questions or concerns regarding your rights or welfare as a participant in this research study, please contact the Manager, Research Ethics at 514-398-6831 or lynda.mcneil@mcgill.ca.</p>"
consent_text_labels += "<p><strong>Consent:</strong><br>Please click on the button below if you have read the above information and consent to participate in this study. Otherwise, you can just close this window and return to the experiment in Prolific. Agreeing to participate in this study does not waive any of your rights or release the researchers from their responsibilities. To ensure the study is being conducted properly, authorized individuals, such as a member of the Research Ethics Board, may have access to your information.</p>"
consent_text_labels += '</div>'

var consent_labels = {
    type: 'html-button-response',
    stimulus: consent_text_labels,
    choices: ['I consent'],
    data: {trial:false},
    margin_vertical: '80px',
    on_finish: function () {
        jsPsych.setProgressBar(jsPsych.getProgressBarCompleted() + (1 / PROGRESS_BAR_N))
      }
}

consent_text_grid =  '<div style="text-align: left; margin: 50px 80px -60px 80px;">'
consent_text_grid += "<p><span style='text-decoration: underline;'><strong>CONSENT FORM </strong></span></p>"
consent_text_grid += "<p><strong>McGill University </strong></p>"
consent_text_grid += "<p><strong>Title of Research:</strong> A Dual Process Theory of Theory of Mind</p>"
consent_text_grid += "<p><strong>Researchers:</strong><br>Ian Gold, Ph.D., Professor, McGill University<br />Elizaveta Solomonova, Ph.D., Researcher, McGill University <br />Fernanda Perez-Gay Juarez, M.D., Ph.D., Psychiatry Resident, McGill University<br />Sophie Serebryany, Undergraduate Student, McGill University <br />Ani Shahbazian, Undergraduate Student, Concordia University<br>Sophie Hoyer, Undergraduate Student, McGill University</p>"
consent_text_grid += "<p><strong>Contact Information:<br />Tel:</strong> 514-398-8939 (Dr. Ian Gold) <br /><strong>Email:</strong> neurophilosophylabmcgill@gmail.com (all researchers)</p>"
consent_text_grid += "<p><strong>Purpose of the research:</strong><br> This study aims to measure people's ability to understand what others are thinking and feeling across different contexts and modalities. Please read through the description of the research project, and take the opportunity to ask any questions that you have about the project.</p>"
consent_text_grid += "<p><strong>What is involved in participating:</strong><br>You will be asked to look at a series of videos of facial expressions and answer questions about them. The online study in its entirety will take around [insert time], divided into 3 blocks with two 5-minute breaks in between. You will be asked to respond by placing your cursor on a grid after watching a video. You will only need a mouse and a keyboard to provide responses to the various tasks.</p>"
consent_text_grid += "<p><strong>Right to withdraw:</strong><br>Please note that your participation is voluntary, and you are free to withdraw at any time without any negative consequences. Once you consent to participate, you may proceed to complete the online tasks. At the end of the experiment, you will see the message 'This is the end of the study. Please click on the button 'Complete the Experiment' to save your data and obtain your payment code.' Once you click the button, your data will be automatically collected through Pavlovia. Since participants will be anonymized (identified only by an alphanumeric code assigned by Prolific), the data will not be able to be withdrawn anonymously once you have completed the experiment. If you wish to withdraw consent without data collection, do not click the button to end the experiment and just close your browser.</p>"
consent_text_grid += "<p><strong>Confidentiality:</strong><br>The study's data will be kept for 7 years, stored in a password-protected virtual drive under the jurisdiction of McGill University (Dr. Ian Gold McGill's OneDrive). Your responses will be kept strictly confidential and will be identified only by means of your Prolific ID and never with your name or other identifying information. Only members of Dr. Ian Gold's lab will have access to identifiable study materials. You will not be identified or identifiable in any report or reports that result from the research (peer reviewed publications, presentations at national and international conferences, etc).</p>"
consent_text_grid += "<p><strong>Compensation:</strong><br>You will be compensated with &pound;9 for the completion of the study which should take approximately 60 minutes. Please use the completion code given to you at the end of the study to retrieve your payment in your Prolific account. Please note that if you decide to withdraw before finishing a session, there will be no way to compensate you for the time you spent, given that your data will not be saved.</p>"
consent_text_grid += "<p><strong>Risks &amp; Benefits:</strong> The only associated risks associated with this study are screen fatigue. If you have questions or concerns regarding your rights or welfare as a participant in this research study, please contact the Manager, Research Ethics at 514-398-6831 or lynda.mcneil@mcgill.ca.</p>"
consent_text_grid += "<p><strong>Consent:</strong><br>Please click on the button below if you have read the above information and consent to participate in this study. Otherwise, you can just close this window and return to the experiment in Prolific. Agreeing to participate in this study does not waive any of your rights or release the researchers from their responsibilities. To ensure the study is being conducted properly, authorized individuals, such as a member of the Research Ethics Board, may have access to your information.</p>"
consent_text_grid += '</div>'

var consent_grid = {
    type: 'html-button-response',
    stimulus: consent_text_grid,
    choices: ['I consent'],
    data: {trial:false},
    margin_vertical: '80px',
    on_finish: function () {
        jsPsych.setProgressBar(jsPsych.getProgressBarCompleted() + (1 / PROGRESS_BAR_N))
      }
}

var WELCOMECONSENT_labels = [welcome, consent_labels];
var WELCOMECONSENT_grid = [welcome, consent_grid];