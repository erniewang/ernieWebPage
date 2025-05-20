from datetime import datetime, timedelta
import os

# Define start and end dates
start = datetime(2024, 8, 25)
end = datetime(2024, 12, 17)

# Generate all dates in YYYYMMDD format
current = start
date_strings = []
while current <= end:
    date_strings.append(current.strftime("%Y%m%d"))
    current += timedelta(days=1)

files = os.listdir()

#print(files[:10])
incrementer = 0
for date in date_strings:
    date_files = list(filter(lambda x: date in x, files))
    for file in date_files:
        os.rename(file, str(incrementer) + ".jpg")
        incrementer += 1


