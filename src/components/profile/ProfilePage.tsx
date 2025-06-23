import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, CheckSquare, Mail, Calendar, Activity } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();
  const currentUser = user?.payload;

  const { projects, tasks } = useData();

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const userStats = {
    totalProjects: projects.length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.status === 'completed').length,
    pendingTasks: tasks.filter(task => task.status === 'pending').length,
    inProgressTasks: tasks.filter(task => task.status === 'in_progress').length,
  };

  const completionRate = userStats.totalTasks > 0 
    ? Math.round((userStats.completedTasks / userStats.totalTasks) * 100) 
    : 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Profile</h2>
        <p className="text-muted-foreground">Manage your account and view your activity</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Info */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-4">
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">
                  {currentUser?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{currentUser?.name}</h3>
                {currentUser?.role && (
                  <Badge variant="secondary" className="mt-1">
                    {currentUser?.role}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{currentUser?.email}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Joined {formatDate(currentUser?.created_at)}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Last updated {formatDate(currentUser?.updated_at)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Stats */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userStats.totalProjects}</div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userStats.totalTasks}</div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userStats.completedTasks}</div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{userStats.pendingTasks + userStats.inProgressTasks}</div>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Task Completion Rate</span>
                <span className="text-sm text-muted-foreground">{completionRate}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Task Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-800">Pending Tasks</p>
                  <p className="text-2xl font-bold text-yellow-900">{userStats.pendingTasks}</p>
                </div>
                <div className="h-8 w-8 bg-yellow-200 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-yellow-800" />
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">In Progress</p>
                  <p className="text-2xl font-bold text-blue-900">{userStats.inProgressTasks}</p>
                </div>
                <div className="h-8 w-8 bg-blue-200 rounded-full flex items-center justify-center">
                  <Activity className="h-4 w-4 text-blue-800" />
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">Completed</p>
                  <p className="text-2xl font-bold text-green-900">{userStats.completedTasks}</p>
                </div>
                <div className="h-8 w-8 bg-green-200 rounded-full flex items-center justify-center">
                  <CheckSquare className="h-4 w-4 text-green-800" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
