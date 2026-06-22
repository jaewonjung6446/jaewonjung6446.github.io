$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$assetDir = Join-Path $root "assets"
New-Item -ItemType Directory -Force -Path $assetDir | Out-Null

Add-Type -AssemblyName System.Drawing

$projects = @(
    @{ File = "axol-v2.png"; Title = "AXOL v2"; Subtitle = "Fast-path routing for repeated agent work"; A = "#0f766e"; B = "#111827"; C = "#f59e0b" },
    @{ File = "izakoza.png"; Title = "Izakoza"; Subtitle = "Unity gameplay + editor pipeline"; A = "#be123c"; B = "#27272a"; C = "#22c55e" },
    @{ File = "pansori.png"; Title = "Pansori"; Subtitle = "9 minigames in 40 hours"; A = "#b45309"; B = "#1f2937"; C = "#eab308" },
    @{ File = "metaverse-2024.png"; Title = "DoranDoran"; Subtitle = "AI NPC + TTS metaverse"; A = "#2563eb"; B = "#0f172a"; C = "#38bdf8" },
    @{ File = "yeoubi.png"; Title = "Yeoubi"; Subtitle = "Weather-driven narrative prototype"; A = "#7c3aed"; B = "#14532d"; C = "#f472b6" },
    @{ File = "super-light-brothers.png"; Title = "Super Light Brothers"; Subtitle = "Light mechanic team project"; A = "#ea580c"; B = "#1e1b4b"; C = "#fde047" }
)

function New-Brush([string]$hex) {
    return New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml($hex))
}

foreach ($project in $projects) {
    $bmp = New-Object System.Drawing.Bitmap 1280, 720
    $gfx = [System.Drawing.Graphics]::FromImage($bmp)
    $gfx.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $gfx.Clear([System.Drawing.ColorTranslator]::FromHtml($project.B))

    $bgBrush = New-Brush $project.A
    $accentBrush = New-Brush $project.C
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(245, 245, 240))
    $mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 230, 225))
    $darkBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(42, 42, 42))

    $gfx.FillRectangle($bgBrush, 0, 0, 1280, 720)
    $gfx.FillRectangle($darkBrush, 0, 460, 1280, 260)

    for ($i = 0; $i -lt 10; $i++) {
        $x = 80 + ($i * 125)
        $y = 72 + (($i % 3) * 42)
        $size = 56 + (($i % 4) * 22)
        $gfx.FillEllipse($accentBrush, $x, $y, $size, $size)
    }

    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(245, 245, 240), 6)
    $gfx.DrawRectangle($pen, 64, 64, 1152, 592)
    $gfx.DrawLine($pen, 96, 448, 1184, 448)

    $titleFont = New-Object System.Drawing.Font("Segoe UI", 64, [System.Drawing.FontStyle]::Bold)
    $subtitleFont = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Regular)
    $labelFont = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Bold)

    $gfx.DrawString($project.Title, $titleFont, $whiteBrush, 96, 500)
    $gfx.DrawString($project.Subtitle, $subtitleFont, $mutedBrush, 100, 594)
    $gfx.DrawString("PORTFOLIO SAMPLE IMAGE", $labelFont, $whiteBrush, 96, 96)

    $out = Join-Path $assetDir $project.File
    $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)

    $pen.Dispose()
    $titleFont.Dispose()
    $subtitleFont.Dispose()
    $labelFont.Dispose()
    $bgBrush.Dispose()
    $accentBrush.Dispose()
    $whiteBrush.Dispose()
    $mutedBrush.Dispose()
    $darkBrush.Dispose()
    $gfx.Dispose()
    $bmp.Dispose()
}
