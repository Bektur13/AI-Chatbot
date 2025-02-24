// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const { id, first_name, last_name } = await req.json();

//     // Save user to NeonDB (PostgreSQL) using Prisma
//     await prisma.user.create({
//       data: {
//         id,
//         fullname: `${first_name || ""} ${last_name || ""}`.trim(), // Store full name
//         clerkId: id, // Store Clerk ID
//         type: "user", // Default user type, modify as needed
//       },
//     });

//     return NextResponse.json({ message: "User created successfully" }, { status: 201 });
//   } catch (error) {
//     console.error("Error saving user:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }





// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// //needs to be changed
// export async function POST(req: Request) {
//   try {
//     const { id, first_name, last_name } = await req.json();

//     // Save user to NeonDB (PostgreSQL) using Prisma
//     await prisma.user.create({
//       data: {
//         id,
//         fullname: `${first_name || ""} ${last_name || ""}`.trim(), // Store full name
//         clerkId: id, // Store Clerk ID
//         type: "user", // Default user type, modify as needed
//       },
//     });

//     return NextResponse.json({ message: "User created successfully" }, { status: 201 });
//   } catch (error) {
//     console.error("Error saving user:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }




import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    console.log("Webhook received");

    // ✅ 1️⃣ Parse request body
    const body = await req.json();
    console.log("Webhook Data:", body);

    const { id, first_name, last_name } = body.data || {};

    if (!id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    // ✅ 2️⃣ Save user to NeonDB (PostgreSQL) using Prisma
    await prisma.user.create({
      data: {
        id,
        fullname: `${first_name || ""} ${last_name || ""}`.trim(),
        clerkId: id,
        type: "user",
      },
    });

    console.log("✅ User created successfully:", id);
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  } catch (error) {
    console.error("❌ Error saving user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { Webhook } from "svix"; // Needed for signature verification
// import { headers } from "next/headers"; // Required for Next.js middleware

// // Clerk Webhook Secret (store in .env file)
// const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

// export async function POST(req: Request) {
//   try {
//     const headersList = headers();
//     const svixId = headersList.get("svix-id");
//     const svixTimestamp = headersList.get("svix-timestamp");
//     const svixSignature = headersList.get("svix-signature");

//     if (!svixId || !svixTimestamp || !svixSignature) {
//       return NextResponse.json({ error: "Missing Clerk webhook headers" }, { status: 400 });
//     }

//     // Read raw request body for verification
//     const payload = await req.text();
//     const webhook = new Webhook(CLERK_WEBHOOK_SECRET!);

//     let event;
//     try {
//       event = webhook.verify(payload, {
//         "svix-id": svixId,
//         "svix-timestamp": svixTimestamp,
//         "svix-signature": svixSignature,
//       });
//     } catch (error) {
//       console.error("Webhook verification failed:", error);
//       return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
//     }

//     // Extract event type and data
//     const { type, data } = event;

//     console.log(`🔔 Received Clerk webhook: ${type}`, data);

//     if (type === "user.created") {
//       const { id, first_name, last_name } = data;

//       // Save user to NeonDB using Prisma
//       await prisma.user.create({
//         data: {
//           id,
//           fullname: `${first_name || ""} ${last_name || ""}`.trim(), // Store full name
//           clerkId: id, // Store Clerk ID
//           type: "user", // Default user type
//         },
//       });

//       return NextResponse.json({ message: "User created successfully" }, { status: 201 });
//     }

//     return NextResponse.json({ message: "Webhook received, but no action taken" }, { status: 200 });
//   } catch (error) {
//     console.error("Error processing webhook:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
