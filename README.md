MailPilot

MailPilot is an email scheduling system built to reliably send emails at a future time using background jobs instead of cron hacks.

Problem

Scheduling emails is unreliable when servers restart or traffic spikes. Cron jobs fail easily and do not scale.

MailPilot uses a queue-based system so scheduled emails are not lost and can be retried safely.

How it works

User schedules an email
Backend stores data in MySQL
A delayed job is added to Redis using BullMQ
Worker sends the email at the scheduled time
Status is updated

Tech stack

Frontend
Next.js
TypeScript
Tailwind CSS

Backend
Next.js API routes
Node.js

Queue
Redis
BullMQ

Database
MySQL

Why Redis and BullMQ

Jobs persist even if the server restarts
Retries are built in
Workers can scale independently

Failure handling

Failed emails are retried automatically
Jobs are not lost on crashes
Backoff prevents repeated failures

Setup

Clone the repo
Install dependencies
Start Redis
Run dev server
Run worker

Author

Prince Jain
Building production-focused systems
