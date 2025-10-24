// API Route for Talent Pool Registration
// POST /api/talent-pool

import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    const { fullName, email, country, fieldOfExperience, experienceLevel, skills, cvUrl, videoUrl } = body

    // Validate required fields
    if (!fullName || !email || !country || !fieldOfExperience || !experienceLevel) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if email already exists
    const { data: existing } = await supabase.from("talent_pool_profiles").select("id").eq("email", email).single()

    if (existing) {
      return NextResponse.json({ error: "Email already registered in talent pool" }, { status: 409 })
    }

    // Insert into talent_pool_profiles table
    const { data, error } = await supabase
      .from("talent_pool_profiles")
      .insert([
        {
          full_name: fullName,
          email,
          country,
          field_of_experience: fieldOfExperience,
          experience_level: experienceLevel,
          skills: skills || [],
          cv_url: cvUrl,
          video_url: videoUrl,
          profile_status: "pending",
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to register in talent pool" }, { status: 500 })
    }

    // TODO: Send confirmation email
    // TODO: Notify admins of new talent pool registration

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
