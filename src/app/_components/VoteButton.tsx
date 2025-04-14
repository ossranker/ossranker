"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

interface VoteButtonProps {
  repoId: string
  currentVotes: number
  isCurrentVote: boolean
  repoName: string
}

function Spinner() {
  return (
    <div className="h-4 w-4 animate-spin">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-4 w-4">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  )
}

export function VoteButton({ repoId, currentVotes: initialVotes, isCurrentVote: initialVoteState, repoName }: VoteButtonProps) {
  const [isVoting, setIsVoting] = useState(false)
  const [animateVote, setAnimateVote] = useState(false)

  const handleVote = async () => {
    if (isVoting) return

    const toastId = toast.loading(initialVoteState ? "Removing vote..." : "Submitting vote...")

    try {
      setIsVoting(true)
      setAnimateVote(true)

      const response = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoId })
      })

      if (!response.ok) throw new Error("Failed to vote")

      // Show success toast
      toast.success(initialVoteState ? `Vote removed from ${repoName}` : `Voted for ${repoName}`, {
        id: toastId,
        duration: 2000
      })

      // Wait for animation and toast, then refresh
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error("Vote failed:", error)
      setAnimateVote(false)

      // Show error toast
      toast.error("Failed to submit vote. Please try again.", {
        id: toastId
      })
      setIsVoting(false)
    }
  }

  return (
    <motion.button
      onClick={handleVote}
      disabled={isVoting}
      className={`relative flex min-w-[90px] cursor-pointer items-center justify-between gap-3 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed ${
        initialVoteState
          ? "bg-teal-500/20 text-teal-500 ring-1 ring-teal-500/50 dark:text-teal-400 dark:ring-teal-400/50"
          : "bg-teal-500/10 text-teal-500 hover:bg-teal-500/20 dark:text-teal-400 dark:hover:bg-teal-500/20"
      }`}
      whileHover={{ scale: 1.02 }}
    >
      <AnimatePresence>
        {animateVote && <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} className="absolute inset-0 rounded-md bg-teal-500/20" />}
      </AnimatePresence>
      {!isVoting && (
        <span className="relative tabular-nums">
          <AnimatePresence mode="wait">
            <motion.span key={initialVotes} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {initialVotes}
            </motion.span>
          </AnimatePresence>
        </span>
      )}
      <span className={`relative flex items-center gap-2 ${isVoting ? "mx-auto" : ""}`}>
        {isVoting ? (
          <>
            <Spinner />
            <span>Voting</span>
          </>
        ) : (
          "Vote"
        )}
      </span>
    </motion.button>
  )
}
