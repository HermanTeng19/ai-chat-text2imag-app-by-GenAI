# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
- Add: CHANGELOG.md to track major changes.
- Docs: Add troubleshooting section to README for Firebase Storage CORS setup, including steps for enabling Storage, finding the bucket name, and setting CORS with gsutil.
- Docs: Document common errors (e.g., NotFoundException: 404 The specified bucket does not exist) and solutions for Firebase Storage setup.
- Feat: Make chat input box multi-line and auto-resizing for long prompts.
- Chore: Update cors.json to include deployed domain (https://chat.aibytes.dpdns.org) for CORS support.
- Docs: Add troubleshooting notes to README for CORS and Firebase Auth (Google login) domain configuration.

## [1.1.0] - 2024-05-11
### Added
- Text-to-image generation feature: users can type `/image your prompt` to generate and display images in chat.
- Integrated Gemini 2.0 Flash Preview image generation API for real AI image responses.
- Chat UI now supports image messages with captions and timestamps.

## [1.0.0] - 2024-05-11
### Added
- Initial release of AI Chatbox Online with Next.js, TypeScript, and Tailwind CSS.
- Chat interface with user and AI messages, avatars, and markdown support.
- Gemini API integration for real AI responses.
- Framer Motion animations for chat messages, input, and header.
- Vibrant, modern UI redesign with Tailwind CSS.
- User and AI avatars generated and displayed in chat.
- Markdown rendering for AI responses with styled output.
- User messages fully right-aligned, AI messages left-aligned.

### Fixed
- Avatar images not displaying due to invalid DiceBear API parameters (now use valid hex colors).
- Markdown rendering errors with react-markdown (now uses correct props and wrappers).

### Improved
- Enhanced chat layout, spacing, and visual clarity.
- Added clear distinction between user and AI messages. 