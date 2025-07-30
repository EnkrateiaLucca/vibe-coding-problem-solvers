# Vibe Coding for Problem Solvers - Presentation Summary

**Presenter:** Lucas Soares  
**Date:** August 5, 2025  
**Event:** O'Reilly Live Training

## Overview

This presentation introduces the concept of "Vibe Coding" - building software with LLMs without reviewing the generated code - and teaches responsible AI-augmented development practices. The training covers when vibe coding is appropriate, core skills needed, and practical patterns for effective AI collaboration.

## Key Definitions

### Vibe Coding vs AI-Assisted Programming

**Vibe Coding** (Simon Willison, 2025): "Building software with an LLM without reviewing the code it writes"
- Fast development velocity
- Minimal code review
- Appropriate for throwaway projects and prototypes

**AI-Assisted Programming**: Review, understand, and take accountability for AI-generated code
- Balanced approach using AI as a "typing assistant"
- Maintains developer oversight and understanding

## When to Use Vibe Coding

### ✅ Safe Vibe Coding Zone
- Throwaway weekend projects
- Low-stakes experiments
- Learning and building intuition
- One-off data processing scripts
- Personal prototypes

### ❌ NOT for Production
- Complex, long-term systems
- Security-critical applications
- Code that others must maintain
- High-stakes business logic

## The 7 Core Vibe Coding Skills

### Basic Skills (1-4)

1. **Prompting**: Clear, specific instructions with examples and role assignment
2. **Context Management**: Strategic information loading and context refresh techniques
3. **Capability Assignment**: Knowing what to delegate to AI vs. retain human control
4. **Vibe Checking**: Lightweight verification without over-engineering

### Advanced Skills (5-7)

5. **Strategic Cognitive Offloading**: 70/30 rule - 70% AI-assisted, 30% independent work
6. **Personal Benchmarking**: Creating custom evaluation frameworks for AI collaboration effectiveness
7. **Agentic Task Orchestration**: Coordinating multiple AI agents working together autonomously

## Tool Landscape

### Web Builders
- **Claude (artifacts)** - $20/month - Safe sandbox prototyping
- **ChatGPT (canvas)** - $20/month
- **Vercel v0** - $20/month - React + production deployment
- **Lovable** - $25/month

### IDE Integration
- **Cursor** - $20/month - Full codebase understanding
- **GitHub Copilot** - $10/month - Code completion workflows
- **Codium Windsurf** - $50-250/month

### Terminal Agents
- **Claude Code** - $17-200/month - Mobile coding, file access
- **Aider** - API costs only - Git integration, autonomous

### Cloud Environments
- **Replit** - $7-25/month - Full dev environment
- **CodeSandbox** - Free-$20/month - Instant web development

## 12 Practical Vibe Coding Patterns

1. **Start with Prototypes**: Fuzzy Instruction → Prototype → Refine
2. **Vibe Checking Checklist**: LLM Output → Check → Custom validation
3. **Provide Clear Specs**: Prompt for Spec → LLM Feedback → Refined Spec
4. **Restart When Stuck**: Clear context → Transfer relevant context → Re-prompt
5. **Let It See What You See**: Share screenshots, errors, and context
6. **Automate Repeatable Steps**: Create reusable scripts and workflows
7. **Build Personal Benchmarks**: Track failed outputs for later retesting
8. **Store Formatting Prompts**: Save transformation patterns for reuse
9. **Generate Synthetic Data**: Test with AI-generated sample data first
10. **Voice Workflows**: Use voice for initial long instructions
11. **Context-Based Coding**: Use official, up-to-date documentation
12. **Raw to Structured**: Transform unstructured input to structured output

## Case Study: Open Sauce 2025 Schedule App

Simon Willison demonstrated vibe coding by building a complete mobile schedule app entirely on his iPhone:

- **Tools Used**: OpenAI Codex (autonomous scraping) + Claude Artifacts (UI generation)
- **Timeline**: Complete app deployed in under 3 hours
- **Challenge**: Initial version downloaded 130MB due to unoptimized images
- **Solution**: One Codex prompt reduced size to 93.58 KB (1,400x smaller)
- **Key Lesson**: Even low-stakes projects need verification ("vibe checking")

## Prompting Modes

### Exploration Mode
"What are the ways to do X?" - For research and getting to a specification document

### Execution Mode
"Write this function, add tests, refactor" - For prototyping solutions

## Critical Success Metrics

- **Speed**: Can you ship projects you wouldn't have started before?
- **Confidence**: Do you trust your vibe checks and AI collaboration?
- **Discernment**: Can you distinguish appropriate vs inappropriate AI use?
- **Accountability**: How much do you understand and own your code?

## Risk Management

### The 70-30 Rule for Cognitive Load Distribution
- **70% AI-Assisted**: Routine tasks, boilerplate, research
- **30% Independent**: Core skills, critical thinking, design

### Cognitive Skill Atrophy Warning
Research shows significant negative correlation between frequent AI tool usage and critical thinking abilities. Maintain regular "AI-free" practice sessions.

## Best Practices

### Daily AI Habits
- Use AI for every coding task
- Practice extremely specific prompts
- Know your model's training cut-off dates
- Test/vibe check immediately, always

### Weekly Skill Building
- Try one pure vibe coding experiment
- Practice vibe checking workflows
- Explore new AI tools/models
- Document what works for you

## Key Insights

1. **Vibe Coding ≠ AI-Assisted Programming**: Important distinction for responsible development
2. **Context Engineering**: Quality of output is proportional to context quality
3. **Strategic Offloading**: Amplify human intelligence, don't replace it
4. **Personal Benchmarking**: Measure actual performance, not just perceived productivity
5. **Intent Translation**: Core skill is translating human intent into AI-executable instructions

## The Paradigm Shift

From individual contributor writing code to orchestration developer coordinating intelligent agent clusters. Similar to transitioning from IC to engineering management - requires new skills in coordination, strategy, and system design.

## Resources and Tools

### Context Engineering Tools
- **gitingest.com**: Turn GitHub repos into LLM-ready context
- **repomix**: Pack repository contents into single file
- **files-to-prompt**: CLI tool for file concatenation
- **r.jina.ai**: Clean web content extraction
- **arxiv-txt**: Convert arXiv papers to clean text

### Model Selection Resources
- **LM Arena Leaderboard**: Community-driven LLM rankings
- **Artificial Analysis**: Up-to-date model comparisons and benchmarks

## Conclusion

Vibe coding represents a strategic approach to AI-augmented development that balances speed with responsibility. The key is developing discernment about when to use vibe coding appropriately while maintaining core programming skills through strategic cognitive offloading and regular independent practice.

The future developer will be an orchestrator of AI agent clusters, requiring new skills in coordination, strategy, and system design rather than just writing individual lines of code.

---

*"We need to turn a solitary interaction with an AI into a shared journey with a community, and to move them towards learning the important lessons about engineering."* - Armin Ronacher

## Contact Information

- **Course Materials**: https://github.com/EnkrateiaLucca/vibe-coding-problem-solvers
- **LinkedIn**: https://www.linkedin.com/in/lucas-soares-969044167/
- **Twitter/X**: @LucasEnkrateia
- **YouTube**: @automatalearninglab
- **Email**: lucasenkrateia@gmail.com