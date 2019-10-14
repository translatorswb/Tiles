import sys

def start_progress():
    global progress_x
    sys.stdout.write("[" + "-"*40 + "]" + chr(8)*41)
    sys.stdout.flush()
    progress_x = 0


def progress(x):
    global progress_x
    x = int(x * 40 // 100)
    sys.stdout.write("#" * (x - progress_x))
    sys.stdout.flush()
    progress_x = x


def end_progress():
    sys.stdout.write("#" * (40 - progress_x) + "]\n\n")
    sys.stdout.flush()