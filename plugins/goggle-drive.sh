

#!/bin/bash

# Function to extract folder from Google Drive link and copy it to plugins directory
extract_and_copy_to_plugins() {
    # Extract Google Drive ID from the link
    drive_id=$(echo "$1" | awk -F "[=/]" '/(\/|id=)/{print $NF}')

    # Download the folder as a zip file
    curl -L "https://drive.google.com/uc?id=${drive_id}" -o "${drive_id}.zip"

    # Extract the zip file
    unzip "${drive_id}.zip" -d extracted_folder

    # Move the extracted folder to the plugins directory
    mv extracted_folder /home/admin96/Videos/abhinavsir-poc/plugin-poc/plugins/download
}

# Example usage: Pass the Google Drive link as an argument to the script
extract_and_copy_to_plugins "https://drive.google.com/file/d/1bSszBB38pddvkv6DknzIvwTQlL-YyUQY"
