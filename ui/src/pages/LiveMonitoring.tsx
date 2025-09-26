import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, RefreshCw, Wifi, AlertTriangle } from 'lucide-react';
import { LivePredictionResult } from '@/components/LivePredictionResult';
import { monitorLocation, LiveMonitorResponse } from '@/services/liveMonitor';

const MINING_CITIES = [
  { label: "Jharia, Jharkhand, India", value: "Jharia, Jharkhand, India" },
  { label: "Panaji, Goa, India", value: "Panaji, Goa, India" },
  { label: "Bellary, Karnataka, India", value: "Bellary, Karnataka, India" },
  { label: "Raipur, Chhattisgarh, India", value: "Raipur, Chhattisgarh, India" },
  { label: "Ranchi, Jharkhand, India", value: "Ranchi, Jharkhand, India" },
  { label: "Kolar, Karnataka, India", value: "Kolar, Karnataka, India" },
  { label: "Dhanbad, Jharkhand, India", value: "Dhanbad, Jharkhand, India" },
  { label: "Singareni, Telangana, India", value: "Singareni, Telangana, India" },
  { label: "Korba, Chhattisgarh, India", value: "Korba, Chhattisgarh, India" },
  { label: "Jamshedpur, Jharkhand, India", value: "Jamshedpur, Jharkhand, India" }
];

export function LiveMonitoring() {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [customLocation, setCustomLocation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LiveMonitorResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [inputMode, setInputMode] = useState<'dropdown' | 'custom'>('dropdown');

  const handleMonitor = async () => {
    const locationToMonitor = inputMode === 'dropdown' ? selectedLocation : customLocation;
    
    if (!locationToMonitor.trim()) {
      setError('Please select or enter a location');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await monitorLocation(locationToMonitor);
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Failed to monitor location');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    if (result) {
      handleMonitor();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Wifi className="w-6 h-6 text-green-500" />
        <h1 className="text-3xl font-bold">Live Monitoring</h1>
        <Badge variant="outline" className="text-green-600 border-green-300">
          Real-time API Data
        </Badge>
      </div>
      
      <p className="text-muted-foreground">
        Monitor rockfall risk using real-time weather, elevation, and environmental data from live APIs.
      </p>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant={inputMode === 'dropdown' ? 'default' : 'outline'}
              onClick={() => setInputMode('dropdown')}
              size="sm"
            >
              Popular Mining Sites
            </Button>
            <Button
              variant={inputMode === 'custom' ? 'default' : 'outline'}
              onClick={() => setInputMode('custom')}
              size="sm"
            >
              Custom Location
            </Button>
          </div>

          {inputMode === 'dropdown' ? (
            <div className="space-y-2">
              <Label htmlFor="location-select">Select Mining Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger id="location-select">
                  <SelectValue placeholder="Choose a mining location..." />
                </SelectTrigger>
                <SelectContent>
                  {MINING_CITIES.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {city.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="custom-location">Custom Location</Label>
              <Input
                id="custom-location"
                placeholder="Enter location (e.g., Mumbai, Maharashtra, India)"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Use format: City, State, Country for best results
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={handleMonitor} 
              disabled={isLoading || (!selectedLocation && !customLocation)}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Fetching Live Data...
                </>
              ) : (
                <>
                  <Wifi className="w-4 h-4 mr-2" />
                  Monitor Location
                </>
              )}
            </Button>
            
            {result && (
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 text-red-700 rounded-md">
              <AlertTriangle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </Card>

      {result && (
        <>
          <Separator />
          <LivePredictionResult result={result} />
        </>
      )}
    </div>
  );
}