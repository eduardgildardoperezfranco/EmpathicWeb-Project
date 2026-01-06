# Script to fix large files for web deployment
Write-Host "🔧 Fixing large files for web deployment..." -ForegroundColor Green

# Check for large files
$largeFiles = Get-ChildItem -Recurse -File | Where-Object { $_.Length -gt 23MB -and $_.FullName -notlike "*ffmpeg*" }

if ($largeFiles.Count -eq 0) {
    Write-Host "✅ No files over 23MB found!" -ForegroundColor Green
    exit
}

Write-Host "📊 Found $($largeFiles.Count) large files:" -ForegroundColor Yellow
foreach ($file in $largeFiles) {
    $sizeMB = [math]::Round($file.Length / 1MB, 2)
    Write-Host "  $($file.Name) - $sizeMB MB" -ForegroundColor Cyan
}

# Remove FFmpeg executables if they exist in current directory
$ffmpegFiles = Get-ChildItem "." -Name "*ffmpeg*" -File
if ($ffmpegFiles) {
    Write-Host "🗑️ Removing FFmpeg executables from current directory..." -ForegroundColor Yellow
    Remove-Item "*ffmpeg*" -Force
    Write-Host "✅ FFmpeg executables removed" -ForegroundColor Green
}

# Compress specific large video files
$ffmpegPath = "ffmpeg/ffmpeg-8.0-essentials_build/bin/ffmpeg.exe"
$largeVideos = $largeFiles | Where-Object { $_.Extension -eq ".mp4" }

foreach ($video in $largeVideos) {
    $sizeMB = [math]::Round($video.Length / 1MB, 2)
    Write-Host "🎥 Compressing video: $($video.Name) ($sizeMB MB)" -ForegroundColor Yellow

    # Create compressed version with smaller size
    $outputPath = $video.FullName.Replace($video.Extension, "_cf.mp4")

    & $ffmpegPath -y -i $video.FullName -vcodec libx264 -crf 35 -preset ultrafast -acodec aac -b:a 32k -s 480x360 -r 15 $outputPath

    if (Test-Path $outputPath) {
        $newSizeMB = [math]::Round((Get-Item $outputPath).Length / 1MB, 2)
        Write-Host "✅ Compressed to $newSizeMB MB" -ForegroundColor Green

        # Replace original if compressed version is smaller
        if ((Get-Item $outputPath).Length -lt $video.Length) {
            Remove-Item $video.FullName -Force
            Rename-Item $outputPath $video.Name
            Write-Host "✅ Replaced original file" -ForegroundColor Green
        } else {
            Remove-Item $outputPath -Force
            Write-Host "⚠️ Compressed version not smaller, keeping original" -ForegroundColor Yellow
        }
    }
}

# Final check
$remainingLargeFiles = Get-ChildItem -Recurse -File | Where-Object { $_.Length -gt 23MB -and $_.FullName -notlike "*ffmpeg*" }
if ($remainingLargeFiles.Count -eq 0) {
    Write-Host "🎉 All files are now under 23MB!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Still have $($remainingLargeFiles.Count) large files" -ForegroundColor Yellow
}

Write-Host "✅ Large file fix complete!" -ForegroundColor Green