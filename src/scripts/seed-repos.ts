import { db } from "~/server/db";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const repositories = [
  "facebook/react",
  "vuejs/vue",
  "angular/angular",
  "sveltejs/svelte",
  "vercel/next.js",
  "remix-run/remix",
  "prisma/prisma",
  "tailwindlabs/tailwindcss",
  "microsoft/typescript",
  "golang/go",
];

async function seedRepositories() {
  console.log("Starting repository seeding...");

  for (const fullName of repositories) {
    try {
      const [owner, repo] = fullName.split("/");

      console.log(`Fetching ${fullName}...`);

      const { data } = await octokit.repos.get({
        owner,
        repo,
      });

      console.log(`Adding ${fullName} to database...`);

      await db.repository.upsert({
        where: { fullName: data.full_name },
        update: {
          stars: data.stargazers_count,
          description: data.description ?? "",
          url: data.html_url ?? "",
        },
        create: {
          githubId: data.id,
          name: data.name,
          fullName: data.full_name,
          description: data.description ?? "",
          stars: data.stargazers_count,
          url: data.html_url ?? "",
        },
      });

      console.log(`Successfully added ${fullName}`);
    } catch (error) {
      console.error(`Failed to add ${fullName}:`, error);
    }
  }

  console.log("Seeding completed!");
}

seedRepositories()
  .catch(console.error)
  .finally(() => db.$disconnect());
