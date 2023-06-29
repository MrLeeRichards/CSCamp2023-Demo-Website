i = 2 ** 20
count = 0

while count < 100:
    d = 2
    while i % d > 0:
        d += 1
    if i == d:
        print(i)
        count += 1
    i -= 1