var welcome = {
    type: 'html-button-response',
    stimulus: '<h1>Welcome to the Multiethnic Face Database Study!</h1>',
    choices: ['<strong>Start</strong>'],
    data: {
        PID: pid,
        START_TIME: start_time,
        ATTENTION_FAILURES: attention_failures
    },
    on_finish: function () {
        jsPsych.setProgressBar(0)
      }
}

consent_text =  '<div style="text-align: left; margin: 50px 80px -60px 80px;">'
consent_text += "<p><span style='text-decoration: underline;'><strong>CONSENT FORM </strong></span></p>"
consent_text += "<p><strong>McGill University </strong></p>"
consent_text += "<p><strong>Title of Research:</strong> Judgments of Facial Expressions</p>"
consent_text += "<p><strong>Researchers:</strong><br>Ian Gold, Ph.D., Professor, McGill University<br />Elizaveta Solomonova, Ph.D., Researcher, McGill University <br />Joey Hurtubise, Undergraduate Student, McGill University<br />Sophie Dagenais, Undergraduate Student, Concordia University<br />Eric Lewis, Ph.D., Professor, McGill University</p>"
consent_text += "<p><strong>Contact Information:<br />Tel:</strong> 514-398-8939 (Dr. Ian Gold) <br /><strong>Email:</strong> neurophilosophylabmcgill@gmail.com (all researchers)</p>"
consent_text += "<p><strong>Purpose of the research:</strong><br> This study aims to measure people's ability to understand what others are thinking and feeling across different contexts and modalities. Please read through the description of the research project, and take the opportunity to ask any questions that you have about the project.</p>"
consent_text += "<p><strong>What is involved in participating:</strong><br>You will be asked to look at a series of videos of facial expressions and answer questions about them. The online study in its entirety will take around [insert time], divided into 3 blocks with two 5-minute breaks in between. After each video, you will be asked to respond by placing your cursor on a grid to rate the expression, and then typing 1 to 3 words describing what you think the person in the video is thinking about. You will only need a mouse and a keyboard to provide responses to the various tasks.</p>"
consent_text += "<p><strong>Right to withdraw:</strong><br>Please note that your participation is voluntary, and you are free to withdraw at any time without any negative consequences. Once you consent to participate, you may proceed to complete the online tasks. At the end of the experiment, you will see a message asking you to click a button to save your data and obtain your completion code (if applicable). Once you click the button, your data will be automatically collected through Pavlovia. Since participants will be anonymized (identified only by a participant ID assigned during recruitment), the data will not be able to be withdrawn anonymously once you have completed the experiment. If you wish to withdraw consent without data collection, do not click the button to end the experiment and just close your browser.</p>"
consent_text += "<p><strong>Confidentiality:</strong><br>The study's data will be kept for 7 years, stored in a password-protected virtual drive under the jurisdiction of McGill University (Dr. Ian Gold McGill's OneDrive). Your responses will be kept strictly confidential and will be identified only by means of your participant ID and never with your name or other identifying information. Only members of Dr. Ian Gold's lab will have access to identifiable study materials. You will not be identified or identifiable in any report or reports that result from the research (peer reviewed publications, presentations at national and international conferences, etc).</p>"
consent_text += "<p><strong>Compensation:</strong><br>You will be compensated with &pound;9 for the completion of the study which should take approximately 60 minutes. Please use the completion code (if provided) given to you at the end of the study to retrieve your payment through the platform used to recruit you for this study. Please note that if you decide to withdraw before finishing a session, there will be no way to compensate you for the time you spent, given that your data will not be saved.</p>"
consent_text += "<p><strong>Risks &amp; Benefits:</strong> The only associated risks associated with this study are screen fatigue. If you have questions or concerns regarding your rights or welfare as a participant in this research study, please contact the Manager, Research Ethics at 514-398-6831 or lynda.mcneil@mcgill.ca.</p>"
consent_text += "<p><strong>Consent:</strong><br>Please click on the button below if you have read the above information and consent to participate in this study. Otherwise, you can just close this window to decline participation. Agreeing to participate in this study does not waive any of your rights or release the researchers from their responsibilities. To ensure the study is being conducted properly, authorized individuals, such as a member of the Research Ethics Board, may have access to your information.</p>"
consent_text += '</div>'

var consent = {
    type: 'html-button-response',
    stimulus: consent_text,
    choices: ['I consent'],
    data: {trial:false},
    margin_vertical: '80px',
    on_finish: function () {
        jsPsych.setProgressBar(jsPsych.getProgressBarCompleted() + (1 / PROGRESS_BAR_N))
      }
}

var WELCOMECONSENT = [welcome, consent];
