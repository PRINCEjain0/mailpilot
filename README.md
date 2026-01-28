# MailPilot

- Email scheduling system built to send emails reliably at a future time
- Uses background jobs instead of cron-based scheduling
- Designed with production reliability in mind

## Problem
- Cron jobs fail on server restarts
- Scheduled tasks can be lost during crashes
- Scaling cron-based systems is difficult

## How it works
- User schedules an email from the frontend
- Backend stores schedule and metadata in MySQL
- A delayed job is added to Redis using BullMQ
- Worker processes the job at the scheduled time
- Email is sent and status is updated

## Tech stack

Frontend
- Next.js
- TypeScript
- Tailwind CSS

Backend
- Next.js API routes
- Node.js

Queue
- Redis
- BullMQ

Database
- MySQL

## Why Redis and BullMQ
- Jobs persist even if the server restarts
- Built-in retries with backoff
- Workers can scale independently

## Failure handling
- Failed emails are retried automatically
- Jobs are not lost on crashes
- Backoff prevents repeated failures

## Setup
- Clone the repository
- Install dependencies
- Start Redis
- Run dev server
- Run worker

## Author
- Prince Jain
