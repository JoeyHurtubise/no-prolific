/**
* jspsych-survey-demo
* a jspsych plugin for the Niv lab demographics form
*/

jsPsych.plugins['survey-demo'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-demo',
    description: '',
    parameters: {
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'The text that appears on the button to finish the trial.'
      },
    }
  }
  plugin.trial = function(display_element, trial) {

    //---------------------------------------//
    // Define HTML.
    //---------------------------------------//

    // Initialize HTML
    var html = '';

    // Inject CSS
    html += `<style>
    .survey-demo-wrap {
      height: 100vh;
      width: 100vw;
    }
    .survey-demo-instructions {
      margin: auto;
      width: 800px;
      padding: 0 0 0 0;
      text-align: center;
      font-size: 15px;
      line-height: 1.15em;
    }
    .survey-demo-container {
      display: grid;
      grid-template-columns: 40% 60%;
      grid-template-rows: auto;
      width: 800px;
      margin: auto;
      background-color: #F8F8F8;
      border-radius: 12px;
    }
    .survey-demo-row {
      display: contents;
      justify-items: center;
      text-align: left;
      font-size: 16px;
      line-height: 1.5em;
    }
    .survey-demo-prompt {
      padding: 12px 0 12px 15px;
      border-top: 2px solid #ffffff;
    }
    .survey-demo-prompt label {
      padding: 0 8px 0 0;
      display: inline-block;
    }
    .survey-demo-response {
      padding: 12px 0 12px 0;
      border-top: 2px solid #ffffff;
    }
    .survey-demo-response label {
      padding: 0 1em 0 0;
      display: inline-block;
    }
    .survey-demo-response input[type='radio'], input[type='checkbox'] {
      height: 13px;
      width: 13px;
      margin: 0 6px 0 0;
    }
    .survey-demo-response input[type='number'], input[type='text'] {
      height: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .survey-demo-response input[type='number'] {
      width: 50px;
    }
    .survey-demo-response input[type='text'] {
      width: 15%;
    }
    .survey-demo-footer {
      margin: auto;
      width: 800px;
      padding: 0 0 0 0;
      text-align: right;
    }
    .survey-demo-footer input[type=submit] {
      background-color: #F0F0F0;
      padding: 8px 20px;
      border: none;
      border-radius: 4px;
      margin-top: 5px;
      margin-bottom: 20px;
      margin-right: 0px;
      font-size: 14px;
      color: black;
    }
    </style>`;

    // Initialize survey.
    html += '<div class="survey-demo-wrap"><form id="jspsych-survey-demo">';

    // Add demoing header.
    html += '<div class=survey-demo-instructions>';
    html += '<h2 style="padding-top: 40px;"> Demographics Survey </h2>';
    html += '<p>Before we get started, please provide the following information:</p>'
    html += '</div>';

    // Begin demoing container.
    html += '<div class="survey-demo-container">';

    // Item 1: Age
    html += '<div class="survey-demo-row">';
    html += '<div class="survey-demo-prompt"><label for="age">Please enter your age:</label></div>';
    html += '<div class="survey-demo-response">';
    html += '<input type="number" name="age" min="18" max="100" size="20" required>';
    html += '</div></div>';

    // Item 2: Gender
    html += '<div class="survey-demo-row">';
    html += '<div class="survey-demo-prompt"><label for="gender">Please select the gender you identify with:</label></div>';
    html += '<div class="survey-demo-response">';
    html += '<label><input type="radio" name="gender" value="Woman" required>Woman</label><br>';
    html += '<label><input type="radio" name="gender" value="Man" required>Man</label><br>';
    html += '<label><input type="radio" name="gender" value="Non-binary" required>Non-binary</label><br>';
    html += '<label><input type="radio" name="gender" value="Other" required>Other</label><br>';
    html += '<label><input type="radio" name="gender" value="Prefer not to answer" required>Prefer not to answer</label>';
    html += '</div></div>';

    // Item 3: Ethnicity
    html += '<div class="survey-demo-row">';
    html += '<div class="survey-demo-prompt"><label for="ethnicity">Please select the ethnicity or cultural background that you identify with:<br><small>(Select all that apply)</small></label></div>';
    html += '<div class="survey-demo-response">';
    html += '<label style="display: block; text-indent: -20px; padding-left: 25px;"><input type="checkbox" name="ethnicity" value="White"><u>White</u>. For example, European descent</label><br>';
    html += '<label style="display: block; text-indent: -20px; padding-left: 25px;"><input type="checkbox" name="ethnicity" value="Black"><u>Black.</u> For example, African, Afro-Caribbean, African Canadian descent</label><br>';
    html += '<label style="display: block; text-indent: -20px; padding-left: 25px;"><input type="checkbox" name="ethnicity" value="East Asian"><u>East Asian.</u> For example, Chinese, Korean, Japanese</label><br>';
    html += '<label style="display: block; text-indent: -20px; padding-left: 25px;"><input type="checkbox" name="ethnicity" value="Indigenous"><u>Indigenous.</u> For example, First Nations, Inuk/Inuit, and Metis descent</label><br>';
    html += '<label style="display: block; text-indent: -20px; padding-left: 25px;"><input type="checkbox" name="ethnicity" value="Latino"><u>Latino.</u> For example, Latin American, Hispanic descent</label><br>';
    html += '<label style="display: block; text-indent: -20px; padding-left: 25px;"><input type="checkbox" name="ethnicity" value="Middle Eastern."><u>Middle Eastern.</u> For example, Arab, Persian, West Asian descent (e.g. Afghan, Egyptian, Iranian, Lebanese, Turkish, Kurdish)</label><br>';
    html += '<label style="display: block; text-indent: -20px; padding-left: 25px;"><input type="checkbox" name="ethnicity" value="South Asian."><u>South Asian</u>. For example, South Asian descent (e.g., East Indian, Pakistani, Bangladeshi, Sri Lankan, Indo - Caribbean)Southeast Asian. For example, Filipino, Asian Indian, Vietnamese</label><br>';
    html += '<label style="display: block; text-indent: -20px; padding-left: 25px;"><input type="checkbox" name="ethnicity" value="Other">Other</label>';
    html += '</div></div>';

    // Item 4: Education
    html += '<div class="survey-demo-row">';
    html += '<div class="survey-demo-prompt"><label for="education">Please select your level of education:</label></div>';
    html += '<div class="survey-demo-response">';
    html += '<label><input type="radio" name="education" value="Graduate school (PhD/MD/JD)" required>Graduate school (PhD/MD/JD)</label><br>';
    html += '<label><input type="radio" name="education" value="Graduate school (Masters)" required>Graduate school (Masters)</label><br>';
    html += '<label><input type="radio" name="education" value="University/College (BA/BS/...)" required>University/College (BA/BS/...)</label><br>';
    html += `<label><input type="radio" name="education" value="Trade/vocational school" required>Trade/vocational school</label><br>`;
    html += `<label><input type="radio" name="education" value="CEGEP/Associate's Degree" required>CEGEP/Associate's Degree</label><br>`;
    html += `<label><input type="radio" name="education" value="Secondary/High School" required>Secondary/High School</label><br>`;
    html += '<label><input type="radio" name="education" value="Middle School" required>Middle School</label><br>';
    html += '<label><input type="radio" name="education" value="Primary School" required>Primary School</label><br>';
    html += '<label><input type="radio" name="education" value="Other" required>Other</label><br>';
    html += '</div></div>';

    // Item 5: Religion
    html += '<div class="survey-demo-row">';
    html += '<div class="survey-demo-prompt"><label for="religion">Please select your religion:</label></div>';
    html += '<div class="survey-demo-response">';
    html += '<select name="religion" id="myid" required>'
    html += '<option value="" disabled selected>Select religion</option>'; // Default option
    html += '<option value="Christian">Christian (Catholic, Protestant, or any other Christian denominations)</option>'
    html += '<option value="Buddhist">Buddhist</option>'
    html += '<option value="Hindu">Hindu</option>'
    html += '<option value="Muslim">Muslim</option>'
    html += '<option value="Jewish">Jewish</option>'
    html += '<option value="Sikh">Sikh</option>'
    html += '<option value="Other">Other</option>'
    html += '<option value="No Religion">No Religion</option>'
    html += '</select>'
    html += '</div></div>'

    // Item 6: Birth Country
    html += '<div class="survey-demo-row">';
    html += '<div class="survey-demo-prompt"><label for="birthcountry">Please select the country where you were born:</label></div>';
    html += '<div class="survey-demo-response">';
    html += '<select name="birthcountry" id="myid" required>'
    html += '<option value="" disabled selected>Select country of birth</option>'; // Default option
    html += '<option value="Afghanistan">Afghanistan</option>'
    html += '<option value="Aland Islands">&Aring;land Islands</option>'
    html += '<option value="Albania">Albania</option>'
    html += '<option value="Algeria">Algeria</option>'
    html += '<option value="American Samoa">American Samoa</option>'
    html += '<option value="Andorra">Andorra</option>'
    html += '<option value="Angola">Angola</option>'
    html += '<option value="Anguilla">Anguilla</option>'
    html += '<option value="Antarctica">Antarctica</option>'
    html += '<option value="Antigua and Barbuda">Antigua and Barbuda</option>'
    html += '<option value="Argentina">Argentina</option>'
    html += '<option value="Armenia">Armenia</option>'
    html += '<option value="Aruba">Aruba</option>'
    html += '<option value="Australia">Australia</option>'
    html += '<option value="Austria">Austria</option>'
    html += '<option value="Azerbaijan">Azerbaijan</option>'
    html += '<option value="Bahamas">Bahamas</option>'
    html += '<option value="Bahrain">Bahrain</option>'
    html += '<option value="Bangladesh">Bangladesh</option>'
    html += '<option value="Barbados">Barbados</option>'
    html += '<option value="Belarus">Belarus</option>'
    html += '<option value="Belgium">Belgium</option>'
    html += '<option value="Belize">Belize</option>'
    html += '<option value="Benin">Benin</option>'
    html += '<option value="Bermuda">Bermuda</option>'
    html += '<option value="Bhutan">Bhutan</option>'
    html += '<option value="Bolivia (Plurinational State of)">Bolivia (Plurinational State of)</option>'
    html += '<option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>'
    html += '<option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>'
    html += '<option value="Botswana">Botswana</option>'
    html += '<option value="Bouvet Island">Bouvet Island</option>'
    html += '<option value="Brazil">Brazil</option>'
    html += '<option value="British Indian Ocean Territory">British Indian Ocean Territory</option>'
    html += '<option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>'
    html += '<option value="Virgin Islands (British)">Virgin Islands (British)</option>'
    html += '<option value="Virgin Islands (U.S.)">Virgin Islands (U.S.)</option>'
    html += '<option value="Brunei Darussalam">Brunei Darussalam</option>'
    html += '<option value="Bulgaria">Bulgaria</option>'
    html += '<option value="Burkina Faso">Burkina Faso</option>'
    html += '<option value="Burundi">Burundi</option>'
    html += '<option value="Cambodia">Cambodia</option>'
    html += '<option value="Cameroon">Cameroon</option>'
    html += '<option value="Canada">Canada</option>'
    html += '<option value="Cabo Verde">Cabo Verde</option>'
    html += '<option value="Cayman Islands">Cayman Islands</option>'
    html += '<option value="Central African Republic">Central African Republic</option>'
    html += '<option value="Chad">Chad</option>'
    html += '<option value="Chile">Chile</option>'
    html += '<option value="China">China</option>'
    html += '<option value="Christmas Island">Christmas Island</option>'
    html += '<option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>'
    html += '<option value="Colombia">Colombia</option>'
    html += '<option value="Comoros">Comoros</option>'
    html += '<option value="Congo">Congo</option>'
    html += '<option value="Congo (Democratic Republic of the)">Congo (Democratic Republic of the)</option>'
    html += '<option value="Cook Islands">Cook Islands</option>'
    html += '<option value="Costa Rica">Costa Rica</option>'
    html += '<option value="Cote dIvoire">Cote d&apos;Ivoire</option>'
    html += '<option value="Croatia">Croatia</option>'
    html += '<option value="Cuba">Cuba</option>'
    html += '<option value="Curacao">Curacao</option>'
    html += '<option value="Cyprus">Cyprus</option>'
    html += '<option value="Czech Republic">Czech Republic</option>'
    html += '<option value="Denmark">Denmark</option>'
    html += '<option value="Djibouti">Djibouti</option>'
    html += '<option value="Dominica">Dominica</option>'
    html += '<option value="Dominican Republic">Dominican Republic</option>'
    html += '<option value="Ecuador">Ecuador</option>'
    html += '<option value="Egypt">Egypt</option>'
    html += '<option value="El Salvador">El Salvador</option>'
    html += '<option value="Equatorial Guinea">Equatorial Guinea</option>'
    html += '<option value="Eritrea">Eritrea</option>'
    html += '<option value="Estonia">Estonia</option>'
    html += '<option value="Ethiopia">Ethiopia</option>'
    html += '<option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>'
    html += '<option value="Faroe Islands">Faroe Islands</option>'
    html += '<option value="Fiji">Fiji</option>'
    html += '<option value="Finland">Finland</option>'
    html += '<option value="France">France</option>'
    html += '<option value="French Guiana">French Guiana</option>'
    html += '<option value="French Polynesia">French Polynesia</option>'
    html += '<option value="French Southern Territories">French Southern Territories</option>'
    html += '<option value="Gabon">Gabon</option>'
    html += '<option value="Gambia">Gambia</option>'
    html += '<option value="Georgia">Georgia</option>'
    html += '<option value="Germany">Germany</option>'
    html += '<option value="Ghana">Ghana</option>'
    html += '<option value="Gibraltar">Gibraltar</option>'
    html += '<option value="Greece">Greece</option>'
    html += '<option value="Greenland">Greenland</option>'
    html += '<option value="Grenada">Grenada</option>'
    html += '<option value="Guadeloupe">Guadeloupe</option>'
    html += '<option value="Guam">Guam</option>'
    html += '<option value="Guatemala">Guatemala</option>'
    html += '<option value="Guernsey">Guernsey</option>'
    html += '<option value="Guinea">Guinea</option>'
    html += '<option value="Guinea-Bissau">Guinea-Bissau</option>'
    html += '<option value="Guyana">Guyana</option>'
    html += '<option value="Haiti">Haiti</option>'
    html += '<option value="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>'
    html += '<option value="Holy See">Holy See</option>'
    html += '<option value="Honduras">Honduras</option>'
    html += '<option value="Hong Kong">Hong Kong</option>'
    html += '<option value="Hungary">Hungary</option>'
    html += '<option value="Iceland">Iceland</option>'
    html += '<option value="India">India</option>'
    html += '<option value="Indonesia">Indonesia</option>'
    html += '<option value="Iran (Islamic Republic of)">Iran (Islamic Republic of)</option>'
    html += '<option value="Iraq">Iraq</option>'
    html += '<option value="Ireland">Ireland</option>'
    html += '<option value="Isle of Man">Isle of Man</option>'
    html += '<option value="Israel">Israel</option>'
    html += '<option value="Italy">Italy</option>'
    html += '<option value="Jamaica">Jamaica</option>'
    html += '<option value="Japan">Japan</option>'
    html += '<option value="Jersey">Jersey</option>'
    html += '<option value="Jordan">Jordan</option>'
    html += '<option value="Kazakhstan">Kazakhstan</option>'
    html += '<option value="Kenya">Kenya</option>'
    html += '<option value="Kiribati">Kiribati</option>'
    html += '<option value="Kuwait">Kuwait</option>'
    html += '<option value="Kyrgyzstan">Kyrgyzstan</option>'
    html += '<option value="Lao Peoples Democratic Republic">Lao People&apos;s Democratic Republic</option>'
    html += '<option value="Latvia">Latvia</option>'
    html += '<option value="Lebanon">Lebanon</option>'
    html += '<option value="Lesotho">Lesotho</option>'
    html += '<option value="Liberia">Liberia</option>'
    html += '<option value="Libya">Libya</option>'
    html += '<option value="Liechtenstein">Liechtenstein</option>'
    html += '<option value="Lithuania">Lithuania</option>'
    html += '<option value="Luxembourg">Luxembourg</option>'
    html += '<option value="Macao">Macao</option>'
    html += '<option value="Macedonia (the former Yugoslav Republic of)">Macedonia (the former Yugoslav Republic of)</option>'
    html += '<option value="Madagascar">Madagascar</option>'
    html += '<option value="Malawi">Malawi</option>'
    html += '<option value="Malaysia">Malaysia</option>'
    html += '<option value="Maldives">Maldives</option>'
    html += '<option value="Mali">Mali</option>'
    html += '<option value="Malta">Malta</option>'
    html += '<option value="Marshall Islands">Marshall Islands</option>'
    html += '<option value="Martinique">Martinique</option>'
    html += '<option value="Mauritania">Mauritania</option>'
    html += '<option value="Mauritius">Mauritius</option>'
    html += '<option value="Mayotte">Mayotte</option>'
    html += '<option value="Mexico">Mexico</option>'
    html += '<option value="Micronesia (Federated States of)">Micronesia (Federated States of)</option>'
    html += '<option value="Moldova (Republic of)">Moldova (Republic of)</option>'
    html += '<option value="Monaco">Monaco</option>'
    html += '<option value="Mongolia">Mongolia</option>'
    html += '<option value="Montenegro">Montenegro</option>'
    html += '<option value="Montserrat">Montserrat</option>'
    html += '<option value="Morocco">Morocco</option>'
    html += '<option value="Mozambique">Mozambique</option>'
    html += '<option value="Myanmar">Myanmar</option>'
    html += '<option value="Namibia">Namibia</option>'
    html += '<option value="Nauru">Nauru</option>'
    html += '<option value="Nepal">Nepal</option>'
    html += '<option value="Netherlands">Netherlands</option>'
    html += '<option value="New Caledonia">New Caledonia</option>'
    html += '<option value="New Zealand">New Zealand</option>'
    html += '<option value="Nicaragua">Nicaragua</option>'
    html += '<option value="Niger">Niger</option>'
    html += '<option value="Nigeria">Nigeria</option>'
    html += '<option value="Niue">Niue</option>'
    html += '<option value="Norfolk Island">Norfolk Island</option>'
    html += '<option value="Korea (Democratic Peoples Republic of)">Korea (Democratic People&apos;s Republic of)</option>'
    html += '<option value="Northern Mariana Islands">Northern Mariana Islands</option>'
    html += '<option value="Norway">Norway</option>'
    html += '<option value="Oman">Oman</option>'
    html += '<option value="Pakistan">Pakistan</option>'
    html += '<option value="Palau">Palau</option>'
    html += '<option value="Palestine, State of">Palestine, State of</option>'
    html += '<option value="Panama">Panama</option>'
    html += '<option value="Papua New Guinea">Papua New Guinea</option>'
    html += '<option value="Paraguay">Paraguay</option>'
    html += '<option value="Peru">Peru</option>'
    html += '<option value="Philippines">Philippines</option>'
    html += '<option value="Pitcairn">Pitcairn</option>'
    html += '<option value="Poland">Poland</option>'
    html += '<option value="Portugal">Portugal</option>'
    html += '<option value="Puerto Rico">Puerto Rico</option>'
    html += '<option value="Qatar">Qatar</option>'
    html += '<option value="Republic of Kosovo">Republic of Kosovo</option>'
    html += '<option value="Romania">Romania</option>'
    html += '<option value="Russian Federation">Russian Federation</option>'
    html += '<option value="Rwanda">Rwanda</option>'
    html += '<option value="Saint Barthelemy">Saint Barth&eacute;lemy</option>'
    html += '<option value="Saint Helena, Ascension and Tristan da Cunha">Saint Helena, Ascension and Tristan da Cunha</option>'
    html += '<option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>'
    html += '<option value="Saint Lucia">Saint Lucia</option>'
    html += '<option value="Saint Martin (French part)">Saint Martin (French part)</option>'
    html += '<option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>'
    html += '<option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>'
    html += '<option value="Samoa">Samoa</option>'
    html += '<option value="San Marino">San Marino</option>'
    html += '<option value="Sao Tome and Principe">Sao Tome and Principe</option>'
    html += '<option value="Saudi Arabia">Saudi Arabia</option>'
    html += '<option value="Senegal">Senegal</option>'
    html += '<option value="Serbia">Serbia</option>'
    html += '<option value="Seychelles">Seychelles</option>'
    html += '<option value="Sierra Leone">Sierra Leone</option>'
    html += '<option value="Singapore">Singapore</option>'
    html += '<option value="Sint Maarten (Dutch part)">Sint Maarten (Dutch part)</option>'
    html += '<option value="Slovakia">Slovakia</option>'
    html += '<option value="Slovenia">Slovenia</option>'
    html += '<option value="Solomon Islands">Solomon Islands</option>'
    html += '<option value="Somalia">Somalia</option>'
    html += '<option value="South Africa">South Africa</option>'
    html += '<option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>'
    html += '<option value="Korea (Republic of)">Korea (Republic of)</option>'
    html += '<option value="South Sudan">South Sudan</option>'
    html += '<option value="Spain">Spain</option>'
    html += '<option value="Sri Lanka">Sri Lanka</option>'
    html += '<option value="Sudan">Sudan</option>'
    html += '<option value="Suriname">Suriname</option>'
    html += '<option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>'
    html += '<option value="Swaziland">Swaziland</option>'
    html += '<option value="Sweden">Sweden</option>'
    html += '<option value="Switzerland">Switzerland</option>'
    html += '<option value="Syrian Arab Republic">Syrian Arab Republic</option>'
    html += '<option value="Taiwan">Taiwan</option>'
    html += '<option value="Tajikistan">Tajikistan</option>'
    html += '<option value="Tanzania, United Republic of">Tanzania, United Republic of</option>'
    html += '<option value="Thailand">Thailand</option>'
    html += '<option value="Timor-Leste">Timor-Leste</option>'
    html += '<option value="Togo">Togo</option>'
    html += '<option value="Tokelau">Tokelau</option>'
    html += '<option value="Tonga">Tonga</option>'
    html += '<option value="Trinidad and Tobago">Trinidad and Tobago</option>'
    html += '<option value="Tunisia">Tunisia</option>'
    html += '<option value="Turkey">Turkey</option>'
    html += '<option value="Turkmenistan">Turkmenistan</option>'
    html += '<option value="Turks and Caicos Islands">Turks and Caicos Islands</option>'
    html += '<option value="Tuvalu">Tuvalu</option>'
    html += '<option value="Uganda">Uganda</option>'
    html += '<option value="Ukraine">Ukraine</option>'
    html += '<option value="United Arab Emirates">United Arab Emirates</option>'
    html += '<option value="United Kingdom of Great Britain and Northern Ireland">United Kingdom of Great Britain and Northern Ireland</option>'
    html += '<option value="United States of America">United States of America</option>'
    html += '<option value="Uruguay">Uruguay</option>'
    html += '<option value="Uzbekistan">Uzbekistan</option>'
    html += '<option value="Vanuatu">Vanuatu</option>'
    html += '<option value="Venezuela (Bolivarian Republic of)">Venezuela (Bolivarian Republic of)</option>'
    html += '<option value="Viet Nam">Viet Nam</option>'
    html += '<option value="Wallis and Futuna">Wallis and Futuna</option>'
    html += '<option value="Western Sahara">Western Sahara</option>'
    html += '<option value="Yemen">Yemen</option>'
    html += '<option value="Zambia">Zambia</option>'
    html += '<option value="Zimbabwe">Zimbabwe</option>'
    html += '</select>'
    html += '</div></div>'

    // Item 7: Residence Country
    html += '<div class="survey-demo-row">';
    html += '<div class="survey-demo-prompt"><label for="residencecountry">Please select your current country of residence:</label></div>';
    html += '<div class="survey-demo-response">';
    html += '<select name="residencecountry" id="myid" required>'
    html += '<option value="" disabled selected>Select current country of residence</option>'; // Default option
    html += '<option value="Afghanistan">Afghanistan</option>'
    html += '<option value="Aland Islands">&Aring;land Islands</option>'
    html += '<option value="Albania">Albania</option>'
    html += '<option value="Algeria">Algeria</option>'
    html += '<option value="American Samoa">American Samoa</option>'
    html += '<option value="Andorra">Andorra</option>'
    html += '<option value="Angola">Angola</option>'
    html += '<option value="Anguilla">Anguilla</option>'
    html += '<option value="Antarctica">Antarctica</option>'
    html += '<option value="Antigua and Barbuda">Antigua and Barbuda</option>'
    html += '<option value="Argentina">Argentina</option>'
    html += '<option value="Armenia">Armenia</option>'
    html += '<option value="Aruba">Aruba</option>'
    html += '<option value="Australia">Australia</option>'
    html += '<option value="Austria">Austria</option>'
    html += '<option value="Azerbaijan">Azerbaijan</option>'
    html += '<option value="Bahamas">Bahamas</option>'
    html += '<option value="Bahrain">Bahrain</option>'
    html += '<option value="Bangladesh">Bangladesh</option>'
    html += '<option value="Barbados">Barbados</option>'
    html += '<option value="Belarus">Belarus</option>'
    html += '<option value="Belgium">Belgium</option>'
    html += '<option value="Belize">Belize</option>'
    html += '<option value="Benin">Benin</option>'
    html += '<option value="Bermuda">Bermuda</option>'
    html += '<option value="Bhutan">Bhutan</option>'
    html += '<option value="Bolivia (Plurinational State of)">Bolivia (Plurinational State of)</option>'
    html += '<option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>'
    html += '<option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>'
    html += '<option value="Botswana">Botswana</option>'
    html += '<option value="Bouvet Island">Bouvet Island</option>'
    html += '<option value="Brazil">Brazil</option>'
    html += '<option value="British Indian Ocean Territory">British Indian Ocean Territory</option>'
    html += '<option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>'
    html += '<option value="Virgin Islands (British)">Virgin Islands (British)</option>'
    html += '<option value="Virgin Islands (U.S.)">Virgin Islands (U.S.)</option>'
    html += '<option value="Brunei Darussalam">Brunei Darussalam</option>'
    html += '<option value="Bulgaria">Bulgaria</option>'
    html += '<option value="Burkina Faso">Burkina Faso</option>'
    html += '<option value="Burundi">Burundi</option>'
    html += '<option value="Cambodia">Cambodia</option>'
    html += '<option value="Cameroon">Cameroon</option>'
    html += '<option value="Canada">Canada</option>'
    html += '<option value="Cabo Verde">Cabo Verde</option>'
    html += '<option value="Cayman Islands">Cayman Islands</option>'
    html += '<option value="Central African Republic">Central African Republic</option>'
    html += '<option value="Chad">Chad</option>'
    html += '<option value="Chile">Chile</option>'
    html += '<option value="China">China</option>'
    html += '<option value="Christmas Island">Christmas Island</option>'
    html += '<option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>'
    html += '<option value="Colombia">Colombia</option>'
    html += '<option value="Comoros">Comoros</option>'
    html += '<option value="Congo">Congo</option>'
    html += '<option value="Congo (Democratic Republic of the)">Congo (Democratic Republic of the)</option>'
    html += '<option value="Cook Islands">Cook Islands</option>'
    html += '<option value="Costa Rica">Costa Rica</option>'
    html += '<option value="Cote dIvoire">Cote d&apos;Ivoire</option>'
    html += '<option value="Croatia">Croatia</option>'
    html += '<option value="Cuba">Cuba</option>'
    html += '<option value="Curacao">Curacao</option>'
    html += '<option value="Cyprus">Cyprus</option>'
    html += '<option value="Czech Republic">Czech Republic</option>'
    html += '<option value="Denmark">Denmark</option>'
    html += '<option value="Djibouti">Djibouti</option>'
    html += '<option value="Dominica">Dominica</option>'
    html += '<option value="Dominican Republic">Dominican Republic</option>'
    html += '<option value="Ecuador">Ecuador</option>'
    html += '<option value="Egypt">Egypt</option>'
    html += '<option value="El Salvador">El Salvador</option>'
    html += '<option value="Equatorial Guinea">Equatorial Guinea</option>'
    html += '<option value="Eritrea">Eritrea</option>'
    html += '<option value="Estonia">Estonia</option>'
    html += '<option value="Ethiopia">Ethiopia</option>'
    html += '<option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>'
    html += '<option value="Faroe Islands">Faroe Islands</option>'
    html += '<option value="Fiji">Fiji</option>'
    html += '<option value="Finland">Finland</option>'
    html += '<option value="France">France</option>'
    html += '<option value="French Guiana">French Guiana</option>'
    html += '<option value="French Polynesia">French Polynesia</option>'
    html += '<option value="French Southern Territories">French Southern Territories</option>'
    html += '<option value="Gabon">Gabon</option>'
    html += '<option value="Gambia">Gambia</option>'
    html += '<option value="Georgia">Georgia</option>'
    html += '<option value="Germany">Germany</option>'
    html += '<option value="Ghana">Ghana</option>'
    html += '<option value="Gibraltar">Gibraltar</option>'
    html += '<option value="Greece">Greece</option>'
    html += '<option value="Greenland">Greenland</option>'
    html += '<option value="Grenada">Grenada</option>'
    html += '<option value="Guadeloupe">Guadeloupe</option>'
    html += '<option value="Guam">Guam</option>'
    html += '<option value="Guatemala">Guatemala</option>'
    html += '<option value="Guernsey">Guernsey</option>'
    html += '<option value="Guinea">Guinea</option>'
    html += '<option value="Guinea-Bissau">Guinea-Bissau</option>'
    html += '<option value="Guyana">Guyana</option>'
    html += '<option value="Haiti">Haiti</option>'
    html += '<option value="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>'
    html += '<option value="Holy See">Holy See</option>'
    html += '<option value="Honduras">Honduras</option>'
    html += '<option value="Hong Kong">Hong Kong</option>'
    html += '<option value="Hungary">Hungary</option>'
    html += '<option value="Iceland">Iceland</option>'
    html += '<option value="India">India</option>'
    html += '<option value="Indonesia">Indonesia</option>'
    html += '<option value="Iran (Islamic Republic of)">Iran (Islamic Republic of)</option>'
    html += '<option value="Iraq">Iraq</option>'
    html += '<option value="Ireland">Ireland</option>'
    html += '<option value="Isle of Man">Isle of Man</option>'
    html += '<option value="Israel">Israel</option>'
    html += '<option value="Italy">Italy</option>'
    html += '<option value="Jamaica">Jamaica</option>'
    html += '<option value="Japan">Japan</option>'
    html += '<option value="Jersey">Jersey</option>'
    html += '<option value="Jordan">Jordan</option>'
    html += '<option value="Kazakhstan">Kazakhstan</option>'
    html += '<option value="Kenya">Kenya</option>'
    html += '<option value="Kiribati">Kiribati</option>'
    html += '<option value="Kuwait">Kuwait</option>'
    html += '<option value="Kyrgyzstan">Kyrgyzstan</option>'
    html += '<option value="Lao Peoples Democratic Republic">Lao People&apos;s Democratic Republic</option>'
    html += '<option value="Latvia">Latvia</option>'
    html += '<option value="Lebanon">Lebanon</option>'
    html += '<option value="Lesotho">Lesotho</option>'
    html += '<option value="Liberia">Liberia</option>'
    html += '<option value="Libya">Libya</option>'
    html += '<option value="Liechtenstein">Liechtenstein</option>'
    html += '<option value="Lithuania">Lithuania</option>'
    html += '<option value="Luxembourg">Luxembourg</option>'
    html += '<option value="Macao">Macao</option>'
    html += '<option value="Macedonia (the former Yugoslav Republic of)">Macedonia (the former Yugoslav Republic of)</option>'
    html += '<option value="Madagascar">Madagascar</option>'
    html += '<option value="Malawi">Malawi</option>'
    html += '<option value="Malaysia">Malaysia</option>'
    html += '<option value="Maldives">Maldives</option>'
    html += '<option value="Mali">Mali</option>'
    html += '<option value="Malta">Malta</option>'
    html += '<option value="Marshall Islands">Marshall Islands</option>'
    html += '<option value="Martinique">Martinique</option>'
    html += '<option value="Mauritania">Mauritania</option>'
    html += '<option value="Mauritius">Mauritius</option>'
    html += '<option value="Mayotte">Mayotte</option>'
    html += '<option value="Mexico">Mexico</option>'
    html += '<option value="Micronesia (Federated States of)">Micronesia (Federated States of)</option>'
    html += '<option value="Moldova (Republic of)">Moldova (Republic of)</option>'
    html += '<option value="Monaco">Monaco</option>'
    html += '<option value="Mongolia">Mongolia</option>'
    html += '<option value="Montenegro">Montenegro</option>'
    html += '<option value="Montserrat">Montserrat</option>'
    html += '<option value="Morocco">Morocco</option>'
    html += '<option value="Mozambique">Mozambique</option>'
    html += '<option value="Myanmar">Myanmar</option>'
    html += '<option value="Namibia">Namibia</option>'
    html += '<option value="Nauru">Nauru</option>'
    html += '<option value="Nepal">Nepal</option>'
    html += '<option value="Netherlands">Netherlands</option>'
    html += '<option value="New Caledonia">New Caledonia</option>'
    html += '<option value="New Zealand">New Zealand</option>'
    html += '<option value="Nicaragua">Nicaragua</option>'
    html += '<option value="Niger">Niger</option>'
    html += '<option value="Nigeria">Nigeria</option>'
    html += '<option value="Niue">Niue</option>'
    html += '<option value="Norfolk Island">Norfolk Island</option>'
    html += '<option value="Korea (Democratic Peoples Republic of)">Korea (Democratic People&apos;s Republic of)</option>'
    html += '<option value="Northern Mariana Islands">Northern Mariana Islands</option>'
    html += '<option value="Norway">Norway</option>'
    html += '<option value="Oman">Oman</option>'
    html += '<option value="Pakistan">Pakistan</option>'
    html += '<option value="Palau">Palau</option>'
    html += '<option value="Palestine, State of">Palestine, State of</option>'
    html += '<option value="Panama">Panama</option>'
    html += '<option value="Papua New Guinea">Papua New Guinea</option>'
    html += '<option value="Paraguay">Paraguay</option>'
    html += '<option value="Peru">Peru</option>'
    html += '<option value="Philippines">Philippines</option>'
    html += '<option value="Pitcairn">Pitcairn</option>'
    html += '<option value="Poland">Poland</option>'
    html += '<option value="Portugal">Portugal</option>'
    html += '<option value="Puerto Rico">Puerto Rico</option>'
    html += '<option value="Qatar">Qatar</option>'
    html += '<option value="Republic of Kosovo">Republic of Kosovo</option>'
    html += '<option value="Romania">Romania</option>'
    html += '<option value="Russian Federation">Russian Federation</option>'
    html += '<option value="Rwanda">Rwanda</option>'
    html += '<option value="Saint Barthelemy">Saint Barth&eacute;lemy</option>'
    html += '<option value="Saint Helena, Ascension and Tristan da Cunha">Saint Helena, Ascension and Tristan da Cunha</option>'
    html += '<option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>'
    html += '<option value="Saint Lucia">Saint Lucia</option>'
    html += '<option value="Saint Martin (French part)">Saint Martin (French part)</option>'
    html += '<option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>'
    html += '<option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>'
    html += '<option value="Samoa">Samoa</option>'
    html += '<option value="San Marino">San Marino</option>'
    html += '<option value="Sao Tome and Principe">Sao Tome and Principe</option>'
    html += '<option value="Saudi Arabia">Saudi Arabia</option>'
    html += '<option value="Senegal">Senegal</option>'
    html += '<option value="Serbia">Serbia</option>'
    html += '<option value="Seychelles">Seychelles</option>'
    html += '<option value="Sierra Leone">Sierra Leone</option>'
    html += '<option value="Singapore">Singapore</option>'
    html += '<option value="Sint Maarten (Dutch part)">Sint Maarten (Dutch part)</option>'
    html += '<option value="Slovakia">Slovakia</option>'
    html += '<option value="Slovenia">Slovenia</option>'
    html += '<option value="Solomon Islands">Solomon Islands</option>'
    html += '<option value="Somalia">Somalia</option>'
    html += '<option value="South Africa">South Africa</option>'
    html += '<option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>'
    html += '<option value="Korea (Republic of)">Korea (Republic of)</option>'
    html += '<option value="South Sudan">South Sudan</option>'
    html += '<option value="Spain">Spain</option>'
    html += '<option value="Sri Lanka">Sri Lanka</option>'
    html += '<option value="Sudan">Sudan</option>'
    html += '<option value="Suriname">Suriname</option>'
    html += '<option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>'
    html += '<option value="Swaziland">Swaziland</option>'
    html += '<option value="Sweden">Sweden</option>'
    html += '<option value="Switzerland">Switzerland</option>'
    html += '<option value="Syrian Arab Republic">Syrian Arab Republic</option>'
    html += '<option value="Taiwan">Taiwan</option>'
    html += '<option value="Tajikistan">Tajikistan</option>'
    html += '<option value="Tanzania, United Republic of">Tanzania, United Republic of</option>'
    html += '<option value="Thailand">Thailand</option>'
    html += '<option value="Timor-Leste">Timor-Leste</option>'
    html += '<option value="Togo">Togo</option>'
    html += '<option value="Tokelau">Tokelau</option>'
    html += '<option value="Tonga">Tonga</option>'
    html += '<option value="Trinidad and Tobago">Trinidad and Tobago</option>'
    html += '<option value="Tunisia">Tunisia</option>'
    html += '<option value="Turkey">Turkey</option>'
    html += '<option value="Turkmenistan">Turkmenistan</option>'
    html += '<option value="Turks and Caicos Islands">Turks and Caicos Islands</option>'
    html += '<option value="Tuvalu">Tuvalu</option>'
    html += '<option value="Uganda">Uganda</option>'
    html += '<option value="Ukraine">Ukraine</option>'
    html += '<option value="United Arab Emirates">United Arab Emirates</option>'
    html += '<option value="United Kingdom of Great Britain and Northern Ireland">United Kingdom of Great Britain and Northern Ireland</option>'
    html += '<option value="United States of America">United States of America</option>'
    html += '<option value="Uruguay">Uruguay</option>'
    html += '<option value="Uzbekistan">Uzbekistan</option>'
    html += '<option value="Vanuatu">Vanuatu</option>'
    html += '<option value="Venezuela (Bolivarian Republic of)">Venezuela (Bolivarian Republic of)</option>'
    html += '<option value="Viet Nam">Viet Nam</option>'
    html += '<option value="Wallis and Futuna">Wallis and Futuna</option>'
    html += '<option value="Western Sahara">Western Sahara</option>'
    html += '<option value="Yemen">Yemen</option>'
    html += '<option value="Zambia">Zambia</option>'
    html += '<option value="Zimbabwe">Zimbabwe</option>'
    html += '</select>'
    html += '</div></div>'

    // Item 8: Years in country of residence
    html += '<div class="survey-demo-row">';
    html += '<div class="survey-demo-prompt"><label for="yearsresidence">How many years have you been living in your country of residence?</label></div>';
    html += '<div class="survey-demo-response">';
    html += '<input type="number" name="yearsresidence" min="1" max="100" size="20" required>';
    html += '</div></div>';

    // Item 8: Internet Speed
    html += '<div class="survey-demo-row">';
    html += '<div class="survey-demo-prompt"><label for="internetspeed">Please check your internet speed at <a href="https://fast.com/en/gb/" target="_blank">this link</a>. Enter your internet speed in Mbps (whole numbers only).</label></div>';
    html += '<div class="survey-demo-response">';
    html += '<input type="number" name="internetspeed" min="0" max="700" size="20" required>';
    html += '</div></div>';

    // Close container.
    html += '</div>';

    // Add demoing header.
    html += '<div class=survey-demo-instructions>';
    html += '<p>Personal info remains confidential and is stored anonymously. All data are collected for scientific purposes. Click <strong>Continue</strong> if you agree with these terms.</p>'
    html += '</div>';

    // Add submit button.
    html += '<div class="survey-demo-footer">';
    html += `<input type="submit" value="${trial.button_label}"></input>`;
    html += '</div>';

    // End survey.
    html += '</form></div>';

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Define functions.
    //---------------------------------------//

    // Scroll to top of screen.
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    display_element.querySelector('#jspsych-survey-demo').addEventListener('submit', function(event) {

      // Wait for response
      event.preventDefault();

      // verify that at least one box has been checked for the race question
      var checkboxes = document.querySelectorAll('input[type="checkbox"]');
      var checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);

      if(!checkedOne){

        alert("You did not enter a response for the question \"What is your ethnic background?\". Please choose at least one option.");

      } else {

        // Measure response time
        var endTime = performance.now();
        var response_time = endTime - startTime;

        var question_data = serializeArray(this);
        question_data = objectifyForm(question_data);

        // Store data
        var trialdata = {
          "rt": response_time,
          "responses": question_data
        };

        // Update screen
        display_element.innerHTML = '';

        // Move onto next trial
        jsPsych.finishTrial(trialdata);

      }

    });

    var startTime = performance.now();

  };

  /*!
  * Serialize all form data into an array
  * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
  * @param  {Node}   form The form to serialize
  * @return {String}      The serialized form data
  */
  var serializeArray = function (form) {
    // Setup our serialized data
    var serialized = [];

    // Loop through each field in the form
    for (var i = 0; i < form.elements.length; i++) {
      var field = form.elements[i];

      // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

      // If a multi-select, get all selections
      if (field.type === 'select-multiple') {
        for (var n = 0; n < field.options.length; n++) {
          if (!field.options[n].selected) continue;
          serialized.push({
            name: field.name,
            value: field.options[n].value
          });
        }
      }

      // Convert field data to a query string
      else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized.push({
          name: field.name,
          value: field.value
        });
      }
    }

    // add checkbox responses
    var checkbox_types = document.querySelectorAll('input[type=checkbox]');
    var checkbox_names = [];
    for (var i = 0; i < checkbox_types.length; i++) {
        if (! checkbox_names.includes(checkbox_types[i].name) ){
          checkbox_names.push(checkbox_types[i].name)
        }
    }

    for (var i = 0; i < checkbox_names.length; i++ ){
      var checkboxes = document.querySelectorAll(`input[name=${checkbox_names[i]}]:checked`)
      var responses = [];

      for (var j = 0; j < checkboxes.length; j++) {
        responses.push(checkboxes[j].value)
      }
      serialized.push({
        name: checkbox_names[i],
        value: responses
      })

    }

    return serialized;
  };

  // from https://stackoverflow.com/questions/1184624/convert-form-data-to-javascript-object-with-jquery
  function objectifyForm(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
      returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
  }

  return plugin;

})();
