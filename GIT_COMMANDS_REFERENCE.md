# 📚 Git Commands Reference

Quick reference for managing your GitHub repository.

---

## 🔄 Daily Workflow

### Making Changes

```bash
# 1. Make your code changes in the editor

# 2. Check what changed
git status

# 3. Add changes
git add .                    # Add all files
git add file.js              # Add specific file

# 4. Commit with message
git commit -m "Your message here"

# 5. Push to GitHub
git push
```

---

## 📝 Commit Messages Best Practices

### Good Examples:
```bash
git commit -m "Add loading spinner to product card"
git commit -m "Fix 503 error with retry logic"
git commit -m "Update README with setup instructions"
git commit -m "Refactor AI service for better error handling"
```

### Bad Examples:
```bash
git commit -m "fix"              # Too vague
git commit -m "changes"          # Not descriptive
git commit -m "asdfasdf"         # Meaningless
```

---

## 🌿 Branching

### Create a New Feature

```bash
# Create and switch to new branch
git checkout -b feature-name

# Make your changes...
git add .
git commit -m "Add new feature"

# Push branch to GitHub
git push -u origin feature-name
```

### Switch Between Branches

```bash
# List all branches
git branch

# Switch to main branch
git checkout main

# Switch to feature branch
git checkout feature-name
```

### Merge Feature to Main

```bash
# Switch to main
git checkout main

# Merge feature branch
git merge feature-name

# Push to GitHub
git push
```

---

## 🔍 Viewing History

```bash
# View commit history
git log

# View compact history
git log --oneline

# View last 5 commits
git log -5

# View changes in last commit
git show

# View specific file history
git log -- filename.js
```

---

## ↩️ Undoing Changes

### Undo Uncommitted Changes

```bash
# Discard changes in specific file
git checkout -- filename.js

# Discard all uncommitted changes
git checkout -- .

# Remove untracked files
git clean -fd
```

### Undo Last Commit (Keep Changes)

```bash
# Undo commit but keep changes
git reset --soft HEAD~1

# Make fixes...
git add .
git commit -m "Fixed commit message"
```

### Undo Last Commit (Discard Changes)

```bash
# WARNING: This deletes changes!
git reset --hard HEAD~1
```

---

## 🔄 Syncing with GitHub

### Pull Latest Changes

```bash
# Get latest from GitHub
git pull

# Pull specific branch
git pull origin main
```

### Force Pull (Overwrite Local)

```bash
# WARNING: Discards local changes!
git fetch origin
git reset --hard origin/main
```

---

## 🏷️ Tags (Releases)

### Create a Tag

```bash
# Create tag
git tag v1.0.0

# Create tag with message
git tag -a v1.0.0 -m "First release"

# Push tag to GitHub
git push origin v1.0.0

# Push all tags
git push --tags
```

### List Tags

```bash
git tag
```

---

## 🔍 Checking Status

```bash
# See current status
git status

# See what changed
git diff

# See staged changes
git diff --staged

# See changes in specific file
git diff filename.js
```

---

## 🗑️ Removing Files

### Remove from Git Only

```bash
# Remove from git but keep locally
git rm --cached filename.js
git commit -m "Remove file from git"
git push
```

### Remove Completely

```bash
# Remove file
git rm filename.js
git commit -m "Delete file"
git push
```

---

## 📦 Stashing (Temporary Storage)

```bash
# Save changes temporarily
git stash

# View stashed changes
git stash list

# Apply stashed changes
git stash apply

# Apply and remove from stash
git stash pop

# Clear all stashes
git stash clear
```

---

## 🔧 Configuration

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your@email.com"

# View configuration
git config --list

# Set default editor
git config --global core.editor "code"
```

---

## 🚨 Common Issues & Solutions

### Issue: "fatal: remote origin already exists"

```bash
# Remove existing remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/username/repo.git
```

### Issue: Merge Conflicts

```bash
# 1. Pull latest changes
git pull

# 2. If conflicts, edit files manually
# Look for <<<<<<< HEAD markers

# 3. After fixing conflicts
git add .
git commit -m "Resolve merge conflicts"
git push
```

### Issue: Pushed Wrong Commit

```bash
# Undo last commit on GitHub (careful!)
git revert HEAD
git push
```

### Issue: Forgot to Add .gitignore

```bash
# Remove cached files
git rm -r --cached .
git add .
git commit -m "Fix gitignore"
git push
```

---

## 🔐 Security Commands

### Check for Secrets

```bash
# List all tracked files
git ls-files

# Search for .env files
git ls-files | grep .env

# Should only show .env.example!
```

### Remove Sensitive File from History

```bash
# WARNING: Changes history!
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/file" \
  --prune-empty --tag-name-filter cat -- --all

# Force push
git push origin --force --all
```

---

## 📊 Useful Shortcuts

```bash
# Status
git status = git st

# Add all and commit
git add . && git commit -m "message"

# Add and commit in one line
git commit -am "message"  # Only for tracked files

# Push with upstream
git push -u origin main   # First time
git push                  # After that
```

---

## 🎯 Your Project Specific Commands

### Initial Setup (Already Done ✅)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/AnanyaRaj14/Product-card.git
git push -u origin main
```

### Daily Updates
```bash
# After making changes:
git add .
git commit -m "Descriptive message"
git push
```

### Creating a Release
```bash
git tag -a v1.0.0 -m "First release"
git push --tags
```

---

## 🔗 GitHub Web Interface

### Creating Pull Requests
1. Push your branch: `git push -u origin feature-name`
2. Go to GitHub repository
3. Click "Compare & pull request"
4. Add description
5. Click "Create pull request"

### Viewing Changes
- **Commits:** https://github.com/AnanyaRaj14/Product-card/commits
- **Branches:** https://github.com/AnanyaRaj14/Product-card/branches
- **Tags:** https://github.com/AnanyaRaj14/Product-card/tags

---

## 📚 Learn More

- **Git Documentation:** https://git-scm.com/doc
- **GitHub Guides:** https://guides.github.com/
- **Git Cheat Sheet:** https://education.github.com/git-cheat-sheet-education.pdf

---

## ⚡ Quick Reference Card

| Command | Description |
|---------|-------------|
| `git status` | Check status |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Commit with message |
| `git push` | Push to GitHub |
| `git pull` | Pull from GitHub |
| `git log` | View history |
| `git diff` | See changes |
| `git branch` | List branches |
| `git checkout -b name` | Create branch |
| `git merge name` | Merge branch |

---

**Keep this handy for daily Git operations!** 📖
