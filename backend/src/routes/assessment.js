const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const prologService = require('../services/prologService');

const router = express.Router();
const prisma = new PrismaClient();

// Run assessment
router.post('/assess', auth, async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || !Array.isArray(symptoms)) {
      return res.status(400).json({ error: 'Symptoms must be an array of strings' });
    }

    const analysis = await prologService.analyzeSymptoms(symptoms);

    // Save to database
    const assessment = await prisma.assessment.create({
      data: {
        userId: req.userId,
        symptoms,
        overallSeverity: analysis.results.length === 0 ? 'low' : 
                         analysis.results.some(r => r.severity === 'critical') ? 'critical' :
                         analysis.results.some(r => r.severity === 'high') ? 'high' :
                         analysis.results.some(r => r.severity === 'moderate') ? 'moderate' : 'low',
        summary: analysis.summary,
        results: analysis.results,
        professionals: analysis.professionals,
        links: analysis.links
      }
    });

    res.json(assessment);
  } catch (err) {
    res.status(500).json({ error: 'Assessment failed', details: err.message });
  }
});

// Get assessment history
router.get('/history', auth, async (req, res) => {
  try {
    const assessments = await prisma.assessment.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(assessments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history', details: err.message });
  }
});

module.exports = router;
