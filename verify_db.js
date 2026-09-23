
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("=== DB Verification ===");
  
  // Total roadmaps
  const { data: roadmaps, error: rErr } = await supabase.from('roadmaps').select('*');
  if (rErr) console.error("Error fetching roadmaps:", rErr);
  
  const published = roadmaps.filter(r => r.status === 'PUBLISHED').length;
  const upcoming = roadmaps.filter(r => r.status === 'UPCOMING').length;
  
  console.log(`Total roadmaps: ${roadmaps.length}`);
  console.log(`PUBLISHED: ${published}`);
  console.log(`UPCOMING: ${upcoming}`);

  // AI Engineering nodes
  const { data: nodes, error: nErr } = await supabase.from('roadmap_nodes').select('*').eq('roadmap_id', 'ai-engineering');
  if (nErr) console.error("Error fetching nodes:", nErr);
  console.log(`AI Engineering nodes: ${nodes ? nodes.length : 0}`);

  // AI Engineering resources
  let resErr = null;
  let resources = null;
  try {
    const res = await supabase.rpc('get_resources_for_roadmap', { p_roadmap_id: 'ai-engineering' });
    resources = res.data;
    resErr = res.error;
  } catch (e) {}
  
  // if rpc fails, we can query resources manually by node_ids
  if (nodes && nodes.length > 0) {
    const nodeIds = nodes.map(n => n.id);
    const { data: res, error: resErr2 } = await supabase.from('resources').select('*').in('node_id', nodeIds);
    console.log(`AI Engineering resources: ${res ? res.length : 0}`);
  }

  // Check if fetchRoadmapById logic works
  const { data: fullRoadmap, error } = await supabase
    .from('roadmaps')
    .select(`
      *,
      nodes:roadmap_nodes (
        *,
        topics:roadmap_topics(*),
        resources(*)
      )
    `)
    .eq('id', 'ai-engineering')
    .single();
    
  if (error) {
    console.log("Error querying full nested roadmap:", error);
  } else {
    console.log("Successfully fetched full nested AI Engineering roadmap!");
    console.log("Nodes nested count:", fullRoadmap.nodes ? fullRoadmap.nodes.length : 0);
  }
}

run();
