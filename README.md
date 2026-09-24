# AI Call Center
An AI-powered call center platform built with NestJS, React, PostgreSQL, and local LLMs.

## AI Workflow
Customer Question
        ↓
Intent Analysis
        ↓
Customer / Contract Context
        ↓
Policy Search (RAG)
        ↓
Relevant Policy Chunks
        ↓
LLM
        ↓
Suggested Answer
        ↓
Agent Review

The goal is not to let the LLM answer from general knowledge alone. The system retrieves relevant business data and policy documents first, then uses the LLM to generate a grounded response for the call center agent.

**Nestjs**
`pnpm start:dev`

**Drizzle**
`pnpm db generate`
`pnpm db migrate`
`pnpm db studio`

**React**
`pnpm dev`
