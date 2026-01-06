# PowerShell script to compress media files using FFmpeg
# Images: Reduce quality for jpg/png, optimize webp
# Videos: Compress with H.264 CRF 28

$ffmpegPath = "ffmpeg/ffmpeg-8.0-essentials_build/bin/ffmpeg.exe"

# Function to compress image
function Compress-Image {
    param ($file)
    $tempFile = $file.FullName + ".tmp"
    $ext = $file.Extension.ToLower()
    if ($ext -eq ".jpg" -or $ext -eq ".jpeg" -or $ext -eq ".png") {
        & $ffmpegPath -y -i $file.FullName -q:v 5 -c:v libjpeg $tempFile
    } elseif ($ext -eq ".webp") {
        & $ffmpegPath -y -i $file.FullName -c:v libwebp -q:v 80 $tempFile
    }
    if (Test-Path $tempFile) {
        Move-Item $tempFile $file.FullName -Force
    }
}

# Function to compress video
function Compress-Video {
    param ($file)
    $tempFile = $file.FullName + ".tmp"
    & $ffmpegPath -y -i $file.FullName -vcodec libx264 -crf 32 -preset veryfast -acodec aac -b:a 64k -s 640x360 $tempFile
    if (Test-Path $tempFile) {
        Move-Item $tempFile $file.FullName -Force
    }
}

# Get only large files over 23MB
$largeFiles = Get-ChildItem -Recurse -File | Where-Object { $_.Length -gt 23MB -and $_.FullName -notlike "*ffmpeg*" }

# Separate images and videos from large files
$images = $largeFiles | Where-Object { $_.Extension -match "\.(jpg|jpeg|png|webp)$" }
$videos = $largeFiles | Where-Object { $_.Extension -eq ".mp4" }

# Compress images
foreach ($img in $images) {
    Write-Host "Compressing image: $($img.FullName)"
    Compress-Image $img
}

# Compress videos
foreach ($vid in $videos) {
    Write-Host "Compressing video: $($vid.FullName)"
    Compress-Video $vid
}

Write-Host "Compression complete."
