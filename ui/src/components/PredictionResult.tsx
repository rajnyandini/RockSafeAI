import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { AlertTriangle, ShieldCheck, AlertOctagon, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PredictionResultProps {
  result: {
    prediction: number;
    probability: number;
    used_threshold: number;
    raw_score: number;
    message: string | null;
  } | null;
}

export function PredictionResult({ result }: PredictionResultProps) {
  if (!result) return null;

  const probabilityPercentage = (result.probability * 100).toFixed(1);
  
  // Determine risk level based on probability
  const getRiskLevel = (probability: number) => {
    if (probability >= 0.75) return 'Critical';
    if (probability >= 0.5) return 'High';
    if (probability >= 0.25) return 'Moderate';
    return 'Low';
  };

  const riskLevel = getRiskLevel(result.probability);
  
  const riskColors = {
    Critical: 'text-red-500 bg-red-500/10',
    High: 'text-orange-500 bg-orange-500/10',
    Moderate: 'text-yellow-500 bg-yellow-500/10',
    Low: 'text-green-500 bg-green-500/10'
  };

  const riskMessages = {
    Critical: 'IMMEDIATE EVACUATION RECOMMENDED! Take urgent preventive measures.',
    High: 'HIGH RISK DETECTED. Implement safety protocols immediately.',
    Moderate: 'Exercise caution. Monitor situation closely.',
    Low: 'Safe conditions detected. Continue regular monitoring.'
  };

  const RiskIcon = {
    Critical: AlertOctagon,
    High: AlertTriangle,
    Moderate: Info,
    Low: ShieldCheck
  }[riskLevel];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 overflow-hidden">
          <div className="space-y-6">
            {/* Risk Level Header */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg",
                riskColors[riskLevel as keyof typeof riskColors]
              )}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: riskLevel === 'Critical' ? [0, -10, 10, -10, 10, 0] : 0 }}
                  transition={{ repeat: riskLevel === 'Critical' ? Infinity : 0, duration: 2 }}
                >
                  <RiskIcon className="w-6 h-6" />
                </motion.div>
                <h3 className="text-lg font-semibold">Risk Assessment</h3>
              </div>
              <Badge 
                variant={riskLevel === 'Low' ? 'default' : 'destructive'}
                className={cn(
                  "text-sm px-3 py-1",
                  riskLevel === 'Critical' && "animate-pulse"
                )}
              >
                {riskLevel} Risk
              </Badge>
            </motion.div>

            {/* Risk Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={cn(
                "text-sm font-medium p-3 rounded-md text-center",
                riskLevel === 'Critical' && "bg-red-500/10 text-red-500 animate-pulse",
                riskLevel === 'High' && "bg-orange-500/10 text-orange-500",
                riskLevel === 'Moderate' && "bg-yellow-500/10 text-yellow-500",
                riskLevel === 'Low' && "bg-green-500/10 text-green-500"
              )}
            >
              {riskMessages[riskLevel as keyof typeof riskMessages]}
            </motion.div>

            {/* Probability Gauge */}
            <div className="space-y-2">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Risk Probability</span>
                <motion.span
                  key={probabilityPercentage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-medium"
                >
                  {probabilityPercentage}%
                </motion.span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5 }}
              >
                <Progress 
                  value={Number(probabilityPercentage)} 
                  className={cn(
                    "h-3 transition-colors",
                    riskLevel === 'Critical' && "bg-red-200 [&::-moz-progress-bar]:bg-red-500 [&::-webkit-progress-value]:bg-red-500",
                    riskLevel === 'High' && "bg-orange-200 [&::-moz-progress-bar]:bg-orange-500 [&::-webkit-progress-value]:bg-orange-500",
                    riskLevel === 'Moderate' && "bg-yellow-200 [&::-moz-progress-bar]:bg-yellow-500 [&::-webkit-progress-value]:bg-yellow-500",
                    riskLevel === 'Low' && "bg-green-200 [&::-moz-progress-bar]:bg-green-500 [&::-webkit-progress-value]:bg-green-500"
                  )}
                />
              </motion.div>
            </div>

            {/* Details Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg"
            >
              <div>
                <p className="text-sm text-muted-foreground">Threshold</p>
                <p className="text-lg font-semibold">{(result.used_threshold * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Raw Score</p>
                <p className="text-lg font-semibold">{result.raw_score.toFixed(4)}</p>
              </div>
            </motion.div>

            {/* Action Status */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className={cn(
                "text-center p-3 rounded-lg font-medium",
                riskLevel === 'Critical' && "bg-red-500/10 text-red-500 animate-pulse",
                riskLevel === 'High' && "bg-orange-500/10 text-orange-500",
                riskLevel === 'Moderate' && "bg-yellow-500/10 text-yellow-500",
                riskLevel === 'Low' && "bg-green-500/10 text-green-500"
              )}
            >
              Status: {riskLevel === 'Low' ? 'Safe to Proceed' : 'Action Required'}
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}