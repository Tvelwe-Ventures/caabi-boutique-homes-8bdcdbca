import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EvaluationEmailData {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  propertyType: string;
  bedrooms: number;
  estimatedRevenue: number;
  estimatedOccupancy: number;
  averageDailyRate: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: EvaluationEmailData = await req.json();
    console.log("Received evaluation data:", data);

    const emailResponse = await resend.emails.send({
      from: "PropOsphere <reports@caabiboutiquehomes.com>",
      to: [data.email],
      subject: "Your Property Evaluation Report from PropOsphere",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Property Evaluation Report</h1>
          <p>Dear ${data.firstName} ${data.lastName},</p>
          <p>Thank you for using PropOsphere by Caabi. Here's your property evaluation report:</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #444; margin-top: 0;">Property Details</h2>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Property Type:</strong> ${data.propertyType}</p>
            <p><strong>Bedrooms:</strong> ${data.bedrooms}</p>
          </div>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #444; margin-top: 0;">Financial Projections</h2>
            <p><strong>Estimated Annual Revenue:</strong> AED ${data.estimatedRevenue.toLocaleString()}</p>
            <p><strong>Estimated Occupancy Rate:</strong> ${data.estimatedOccupancy}%</p>
            <p><strong>Average Daily Rate:</strong> AED ${data.averageDailyRate.toLocaleString()}</p>
          </div>

          <p style="margin-top: 30px;">
            For a more detailed discussion about your property's potential in the short-term rental market,
            please don't hesitate to contact us.
          </p>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>PropOsphere by Caabi</p>
            <p>This is an automated report. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-evaluation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);