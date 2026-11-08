import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'El correo es requerido' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY')

    if (!BREVO_API_KEY) {
      throw new Error('Falta la variable BREVO_API_KEY en los secretos de Supabase.')
    }

    // Petición a la API de Brevo
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'PRIME STREETWEAR',
          email: 'manuelpc110907@gmail.com', 
        },
        to: [
          {
            email: email,
          },
        ],
        subject: '¡Bienvenido a la comunidad PRIME! 🔥',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; background-color: #000000; color: #ffffff; padding: 40px 20px; text-align: center;">
            <h1 style="font-size: 36px; letter-spacing: 2px; margin-bottom: 20px; font-weight: bold;">BIENVENIDO A PRIME</h1>
            <p style="font-size: 16px; color: #cccccc; line-height: 1.6; max-width: 500px; margin: 0 auto 30px auto;">
              Gracias por unirte. A partir de ahora serás el primero en enterarte de nuestros nuevos drops, restocks exclusivos y promociones especiales.
            </p>
            <div style="margin-top: 30px;">
              <span style="font-size: 12px; color: #666666; tracking: 1px; uppercase;">PRIME STREETWEAR &copy; 2026</span>
            </div>
          </div>
        `,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Error de Brevo:', data)
      throw new Error(data.message || 'Error al enviar correo')
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Error interno:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})