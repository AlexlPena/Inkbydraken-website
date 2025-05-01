-- This is just for reference, we'll create this function in Supabase
CREATE OR REPLACE FUNCTION get_admin_users_columns()
RETURNS JSONB AS $$
BEGIN
  RETURN (
    SELECT jsonb_agg(column_name)
    FROM information_schema.columns
    WHERE table_name = 'admin_users'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
