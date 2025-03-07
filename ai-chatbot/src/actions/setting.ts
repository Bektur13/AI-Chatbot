//import { db } from "@/lib/db"; // Ensure this is your NeonDB connection

// export async function onIntegrateDomain(domain: string, icon: string) {
//   try {
//     const result = await db.domain.create({
//       data: { name: domain, icon },
//     });

//     return { status: 200, message: "Domain added successfully", domain: result };
//   } catch (error) {
//     console.error("Error adding domain:", error);
//     return { status: 500, message: "Failed to add domain" };
//   }
// }
 



"use server";
import { currentUser } from "@clerk/nextjs/server"; // Fetch the current authenticated user
import { prisma } from "@/lib/prisma"; // Prisma client for database operations

export const onIntegrateDomain = async (domain: string, icon: string) => {
  const user = await currentUser();
  if (!user) return { status: 401, message: "Unauthorized" };

  try {
    // TODO: Fetch the user's subscription and count their current domains.
    // Fetching the user's subscription and count their current domains.
    const userSubscription = await prisma.campaign.findFirst({
        where: {userId: user.id},
    });

    if(!userSubscription) {
        return { status: 403, messag: "No active subscriptions"};
    };

    const userDomainsCount = await prisma.domain.count({
        where: { userId: user.id },
    });

    // TODO: Check if the domain already exists.
    // Checking if the domain already exists.
    const existingDomain = await prisma.domain.findFirst({
        where: {name: domain},
    });

    if(existingDomain) {
        return {status: 400, message: "Domain already exist"};
    };

    // TODO: Check the subscription plan and enforce limits.
    // Checking the subscription plan and enforce limits.
    const domainLimit = await userSubscription.name == "premuim" ? 10 : 1;
    if(userDomainsCount >= domainLimit) {
      return {status: 403, message: "Domain limit exceeded"};
    };
    

    // TODO: Create a new domain entry and link it to the user.
    // Creating a new domain entry and link it to the user.
    await prisma.domain.create({
      data: {
        name: domain,
        icon: icon,
        userId: user.id,
        campaignId: userSubscription.id,
      },

    });

    return { status: 200, message: "Domain successfully added" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
};
