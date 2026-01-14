import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GitHubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}

interface GitHubEvent {
  type: string;
  created_at: string;
  payload?: {
    commits?: unknown[];
    action?: string;
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from JWT
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get GitHub identity from user's identities
    const githubIdentity = user.identities?.find(i => i.provider === 'github');
    if (!githubIdentity) {
      return new Response(
        JSON.stringify({ error: 'No GitHub identity found. Please sign in with GitHub.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get GitHub username from identity data
    const githubUsername = githubIdentity.identity_data?.user_name;
    if (!githubUsername) {
      return new Response(
        JSON.stringify({ error: 'GitHub username not found in identity data.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch GitHub user data using public API (no auth token needed for public data)
    // For private data, user would need to re-authenticate to get fresh provider_token
    const githubHeaders: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'ProofID-App',
    };

    // Fetch public GitHub data
    const [userResponse, reposResponse, eventsResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${githubUsername}`, { headers: githubHeaders }),
      fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`, { headers: githubHeaders }),
      fetch(`https://api.github.com/users/${githubUsername}/events/public?per_page=100`, { headers: githubHeaders }),
    ]);

    if (!userResponse.ok) {
      const errorBody = await userResponse.text();
      console.error('GitHub API error:', {
        status: userResponse.status,
        statusText: userResponse.statusText,
        body: errorBody,
        user_id: user.id
      });
      
      const userMessage = userResponse.status === 404
        ? 'GitHub user not found. Please verify your GitHub account.'
        : userResponse.status === 403
        ? 'GitHub API rate limit exceeded. Please try again later.'
        : 'Failed to fetch GitHub data. Please try again.';
      
      return new Response(
        JSON.stringify({ error: userMessage }),
        { status: userResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const githubUser = await userResponse.json();
    const repos: GitHubRepo[] = reposResponse.ok ? await reposResponse.json() : [];
    const events: GitHubEvent[] = eventsResponse.ok ? await eventsResponse.json() : [];

    // Calculate stats
    const ownRepos = repos.filter((r: GitHubRepo) => !r.fork);
    const totalRepos = ownRepos.length;

    // Count languages
    const languageCounts: Record<string, number> = {};
    ownRepos.forEach((repo: GitHubRepo) => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });
    const languages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([lang]) => lang);

    // Count commits and PRs from events
    let totalCommits = 0;
    let totalPRs = 0;

    events.forEach((event: GitHubEvent) => {
      if (event.type === 'PushEvent' && event.payload?.commits) {
        totalCommits += (event.payload.commits as unknown[]).length;
      }
      if (event.type === 'PullRequestEvent' && event.payload?.action === 'opened') {
        totalPRs += 1;
      }
    });

    // Use public contributions count if available
    const totalContributions = githubUser.public_repos + githubUser.public_gists + totalCommits;

    // Update profile in database
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        github_username: githubUser.login,
        github_id: githubUser.id.toString(),
        avatar_url: githubUser.avatar_url,
        full_name: githubUser.name || githubUser.login,
        total_commits: totalCommits,
        total_repos: totalRepos,
        total_prs: totalPRs,
        total_contributions: totalContributions,
        languages: languages,
        github_data: {
          login: githubUser.login,
          avatar_url: githubUser.avatar_url,
          name: githubUser.name,
          bio: githubUser.bio,
          public_repos: githubUser.public_repos,
          followers: githubUser.followers,
          following: githubUser.following,
          created_at: githubUser.created_at,
          html_url: githubUser.html_url,
        },
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Error updating profile:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update profile' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          username: githubUser.login,
          avatar_url: githubUser.avatar_url,
          name: githubUser.name,
          bio: githubUser.bio,
          total_commits: totalCommits,
          total_repos: totalRepos,
          total_prs: totalPRs,
          total_contributions: totalContributions,
          languages: languages,
          public_repos: githubUser.public_repos,
          followers: githubUser.followers,
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
