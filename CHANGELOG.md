# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
- Add: CHANGELOG.md to track major changes.

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