import { NextResponse } from 'next/server';
import { exchangeStravaCode } from '../../../../lib/strava';
import { supabase } from '../../../../lib/supabase';

export async function GET(request: Request) {
  // Get the authorization code from the URL
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  
  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/profile?error=missing_code`);
  }
  
  try {
    // Exchange the code for access and refresh tokens
    const tokenData = await exchangeStravaCode(code);
    
    // Get the current user (in a real app, would come from auth)
    const userId = 'user123'; // Placeholder
    
    // Store the tokens in the database
    const { error } = await supabase
      .from('user_connections')
      .upsert({
        user_id: userId,
        provider: 'strava',
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_at: new Date(tokenData.expires_at * 1000).toISOString(),
        athlete_id: tokenData.athlete.id
      });
    
    if (error) {
      console.error('Error storing Strava tokens:', error);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/profile?error=database_error`);
    }
    
    // Update user profile to mark Strava as connected
    await supabase
      .from('user_profiles')
      .update({ strava_connected: true })
      .eq('id', userId);
    
    // Redirect back to the profile page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/profile?success=strava_connected`);
  } catch (error) {
    console.error('Error exchanging Strava code:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/profile?error=auth_error`);
  }
}