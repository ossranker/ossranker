import { db } from "~/server/db"

async function checkRepositories() {
  const repos = await db.repository.findMany()
  console.log("Found repositories:", repos.length)
  console.log("Repositories:", repos)
}

void (async () => {
  try {
    await checkRepositories()
  } catch (error: unknown) {
    console.error(error)
  } finally {
    await db.$disconnect()
  }
})()
