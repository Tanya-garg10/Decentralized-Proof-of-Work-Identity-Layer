import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Github, 
  RefreshCw, 
  Code, 
  GitCommit, 
  GitPullRequest, 
  Users,
  Star,
  ExternalLink,
  Loader2,
  Shield
} from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const { user, profile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSyncGitHub = async () => {
    setSyncing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please sign in again");
        return;
      }

      const { data, error } = await supabase.functions.invoke('fetch-github-data', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Sync error:', error);
        toast.error("Failed to sync GitHub data", {
          description: error.message,
        });
        return;
      }

      if (data?.success) {
        await refreshProfile();
        toast.success("GitHub data synced successfully!", {
          description: `Found ${data.data.total_repos} repos and ${data.data.total_commits} recent commits.`,
        });
      }
    } catch (error) {
      console.error('Sync error:', error);
      toast.error("Failed to sync GitHub data");
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const githubData = profile?.github_data as Record<string, unknown> | null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Developer Dashboard</h1>
              <p className="text-muted-foreground">
                Your verified proof-of-work identity
              </p>
            </div>
            <Button 
              onClick={handleSyncGitHub} 
              disabled={syncing}
              className="gap-2"
            >
              {syncing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Sync GitHub Data
            </Button>
          </div>

          {/* Profile Card */}
          <div className="glow-card p-6 mb-8">
            <div className="flex items-start gap-6">
              <div className="relative">
                <img 
                  src={profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-2 border-primary/50"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Shield className="w-4 h-4 text-background" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">
                    {profile?.full_name || profile?.github_username || "Developer"}
                  </h2>
                  {profile?.github_username && (
                    <a 
                      href={`https://github.com/${profile.github_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                
                {profile?.github_username && (
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <Github className="w-4 h-4" />
                    <span>@{profile.github_username}</span>
                  </div>
                )}
                
                {githubData?.bio && (
                  <p className="text-muted-foreground">
                    {String(githubData.bio)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glow-card p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-bold">{profile?.total_repos || 0}</div>
              <div className="text-sm text-muted-foreground">Repositories</div>
            </div>
            
            <div className="glow-card p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-2">
                <GitCommit className="w-5 h-5 text-accent" />
              </div>
              <div className="text-2xl font-bold">{profile?.total_commits || 0}</div>
              <div className="text-sm text-muted-foreground">Recent Commits</div>
            </div>
            
            <div className="glow-card p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                <GitPullRequest className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-bold">{profile?.total_prs || 0}</div>
              <div className="text-sm text-muted-foreground">Pull Requests</div>
            </div>
            
            <div className="glow-card p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div className="text-2xl font-bold">
                {(githubData?.followers as number) || 0}
              </div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
          </div>

          {/* Languages */}
          {profile?.languages && (profile.languages as string[]).length > 0 && (
            <div className="glow-card p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                Top Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {(profile.languages as string[]).map((lang, index) => (
                  <span 
                    key={lang}
                    className="px-3 py-1 rounded-full text-sm font-mono"
                    style={{
                      backgroundColor: `hsl(${180 + index * 20}, 70%, 20%)`,
                      color: `hsl(${180 + index * 20}, 70%, 70%)`,
                    }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Verification Status */}
          <div className="glow-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Verification Status</h3>
                <p className="text-sm text-muted-foreground">
                  Your proof-of-work identity is verified
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>GitHub Account Connected</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>Contribution Data Synced</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-muted" />
                <span>LeetCode Integration (Coming Soon)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-muted" />
                <span>On-Chain Verification (Coming Soon)</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
