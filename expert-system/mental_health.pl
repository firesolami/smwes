% SMWES Expert System - Mental Health Knowledge Base
% Focus: Anxiety, Depression, Panic, Social Anxiety, PTSD, OCD, etc.
% Localization: Nigeria

% --- Symptoms Data ---
% symptom(Id, Label, Category, Weight)

% Mood / Depression
symptom(sadness, 'Feeling down, depressed, or hopeless', mood, 3).
symptom(anhedonia, 'Little interest or pleasure in doing things', mood, 3).
symptom(worthlessness, 'Feeling bad about yourself or that you are a failure', mood, 4).
symptom(hopelessness, 'Feeling hopeless about the future', mood, 4).
symptom(guilt, 'Excessive or inappropriate guilt', mood, 3).
symptom(irritability, 'Irritability or angry outbursts', mood, 2).
symptom(mood_swings, 'Sudden or extreme mood swings', mood, 3).

% Anxiety
symptom(anxious, 'Feeling nervous, anxious, or on edge', anxiety, 3).
symptom(uncontrolled_worry, 'Not being able to stop or control worrying', anxiety, 4).
symptom(excessive_worry, 'Worrying too much about different things', anxiety, 3).
symptom(restlessness, 'Being so restless that it is hard to sit still', anxiety, 3).
symptom(fear_of_doom, 'Feeling afraid as if something awful might happen', anxiety, 4).
symptom(trouble_relaxing, 'Trouble relaxing', anxiety, 2).
symptom(racing_thoughts, 'Racing or intrusive thoughts', anxiety, 3).

% Physical / Somatic
symptom(fatigue, 'Feeling tired or having little energy', physical, 2).
symptom(appetite_change, 'Significant changes in appetite or weight', physical, 2).
symptom(chest_tightness, 'Chest tightness or rapid heartbeat', physical, 3).
symptom(muscle_tension, 'Muscle tension or body aches', physical, 2).
symptom(headaches, 'Frequent headaches or tension headaches', physical, 1).
symptom(sweating, 'Excessive sweating or trembling', physical, 2).
symptom(shortness_of_breath, 'Shortness of breath without physical exertion', physical, 3).

% Sleep
symptom(insomnia, 'Difficulty falling or staying asleep', sleep, 3).
symptom(hypersomnia, 'Sleeping too much', sleep, 2).
symptom(nightmares, 'Distressing dreams or nightmares', sleep, 2).
symptom(early_waking, 'Waking up too early and unable to get back to sleep', sleep, 2).

% Cognitive
symptom(concentration, 'Trouble concentrating on tasks', cognitive, 2).
symptom(memory_issues, 'Difficulty remembering things', cognitive, 2).
symptom(indecisiveness, 'Trouble making everyday decisions', cognitive, 1).
symptom(brain_fog, 'Feeling mentally "cloudy" or slow', cognitive, 2).

% Social / Relationships
symptom(social_avoidance, 'Avoiding people or social situations', social, 3).
symptom(social_fear, 'Fear of being judged or scrutinized by others', social, 3).
symptom(loneliness, 'Feeling alone even when around others', social, 2).
symptom(withdrawal, 'Withdrawing from friends and family', social, 3).

% Trauma / PTSD
symptom(flashbacks, 'Reliving a traumatic event (flashbacks)', trauma, 5).
symptom(trauma_avoidance, 'Avoiding reminders of a traumatic event', trauma, 4).
symptom(hypervigilance, 'Feeling constantly "on guard"', trauma, 4).
symptom(startle_response, 'Being easily startled or jumpy', trauma, 3).

% Compulsion / OCD
symptom(obsessions, 'Intrusive, unwanted repetitive thoughts', compulsion, 4).
symptom(compulsions, 'Repetitive behaviors you feel driven to perform', compulsion, 4).
symptom(need_for_order, 'Excessive need for things to be "just right"', compulsion, 2).

% Crisis
symptom(self_harm_thoughts, 'Thoughts of hurting yourself', crisis, 10).
symptom(suicidal_thoughts, 'Thoughts that you would be better off dead', crisis, 10).
symptom(suicidal_intent, 'Having a plan or intent to end your life', crisis, 20).

% --- Condition Rules ---

condition(major_depression, 'Major Depressive Disorder Symptoms', 
    'A pattern of persistent low mood and loss of interest impacting daily life.', 
    [sadness, anhedonia], 
    [worthlessness, hopelessness, fatigue, insomnia, hypersomnia, concentration, appetite_change, guilt], 
    8, moderate).

condition(generalized_anxiety, 'Generalized Anxiety Disorder Symptoms', 
    'Persistent and excessive worry about various things that is difficult to control.', 
    [anxious, uncontrolled_worry], 
    [restlessness, trouble_relaxing, fatigue, irritability, muscle_tension, concentration, insomnia], 
    8, moderate).

condition(panic_disorder, 'Panic Disorder & Acute Stress', 
    'Sudden, intense episodes of fear accompanied by physical symptoms like heart palpitations.', 
    [fear_of_doom, chest_tightness], 
    [sweating, shortness_of_breath, restlessness, racing_thoughts, social_avoidance], 
    6, high).

condition(social_anxiety, 'Social Anxiety', 
    'Significant fear of social situations and being judged by others.', 
    [social_fear], 
    [social_avoidance, withdrawal, sweating, racing_thoughts, loneliness], 
    5, moderate).

condition(ptsd, 'Post-Traumatic Stress Symptoms', 
    'Ongoing distress following exposure to a traumatic event.', 
    [flashbacks], 
    [trauma_avoidance, hypervigilance, startle_response, nightmares, mood_swings, irritability], 
    7, high).

condition(ocd, 'Obsessive-Compulsive Tendencies', 
    'Presence of intrusive thoughts and repetitive behaviors intended to reduce anxiety.', 
    [obsessions, compulsions], 
    [need_for_order, anxious, uncontrolled_worry, concentration], 
    6, moderate).

condition(academic_burnout, 'Academic Burnout', 
    'State of chronic exhaustion and reduced performance related to study pressures.', 
    [fatigue, anhedonia], 
    [concentration, irritability, insomnia, brain_fog, withdrawal], 
    6, low).

condition(bipolar_manic, 'Bipolar Disorder (Manic Symptoms)', 
    'Periods of unusually elevated mood, high energy, and impulsive behavior.', 
    [mood_swings, restlessness], 
    [racing_thoughts, insomnia, excessive_worry, irritability, anhedonia], 
    7, high).

condition(schizophrenia_prodromal, 'Early Schizophrenia Symptoms', 
    'Early signs of significant alterations in perception and social withdrawal.', 
    [withdrawal, concentration], 
    [social_fear, anhedonia, brain_fog], 
    6, high).

condition(substance_misuse_risk, 'Substance Misuse Risk', 
    'Patterns of behavior that may indicate coping via substance use.', 
    [mood_swings], 
    [irritability, insomnia, withdrawal, guilt, fatigue, anhedonia], 
    5, moderate).

condition(eating_disorder, 'Disordered Eating Patterns', 
    'Significant changes in appetite or weight associated with distress.', 
    [appetite_change], 
    [guilt, worthlessness, social_avoidance, fatigue, mood_swings], 
    5, moderate).

condition(health_anxiety, 'Health Anxiety', 
    'Excessive worry about having a serious medical condition.', 
    [excessive_worry], 
    [chest_tightness, muscle_tension, headaches, sweating, racing_thoughts, insomnia], 
    6, moderate).

condition(crisis_risk, 'High Crisis Risk', 
    'Immediate support is needed due to thoughts of self-harm or suicide.', 
    [], 
    [self_harm_thoughts, suicidal_thoughts, suicidal_intent], 
    1, critical).

% --- Help Resources (Nigerian Focused) ---

nigerian_professional('Mentally Aware Nigeria Initiative (MANI)', '08091116264, 08111680686', 'Peer-led emotional support and professional referrals.').
nigerian_professional('Suicide Research and Prevention Initiative (SURPIN)', '09080217555, 08000787746', 'National suicide prevention and crisis intervention.').
nigerian_professional('Safe Place Nigeria', '08008002000', 'Crisis counseling and referrals to tele-therapy.').
nigerian_professional('Lagos State Suicide Hotlines', '08058820777, 09030000741', '24/7 emergency suicide intervention in Lagos.').

nigerian_help_link('MyTherapist.ng', 'https://mytherapist.ng').
nigerian_help_link('National Emergency Hotline', 'tel:112').
nigerian_help_link('Asido Foundation', 'https://asidofoundation.com').

% --- Logic Engine ---

is_symptom(Id) :- symptom(Id, _, _, _).
symptom_weight(Id, Weight) :- symptom(Id, _, _, Weight).

match_condition(InputSymptoms, ConditionId, Name, Description, Severity, Score, MatchedSymptoms) :-
    condition(ConditionId, Name, Description, Required, Contributing, Threshold, BaseSeverity),
    (Required = [] ; member(Req, Required), member(Req, InputSymptoms)),
    findall(S, (member(S, Contributing), member(S, InputSymptoms)), ContribMatch),
    findall(S, (member(S, Required), member(S, InputSymptoms)), ReqMatch),
    append(ReqMatch, ContribMatch, AllMatched),
    sum_weights(AllMatched, Score),
    (ConditionId = crisis_risk, Score >= Threshold ; Score >= Threshold),
    determine_severity(ConditionId, Score, BaseSeverity, Severity),
    MatchedSymptoms = AllMatched.

sum_weights([], 0).
sum_weights([H|T], Total) :-
    symptom_weight(H, W),
    sum_weights(T, Rest),
    Total is W + Rest.

determine_severity(crisis_risk, _, _, critical) :- !.
determine_severity(_, Score, _, critical) :- Score >= 20, !.
determine_severity(_, Score, _, high) :- Score >= 15, !.
determine_severity(_, Score, _, moderate) :- Score >= 10, !.
determine_severity(_, _, Base, Base).

% --- API Facade ---

analyze(InputSymptoms, Results) :-
    findall(
        condition_result(Id, Name, Desc, Sev, Score, Matched),
        match_condition(InputSymptoms, Id, Name, Desc, Sev, Score, Matched),
        Results
    ).

get_professionals(Professionals) :-
    findall(prof(Role, Contact, Desc), nigerian_professional(Role, Contact, Desc), Professionals).

get_links(Links) :-
    findall(link(Title, URL), nigerian_help_link(Title, URL), Links).

get_summary([], 'No significant patterns were identified. If you are struggling, please reach out to a professional.') :- !.
get_summary(Results, Summary) :-
    member(condition_result(_, _, _, critical, _, _), Results),
    Summary = 'Your responses indicate serious distress. Please reach out to a crisis line immediately.', !.
get_summary(Results, Summary) :-
    member(condition_result(_, _, _, high, _, _), Results),
    Summary = 'Your symptoms suggest significant distress. Professional support is strongly encouraged.', !.
get_summary(Results, Summary) :-
    member(condition_result(_, _, _, moderate, _, _), Results),
    Summary = 'Your symptoms suggest moderate distress. Professional support and self-care are recommended.', !.
get_summary(_, 'Your symptoms suggest mild distress. Monitor your wellbeing and consider light self-care.').

% --- CLI Entry Point ---

:- use_module(library(http/json)).

run :-
    read_line_to_string(user_input, String),
    (   String == end_of_file
    ->  halt
    ;   term_string(Symptoms, String),
        analyze(Symptoms, Results),
        get_summary(Results, Summary),
        get_professionals(Pro),
        get_links(Links),
        % Convert result terms to JSON-compatible dicts
        results_to_dict(Results, ResultsDict),
        pro_to_dict(Pro, ProDict),
        links_to_dict(Links, LinksDict),
        JSON = json([results=ResultsDict, summary=Summary, professionals=ProDict, links=LinksDict]),
        json_write(user_output, JSON),
        nl,
        halt
    ).

% Helpers to convert results to dicts for JSON output
results_to_dict([], []).
results_to_dict([condition_result(Id, Name, Desc, Sev, Score, Matched)|T], [json([id=Id, name=Name, description=Desc, severity=Sev, score=Score, matchedSymptoms=Matched])|Rest]) :-
    results_to_dict(T, Rest).

pro_to_dict([], []).
pro_to_dict([prof(Role, Contact, Desc)|T], [json([role=Role, contact=Contact, description=Desc])|Rest]) :-
    pro_to_dict(T, Rest).

links_to_dict([], []).
links_to_dict([link(Title, URL)|T], [json([title=Title, url=URL])|Rest]) :-
    links_to_dict(T, Rest).
