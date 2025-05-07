import os

# Define folder paths
folder1 = './models'
folder2 = './routes'

# Define output files
output1 = 'models.txt'
output2 = 'routes.txt'

# Function to merge files from a folder into an output file
def merge_files(folder_path, output_file):
    with open(output_file, 'w') as outfile:
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)
            if os.path.isfile(file_path):
                with open(file_path, 'r') as infile:
                    outfile.write(infile.read())
                    outfile.write("\n")  # Optional: Adds a newline after each file's content

# Merge files from both folders
merge_files(folder1, output1)
merge_files(folder2, output2)

print("Files merged successfully!")
