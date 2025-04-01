import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { repoId } = (await req.json()) as { repoId: string };
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get current daily vote
    const dailyVote = (await db.dailyVoteCount.findUnique({
      where: {
        userId_date: {
          userId: session.user.id,
          date: today,
        },
      },
    }));

    // If changing vote, decrement previous repo's count
    if (dailyVote?.repositoryId && dailyVote.repositoryId !== repoId) {
      await db.repository.update({
        where: { id: dailyVote.repositoryId },
        data: { voteCount: { decrement: 1 } },
      });
    }

    // Update or create daily vote
    await db.dailyVoteCount.upsert({
      where: {
        userId_date: {
          userId: session.user.id,
          date: today,
        },
      },
      update: {
        repositoryId: repoId,
      },
      create: {
        userId: session.user.id,
        date: today,
        repositoryId: repoId,
        count: 1,
      },
    });

    // Increment new repo's count if it's a new vote or changed vote
    if (!dailyVote?.repositoryId || dailyVote.repositoryId !== repoId) {
      await db.repository.update({
        where: { id: repoId },
        data: { voteCount: { increment: 1 } },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Vote error:", error);
    return NextResponse.json(
      { error: "Failed to process vote" },
      { status: 500 },
    );
  }
}
