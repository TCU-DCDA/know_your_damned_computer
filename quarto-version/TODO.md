# Quarto Version To-Do List

## Immediate Tasks
- [x] **Fix Quarto build warnings**: Address unclosed divs in `command-line.qmd`, `file-paths.qmd`, and potentially others. The raw HTML wrapping process may have missed some closing tags or introduced nesting issues.
- [x] **Finalize `about.qmd`**: Complete the content for the About page.
- [x] **Verify Internal Links**: Ensure all links between guides and to images work correctly in the generated site. (Fixed Jekyll-style links)
- [ ] **Test Interactivity**: Manually verify that all quizzes, terminal simulators, and interactive exercises function correctly in the browser (check console for errors).
- [ ] **Exposed Code**: Work not complete on exposed code.

## Future Improvements
- [ ] **Implement "Copy to Clipboard"**: Check if Quarto's native code blocks support this or if we need to add it to our custom blocks.
- [ ] **Mobile Optimization**: Refine CSS for better mobile experience, especially for the terminal simulator.
- [ ] **Automated Deployment**: Set up GitHub Actions to build and publish the Quarto site automatically on push.
- [ ] **PDF Generation**: Test and configure PDF output for printable handouts.
