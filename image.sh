cd assets/img/organizers/
for file in *; do cwebp -q 80 "$file" -o "${file%.*}.webp"; done
cd ../speakers/
for file in *; do cwebp -q 80 "$file" -o "${file%.*}.webp"; done
cd ../sponsors
for file in *; do cwebp -q 80 "$file" -o "${file%.*}.webp"; done
cd ../blog
for file in *; do cwebp -q 80 "$file" -o "${file%.*}.webp"; done
cd ../../../
