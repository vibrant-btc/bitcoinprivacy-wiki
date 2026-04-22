# Deploying BitcoinPrivacy.Wiki to GitLab Pages

This guide walks you through deploying your MkDocs site to GitLab Pages with your custom domain `bitcoinprivacy.wiki`.

---

## Prerequisites

- You have a GitLab account
- You have access to your domain's DNS settings (for `bitcoinprivacy.wiki`)
- Your project is in `/config/workspace/bitcoinprivacy-wiki`

---

## Step 1: Initialize Git Repository

Your project is not yet a Git repository. Run these commands to initialize:

```bash
cd /config/workspace/bitcoinprivacy-wiki
git init
git add .
git commit -m "Initial commit: BitcoinPrivacy.Wiki MkDocs site"
```

**What this does:**
- `git init` - Creates a new Git repository in your project folder
- `git add .` - Stages all files (except those in `.gitignore` like `venv/`)
- `git commit` - Creates your first commit with a descriptive message

---

## Step 2: Create a GitLab Repository

1. **Go to GitLab**: Open your browser and navigate to [gitlab.com](https://gitlab.com)
2. **Sign in** to your GitLab account
3. **Create a new project**:
   - Click the **"+"** button (top right) or go to **Projects > Create new project**
   - Select **"Create blank project"**
   - Fill in:
     - **Project name**: `bitcoinprivacy-wiki` (or your preferred name)
     - **Project slug**: This auto-fills based on project name
     - **Visibility**: Choose **Public** (so anyone can view your documentation)
   - Click **"Create project"**
4. **Copy the repository URL** - It will look like:
   ```
   https://gitlab.com/YOUR_USERNAME/bitcoinprivacy-wiki.git
   ```

---

## Step 3: Connect Local Repository to GitLab

Replace `YOUR_USERNAME` with your actual GitLab username:

```bash
cd /config/workspace/bitcoinprivacy-wiki
git remote add origin https://gitlab.com/YOUR_USERNAME/bitcoinprivacy-wiki.git
git branch -M main
git push -u origin main
```

**What this does:**
- `git remote add origin` - Links your local repo to GitLab
- `git branch -M main` - Renames your default branch to `main`
- `git push -u origin main` - Pushes your code to GitLab

**Note:** You may be asked to authenticate with GitLab. You can use:
- **HTTPS with Personal Access Token** (recommended for beginners)
- **SSH keys** (more secure, but requires setup)

---

## Step 4: Verify the CI/CD Pipeline

After pushing, GitLab automatically starts the CI/CD pipeline because of the `.gitlab-ci.yml` file.

1. Go to your project on GitLab
2. Navigate to **CI/CD > Pipelines** in the left sidebar
3. You should see a pipeline running - click on it to see details
4. Click on the `pages` job to see the build logs
5. Wait for it to show a **green checkmark** (success)

**What's happening:**
- GitLab reads `.gitlab-ci.yml`
- It spins up a Python container
- Installs `mkdocs-material`
- Runs `mkdocs build --site-dir public`
- Publishes the `public` folder to GitLab Pages

---

## Step 5: Access Your Site

Once the pipeline succeeds:

1. Go to **Deploy > Pages** in the left sidebar
2. You'll see your site URL. It will be something like:
   ```
   https://YOUR_USERNAME.gitlab.io/bitcoinprivacy-wiki/
   ```
3. **Important:** Since GitLab 17.4, sites use a "unique domain" by default. If you prefer the traditional URL structure:
   - Go to **Settings > Pages**
   - Under **Unique domain settings**, **uncheck** "Use unique domain"
   - Click **Save changes**
   - Your site will now be at: `https://YOUR_USERNAME.gitlab.io/bitcoinprivacy-wiki/`

---

## Step 6: Configure Your Custom Domain (bitcoinprivacy.wiki)

### 6.1: Add the Custom Domain in GitLab

1. Go to your project on GitLab
2. Navigate to **Settings > Pages**
3. Scroll to **"Custom domains"** section
4. Click **"New domain"**
5. Enter: `bitcoinprivacy.wiki`
6. Check **"Use HTTPS"** (Let's Encrypt certificate - recommended)
7. Click **"Create domain"**

GitLab will show you DNS records you need to configure.

### 6.2: Configure DNS Records

You need to add DNS records at your domain registrar (where you bought `bitcoinprivacy.wiki`).

**Option A: Using a CNAME record (recommended if using the default GitLab Pages URL)**

Add a **CNAME** record:
```
Type: CNAME
Name: @ (or leave blank, depending on your registrar)
Value: YOUR_USERNAME.gitlab.io.
TTL: 3600 (or default)
```

**Option B: Using A records (if CNAME is not supported for apex domains)**

Add **A** records pointing to GitLab Pages IPs:
```
Type: A
Name: @
Value: 35.185.44.232
TTL: 3600

Type: A
Name: @
Value: 35.185.44.232
TTL: 3600
```

**Note:** GitLab Pages supports multiple IPs for redundancy. Check GitLab's current documentation for the complete list of IPs.

### 6.3: Wait for DNS Propagation

DNS changes can take **up to 48 hours** to propagate globally, but usually complete within a few hours.

You can check propagation status:
```bash
# Check if DNS is resolving
dig bitcoinprivacy.wiki

# Or use an online tool like:
# https://dnschecker.org/
```

### 6.4: Verify HTTPS

Once DNS propagates:
1. Go back to **Settings > Pages** in GitLab
2. Verify the certificate status shows as **active**
3. Visit `https://bitcoinprivacy.wiki` to confirm your site is live

---

## Step 7: Update Your MkDocs Configuration (Optional)

Your `mkdocs.yml` already has the correct `site_url`:

```yaml
site_url: https://bitcoinprivacy.wiki
```

This ensures all internal links and the sitemap reference your custom domain.

---

## Making Future Updates

Every time you want to update your site:

```bash
cd /config/workspace/bitcoinprivacy-wiki
git add .
git commit -m "Describe your changes"
git push
```

The CI/CD pipeline will automatically rebuild and deploy your site.

---

## Troubleshooting

### Pipeline Fails

1. **Check the logs**: Go to **CI/CD > Pipelines** and click on the failed job
2. **Common issues**:
   - `mkdocs-material` not installed: The `.gitlab-ci.yml` handles this
   - Build errors: Check your `mkdocs.yml` for syntax errors

### Site Not Accessible

1. **Check Pages settings**: Go to **Settings > Pages** and verify the domain is configured
2. **Check DNS**: Use `dig bitcoinprivacy.wiki` to verify DNS resolution
3. **Wait**: DNS propagation can take time

### Custom Domain Not Working

1. **Verify DNS records**: Make sure you added the correct records at your registrar
2. **Check certificate status**: In **Settings > Pages**, verify HTTPS is active
3. **Clear browser cache**: Try opening in an incognito window

### 404 Errors on Pages

1. Make sure your `.gitlab-ci.yml` uses `--site-dir public`
2. Verify the `public` directory is being published in the artifacts

---

## File Structure Summary

```
bitcoinprivacy-wiki/
├── .gitignore          # Excludes venv/ and other files
├── .gitlab-ci.yml      # GitLab CI/CD configuration
├── mkdocs.yml          # MkDocs configuration
├── docs/               # Your documentation content
│   ├── index.md
│   ├── getting-started/
│   ├── techniques/
│   └── ...
└── venv/               # IGNORED by git (local virtual environment)
```

---

## Quick Reference Commands

```bash
# Initialize git (one-time)
git init
git add .
git commit -m "Initial commit"

# Connect to GitLab (one-time)
git remote add origin https://gitlab.com/YOUR_USERNAME/bitcoinprivacy-wiki.git
git branch -M main
git push -u origin main

# Update and deploy (use for every change)
git add .
git commit -m "Your message"
git push

# Check git status
git status

# View recent commits
git log --oneline
```

---

## Summary Checklist

- [ ] Created `.gitignore` file (done)
- [ ] Created `.gitlab-ci.yml` file (done)
- [ ] Initialized Git repository
- [ ] Created GitLab project
- [ ] Pushed code to GitLab
- [ ] Verified CI/CD pipeline succeeded
- [ ] Accessed site at GitLab Pages URL
- [ ] Added custom domain in GitLab Settings > Pages
- [ ] Configured DNS records at domain registrar
- [ ] Verified site at https://bitcoinprivacy.wiki

Good luck with your deployment!
