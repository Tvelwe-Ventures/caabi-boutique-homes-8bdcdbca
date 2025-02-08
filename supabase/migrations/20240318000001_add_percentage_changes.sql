
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS revenue_change_percentage DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS rent_change_percentage DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS value_change_percentage DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS occupancy_change_percentage DECIMAL(5,2);
