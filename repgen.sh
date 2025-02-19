#!/bin/bash

# Check if at least one file is provided as an argument
if [ $# -eq 0 ]; then
  echo "Usage: $0 file1 [file2 ...]"
  exit 1
fi

# Loop through each file provided as an argument
for file in "$@"; do
  # Check if the file exists
  if [ ! -e "$file" ]; then
    echo "Error: File '$file' not found."
    continue  # Skip to the next file
  fi

  # Print the file path
  echo "-------------------------"
  echo "$file"
  echo "-------------------------"

  # Print the contents of the file
  cat "$file"
  echo ""  # Add an extra newline for readability
done

exit 0
