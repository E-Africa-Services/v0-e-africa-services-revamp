// API Route for Submitting Discovery Call Requests
// POST /api/discovery-calls

import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    // Validate required fields
    const { name, businessName, email, phone, service, requirements, whatsapp } = body

    if (!name || !businessName || !email || !phone || !service || !requirements) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert into discovery_calls table
    const { data, error } = await supabase
      .from("discovery_calls")
      .insert([
        {
          name,
          business_name: businessName,
          email,
          phone,
          whatsapp,
          service,
          requirements,
          status: "pending",
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to submit discovery call request" }, { status: 500 })
    }

    // TODO: Send confirmation email to user
    // TODO: Send notification to admin

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
