import { useState, useEffect } from 'react';
import { MapPin, Check, Utensils, ShoppingBag, Train, Camera, Hotel, Star, Navigation, Clock } from 'lucide-react';
import { tripSchedule, type Activity } from './data/tripData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DayMap } from '@/components/DayMap';
import { YoutubeRecommendations } from '@/components/YoutubeRecommendations';

// Type icon mapping
const typeIcons = {
  transport: Train,
  attraction: Camera,
  restaurant: Utensils,
  shopping: ShoppingBag,
  hotel: Hotel
};

const typeLabels = {
  transport: '交通',
  attraction: '景點',
  restaurant: '餐廳',
  shopping: '購物',
  hotel: '住宿'
};

const typeColors = {
  transport: 'bg-blue-100 text-blue-700 border-blue-200',
  attraction: 'bg-purple-100 text-purple-700 border-purple-200',
  restaurant: 'bg-orange-100 text-orange-700 border-orange-200',
  shopping: 'bg-pink-100 text-pink-700 border-pink-200',
  hotel: 'bg-green-100 text-green-700 border-green-200'
};

function App() {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [selectedRestaurant, setSelectedRestaurant] = useState<Activity | null>(null);
  const [showRestaurantDialog, setShowRestaurantDialog] = useState(false);

  // Load completed activities from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('fukuoka-trip-completed');
    if (saved) {
      setCompletedActivities(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save completed activities to localStorage
  useEffect(() => {
    localStorage.setItem('fukuoka-trip-completed', JSON.stringify([...completedActivities]));
  }, [completedActivities]);

  const toggleComplete = (activityId: string) => {
    setCompletedActivities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
      } else {
        newSet.add(activityId);
      }
      return newSet;
    });
  };

  const openRestaurantDetail = (activity: Activity) => {
    if (activity.restaurant) {
      setSelectedRestaurant(activity);
      setShowRestaurantDialog(true);
    }
  };

  const currentSchedule = tripSchedule.find(d => d.day === currentDay) || tripSchedule[0];

  const progress = {
    total: currentSchedule.activities.length,
    completed: currentSchedule.activities.filter(a => completedActivities.has(a.id)).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-emerald-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-orange-100">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold gradient-text">福岡親子遊</h1>
              <p className="text-xs text-gray-500">跟著發發走，不會亂發火 🔥</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700">Day {currentDay}/5</p>
              <p className="text-xs text-gray-500">{progress.completed}/{progress.total} 完成</p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-400 to-emerald-400 transition-all duration-300"
              style={{ width: `${progress.total > 0 ? (progress.completed / progress.total) * 100 : 0}%` }}
            />
          </div>
        </div>
      </header>

      {/* Day Theme Card */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              {currentSchedule.date} {currentSchedule.weekday}
            </Badge>
          </div>
          <h2 className="text-xl font-bold">{currentSchedule.theme}</h2>
        </div>
      </div>

      {/* Day Map */}
      <div className="px-4 mb-4">
        <DayMap locations={currentSchedule.mapLocations} />
      </div>

      {/* YouTube Recommendations */}
      {currentSchedule.youtubeRecommendations.length > 0 && (
        <div className="px-4 mb-4">
          <YoutubeRecommendations videos={currentSchedule.youtubeRecommendations} />
        </div>
      )}

      {/* Timeline */}
      <div className="px-4 space-y-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-500" />
          行程時間表
        </h3>
        
        {currentSchedule.activities.map((activity, index) => {
          const Icon = typeIcons[activity.type];
          const isCompleted = completedActivities.has(activity.id);
          const isLast = index === currentSchedule.activities.length - 1;

          return (
            <div key={activity.id} className="relative">
              {/* Timeline line */}
              {!isLast && (
                <div className="absolute left-6 top-14 bottom-[-16px] w-0.5 bg-gradient-to-b from-orange-300 to-emerald-300" />
              )}

              {/* Activity Card */}
              <div 
                className={`activity-card relative bg-white rounded-xl p-4 shadow-sm border-2 transition-all ${
                  isCompleted ? 'border-emerald-300 bg-emerald-50/30' : 'border-transparent'
                }`}
              >
                <div className="flex gap-3">
                  {/* Time & Icon */}
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${typeColors[activity.type]} ${isCompleted ? 'opacity-60' : ''}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-orange-600">{activity.time}</span>
                          <Badge variant="outline" className={`text-xs ${typeColors[activity.type]}`}>
                            {typeLabels[activity.type]}
                          </Badge>
                        </div>
                        <h3 className={`font-bold text-gray-800 ${isCompleted ? 'line-through text-gray-400' : ''}`}>
                          {activity.title}
                        </h3>
                        <p className={`text-sm mt-1 ${isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                          {activity.description}
                        </p>

                        {/* Tips */}
                        {activity.tips && (
                          <div className="mt-2 flex items-start gap-1.5">
                            <Star className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-amber-700">{activity.tips}</p>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-3">
                          {activity.googleMapUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 h-8 text-xs bg-white hover:bg-blue-50 border-blue-200 text-blue-600"
                              onClick={() => window.open(activity.googleMapUrl, '_blank')}
                            >
                              <Navigation className="w-3.5 h-3.5 mr-1" />
                              導航
                            </Button>
                          )}

                          {activity.restaurant && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 h-8 text-xs bg-white hover:bg-orange-50 border-orange-200 text-orange-600"
                              onClick={() => openRestaurantDetail(activity)}
                            >
                              <Utensils className="w-3.5 h-3.5 mr-1" />
                              菜單
                            </Button>
                          )}

                          <Button
                            variant={isCompleted ? "default" : "outline"}
                            size="sm"
                            className={`h-8 w-8 p-0 ${
                              isCompleted 
                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                                : 'border-gray-300 text-gray-400 hover:border-emerald-400 hover:text-emerald-500'
                            }`}
                            onClick={() => toggleComplete(activity.id)}
                          >
                            <Check className={`w-4 h-4 ${isCompleted ? 'check-animation' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Restaurant Detail Dialog */}
      <Dialog open={showRestaurantDialog} onOpenChange={setShowRestaurantDialog}>
        <DialogContent className="max-w-sm max-h-[80vh] overflow-y-auto">
          {selectedRestaurant?.restaurant && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-orange-500" />
                  {selectedRestaurant.restaurant.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{selectedRestaurant.restaurant.address}</p>
                </div>

                {/* Notes */}
                {selectedRestaurant.restaurant.notes && (
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <p className="text-sm text-amber-800 flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {selectedRestaurant.restaurant.notes}
                    </p>
                  </div>
                )}

                <Separator />

                {/* Must Order */}
                {selectedRestaurant.restaurant.mustOrder && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800 mb-2 flex items-center gap-1">
                      <Star className="w-4 h-4 text-orange-500" />
                      必點推薦
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRestaurant.restaurant.mustOrder.map((item, i) => (
                        <Badge key={i} className="bg-orange-100 text-orange-700 border-orange-200">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Menu */}
                {selectedRestaurant.restaurant.menu && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800 mb-2 flex items-center gap-1">
                      <Utensils className="w-4 h-4 text-gray-500" />
                      菜單
                    </h4>
                    <div className="space-y-2">
                      {selectedRestaurant.restaurant.menu.map((item, i) => (
                        <div 
                          key={i} 
                          className={`flex justify-between items-start p-2 rounded-lg ${
                            item.isRecommended ? 'bg-orange-50 border border-orange-100' : 'bg-gray-50'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium text-gray-800">{item.name}</span>
                              {item.isRecommended && (
                                <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs text-gray-500">{item.description}</p>
                            )}
                          </div>
                          <span className="text-sm font-semibold text-gray-700 ml-2">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Google Map Button */}
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={() => {
                    if (selectedRestaurant.restaurant?.googleMapUrl) {
                      window.open(selectedRestaurant.restaurant.googleMapUrl, '_blank');
                    }
                  }}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  開啟 Google 地圖
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass border-t border-gray-200 bottom-nav z-50">
        <div className="flex justify-around items-center py-2">
          {[1, 2, 3, 4, 5].map((day) => {
            const schedule = tripSchedule.find(d => d.day === day);
            const isActive = currentDay === day;
            const dayProgress = schedule ? schedule.activities.filter(a => completedActivities.has(a.id)).length : 0;
            const dayTotal = schedule ? schedule.activities.length : 0;
            const isComplete = dayProgress === dayTotal && dayTotal > 0;

            return (
              <button
                key={day}
                onClick={() => setCurrentDay(day)}
                className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-orange-100 text-orange-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-0.5 ${
                  isActive 
                    ? 'bg-orange-500 text-white' 
                    : isComplete
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-gray-100'
                }`}>
                  {isComplete ? <Check className="w-4 h-4" /> : day}
                </div>
                <span className="text-[10px]">{schedule?.date}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default App;
