import { db } from "~/server/db";

async function checkRepositories() {
  const repos = await db.repository.findMany();
  console.log("Found repositories:", repos.length);
  console.log("Repositories:", repos);
}

checkRepositories()
  .catch(console.error)
  .finally(() => db.$disconnect());
