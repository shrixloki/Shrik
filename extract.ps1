$content = Get-Content -Path "Install.txt" -Raw
$lines = $content -split "`n"
$extracted = $lines[45..1015] -join "`n"
Set-Content -Path "src\components\InfiniteMenu.tsx" -Value $extracted
