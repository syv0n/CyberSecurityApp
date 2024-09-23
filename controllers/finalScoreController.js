const Score = require('../models/Score'); // Assuming you have a Score model
const Submission = require('../models/Submissions'); // Adjust the path if necessary

exports.calculateFinalScore = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const scores = await Score.getByUserId(userId);
        console.log('Retrieved scores:', scores);

        const functionWeights = {
            'Identify': 0.25,
            'Protect': 0.20,
            'Detect': 0.25,
            'Respond': 0.20,
            'Recover': 0.10
        };

        const functionScores = {};
        let finalScore = 0;

        for (const [func, weight] of Object.entries(functionWeights)) {
            const funcScores = scores.filter(s => s.component === func);
            console.log(`Scores for ${func}:`, funcScores);
            const weightedFuncScore = calculateWeightedFunctionScore(funcScores);
            console.log(`Weighted score for ${func}:`, weightedFuncScore);
            functionScores[func] = {
                score: weightedFuncScore,
                weight: weight
            };
            finalScore += weightedFuncScore * weight;
            console.log(`Running total of final score: ${finalScore}`);
        }

        console.log('Final score:', finalScore);
        console.log('Function scores:', functionScores);

        res.status(200).json({ finalScore, functionScores });
    } catch (error) {
        console.error('Error calculating final score:', error);
        res.status(500).json({ message: 'Error calculating final score', error: error.message });
    }
};

function calculateWeightedFunctionScore(funcScores) {
    const subcategoryWeights = {
        'Identify': {
            'ID.AM-01': 0.15,
            'ID.AM-02': 0.15,
            'ID.AM-05': 0.10,
            'ID.BE-05': 0.05,
            'ID.GV-1a': 0.10,
            'ID.GV-1b': 0.10,
            'ID.GV-02': 0.05,
            'ID.GV-04': 0.20,
            'ID.RA-01': 0.10
        },
        'Protect': {
            'PR.AC-01': 0.10,
            'PR.AC-02': 0.07,
            'PR.AC-03': 0.05,
            'PR.AC-05': 0.05,
            'PR.AT-01': 0.05,
            'PR.AT-02': 0.05,
            'PR.DS-1a': 0.05,
            'PR.DS-1b': 0.05,
            'PR.DS-02': 0.10,
            'PR.IP-01': 0.05,
            'PR.IP-03': 0.10,
            'PR.IP-05': 0.05,
            'PR.IP-09': 0.10,
            'PR.IP-10': 0.05,
            'PR.IP-12': 0.08
        },
        'Detect': {
            'DE.AE-03': 0.20,
            'DE.CM-01': 0.20,
            'DE.CM-04': 0.20,
            'DE.CM-08': 0.20,
            'DE.DP-01': 0.05,
            'DE.DP-03': 0.05,
            'DE.DP-04': 0.10
        },
        'Respond': {
            'RS.RP-01': 0.25,
            'RS.CO-01': 0.25,
            'RS.CO-02': 0.25,
            'RS.AN-01': 0.25
        },
        'Recover': {
            'RC.RP-01': 1.00
        }
    };

    let weightedScore = 0;
    let totalWeight = 0;

    // Group scores by subcategory
    const groupedScores = funcScores.reduce((acc, score) => {
        if (!acc[score.subcategory]) {
            acc[score.subcategory] = [];
        }
        acc[score.subcategory].push(score.score);
        return acc;
    }, {});

    // Calculate average score for each subcategory
    for (const [subcategory, scores] of Object.entries(groupedScores)) {
        const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        const weight = subcategoryWeights[funcScores[0].component][subcategory];
        if (weight) {
            weightedScore += avgScore * weight;
            totalWeight += weight;
        }
    }

    return totalWeight > 0 ? weightedScore / totalWeight : 0;
}

exports.getFinalScoreById = async (req, res) => {
    try {
        const submissionId = req.params.submissionId;
        const submission = await Submission.getById(submissionId);
        
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        // Fetch the scores associated with this submission
        const scores = await Score.getBySubmissionId(submissionId);

        if (scores.length === 0) {
            return res.status(404).json({ message: 'No scores found for this submission' });
        }

        const functionWeights = {
            'Identify': 0.25,
            'Protect': 0.20,
            'Detect': 0.25,
            'Respond': 0.20,
            'Recover': 0.10
        };

        const functionScores = {};
        let finalScore = 0;

        for (const [func, weight] of Object.entries(functionWeights)) {
            const funcScores = scores.filter(s => s.component === func);
            const weightedFuncScore = calculateWeightedFunctionScore(funcScores);
            functionScores[func] = {
                score: weightedFuncScore,
                weight: weight
            };
            finalScore += weightedFuncScore * weight;
        }

        res.status(200).json({ finalScore, functionScores });
    } catch (error) {
        console.error('Error fetching final score:', error);
        res.status(500).json({ message: 'Error fetching final score', error: error.message });
    }
};

exports.getSubmissionById = async (req, res) => {
    try {
        const submissionId = req.params.submissionId;
        const submission = await Submission.getById(submissionId);

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        // Fetch the scores associated with this submission
        const scores = await Score.getBySubmissionId(submissionId);

        if (scores.length === 0) {
            return res.status(404).json({ message: 'No scores found for this submission' });
        }

        const functionWeights = {
            'Identify': 0.25,
            'Protect': 0.20,
            'Detect': 0.25,
            'Respond': 0.20,
            'Recover': 0.10
        };

        const functionScores = {};
        let finalScore = 0;

        for (const [func, weight] of Object.entries(functionWeights)) {
            const funcScores = scores.filter(s => s.component === func);
            const weightedFuncScore = calculateWeightedFunctionScore(funcScores);
            functionScores[func] = {
                score: weightedFuncScore,
                weight: weight
            };
            finalScore += weightedFuncScore * weight;
        }

        // Return the correct data structure
        res.status(200).json({
            finalScore,
            functionScores
        });
    } catch (error) {
        console.error('Error fetching final score:', error);
        res.status(500).json({ message: 'Error fetching final score', error: error.message });
    }
};