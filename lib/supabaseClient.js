import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uzkqnazbkmruwvjiqhsa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6a3FuYXpia21ydXd2amlxaHNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTExOTEsImV4cCI6MjA5MTcyNzE5MX0.QJ2oMuLSLm1yHURBM1HMYSzm7zDIZDCxQGzCKunIVnU'

export const supabase = createClient(supabaseUrl, supabaseKey)