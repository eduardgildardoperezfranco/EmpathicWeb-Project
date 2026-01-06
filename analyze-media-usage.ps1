# Analyze which media files are actually used in HTML files
Write-Host "🔍 Analyzing media file usage..." -ForegroundColor Green

# Get all HTML content
$allHtmlContent = ""
Get-ChildItem "." -Recurse -Include "*.html" | ForEach-Object {
    $allHtmlContent += Get-Content $_.FullName -Raw
    $allHtmlContent += "`n"
}

# Find all media file references using regex
$srcDoubleQuote = 'src="([^"]+\.(jpg|jpeg|png|gif|webp|mp4|webm|avi))"'
$srcSingleQuote = "src='([^']+\.(jpg|jpeg|png|gif|webp|mp4|webm|avi))'"
$hrefDoubleQuote = 'href="([^"]+\.(jpg|jpeg|png|gif|webp|mp4|webm|avi))"'
$hrefSingleQuote = "href='([^']+\.(jpg|jpeg|png|gif|webp|mp4|webm|avi))'"

$usedFiles = New-Object System.Collections.ArrayList

$patterns = @($srcDoubleQuote, $srcSingleQuote, $hrefDoubleQuote, $hrefSingleQuote)
foreach ($pattern in $patterns) {
    $matches = [regex]::Matches($allHtmlContent, $pattern)
    foreach ($match in $matches) {
        $filePath = $match.Groups[1].Value
        # Remove any query parameters or fragments
        $filePath = $filePath -split '[?#]' | Select-Object -First 1
        if ($filePath -and $usedFiles -notcontains $filePath) {
            $usedFiles.Add($filePath) | Out-Null
        }
    }
}

Write-Host "📋 Found $($usedFiles.Count) used media files:" -ForegroundColor Yellow
foreach ($file in $usedFiles) {
    Write-Host "  ✅ $file" -ForegroundColor Green
}

# Get all media files in project directory
$allMediaFiles = Get-ChildItem "." -Recurse -Include "*.jpg", "*.jpeg", "*.png", "*.gif", "*.webp", "*.mp4", "*.webm", "*.avi"

Write-Host ""
Write-Host "📊 Total media files in deployment: $($allMediaFiles.Count)" -ForegroundColor Cyan

# Find unused files
$unusedFiles = New-Object System.Collections.ArrayList
foreach ($mediaFile in $allMediaFiles) {
    $relativePath = $mediaFile.FullName.Replace($(Get-Location).Path + "\", "").Replace("\", "/")
    $isUsed = $false

    foreach ($usedFile in $usedFiles) {
        if ($usedFile -eq $relativePath -or $usedFile.EndsWith($mediaFile.Name)) {
            $isUsed = $true
            break
        }
    }

    if (-not $isUsed) {
        $unusedFiles.Add($mediaFile) | Out-Null
    }
}

Write-Host ""
Write-Host "⚠️ Found $($unusedFiles.Count) unused media files:" -ForegroundColor Yellow
foreach ($unusedFile in $unusedFiles) {
    $sizeMB = [math]::Round($unusedFile.Length / 1MB, 2)
    Write-Host "  🗑️ $($unusedFile.Name) - $sizeMB MB" -ForegroundColor Red
}

# Ask user if they want to remove unused files
if ($unusedFiles.Count -gt 0) {
    Write-Host ""
    $response = Read-Host "Do you want to remove these unused files? (y/N)"
    if ($response -eq "y" -or $response -eq "Y") {
        foreach ($unusedFile in $unusedFiles) {
            Remove-Item $unusedFile.FullName -Force
            Write-Host "  ✅ Removed: $($unusedFile.Name)" -ForegroundColor Green
        }
        Write-Host "🗑️ Removed $($unusedFiles.Count) unused files" -ForegroundColor Green
    } else {
        Write-Host "⏭️ Keeping unused files" -ForegroundColor Gray
    }
} else {
    Write-Host "✅ No unused files found!" -ForegroundColor Green
}

# Save used files list for reference
$usedFiles | Out-File "used-media-files.txt" -Encoding UTF8
Write-Host "Saved used files list to: used-media-files.txt" -ForegroundColor Cyan