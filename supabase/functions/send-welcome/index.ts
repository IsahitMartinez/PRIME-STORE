import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const resendApiKey = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'PRIME <onboarding@resend.dev>',
        to: [email],
        subject: 'VISTE PREMIUM. Bienvenido a PRIME',
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; text-align: center; padding: 40px 20px; background-color: #fefefc; color: #000;">
            <h1 style="font-size: 48px; letter-spacing: 4px; margin-bottom: 10px; font-weight: 900;">PRIME</h1>
            <p style="font-size: 12px; letter-spacing: 3px; color: #666; text-transform: uppercase;">Viste y entrena premium</p>
            <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0;" />
            <h2 style="font-size: 24px; margin-bottom: 20px;">¡Ya estás en la lista!</h2>
            <p style="font-size: 16px; color: #444; line-height: 1.6; max-w-md; margin: 0 auto 40px auto;">
              Gracias por unirte. Te avisaremos antes que a nadie sobre los nuevos drops, restocks y promociones exclusivas.
            </p>
            <a href="https://tutienda.com" style="background-color: #000; color: #fff; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 14px; letter-spacing: 2px;">
              IR AL CATÁLOGO
            </a>
          </div>
        `
      }),
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})