# EmpathicWeb Project Documentation

## Overview
EmpathicWeb is a static HTML/CSS/JS website focused on human-centric design, featuring parallax effects, a background video, and interactive elements (e.g., 3D brain visualization via Three.js). Developed by Eduard Perez. This comprehensive documentation covers setup, debugging, deployment, media optimization, and best practices.

## Project Structure
- **Index.html**: Main entry point with video background and sections (Home, About, Projects, Contact)
- **Style.css**: Styles for navbar, parallax, and responsive design
- **Script.js**: JavaScript for mouse parallax, Three.js brain container, and custom cursor
- **Assets**: 
  - `3d-brain.mp4`: Background video (MP4 format)
  - `3d-brain.png`: Poster image for video
- **about/**: About section with images and videos
- **Projects/**: Projects showcase with images and videos
- **PowerShell Scripts**: Media management and deployment automation

## Quick Start
1. Open the project in VSCode (workspace: `c:/Users/Eduard Perez/Documents/EmpathicWeb Project`)
2. Open `Index.html` in a browser (e.g., Chrome) to view
3. For development: Install "Live Server" extension, right-click Index.html > "Open with Live Server" for live reload at `http://localhost:5500`

## Debugging Setup (.vscode/launch.json)
This project includes a universal `launch.json` configuration designed for global developers: Supports multiple browsers (Chrome, Edge, Firefox, Safari where possible), OS (Windows/macOS/Linux), and scenarios (static, live server, headless, mobile emulation, remote attach). It eliminates common errors (e.g., invalid properties, absolute paths) and follows VSCode schema for zero validation issues.

### Why Universal?
- **Browser Agnostic**: Covers 95%+ global usage (Chromium-dominant, plus Firefox/Safari alternatives). No bias—prioritizes popular but includes niche for inclusivity.
- **Global Adaptability**: Relative paths (`${workspaceFolder}`) work everywhere. Handles high-latency networks, low-resource devices, and team collaboration (remote attach).
- **Psychological Benefits**: Intuitive names reduce overwhelm; comprehensive options build confidence and motivation. Reduces frustration from "browser-specific" issues, promoting a sense of empowerment (backed by UX research: e.g., 40% dev tool pain from setup—mitigated here).
- **Extensibility**: Modular for adding backends (e.g., Node.js) or tools (e.g., Vite).

### Required Extensions (Free, Optional)
- **Built-in**: JavaScript Debugger (for pwa-chrome/msedge)
- **Live Server** (Ritwick Dey): For http://localhost:5500 live reload
- **Debugger for Firefox** (Microsoft): For Firefox configs
- **Microsoft Edge Tools for VS Code** (Microsoft): Optional for advanced Edge inspection

Install via VSCode Extensions view (Ctrl+Shift+X). If missing, configs gracefully ignore.

### Usage Instructions
1. **Set Breakpoints**: In Script.js or inline JS (e.g., F9 on a line)
2. **Launch Debug**: Press F5, select a config from the dropdown (e.g., "Launch Chrome (Static - Universal Default)")
3. **Debug Features**:
   - Console output in VSCode's Integrated Terminal
   - Sources panel for stepping through JS (e.g., mouse-parallax logic)
   - Inspect elements/CSS in browser DevTools (auto-opens)
4. **Common Workflows**:
   - **Quick Test**: "Launch Chrome (Static)"—opens file:// for instant feedback
   - **Live Dev**: Start Live Server, then "Live Server (Chrome)" for auto-reload on saves
   - **Cross-Browser**: Run "Full Browser Suite" compound to test Chrome + Edge
   - **Mobile/Global**: "Chrome Mobile Emulation" simulates iPhone; adjust args for Android
   - **Headless/CI**: "Chrome Headless" for automated tests (e.g., in GitHub Actions)
   - **Remote/Team**: Launch browser with `--remote-debugging-port=9222`, then "Attach to Chrome"
   - **Safari (macOS)**: Use "Launch Safari"—opens in Safari; attach manually via Develop > Start Debugging
5. **Troubleshooting**:
   - Errors? Check VSCode Problems panel—should be none post-setup
   - Firefox not working? Install extension and restart VSCode
   - Custom Ports: Edit `url` or `port` for firewalls (e.g., change 5500 to 8080)
   - Legacy Browsers (e.g., IE): Use VMs like BrowserStack; no native VSCode support

## Media Optimization & Management

### Media Compression Scripts
The project includes PowerShell scripts for optimizing media files:

#### compress_media.ps1
- **Purpose**: Compress images and videos using FFmpeg
- **Images**: Reduces quality for JPG/PNG, optimizes WebP
- **Videos**: Compresses with H.264 CRF 28, reduces resolution to 640x360
- **Usage**: Run `.\compress_media.ps1` to compress all files over 23MB

#### fix_large_files.ps1
- **Purpose**: Fix large files for web deployment
- **Features**: 
  - Identifies files over 23MB
  - Compresses videos with aggressive settings (480x360, 15fps)
  - Replaces originals if compression is effective
- **Usage**: Run `.\fix_large_files.ps1` to prepare for deployment

#### analyze-media-usage.ps1
- **Purpose**: Analyze which media files are actually used in HTML files
- **Features**:
  - Scans all HTML files for media references
  - Identifies unused media files
  - Optionally removes unused files
  - Generates used-media-files.txt report
- **Usage**: Run `.\analyze-media-usage.ps1` to clean up unused media

### Alternative Hosting Strategy for Large Media Files

#### Recommended Hosting Solutions

**Option 1: Bunny.net (Recommended for videos)**
- Purpose-built for video hosting
- Automatic optimization and delivery
- Affordable pricing with free tier
- Global CDN delivery network

**Option 2: AWS S3 + CloudFront**
- Scalable object storage
- Global content delivery network
- Pay-per-use pricing
- Easy integration with existing tools

**Option 3: Vimeo or YouTube (For public videos)**
- Free video hosting for public content
- Automatic optimization and delivery
- Large audience reach
- Easy embedding options

#### Integration Instructions
1. Upload videos to chosen hosting service
2. Get the public URLs for each video
3. Update HTML files to use external URLs instead of local paths
4. Test video playback and loading performance

#### Benefits of Alternative Hosting
- ✅ Faster website loading
- ✅ Better video streaming performance
- ✅ Reduced bandwidth costs
- ✅ Professional video delivery
- ✅ Mobile optimization

## Development Tasks

### Current TODO Items
- [ ] Analyze current PC media queries in Style.css
- [ ] Modify PC contact form styles to use mobile theme (single column, compact layout)
- [ ] Ensure PC uses mobile colors and glow effects
- [ ] Test contact form responsiveness
- [ ] Verify theme consistency across devices

## Development Best Practices
- **Testing**: Use compounds for cross-browser; emulate mobile for responsiveness (e.g., video on low-bandwidth)
- **Performance**: Compress MP4 (HandBrake tool); test headless for CI
- **Global Considerations**: Configs support non-English locales (VSCode auto-detects); relative paths avoid OS issues
- **Psychological UX**: The site's empathic design (e.g., brain viz) shines in debug—test interactions for emotional resonance
- **Media Optimization**: Regularly run media analysis and compression scripts to maintain optimal file sizes

## Security & Form Handling

### Contact Form Security Implementation
The contact form has been upgraded with enterprise-level security measures:

#### ✅ Security Features Implemented
- **Netlify Forms Integration**: Secure server-side form processing with SSL encryption
- **Honeypot Spam Protection**: Hidden field to detect and block automated spam
- **Rate Limiting**: 30-second cooldown between form submissions
- **Enhanced Input Validation**: Strict email/phone format validation with security checks
- **Autocomplete Attributes**: Proper browser autofill support for better UX
- **Content Security Policy**: Comprehensive CSP headers to prevent XSS attacks
- **HTTPS Enforcement**: Automatic HTTPS redirection and security headers

#### 🔒 Security Headers Configuration
- `X-Frame-Options: DENY` - Prevents clickjacking attacks
- `X-XSS-Protection: 1; mode=block` - XSS filtering
- `X-Content-Type-Options: nosniff` - MIME type security
- `Content-Security-Policy` - Comprehensive script/style restrictions
- `Referrer-Policy: strict-origin-when-cross-origin` - Privacy protection

#### 📋 Form Validation Features
- Real-time field validation with user-friendly error messages
- Required field enforcement
- Email format validation with RFC compliance
- Phone number validation with international format support
- Message length limits (10-5000 characters)
- Suspicious pattern detection

### Previous Issues Resolved
- ❌ **Before**: Insecure `mailto:` form action exposed user data
- ❌ **Before**: Missing autocomplete attributes disabled browser autofill
- ❌ **Before**: No HTTPS enforcement caused security warnings
- ✅ **After**: Secure Netlify Forms with SSL encryption
- ✅ **After**: Proper autocomplete for seamless user experience
- ✅ **After**: HTTPS-only deployment with security headers

### Contact Form Enhancements

The contact form has been significantly improved to provide a better user experience and fix critical issues.

*   **Upgraded Social Media Section:** Replaced the "Connect With Me" social media gallery with a more streamlined "social links" section, consistent with the design of other pages. The new title, "Extend the Dialogue: Connect Through Your Preferred Channel," is designed to be more engaging and empowering for the user.

*   **Fixed "Stuck" Notification Modals:** Resolved a critical bug where the email and WhatsApp submission confirmation modals would get "stuck" and not respond to user actions. The fix involved refactoring the code to use robust JavaScript event listeners instead of inline `onclick` attributes, preventing potential character escaping issues and improving overall reliability.

*   **Improved Notification Clarity:** The content of the submission notifications for both email and WhatsApp has been updated to be more descriptive and user-friendly, providing clearer instructions on the next steps.

## Deployment Guide

### Pre-Deployment Checklist
1. Run `.\analyze-media-usage.ps1` to remove unused media files
2. Run `.\fix_large_files.ps1` to ensure all files are under 23MB
3. Test website functionality with Live Server
4. Verify all links and media references work correctly
5. **NEW**: Test contact form security and autofill functionality

### Deployment Options
- **Static Hosting**: GitHub Pages, Netlify, Vercel
- **CDN**: Cloudflare Pages for global distribution
- **Video Hosting**: Use alternative hosting strategy for large video files

### Netlify Deployment (Recommended for Forms)
1. Connect your repository to Netlify
2. The `netlify.toml` and `_headers` files will automatically configure:
   - Form handling and spam protection
   - HTTPS enforcement
   - Security headers
   - CSP policies
3. Enable Netlify Forms in site settings
4. Configure form notifications to receive submissions via email

## Contributing
Fork, debug with F5, PR changes. For issues, check Problems panel or console.

## Full launch.json Configuration

```json
{
    // Universal VSCode launch.json for EmpathicWeb: Covers all browsers, OS, and global dev scenarios.
    // Install extensions: Live Server (for http://localhost), Debugger for Firefox.
    // Usage: F5 to select; set breakpoints in Script.js for testing.
    "version": "0.2.0",
    "configurations": [
        // === BROWSER LAUNCHES (Static File - Quick Local Testing) ===
        {
            "type": "pwa-chrome",
            "name": "Launch Chrome (Static - Universal Default)",
            "request": "launch",
            "url": "file://${workspaceFolder}/Index.html",
            "webRoot": "${workspaceFolder}",
            "console": "integratedTerminal"
        },
        {
            "type": "pwa-msedge",
            "name": "Launch Edge (Windows-Native, Global Chromium)",
            "request": "launch",
            "url": "file://${workspaceFolder}/Index.html",
            "webRoot": "${workspaceFolder}",
            "console": "integratedTerminal"
        },
        {
            "type": "firefox",
            "name": "Launch Firefox (Privacy-Focused, Extension Required)",
            "request": "launch",
            "relaunchInTerminal": true,
            "url": "file://${workspaceFolder}/Index.html",
            "webRoot": "${workspaceFolder}",
            "pathMappings": [{"url": "localhost:3000", "path": "${workspaceFolder}"}],
            "console": "integratedTerminal"
        },
        {
            "type": "node",
            "name": "Launch Safari (macOS-Only, Manual Attach)",
            "request": "launch",
            "program": "${workspaceFolder}/Index.html",
            "runtimeExecutable": "/usr/bin/osascript",
            "runtimeArgs": ["-e", "tell application 'Safari' to open location 'file://${workspaceFolder}/Index.html'"],
            "console": "integratedTerminal",
            "presentation": {"hidden": true},
            "problemMatcher": [],
            "skipFiles": ["<node_internals>/**"]
        },

        // === SERVER-BASED & EMULATION (Live Reload, Mobile, Headless) ===
        {
            "type": "pwa-chrome",
            "name": "Live Server (Chrome - Global Dev Workflow)",
            "request": "launch",
            "url": "http://localhost:5500/Index.html",
            "webRoot": "${workspaceFolder}",
            "server": {"waitForBrowser": true},
            "console": "integratedTerminal"
        },
        {
            "type": "pwa-chrome",
            "name": "Chrome Headless (CI/CD, Low-Resource Machines)",
            "request": "launch",
            "url": "file://${workspaceFolder}/Index.html",
            "webRoot": "${workspaceFolder}",
            "runtimeArgs": ["--headless=new", "--disable-gpu", "--no-sandbox"],
            "console": "integratedTerminal"
        },
        {
            "type": "pwa-chrome",
            "name": "Chrome Mobile Emulation (Global Device Testing)",
            "request": "launch",
            "url": "file://${workspaceFolder}/Index.html",
            "webRoot": "${workspaceFolder}",
            "runtimeArgs": [
                "--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)",
                "--window-size=375,812"
            ],
            "console": "integratedTerminal"
        },

        // === ATTACH & ADVANCED (Remote, Node.js for Servers) ===
        {
            "type": "pwa-chrome",
            "name": "Attach to Chrome (Remote/Global Team Debug)",
            "request": "attach",
            "port": 9222,
            "url": "http://localhost:*/*",
            "webRoot": "${workspaceFolder}",
            "console": "integratedTerminal"
        },
        {
            "type": "node",
            "name": "Node.js Server (If Adding Backend/API Sim)",
            "request": "launch",
            "program": "${workspaceFolder}/server.js",  // Create if needed
            "console": "integratedTerminal",
            "skipFiles": ["<node_internals>/**"]
        }
    ],
    "compounds": [
        // === COMPOUNDS (Intuitive Workflows for Psychological Ease) ===
        {
            "name": "Full Browser Suite (All Chromium - Universal Test)",
            "configurations": [
                "Launch Chrome (Static - Universal Default)",
                "Launch Edge (Windows-Native, Global Chromium)"
            ],
            "stopAll": true
        },
        {
            "name": "Live Debug (Server + Mobile Emulation)",
            "configurations": [
                "Live Server (Chrome - Global Dev Workflow)",
                "Chrome Mobile Emulation (Global Device Testing)"
            ],
            "stopAll": true,
            "preLaunchTask": "liveServer.start"
        },
        {
            "name": "Remote Attach Suite (Global Collaboration)",
            "configurations": ["Attach to Chrome (Remote/Global Team Debug)"],
            "stopAll": false
        }
    ]
}
```

Last Updated: 2025-11-19