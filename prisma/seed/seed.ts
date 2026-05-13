import { prisma } from "@/lib/prisma";
import supabaseAdmin from "@/lib/supabase/admin";

const main = async () => {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: "FatmaIbrahim@crm.com",
    password: "FatmaIbrahim123",
    email_confirm: true,
  });

  if (error) {
    console.error("Error creating admin user:", error);
    throw error;
  }

  console.log(`Admin user created: ${data.user.id}`);

  const admin = await prisma.profile.create({
    data: {
      id: data.user.id,
      email: "fatmaibrahim@crm.com",
      name: "Fatma Ibrahim",
      role: "ADMIN",
    },
  });

  console.log(`Admin created: ${admin.id}`);
};

main().catch((e) => {
  console.error(e);
});
