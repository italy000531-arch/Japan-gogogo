import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { MapLocation } from '@/data/tripData';

interface DayMapProps {
  locations: MapLocation[];
}

export function DayMap({ locations }: DayMapProps) {
  // Generate Google Maps directions URL
  const generateDirectionsUrl = () => {
    if (locations.length < 2) return null;
    
    const origin = `${locations[0].lat},${locations[0].lng}`;
    const destination = `${locations[locations.length - 1].lat},${locations[locations.length - 1].lng}`;
    const waypoints = locations.slice(1, -1).map(l => `${l.lat},${l.lng}`).join('|');
    
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=transit`;
  };

  // Generate open map URL (without API key)
  const generateOpenMapUrl = () => {
    const query = locations.map(l => l.name).join(' → ');
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  };

  const directionsUrl = generateDirectionsUrl();
  const openMapUrl = generateOpenMapUrl();

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <Navigation className="w-5 h-5 text-orange-500" />
          今日行程路線
        </h3>
        <span className="text-xs text-gray-500">{locations.length} 個地點</span>
      </div>

      {/* Route Preview */}
      <div className="relative bg-gradient-to-br from-orange-50 to-emerald-50 rounded-lg p-4 mb-3">
        {/* Simple visual route */}
        <div className="flex items-start gap-2">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">
              S
            </div>
            <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-400 to-orange-400 my-1" />
          </div>
          <div className="flex-1 pt-1">
            <p className="text-sm font-medium text-gray-800">{locations[0]?.name}</p>
            <p className="text-xs text-gray-500">出發點</p>
          </div>
        </div>

        {/* Waypoints - show first 2 */}
        {locations.slice(1, Math.min(4, locations.length - 1)).map((loc, i) => (
          <div key={i} className="flex items-start gap-2 ml-4">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-orange-400 text-white flex items-center justify-center text-xs font-bold">
                {i + 1}
              </div>
              <div className="w-0.5 h-8 bg-gradient-to-b from-orange-400 to-orange-300 my-1" />
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-sm text-gray-700">{loc.name}</p>
            </div>
          </div>
        ))}

        {/* Show more indicator */}
        {locations.length > 5 && (
          <div className="flex items-center gap-2 ml-4 py-1">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs">
              +{locations.length - 5}
            </div>
            <p className="text-xs text-gray-500">還有更多地點...</p>
          </div>
        )}

        {/* End point */}
        <div className="flex items-start gap-2">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">
              E
            </div>
          </div>
          <div className="flex-1 pt-1">
            <p className="text-sm font-medium text-gray-800">{locations[locations.length - 1]?.name}</p>
            <p className="text-xs text-gray-500">終點</p>
          </div>
        </div>
      </div>

      {/* Location List */}
      <div className="space-y-2 mb-3">
        {locations.map((loc, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
              i === 0 ? 'bg-emerald-100 text-emerald-600' :
              i === locations.length - 1 ? 'bg-red-100 text-red-600' :
              'bg-orange-100 text-orange-600'
            }`}>
              {i === 0 ? 'S' : i === locations.length - 1 ? 'E' : i + 1}
            </div>
            <span className="text-gray-700">{loc.name}</span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-9 text-xs bg-white hover:bg-blue-50 border-blue-200 text-blue-600"
          onClick={() => window.open(openMapUrl, '_blank')}
        >
          <MapPin className="w-3.5 h-3.5 mr-1" />
          查看地圖
        </Button>
        {directionsUrl && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-9 text-xs bg-white hover:bg-orange-50 border-orange-200 text-orange-600"
            onClick={() => window.open(directionsUrl, '_blank')}
          >
            <Navigation className="w-3.5 h-3.5 mr-1" />
            導航路線
          </Button>
        )}
      </div>
    </div>
  );
}
