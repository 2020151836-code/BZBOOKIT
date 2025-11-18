import { useEffect } from 'react';
import { supabase } from './lib/supabase';

export default function TestSupabase() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.from('client').select('*').limit(1);
      if (error) {
        console.error('❌ Supabase connection failed:', error.message);
      } else {
        console.log('✅ Supabase connection successful! Sample data:', data);
      }
    }
    testConnection();
  }, []);

  return <div>Check the console for Supabase connection result</div>;
}
