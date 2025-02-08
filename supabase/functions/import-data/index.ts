
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "./utils.ts";
import { processPriceLabsData } from "./processors/pricelabs.ts";
import { processHostawayData } from "./processors/hostaway.ts";
import { processBookingsData } from "./processors/bookings.ts";
import { processGuestsData } from "./processors/guests.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const files = formData.getAll('files');

    if (!files || files.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No files provided' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    const results = [];
    
    for (const file of files) {
      if (!(file instanceof File)) {
        console.error('Invalid file object received');
        continue;
      }

      try {
        // Read the file content
        const fileContent = await file.text();
        let parsedData;

        // Try to parse as JSON
        try {
          parsedData = JSON.parse(fileContent);
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          results.push({
            filename: file.name,
            status: 'error',
            error: 'Invalid JSON format'
          });
          continue;
        }

        // Process data based on file type
        if (file.name.toLowerCase().includes('pricelabs')) {
          await processPriceLabsData(parsedData);
        }

        if (file.name.toLowerCase().includes('hostaway')) {
          await processHostawayData(parsedData);
        }

        // Process bookings and guests data
        await processBookingsData(parsedData);
        await processGuestsData(parsedData);

        results.push({
          filename: file.name,
          status: 'success'
        });

      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
        results.push({
          filename: file.name,
          status: 'error',
          error: fileError.message
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        message: 'Files processed',
        results,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in import-data function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
