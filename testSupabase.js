import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qggqambesqbbbmxvdzug.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZ3FhbWJlc3FiYmJteHZkenVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMzk5OTMsImV4cCI6MjA3ODgxNTk5M30.hqNAWJrryvo4bfqEwXHWKEY2hevkuCNgV0MYf7nuHcg';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  const { data, error } = await supabase.from('client').select('*').limit(1);
  if (error) {
    console.error('❌ Supabase connection failed:', error.message);
  } else {
    console.log('✅ Supabase connection successful! Sample data:', data);
  }
}

testConnection();
