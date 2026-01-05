import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://warancqgeazmashndner.supabase.co'
const supabaseKey = 'sb_publishable_BALcs4WfEG-34C8LKyIcMA_EJAG6-ge'

export const supabase = createClient(supabaseUrl, supabaseKey)