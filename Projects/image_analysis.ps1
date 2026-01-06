# Image Quality Analysis Script for Projects
# Analyzes dimensions, file sizes, and quality of all project images

$imagePath = ".\Images\"
$results = @()

Write-Host "=== PROJECT IMAGES QUALITY ANALYSIS ===" -ForegroundColor Cyan
Write-Host ""

# Get all jpg files
Get-ChildItem -Path $imagePath -Filter "*.jpg" | ForEach-Object {
    $file = $_
    
    try {
        # Load image using System.Drawing
        Add-Type -AssemblyName System.Drawing
        $bitmap = New-Object System.Drawing.Bitmap $file.FullName
        
        # Get file size in KB
        $fileSizeKB = [math]::Round($file.Length / 1KB, 2)
        
        # Calculate aspect ratio
        $aspectRatio = [math]::Round($bitmap.Width / $bitmap.Height, 2)
        
        # Determine quality category
        if ($bitmap.Width -lt 800 -or $bitmap.Height -lt 600) {
            $qualityCategory = "LOW"
        } elseif ($bitmap.Width -lt 1200 -or $bitmap.Height -lt 900) {
            $qualityCategory = "MEDIUM"
        } elseif ($bitmap.Width -lt 1920 -or $bitmap.Height -lt 1080) {
            $qualityCategory = "GOOD"
        } else {
            $qualityCategory = "HIGH"
        }
        
        # Check for optimal display sizing (these cards are ~280px height in CSS)
        $isOptimalHeight = if ($bitmap.Height -ge 280) { "YES" } else { "NO - NEEDS UPSCALING" }
        
        $results += [PSCustomObject]@{
            FileName = $file.Name
            Width = $bitmap.Width
            Height = $bitmap.Height
            AspectRatio = $aspectRatio
            FileSizeKB = $fileSizeKB
            QualityCategory = $qualityCategory
            IsOptimalHeight = $isOptimalHeight
            FilePath = $file.FullName
        }
        
        $bitmap.Dispose()
    }
    catch {
        Write-Host "ERROR analyzing $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Sort results by file name and display
$results = $results | Sort-Object FileName

Write-Host "ANALYSIS RESULTS:" -ForegroundColor Yellow
Write-Host ""

$lowQuality = @()
$mediumQuality = @()
$highQuality = @()

foreach ($result in $results) {
    $color = switch ($result.QualityCategory) {
        "LOW" { "Red" }
        "MEDIUM" { "Yellow" }
        "GOOD" { "Green" }
        "HIGH" { "Cyan" }
    }
    
    Write-Host "$($result.FileName)" -ForegroundColor $color
    Write-Host "  Dimensions: $($result.Width)x$($result.Height) (Ratio: $($result.AspectRatio))" -ForegroundColor White
    Write-Host "  File Size: $($result.FileSizeKB) KB" -ForegroundColor White
    Write-Host "  Quality: $($result.QualityCategory)" -ForegroundColor $color
    Write-Host "  Optimal for cards (280px height): $($result.IsOptimalHeight)" -ForegroundColor White
    Write-Host ""
    
    # Categorize for summary
    switch ($result.QualityCategory) {
        "LOW" { $lowQuality += $result.FileName }
        "MEDIUM" { $mediumQuality += $result.FileName }
        "GOOD" { $highQuality += $result.FileName }
        "HIGH" { $highQuality += $result.FileName }
    }
}

# Summary
Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Total Images Analyzed: $($results.Count)" -ForegroundColor White
Write-Host "LOW Quality (< 800x600): $($lowQuality.Count)" -ForegroundColor Red
Write-Host "MEDIUM Quality (800-1200px): $($mediumQuality.Count)" -ForegroundColor Yellow
Write-Host "GOOD/HIGH Quality (1200px+): $($highQuality.Count)" -ForegroundColor Green
Write-Host ""

if ($lowQuality.Count -gt 0) {
    Write-Host "LOW QUALITY IMAGES (Need replacement or upscaling):" -ForegroundColor Red
    $lowQuality | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Write-Host ""
}

# Recommendations
Write-Host "=== RECOMMENDATIONS ===" -ForegroundColor Cyan
Write-Host "1. Images with height < 280px should be upscaled or replaced" -ForegroundColor Yellow
Write-Host "2. Ideal dimensions for card display: 400-800px height, maintains quality on retina displays" -ForegroundColor Yellow
Write-Host "3. Consider WebP format for better compression without quality loss" -ForegroundColor Yellow
Write-Host "4. Standardize aspect ratios for consistent card layouts" -ForegroundColor Yellow

# Save results to file
$results | Export-Csv -Path "image_analysis_results.csv" -NoTypeInformation -Encoding UTF8
Write-Host ""
Write-Host "Detailed results saved to: image_analysis_results.csv" -ForegroundColor Green