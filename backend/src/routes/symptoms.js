const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Get list of all available symptoms from the Prolog file
// In a more complex app, this might come from a DB or separate JSON, 
// but for now we'll parse the Prolog file or just return a hardcoded list matching the frontend.
router.get('/', (req, res) => {
  // For the prototype, we return the list provided in the frontend as a reference
  // In a real system, we'd query Prolog for current facts.
  res.json([
    { id: 'sadness', label: 'Feeling down, depressed, or hopeless', category: 'Mood', weight: 3 },
    { id: 'anhedonia', label: 'Little interest or pleasure in doing things', category: 'Mood', weight: 3 },
    { id: 'worthlessness', label: 'Feeling bad about yourself or that you are a failure', category: 'Mood', weight: 4 },
    { id: 'hopelessness', label: 'Feeling hopeless about the future', category: 'Mood', weight: 4 },
    { id: 'guilt', label: 'Excessive or inappropriate guilt', category: 'Mood', weight: 3 },
    { id: 'anxious', label: 'Feeling nervous, anxious, or on edge', category: 'Anxiety', weight: 3 },
    { id: 'uncontrolled_worry', label: 'Not being able to stop or control worrying', category: 'Anxiety', weight: 4 },
    { id: 'excessive_worry', label: 'Worrying too much about different things', category: 'Anxiety', weight: 3 },
    { id: 'fear_of_doom', label: 'Feeling afraid as if something awful might happen', category: 'Anxiety', weight: 4 },
    { id: 'fatigue', label: 'Feeling tired or having little energy', category: 'Physical', weight: 2 },
    { id: 'insomnia', label: 'Difficulty falling or staying asleep', category: 'Sleep', weight: 3 },
    { id: 'flashbacks', label: 'Reliving a traumatic event (flashbacks)', category: 'Trauma', weight: 5 },
    { id: 'self_harm_thoughts', label: 'Thoughts of hurting yourself', category: 'Crisis', weight: 10 },
    { id: 'suicidal_thoughts', label: 'Thoughts that you would be better off dead', category: 'Crisis', weight: 10 }
  ]);
});

module.exports = router;
